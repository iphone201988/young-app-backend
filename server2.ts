import app from "./app";
import { connectToDB } from "./src/utils/helper";

connectToDB()
  .then(() => {
    console.log("Connected to DB successfully", process.env.MONGO_URI);
    app.listen(4000, () => {
      console.log(`Server is running on port: 4000`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });
