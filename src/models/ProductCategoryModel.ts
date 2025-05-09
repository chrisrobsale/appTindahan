import { v4 as uuidv4 } from "uuid";
import db from "../config/db";

export interface ProductCategory {
  name: string;
}

export const ProductCategoryModel = {
  async getAll(): Promise<ProductCategory[]> {
    const [rows] = await db.query("SELECT * FROM productCategory");
    return rows as ProductCategory[];
  },
  async create(product: ProductCategory): Promise<string> {
    const { name } = product;
    const id = uuidv4();
    const [result] = await db.query(
      "INSERT INTO productCategory (id, name) VALUES (?, ?)",
      [id, name]
    );
    return `Product Category ${name} created successfully`;
  },

  async update(id: string, product: ProductCategory): Promise<boolean> {
    const { name } = product;
    const [result] = await db.query(
      "UPDATE productCategory SET name = ? WHERE id = ?",
      [name, id]
    );
    return (result as any).affectedRows > 0;
  },

  async delete(id: string): Promise<boolean> {
    const [result] = await db.query(
      "DELETE FROM productCategory WHERE id = ?",
      [id]
    );
    return (result as any).affectedRows > 0;
  },
};
