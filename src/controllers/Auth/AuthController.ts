// src/controllers/Auth/AuthController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getCurrentWIBDate } from "../../helper/timeHelper";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Secret key untuk JWT
const JWT_SECRET = "secret-key";

// Register user baru
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Cek apakah username sudah ada di database
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru ke dalam database
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        created_at: getCurrentWIBDate(),
        updated_at: getCurrentWIBDate(),
      },
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Jika user tidak ditemukan
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Jika password tidak valid
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" } // Set token expire time
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error during login" });
  }
};
