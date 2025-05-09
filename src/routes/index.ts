import { Router } from "express";
import productRoutes from "./ProductRoutes";
import productCategoryRoutes from "./ProductCategoryRoutes";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", productCategoryRoutes);

export default router;
