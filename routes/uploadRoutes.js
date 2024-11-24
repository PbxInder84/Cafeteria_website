import path from 'path';
import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary'; // cloudinary SDK v2


// Initialize Cloudinary with your credentials
cloudinaryV2.config({
  cloud_name: 'dhqhcdh62',  // Replace with your Cloudinary Cloud name
  api_key: '954456448172384',       // Replace with your Cloudinary API key
  api_secret: 'UF98IoSh7bMtiuUCsHamxSsoHzg', // Replace with your Cloudinary API secret
});

const router = express.Router();

// Configure multer to store images in memory (upload directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Filter out files that are not images (jpeg, jpg, png)
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Only image files are allowed!');
    }
  },
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Return just the URL of the image to the client
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error during file upload', error });
  }
});


export default router;
