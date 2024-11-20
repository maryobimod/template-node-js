"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMakanan = exports.updateMakanan = exports.createMakanan = exports.getMakananById = exports.getAllMakanan = void 0;
const client_1 = require("@prisma/client");
const timeHelper_1 = require("../../helper/timeHelper");
const prisma = new client_1.PrismaClient();
// View all makanan
const getAllMakanan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const makanan = yield prisma.makanan.findMany();
        res.json(makanan);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getAllMakanan = getAllMakanan;
// View makanan by ID
const getMakananById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const makanan = yield prisma.makanan.findUnique({
            where: { id: Number(id) },
        });
        if (!makanan) {
            res.status(404).json({ error: "Makanan tidak ditemukan" });
        }
        else {
            res.json(makanan);
        }
    }
    catch (err) {
        res.status(500).json({ error: "Error mengambil data makanan" });
    }
});
exports.getMakananById = getMakananById;
// Create makanan
const createMakanan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nama, deskripsi, harga, stok } = req.body;
    try {
        const newMakanan = yield prisma.makanan.create({
            data: {
                nama,
                deskripsi,
                harga,
                stok,
                created_at: (0, timeHelper_1.getCurrentWIBDate)(),
                updated_at: (0, timeHelper_1.getCurrentWIBDate)(),
            },
        });
        res
            .status(201)
            .json({ message: "Makanan berhasil ditambahkan", data: newMakanan });
    }
    catch (err) {
        res.status(500).json({ error: "Error menambahkan data makanan" });
    }
});
exports.createMakanan = createMakanan;
// Update makanan
const updateMakanan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nama, deskripsi, harga, stok } = req.body;
    try {
        const updatedMakanan = yield prisma.makanan.update({
            where: { id: Number(id) },
            data: {
                nama,
                deskripsi,
                harga,
                stok,
                updated_at: (0, timeHelper_1.getCurrentWIBDate)(),
            },
        });
        res.json({ message: "Makanan berhasil diupdate", data: updatedMakanan });
    }
    catch (err) {
        res.status(500).json({ error: "Error mengupdate data makanan" });
    }
});
exports.updateMakanan = updateMakanan;
// Delete makanan
const deleteMakanan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedMakanan = yield prisma.makanan.delete({
            where: { id: Number(id) },
        });
        if (!deletedMakanan) {
            res.status(404).json({ error: "Makanan tidak ditemukan" });
        }
        else {
            res.json({ message: "Makanan berhasil dihapus" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Error menghapus data makanan" });
    }
});
exports.deleteMakanan = deleteMakanan;
