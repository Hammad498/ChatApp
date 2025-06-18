import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter
});


export const uploadMiddleware = (req, res, next) => {
  upload.single("avatarImage")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

////    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTI1NGY5ZWI4MGVhZTUyMmIwOTkzYiIsImlhdCI6MTc1MDIyNzU3NCwiZXhwIjoxNzUwMjYzNTc0fQ.8uLMcGMh0mtCSw2kGnNs2wu_dfU-_cgYC3Mjf7gmpKU
///             http://localhost:3000/api/auth/setAvatar/685254f9eb80eae522b0993b