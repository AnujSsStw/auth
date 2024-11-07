import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the URL of your client-side application
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Set this to true
  })
);
const port = 3000;

app.all("/api/auth/*", toNodeHandler(auth));
app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
