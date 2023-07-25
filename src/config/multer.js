import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  folder: "gp_motos",
  allowedFormats: ["jpg", "png", "jpeg", "webp"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

export const productsImageUpload = multer({ storage: storage });
