import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n MOngoDB connected !! DB HOST:`)
    } catch (error) {
        console.log("Mongodb connection error", error);
        process.exit(1)
    }
}
export default connectDB