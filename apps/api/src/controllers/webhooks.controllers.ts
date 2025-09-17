import { prisma } from "@repo/db";
import { Request, Response } from "express";
import { getInstallationAccessToken } from "../lib/accessToken.js";
import { Octokit } from "octokit";
import { analyzeWithAi } from "../lib/aiReview.js";
export const webhookEvent = async (req: Request, res: Response) => {
    try {
        const githubEvent = req.headers['x-github-event'];
        const payload = req.body
        res.status(200).send("Webhook received");
        if (githubEvent === "pull_request" && payload.action === "opened") {
            const owner = payload.repository.owner.login
            const repo = payload.repository.name;
            const pull_number = payload.pull_request.number
            const title = payload.pull_request.title
            const description = payload.pull_request.body
            const state = payload.pull_request.state
            const branch = payload.pull_request.head.ref
            const baseBranch = payload.pull_request.base.ref
            const installation = await prisma.githubAppInstallation.findFirst({
                where: {
                    accountLogin: owner
                }
            })
            if (!installation) {
                console.log("No GitHub installation found for this repo");
                return;
            }

            const pullRequest = await prisma.pullRequest.upsert({
                where: {
                    id: `${installation.workspaceId}-${pull_number}`
                },
                update: {
                    title,
                    description,
                    state,
                    branch,
                    baseBranch,
                    updatedAt: new Date()
                },
                create: {
                    id: `${installation.workspaceId}-${pull_number}`,
                    title,
                    description,
                    pullReqNumber: pull_number,
                    state,
                    branch,
                    repoName: repo,
                    baseBranch,
                    workspaceId: installation.workspaceId
                }
            })
            const installationIdNum = parseInt(installation.installationId, 10);
            const accessToken = await getInstallationAccessToken(installationIdNum);
            const octokit = new Octokit({ auth: accessToken });
            const { data: files } = await octokit.request(
                "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
                { owner, repo, pull_number }
            );

            const diffs = files.filter((f) => f.patch)
                .map((f) => `File: ${f.filename}\n${f.patch}`)
                .join("\n\n")
            const parsed = await analyzeWithAi(diffs)
            await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: owner,
                repo: repo,
                issue_number: pull_number,
                body: parsed.comment,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })

            const analysis = await prisma.analysis.create({
                data: {
                    status: "Completed",
                    summary: parsed.comment,
                    suggestions: parsed.suggestions,
                    bugRiskScore: parsed.bugRiskScore,
                    pullRequestId: pullRequest.id
                }
            })
        }
    } catch (error) {
        console.error(error);
    }
}