import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 5000;

// connect to db
connectToDB();

///============= connect to db Fn ==============
async function connectToDB() {
  try {
    // ============== connnecting to db ==============
    await mongoose.connect(
      "mongodb+srv://tausif:PV8j2miiqnBvwIvu@cluster0.etgpuim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to db");

    // ============== starting the server ==============
    app.listen(port, () => {
      console.log("server is running");
    });
  } catch (err) {
    console.log("error connecting to db");
    console.log(err);
  }
}
