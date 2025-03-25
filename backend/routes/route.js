import express from 'express';
import shortid from 'shortid';
import { URL } from '../models/model.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { url } = req.body;
    try {
        const shortURL = shortid.generate();
        const newURL = await URL.create({
            shortURL,
            longURL: url,
            visitCount: [],
        });
        return res.status(201).json({
            success: true,
            shortURL: newURL.shortURL,
            longURL: url,
        });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: 'Failed to create short URL' });
    }
});

export default router;