const multer = require("multer");
const path = require("path");
const fs = require("fs");

// multer's diskStorage does NOT create missing directories itself — if
// uploads/reviews/ doesn't exist (e.g. fresh clone, since empty dirs
// aren't tracked by git), every upload silently fails with ENOENT.
// Ensure it exists once, at module load time.
const REVIEWS_UPLOAD_DIR = path.join(__dirname, "../../uploads/reviews");
fs.mkdirSync(REVIEWS_UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, REVIEWS_UPLOAD_DIR);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    const err = new Error("Only image files are allowed");
    err.status = 400;
    cb(err, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
  },
});

module.exports = upload;