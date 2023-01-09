import { json, Router } from "express";
import { Record } from "../sql";

namespace RecordsController {
  export const router = Router();
  
  export async function addRecord(barcode: string) {
    return Record.create({
      barcode,
      userId: 1
    });
  }
  router.post("/:barcode", async (req, res) => {
    const barcode = req.params.barcode;
    const record = await addRecord(barcode);
    res.json(record);
  });
}

export default RecordsController;