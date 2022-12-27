const express = require("express");
const app = express();
const {
  getUser,
  postUser,
  bookAppointment,
  validateUser,
} = require("./services");
require("dotenv").config();
require("./dbconfig").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", (req, res) => {
  if (req.cookies.jwt) {
    res.clearCookie("jwt");
  }
  res.sendFile(`${__dirname}//public//Homepage.html`);
});
app.get("/Signup", (req, res) => {
  res.sendFile(`${__dirname}//public//Sginup.html`);
});
app.get("/Dashboard", (req, res) => {
  res.sendFile(`${__dirname}//public//Dashboard.html`);
});

app.get("/profile", (req, res) => {
  res.sendFile(`${__dirname}//public//Profile.html`);
});

app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}//public//UserLogin.html`);
});
app.get("/bookappoientment", (req, res) => {
  res.sendFile(`${__dirname}//public//Bookingpage.html`);
});

app.post("/login", async (req, res) => {
  if (await validateUser(req.body.email, req.body.password)) {
    const token = jwt.sign({ email: req.body.email }, "siva");
    res.cookie("jwt", token);
    res.json({ msg: "login" });
  } else {
    res.status(400).json({ msg: "invalid credentials" });
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { fname, lname, email, password, phone, age } = req.body;
 
  if (await getUser(email)) {
    res.status(400).json({ msg: "User already exists" });
  } else {
    const name = fname + " " + lname;
    await postUser({ email, password, name, phone, age });
    const token = jwt.sign({ email: req.body.email }, "siva");
    res.cookie("jwt", token);
    res.json({ msg: "successful" });
  }

});

app.use((req, res, next) => {
  if (req.cookies.jwt) {
    const decode = jwt.verify(req.cookies.jwt, "siva");
    req.email = decode.email;
    next();
  } else {
    res.status(400).json({ msg: "not autorized" });
  }
});

app.post("/book", async (req, res) => {
  await bookAppointment(req.email, req.body);
  res.json({ msg: "appointment booked" });
});

app.get("/api/dashboard", async (req, res) => {
  res.json(await getUser(req.email));
});

app.get("/api/profile", async (req, res) => {
  res.json(await getUser(req.email));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("server started");
});
