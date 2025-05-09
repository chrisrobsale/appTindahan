import { Router, Request, Response } from "express";
import { ProductModel, Product } from "../models/ProductModel";
import { validate as isUuid } from "uuid";
type Params = { id: string };

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let products;
    if (req.params.id) {
      const { id } = req.params;
      if (!isUuid(id)) {
        res.status(400).json({ error: "Invalid UUID format" });
        return;
      }
      products = await ProductModel.getById(id);
      if (!products) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
    } else {
      products = await ProductModel.getAll();
    }

    res.status(200).json(products);
    return;
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// POST /products
router.post("/", async (req: Request<{}, {}, Product>, res: Response) => {
  try {
    const { name, price, categoryID } = req.body;
    if (!name || !price || !categoryID) {
      res.status(400).json({
        message: "Missing required fields: name, price, or categoryID",
      });
      return;
    }
    const responseMessage = await ProductModel.create({
      name,
      price,
      categoryID,
    });
    res.status(201).json({ message: responseMessage });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// PUT /products/:id
router.put("/:id", async (req: Request<Params, {}, Product>, res: Response) => {
  const id = req.params.id;
  if (!isUuid(id)) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  try {
    const updated = await ProductModel.update(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// // DELETE /products/:id
router.delete("/:id", async (req: Request<Params>, res: Response) => {
  const id = req.params.id;
  if (!isUuid(id)) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  try {
    const deleted = await ProductModel.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
