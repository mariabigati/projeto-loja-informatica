import express from "express";
import path from "node:path";
import { EnvVar } from "./config/EnvVar";

import router from "../src/routes/routes";
const app = express();

app.use(express.json());
app.use('/', router);
app.use('/images', express.static(path.resolve('uploads/images')));
app.listen(EnvVar.SERVER_PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${EnvVar.SERVER_PORT}`);
})