import express, { Request, Response, NextFunction, response } from "express";
import "reflect-metadata";
import "./database";
import "express-async-errors";

import { router } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
}) 


// http://localhost:3000
app.listen(port, () => console.log(`🦁 Server is running. Port ${port}`) )
