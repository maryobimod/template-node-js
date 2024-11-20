// src/routes/api.ts
import express, { Request, Response } from "express";
import * as MakananController from "../controllers/cms/MakananController";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

// Jika ingin menggunakan middleware untuk semua routes
// router.use(authenticateJWT);

router.get("/makanan", authenticateJWT, async (req: Request, res: Response) => {
  await MakananController.getAllMakanan(req, res);
});

router.get(
  "/makanan/:id",
  authenticateJWT,
  async (req: Request, res: Response) => {
    await MakananController.getMakananById(req, res);
  }
);

router.post(
  "/makanan",
  authenticateJWT,
  async (req: Request, res: Response) => {
    await MakananController.createMakanan(req, res);
  }
);

router.put(
  "/makanan/:id",
  authenticateJWT,
  async (req: Request, res: Response) => {
    await MakananController.updateMakanan(req, res);
  }
);

router.delete(
  "/makanan/:id",
  authenticateJWT,
  async (req: Request, res: Response) => {
    await MakananController.deleteMakanan(req, res);
  }
);

export default router;
