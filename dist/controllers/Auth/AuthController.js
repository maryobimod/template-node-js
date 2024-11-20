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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const timeHelper_1 = require("../../helper/timeHelper");
// Inisialisasi Prisma Client
const prisma = new client_1.PrismaClient();
// Secret key untuk JWT
const JWT_SECRET = "secret-key";
// Register user baru
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Cek apakah username sudah ada di database
        const existingUser = yield prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Insert user baru ke dalam database
        const newUser = yield prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                created_at: (0, timeHelper_1.getCurrentWIBDate)(),
                updated_at: (0, timeHelper_1.getCurrentWIBDate)(),
            },
        });
        return res
            .status(201)
            .json({ message: "User registered successfully", newUser });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Cari user berdasarkan username
        const user = yield prisma.user.findUnique({
            where: { username },
        });
        // Jika user tidak ditemukan
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // Verifikasi password
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        // Jika password tidak valid
        if (!isValidPassword) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" } // Set token expire time
        );
        res.json({ message: "Login successful", token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error during login" });
    }
});
exports.loginUser = loginUser;
