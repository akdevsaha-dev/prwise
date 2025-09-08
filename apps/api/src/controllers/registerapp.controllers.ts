import { prisma } from "@repo/db";
import { Request, Response } from "express"
import { auth, Session } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const registerApp = async (req: Request, res: Response) => {
    try {
        const { installation_id, state } = req.query;
        const workspaceId = state

        if (!installation_id || !workspaceId) {
            return res.status(400).send("Missing installation_id or workspaceId")
        }
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        }) as Session | null
        if (!session) {
            return res.redirect(`${process.env.FRONTEND_URL}/signin`)
        }

        const existingInstallation = await prisma.githubAppInstallation.findUnique({
            where: { workspaceId: String(workspaceId) }
        });

        await prisma.githubAppInstallation.upsert({
            where: {
                workspaceId: String(workspaceId)
            },
            update: {
                installationId: installation_id.toString()
            },
            create: {
                workspaceId: String(workspaceId),
                installationId: installation_id.toString()
            }
        })

        // Get workspace info for redirect
        const workspace = await prisma.workspace.findUnique({
            where: { id: String(workspaceId) },
            select: { name: true }
        });

        if (!workspace) {
            return res.status(404).send("Workspace not found");
        }

        if (!existingInstallation) {
            return res.redirect(
                `${process.env.FRONTEND_URL}/onboarding/success?workspaceName=${workspace.name}&workspaceId=${workspaceId}&connected=github`
            );
        } else {
            return res.redirect(
                `${process.env.FRONTEND_URL}/dashboard/${workspace.name}/${workspaceId}?connected=github`
            );
        }
    }
    catch (error) {
        res.json(error)
    }
}