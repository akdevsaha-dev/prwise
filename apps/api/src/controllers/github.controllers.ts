import { Octokit } from "octokit"
import { generateSecret } from "../lib/generateSecret.js"
import { Request, Response } from "express"
import { prisma } from "@repo/db";

export const getInstallationDetails = async (req: Request, res: Response) => {
    try {
        const { workspaceId } = req.params;
        const installation = await prisma.githubAppInstallation.findUnique({
            where: {
                workspaceId
            }
        })
        if (!installation) {
            return res.status(404).json({ error: "No GitHub installation found for this workspace" });
        }
        const installation_id = installation?.installationId
        const installationIdNum = parseInt(installation_id, 10)
        if (isNaN(installationIdNum)) {
            return res.status(400).json({ error: "Invalid installation ID in DB" });
        }
        const jwtToken = generateSecret()
        const octokit = new Octokit({
            auth: jwtToken
        })

        const { data } = await octokit.request('GET /app/installations/{installation_id}', {
            installation_id: installationIdNum,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log(data)
        res.json(data);

    } catch (error: any) {
        console.error('Error fetching installation details:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch installation details' });
    }
}