import { Request } from "express";
import multer, {
  FileFilterCallback,
} from "multer";
import path from "path";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const extension =
      path.extname(
        file.originalname,
      ).toLowerCase();

    if (
      !ALLOWED_MIME_TYPES.has(file.mimetype) ||
      !ALLOWED_EXTENSIONS.has(extension)
    ) {
      cb(
        new Error(
          "Only JPEG, PNG and WebP images are allowed",
        ),
      );

      return;
    }

    cb(null, true);
  },
});
