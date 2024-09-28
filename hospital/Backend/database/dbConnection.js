import mongoose from "mongoose";

export const dbConnection = () => {
  console.log("MONGO_URI: ", process.env.MONGO_URI); 

  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "EvolveTech_Hospital_Management_System",
    })
    .then(() => {
      console.log("EvolveTech Database Connected!");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to the database:, ${err}`);
    });
};