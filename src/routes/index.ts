import { Router } from "express";
import productRoutes from "./ProductRoutes";

const router = Router();

router.use("/products", productRoutes);

export default router;
