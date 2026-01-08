import express from 'express';
import dotenv from "dotenv";
import path from "path"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const __dirname = path.resolve()

const port = process.env.PORT || 4000;

app.use(express.json()) // req.body

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
    // static assets - react app
    app.use(
        express.static(
            path.join(
                __dirname, "../frontend/dist"
            )
        )
    )

    // anything other than api endpoints will serve as index.html
    app.get(
        /(.*)/, (req, res) => {
            res.sendFile(
                path.join(
                    __dirname, "../frontend", "dist", "index.html"
                )
            )
        }
    )
}

app.listen(port, () => {
    console.log("Server running on port " + port)
    connectDB()
})