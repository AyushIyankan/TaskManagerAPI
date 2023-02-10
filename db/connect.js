const mongoose = require("mongoose");

module.exports = connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Database connected`);
    })
    .catch((err) => {
      console.log(err);
    });
};
