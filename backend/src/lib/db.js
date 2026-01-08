import mongoose, { connect } from "mongoose"

export const connectDB = async () => {
    try{
        const { MONGO_URI } = process.env

        if(!MONGO_URI) throw new Error("MONGODB Connection URL is missing")

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully: " + conn.connection.host)
    }catch(error){
        console.error("Error connection to MongoDB: " + error)
        process.exit(1)
    }
}