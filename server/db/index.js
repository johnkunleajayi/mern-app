const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://johnkunleajayi:April19th@cluster0.zzprw.mongodb.net/")
  .then(() => console.log("Connected mongo db"))
  .catch((e) => console.log(e));
