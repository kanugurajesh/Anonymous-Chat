import mongoose from "mongoose";

export async function connect() {
    // using try and catch to handle the mongodb connection
    try {
        
        // connecting to monogdb database using the environment variable
        mongoose.connect(process.env.MONGO_URI!)
        // storing the state of the connection in a connection variable to perform some operations on it
        const connection = mongoose.connection;

        // when the connection is successfull the following operation is performed
        connection.on('connected',() => {
            console.log("MongoDB connected successfully")
        })

        // when the connection is not successfull the following operation is performed
        connection.on('error',(error) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. "+ error)
        })

    } catch (error) {
        console.log("The connection was not successfull "+ error)
    }
}