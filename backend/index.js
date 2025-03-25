import express from 'express';
import dotenv from 'dotenv';
import urlRoute from './routes/route.js'; // Import the URL route
import { URL, connectDB } from './models/model.js'; // Import the connectDB function

dotenv.config();

if (!process.env.MONGO_URL || !process.env.PORT) {
    console.error('Missing required environment variables.');
    process.exit(1);
}

const app = express();
app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortURL', async (req, res) => {
    const { shortURL } = req.params;
    try {
        const url = await URL.findOneAndUpdate(
            { shortURL },
            { $push: { visitCount: { timestamp: Date.now() } } },
            { new: true }
        );
        if (url) {
            return res.redirect(url.longURL);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error('Error redirecting:', error);
        return res.status(500).json({ error: 'Failed to redirect' });
    }
});

// Error handling middleware should be after all routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});