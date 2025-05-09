import { v4 as uuidv4 } from "uuid";
import db from "../config/db";

export interface Product {
  name: string;
  price: number;
  categoryID: string;
}

export const ProductModel = {
  async getAll(): Promise<Product[]> {
    const [rows] = await db.query("SELECT * FROM products");
    return rows as Product[];
  },

  async getById(id: string): Promise<Product | null> {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return (rows as Product[])[0] || null;
  },

  async create(product: Product): Promise<string> {
    const { name, price, categoryID } = product;
    const id = uuidv4();
    const [result] = await db.query(
      "INSERT INTO products (id, name, price, categoryID) VALUES (?, ?, ?, ?)",
      [id, name, price, categoryID]
    );
    return `Product ${name} created successfully`;
  },

  async update(id: string, product: Product): Promise<boolean> {
    const { name, price } = product;
    const [result] = await db.query(
      "UPDATE products SET name = ?, price = ? WHERE id = ?",
      [name, price, id]
    );
    return (result as any).affectedRows > 0;
  },

  async delete(id: string): Promise<boolean> {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  },
};
