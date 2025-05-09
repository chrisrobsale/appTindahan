import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config(); // load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // body parser

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/api", routes); // Base path

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
