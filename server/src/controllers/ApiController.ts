import { Router } from "express";
import { Product } from "../sql";
import ProductsController from "./ProductsController";
import RecordsController from "./RecordsController";

namespace ApiController {
  export const router = Router();
  
  router.get("/", (req, res) => {
    res.json({ message: "Hello from the API!" });
  });

  router.use("/products", ProductsController.router);
  router.use("/records", RecordsController.router);

  export async function getCategories() {
    const products = await Product.findAll({
      attributes: ["category"],
      group: ["category"]
    });
    return products.map(product => product.category).filter(Boolean);
  }
  router.get("/categories", async (req, res) => {
    const categories = await getCategories();
    res.json(categories);
  });

  export async function getBrands() {
    const products = await Product.findAll({
      attributes: ["brand"],
      group: ["brand"]
    });
    return products.map(product => product.brand).filter(Boolean);
  }
  router.get("/brands", async (req, res) => {
    const brands = await getBrands();
    res.json(brands);
  });
}

export default ApiController;