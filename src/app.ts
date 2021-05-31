import express from "express";
import { router } from "./routes";
import createConnection from "./database";

async function conn() {
    var connection = {};
    try {
        connection = await createConnection();
    } catch {
        console.clear();
        console.log("Aguardando pelo banco de dados para conectar!");
        conn();
    }
    if (!connection) {
        console.clear();
        console.log("Aguardando pelo banco de dados para conectar!");
        conn();
    }
    console.clear();
    console.log(`🔥 Server is running in port: 5000 🔥`);
}
conn();
const app = express();
app.use(express.json());
app.use(router);

export { app };
