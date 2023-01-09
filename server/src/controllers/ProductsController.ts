import { json, Router } from "express";
import { IProduct, Product, Record } from "../sql";

namespace ProductsController {
  export const router = Router();
  
  export async function getProducts(opts?: {
    records?: boolean
  }) {
    opts ??= {};
    if (opts.records) {
      const products = await Product.findAll({
      include: [
          {
            model: Record,
            as: "records",
            all: true
          }
        ]
      });
      
      return products;
    }
    const products = await Product.findAll();
    return products;
  }
  router.get("/", async (req, res) => {
    const records = req.query.records === "true";
    const products = await getProducts({
      records
    });
    res.json(products);
  });

  export async function getProduct(barcode: string) {
    const product = await Product.findByPk(barcode);
    return product;
  }
  router.get("/:barcode", async (req, res) => {
    const barcode = req.params.barcode;
    const product = await getProduct(barcode);
    if (product) {
      res.json(product);
    }
    else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  export async function createProduct(data: Partial<IProduct> & Pick<IProduct, "barcode">) {
    const product = await Product.create(data);
    return product;
  }
  router.post("/", json(), async (req, res) => {
    const product = await createProduct(req.body);
    res.json(product);
  });

  export async function syncProduct(data: Partial<IProduct>) {
    let product = await Product.findByPk(data.barcode);
    if (product) {
      product = await product.update(data);
    } else {
      product = await Product.create(data);
    }
    return product;
  }
  router.put("/", json(), async (req, res) => {
    // const barcode = req.params.barcode;
    const product = await syncProduct(req.body);
    res.json(product);
  });

  export async function deleteProduct(barcode: string) {
    const product = await Product.findByPk(barcode);
    if (product) {
      await product.destroy();
    }
  }
  router.delete("/:barcode", async (req, res) => {
    const barcode = req.params.barcode;
    await deleteProduct(barcode);
    res.json({ message: "Product deleted" });
  });
}

export default ProductsController;