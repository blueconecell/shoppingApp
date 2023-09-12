const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// 가상 사용자 데이터베이스
const users = [
  { username: "u1", password: "p1" },
  { username: "user2", password: "password2" },
  // 사용자 정보를 필요에 따라 추가
];

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 미들웨어 함수: 로그인 여부 확인
function requireLogin(req, res, next) {
  if (req.session.loggedIn) {
    next(); // 다음 미들웨어 실행
  } else {
    res.redirect("/login"); // 로그인 페이지로 리디렉션
  }
}

// 홈 페이지
app.get("/", requireLogin, (req, res) => {
  console.log(req.session);
  res.render("pages/home", { user: req.session.user });
});

// 로그인 처리 및 홈 페이지로 리디렉션
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 사용자 인증 로직
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    // 인증 성공: 세션 설정
    req.session.loggedIn = true;
    req.session.user = username;
  }

  // 홈 페이지로 리디렉션
  res.redirect("/");
});

// 로그아웃 및 로그인 페이지로 리디렉션
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// 로그인 페이지
app.get("/login", (req, res) => {
  res.render("pages/home", { user: null, loginForm: true }); // 로그인 폼 표시
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
