import express from "express";
import ngrok from "@ngrok/ngrok";
import { prisma } from "@repo/db"
const app = express();
const port = 3000;

app.get("/", async (_req, res) => {
    const user = await prisma.user.findFirst()
    res.json({ message: "Hello World", user: user?.name ?? "No user found" });
});

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    try {
        const listener = await ngrok.connect({
            addr: port,
            authtoken: process.env.NGROK_AUTHTOKEN, // ✅ explicit token
            domain: "ghoul-ready-moccasin.ngrok-free.app"
        });

        console.log(`Ingress established at: ${listener.url()}`);
    } catch (err) {
        console.error("Ngrok failed:", err);
    }
});