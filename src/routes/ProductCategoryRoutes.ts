import { Router, Request, Response } from "express";
import {
  ProductCategoryModel,
  ProductCategory,
} from "../models/ProductCategoryModel";
import { validate as isUuid } from "uuid";
type Params = { id: string };

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const productCategories = await ProductCategoryModel.getAll();
    res.status(200).json(productCategories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// POST /categories
router.post("/", async (req: Request<{}, ProductCategory>, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        message: "Missing required fields: name",
      });
      return;
    }
    const responseMessage = await ProductCategoryModel.create({
      name,
    });
    res.status(201).json({ message: responseMessage });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// PUT /categories/:id
router.put(
  "/:id",
  async (req: Request<Params, {}, ProductCategory>, res: Response) => {
    const id = req.params.id;
    if (!isUuid(id)) {
      res.status(400).json({ error: "Invalid UUID format" });
      return;
    }

    try {
      const updated = await ProductCategoryModel.update(id, req.body);
      if (!updated) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      res.json({ message: "Updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

// // DELETE /categories/:id
router.delete("/:id", async (req: Request<Params>, res: Response) => {
  const id = req.params.id;
  if (!isUuid(id)) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  try {
    const deleted = await ProductCategoryModel.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
