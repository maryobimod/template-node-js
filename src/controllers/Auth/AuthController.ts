// src/controllers/Auth/AuthController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/Table/Satria/User";
import bcrypt from "bcryptjs";
import { getCurrentWIBDate } from "../../helpers/timeHelper";
import dotenv from "dotenv";

// Muat file .env
dotenv.config();

// Secret key untuk JWT
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

// Register user baru
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Cek apakah username sudah ada di database
    const existingUser = await User.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru ke dalam database
    const newUser = await User.create({
      data: {
        username,
        password: hashedPassword,
        created_at: getCurrentWIBDate(),
        updated_at: getCurrentWIBDate(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { newUser },
    });
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username
    const user = await User.findUnique({
      where: { username },
    });

    // Jika user tidak ditemukan
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Jika password tidak valid
    if (!isValidPassword) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" } // Set token expire time
    );

    res
      .status(200)
      .json({ success: true, message: "Login successful", data: { token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error during login" });
  }
};
