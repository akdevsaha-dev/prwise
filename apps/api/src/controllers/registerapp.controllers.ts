import { prisma } from "@repo/db";
import { Request, Response } from "express"
import { auth, Session } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { generateSecret } from "../lib/generateSecret.js";
import { Octokit } from "octokit";

export const registerApp = async (req: Request, res: Response) => {
    try {
        const { installation_id, state } = req.query;
        const workspaceId = state

        if (!installation_id || !workspaceId) {
            return res.status(400).send("Missing or invalid query params");
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
        const jwtToken = generateSecret()

        const octokit = new Octokit({
            auth: jwtToken
        })
        const installation_idNum = parseInt(installation_id as string, 10);
        if (isNaN(installation_idNum)) {
            return res.status(400).send("Invalid installation_id");
        }

        const { data } = await octokit.request('GET /app/installations/{installation_id}', {
            installation_id: installation_idNum,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        if (!data.account) {
            return res.status(400).send("GitHub installation account data not found");
        }

        let accountLogin: string;
        let accountType: "User" | "Enterprise";

        if ("login" in data.account) {
            accountLogin = data.account.login;
            accountType = "User";
        } else if ("name" in data.account) {
            accountLogin = data.account.name;
            accountType = "Enterprise";
        } else {
            throw new Error("Unknown account type from GitHub installation");
        }

        await prisma.githubAppInstallation.upsert({
            where: {
                workspaceId: String(workspaceId)
            },
            update: {
                installationId: installation_id.toString(),
                accountLogin,
                accountType,
            },
            create: {
                workspaceId: String(workspaceId),
                installationId: installation_id.toString(),
                accountLogin,
                accountType,
            }
        })

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