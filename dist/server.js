"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = __importDefault(require("./routes/api"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Tambahkan route auth kalau pengen login
app.use("/auth", auth_1.default);
// Gunakan routing API kalau ingin manggil api
app.use("/api", api_1.default);
// Kalo halaman gak ditemuin
app.get("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Halaman tidak ditemukan. Silakan periksa URL Anda.",
    });
});
// Menangani uncaughtException
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
// Menangani unhandledRejection
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});
// Start server di port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
