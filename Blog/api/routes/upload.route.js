import express from 'express';
import multer from 'multer';
import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Initialize firebase-admin
import serviceAccount from '../config/serviceAccountKey.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'blog-6b302.appspot.com'
});

const bucket = getStorage().bucket();

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const blob = bucket.file(Date.now() + '-' + req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    blobStream.on('error', (err) => res.status(500).send(err));
    blobStream.on('finish', async () => {
      // Make file publicly readable
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to upload');
  }
});

export default router;