import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
// const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_for_ingen';

app.use(cors());
app.use(express.json());

// ─── WAITLIST ─────────────────────────────────────────────────────────────────
app.post('/api/waitlist', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"ingen waitlist" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `🎉 New waitlist signup: ${email}`,
            html: `
                <div style="font-family:monospace;background:#000;color:#fff;padding:32px;border-radius:12px">
                    <h2 style="color:#22d3ee;margin:0 0 16px">New ingen waitlist signup</h2>
                    <p style="font-size:18px;margin:0"><strong>${email}</strong> just joined the waitlist.</p>
                    <p style="color:#666;font-size:12px;margin:16px 0 0">ingen OS · ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
                </div>
            `,
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Waitlist email error:', error);
        res.status(500).json({ error: 'Failed to send. Check GMAIL_USER and GMAIL_APP_PASSWORD in .env.' });
    }
});


// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

/*
// Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || 'STUDENT'
            }
        });

        // Generate token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: 'Failed to create account' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Get Current User
app.get('/api/users/me', authenticateToken, async (req: any, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, email: true, name: true, role: true }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
*/

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});
