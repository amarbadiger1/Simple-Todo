import mongoose from "mongoose";

function connectDb() {
    const URI = process.env.MONGO_URI
    
    mongoose.connect(URI).then(() => {
        console.log('DB connected Successfully');
    }).catch((err) => {
        console.log(err, "this is Connection error");
        process.exit(1)
    })
}

export default connectDb;