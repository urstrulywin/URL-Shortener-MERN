import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import authRoute from './routes/auth.js'; // New auth route
import adminRoute from './routes/admin.js'; // New admin route
import urlRoute from './routes/route.js'; // Import the URL route
import { User, URL, connectDB } from './models/model.js'; // Import the connectDB function

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'], // Add common methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Add headers for auth
}));

const createAdminUser = async () => {
    try {
        const { USERNAME: username, PASSWORD: password } = process.env;
        console.log('Environment Variables:', {
            USERNAME: process.env.USERNAME,
            PASSWORD: process.env.PASSWORD
        });

        const hashedPassword = await bcrypt.hash(password, 10); 
        await User.create({
            username, // ES6 shorthand for `username: username`
            password: hashedPassword,
            role: 'admin',
        });
        console.log('Admin user created');

    } catch (error) {
      console.error('Error creating admin user:', error);
    }
};

app.use('/url', urlRoute);
app.use('/auth', authRoute); // Add auth routes
app.use('/admin', adminRoute); // Add admin routes

app.get('/:shortURL', async (req, res) => {
    const { shortURL } = req.params;
    if (!shortURL || typeof shortURL !== 'string') {
        return res.status(400).json({ error: 'Invalid short URL' });
    }
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

connectDB().then(async () => {
    // await createAdminUser();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});