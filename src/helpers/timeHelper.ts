// src/helpers/timeHelper.ts

import moment from "moment-timezone";

/**
 * Mendapatkan waktu sekarang dalam format string di zona waktu WIB
 * @param format Format waktu, default: ISO-8601 ("YYYY-MM-DDTHH:mm:ss.SSSZ")
 * @returns {string} Waktu dalam format string
 */
export const getCurrentWIBDate = (
  format = "YYYY-MM-DDTHH:mm:ss.SSSZ"
): string => {
  return moment().tz("Asia/Jakarta").format(format);
};

/**
 * Mendapatkan waktu sekarang dalam format string di zona waktu WIB
 * @param format Format waktu, default: "YYYY-MM-DD HH:mm:ss"
 * @returns {string} Waktu dalam format string
 */
export const getCurrentWIBFormatted = (
  format = "YYYY-MM-DD HH:mm:ss"
): string => {
  return moment().tz("Asia/Jakarta").format(format);
};
