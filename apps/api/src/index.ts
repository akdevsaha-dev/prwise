import dotenv from "dotenv"
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
import express from "express";
import ngrok from "@ngrok/ngrok";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import onboardRoute from "./routes/onboard.route.js"
import workspaceRoute from "./routes/workspace.route.js"
import registerAppRoute from "./routes/registerapp.route.js"
import githubRoute from "./routes/github.route.js"
import cors from "cors"
import { auth } from "./auth.js";
const app = express();
const port = 3000;

app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        credentials: true,
    })
);


app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());


app.use("/api/v1", onboardRoute, workspaceRoute)
app.use("/api/github", registerAppRoute)
app.use("/app/installations", githubRoute)

app.get("/api/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
});


app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    try {
        const listener = await ngrok.connect({
            addr: port,
            authtoken: process.env.NGROK_AUTHTOKEN,
            domain: "ghoul-ready-moccasin.ngrok-free.app"
        });

        console.log(`Ingress established at: ${listener.url()}`);
    } catch (err) {
        console.error("Ngrok failed:", err);
    }
});