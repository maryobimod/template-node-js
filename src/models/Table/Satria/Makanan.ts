// src/models/Table/Satria/Makanan.ts

import { PrismaClient as SatriaClient } from "../../../../generated/satria-client";

// Inisialisasi Prisma Client
const prisma = new SatriaClient();

// Model Makanan
export const Makanan = {
  // Mendapatkan makanan berdasarkan ID
  findUnique: prisma.makanan.findUnique,

  // Mendapatkan semua makanan
  findMany: prisma.makanan.findMany,

  // Membuat makanan baru
  create: prisma.makanan.create,

  // Memperbarui makanan
  update: prisma.makanan.update,

  // Menghapus makanan
  delete: prisma.makanan.delete,

  // Fungsi lain yang terkait dengan model makanan
  count: prisma.makanan.count,
  findFirst: prisma.makanan.findFirst,
  upsert: prisma.makanan.upsert,
};
