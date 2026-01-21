import express from 'express';
import path from "path"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { connectDB } from './lib/db.js';
import { ENV } from "./env.js"

const app = express();
const __dirname = path.resolve()

const port = ENV.PORT;

app.use(express.json()) // req.body
app.use(cookieParser)

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
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