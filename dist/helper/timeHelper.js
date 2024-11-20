"use strict";
// src/helper/timeHelper.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentWIBFormatted = exports.getCurrentWIBDate = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
/**
 * Mendapatkan waktu sekarang dalam format string di zona waktu WIB
 * @param format Format waktu, default: ISO-8601 ("YYYY-MM-DDTHH:mm:ss.SSSZ")
 * @returns {string} Waktu dalam format string
 */
const getCurrentWIBDate = (format = "YYYY-MM-DDTHH:mm:ss.SSSZ") => {
    return (0, moment_timezone_1.default)().tz("Asia/Jakarta").format(format);
};
exports.getCurrentWIBDate = getCurrentWIBDate;
/**
 * Mendapatkan waktu sekarang dalam format string di zona waktu WIB
 * @param format Format waktu, default: "YYYY-MM-DD HH:mm:ss"
 * @returns {string} Waktu dalam format string
 */
const getCurrentWIBFormatted = (format = "YYYY-MM-DD HH:mm:ss") => {
    return (0, moment_timezone_1.default)().tz("Asia/Jakarta").format(format);
};
exports.getCurrentWIBFormatted = getCurrentWIBFormatted;
