import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes";

const app: Application = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Welcome to the Booking API");
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




