const express = require("express");
const formidable = require("express-formidable");
const cors = require('cors');
const app = express();
//const controllers = require("./controllers/controller");
const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(formidable());

app.get("/test", (req,res)=>{
  res.status(200).json("testing done!")
});
// //api to insert doctor availability and doctor_time_slot
// app.post("/add_slot",controllers.create_slot);
// //api to check available slots 
// app.post("/check_slot",controllers.check_slot);
// //This is to insert data in patient table so that we can test
// app.post("/book_slot",controllers.book_slot);

let PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{ console.log(` Seerver started on Port ${PORT}`)});