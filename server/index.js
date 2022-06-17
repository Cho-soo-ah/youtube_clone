const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const mongoose = require("mongoose");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connectied"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

// 회원가입
app.post("/api/users/register", (req, res) => {
  // 회원가입할 떄 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// 로그인
app.post("/api/users/login", (req, res) => {
  // 1. 요청된 이메일이 DB에 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일이 존재하지 않습니다.",
      });
    }

    // 2. 요청된 이메일이 DB에 있다면 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log("err", err);

      console.log("isMatch", isMatch);

      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });

      // 3. 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장 (쿠키, 세션, 로컬스토리지 등)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// 토큰 인증
app.get("/api/users/auth", auth, (req, res) => {
  // auth 미들웨어 통과 후
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 로그아웃
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
