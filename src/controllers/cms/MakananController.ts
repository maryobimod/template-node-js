// src/controllers/cms/MakananController.ts
import { Request, Response } from "express";
import { Makanan } from "../../models/Table/Satria/Makanan";
import { getCurrentWIBDate } from "../../helpers/timeHelper";

// View all makanan
export const getAllMakanan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      sort = "nama",
      order = "asc",
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;
    const validSortFields = ["nama", "deskripsi", "harga", "stok"];
    const sortField = validSortFields.includes(sort as string)
      ? (sort as string)
      : "nama";
    const sortOrder = order === "desc" ? "desc" : "asc";

    const makananData = await Makanan.findMany({
      where: {
        OR: [
          { nama: { contains: search as string } },
          { deskripsi: { contains: search as string } },
        ],
      },
      orderBy: {
        [sortField]: sortOrder,
      },
      skip,
      take: pageSize,
    });

    const totalItems = await Makanan.count({
      where: {
        OR: [
          { nama: { contains: search as string } },
          { deskripsi: { contains: search as string } },
        ],
      },
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data makanan",
      data: {
        data: makananData,
        totalPages,
        currentPage: pageNumber,
        totalItems,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error mengambil data makanan" });
  }
};

// View makanan by ID
export const getMakananById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const makanan = await Makanan.findUnique({
      where: { id: Number(id) },
    });
    if (!makanan) {
      res
        .status(404)
        .json({ success: false, message: "Makanan tidak ditemukan" });
    } else {
      res.status(200).json({
        success: true,
        message: "Berhasil mengambil data makanan",
        data: { makanan },
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error mengambil data makanan" });
  }
};

// Create makanan
export const createMakanan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nama, deskripsi, harga, stok } = req.body;
  try {
    const newMakanan = await Makanan.create({
      data: {
        nama,
        deskripsi,
        harga,
        stok,
        created_at: getCurrentWIBDate(),
        updated_at: getCurrentWIBDate(),
      },
    });
    res.status(201).json({
      success: true,
      message: "Makanan berhasil ditambahkan",
      data: { newMakanan },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error menambahkan data makanan" });
  }
};

// Update makanan
export const updateMakanan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { nama, deskripsi, harga, stok } = req.body;
  try {
    const updatedMakanan = await Makanan.update({
      where: { id: Number(id) },
      data: {
        nama,
        deskripsi,
        harga,
        stok,
        updated_at: getCurrentWIBDate(),
      },
    });
    res.status(201).json({
      success: true,
      message: "Makanan berhasil diupdate",
      data: { updatedMakanan },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error mengupdate data makanan" });
  }
};

// Delete makanan
export const deleteMakanan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedMakanan = await Makanan.delete({
      where: { id: Number(id) },
    });
    if (!deletedMakanan) {
      res
        .status(404)
        .json({ success: false, message: "Makanan tidak ditemukan" });
    } else {
      res.status(201).json({
        success: true,
        message: "Makanan berhasil dihapus",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error menghapus data makanan" });
  }
};
