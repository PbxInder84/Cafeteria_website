import cloudinary from '../config/cloudinaryConfig.js'; // Import Cloudinary configuration
import multer from 'multer';
import path from 'path';

// Set up multer storage for handling incoming files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary local storage (to be deleted after upload)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// Set up file filter to accept only image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({ storage, fileFilter }).single('image'); // 'image' is the field name

// Middleware to upload the image to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  if (req.file) {
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'product_images', // Store the image in a specific folder
      });

      // Attach the URL to the request
      req.fileUrl = result.secure_url;

      // Remove the local file after uploading it to Cloudinary
      fs.unlinkSync(req.file.path);

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      res.status(500).json({ message: 'Image upload failed', error: err.message });
    }
  } else {
    res.status(400).json({ message: 'No image uploaded' });
  }
};

export { upload, uploadToCloudinary };
