const express = require("express")
const app = express()
const cors = require("cors");
const routerOperator = require("./routes/operator");
const routerTicket = require("./routes/ticket");

app.use(cors());


app.use(express.json({ extended: true }));

app.use("/ticket", routerTicket);
app.use("/operator", routerOperator);



const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => { 
  console.log(`run server in port ${PORT}`); 
});