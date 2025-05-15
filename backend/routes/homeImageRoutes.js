import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const imageDir = path.join('images', 'home-image');
const imageFilename = 'homeImage.png';

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, imageDir);
    },
    filename(req, file, cb) {
        cb(null, imageFilename);
    },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    res.status(200).send();
});

router.get('/', (req, res) => {
    const filePath = path.join(imageDir, imageFilename);

    if (fs.existsSync(filePath)) {
        return res.status(200).json([`/home-images/${imageFilename}`]);
    }

    res.status(200).json([]);
});

router.delete('/', (req, res) => {
    const filePath = path.join(imageDir, imageFilename);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    res.status(200).send();
});

export default router;