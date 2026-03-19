import express from "express"
import dns from "dns";
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/dbConnection.js"
import authRoutes from "./route/authRoute.js";
import todoRoutes from "./route/todoRoute.js"
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

dotenv.config()

const port=process.env.PORT

const app = express()
app.use(cors());

connectDb();

app.use(express.json())
app.use("/api", authRoutes)
app.use("/todo",todoRoutes)

app.use((err, req, res, next) => {
    return res.status(500).json({ err })
})

app.listen(port, () => {
    console.log("The Server is Live at ",port);
})