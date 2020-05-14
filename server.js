const express = require("express");
const app = express();
 
const apiRoute = require("./routes/apiRoute");
const htmlRoute= require("./routes/htmlRoute");
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

apiRoute(app);
htmlRoute(app);


app.listen(PORT, ()=>{
    console.log(`App is listening on http://localhost:${PORT}`)
})
