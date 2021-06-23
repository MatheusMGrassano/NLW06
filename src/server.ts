import express from "express";
import "reflect-metadata";
import "./database";

import { router } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use(router)

// http://localhost:3000
app.listen(port, () => console.log(`🦁 Server is running. Port ${port}`) )