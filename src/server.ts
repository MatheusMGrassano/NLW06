import express from "express";

const app = express();
const port = 3000;

app.get("/test", (request, response) => {
    return response.send("Ola NLW")
});

app.post("/test-port", (request, response) => {
    return response.send("Ola NLW metodo POST")
})

// http://localhost:3000
app.listen(port, () => console.log(`🦁 Server is running. Port ${port}`) )