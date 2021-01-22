import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}` .cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}` .red.underline.bold);
    // passing one means exit with failure
    process.exit(1); //the 1 means exit with failure
  }
}

export default connectDB;