require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const ColumnsRouter = require("./routes/columns.route");
const CardsRouter = require('./routes/cards.route')
const { SECRET_KEY } = process.env;
const user = require("./routes/user");

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));
app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 1000 * 60 * 60 }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use("/api", [user, ColumnsRouter, CardsRouter]);
app.use(express.json());

app.use((req, res, next) => {
res.locals.user = req.session.user;
next();
});

app.listen(PORT, () => {
console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});