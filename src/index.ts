import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDatabase } from "./config/dbConfig.ts";
import userRoutes from "./routes/user.routes.ts";
import deviceRoutes from "./routes/device.routes.ts";
import salesRoutes from "./routes/sales.routes.ts";
import pdfRoutes from "./routes/pdf.routes.ts";
import historyRoutes from "./routes/history.routes.ts";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

connectToDatabase();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/devices", deviceRoutes);
app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/history", historyRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
