import { Request, Response } from "express";

export const webhookEvent = (req: Request, res: Response) => {
    try {
        const githubEvent = req.headers['x-github-event'];
        const payload = req.body

        if (githubEvent === "pull_request" && payload.action === "opened") {
            const owner = payload.repository.owner.login
            const repo = payload.repository.name;
            const pull_number = payload.pull_request.number
            console.log(
                `🔔 New PR opened in ${owner}/${repo} (#${pull_number})`
            );
            res.status(200).send("Webhook received");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Webhook processing failed");
    }
}