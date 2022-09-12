import mongoose from "mongoose"


const connectToDatabase = async () => {
    const connection = await mongoose.connect(process.env.DB_URL!)
    console.log('Connected to Mongodb')
    return connection
}

export default connectToDatabase