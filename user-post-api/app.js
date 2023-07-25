const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Lấy về dữ liệu của một user
app.get("/api/v1/users/:id", (req, res) => {
  const userId = req.params.id;
  const dataUser = JSON.parse(
    fs.readFileSync("./resources/users.json", "utf-8")
  );

  const user = dataUser.find((user) => user.id == userId);
  //   console.log(user);
  if (!user) {
    return res.send("không tìm thấy ID");
  } else {
    res.send(user);
  }
});

// Lấy về dữ liệu của toàn bộ users
app.get("/api/v1/users", (req, res) => {
  const dataUser = JSON.parse(
    fs.readFileSync("./resources/users.json", "utf-8")
  );
  res.send(dataUser);
});

// Thêm mới dữ liệu về 1 users vào trong CSDL
app.post("/api/v1/users", (req, res) => {
  let { name, username, email, address, phone, website, company } = req.body;
  let newUser = {
    id: Math.floor(Math.random() * 1000000),
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  };
  const dataUser = JSON.parse(
    fs.readFileSync("./resources/users.json", "utf-8")
  );
  dataUser.push(newUser);
  //   console.log(dataUser);
  fs.writeFileSync("./resources/users.json", JSON.stringify(dataUser));
  res.send(dataUser);
});

// Chỉnh sửa dữ liệu của 1 user (email)
app.put("/api/v1/users/:id", (req, res) => {
  const id = req.params.id;
  let userId = Number(id);
  let { name, username, email, address, phone, website, company } = req.body;
  let updateUser = {
    id: userId,
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  };
  console.log(updateUser);

  // Đọc dữ liệu người dùng từ file JSON
  const dataUser = JSON.parse(
    fs.readFileSync("./resources/users.json", "utf-8")
  );

  let newUserData = dataUser.map((user) =>
    user.id === userId ? updateUser : user
  );
  fs.writeFileSync("./resources/users.json", JSON.stringify(newUserData));
  res.send(newUserData);
});

app.delete("/api/v1/users/:id", (req, res) => {
  const userId = req.params.id;
  let user = JSON.parse(fs.readFileSync("./resources/users.json"));
  const index = user.findIndex((user) => user.id === +userId);
  user.splice(index, 1);
  fs.writeFileSync("./resources/users.json", JSON.stringify(user));
  res.send(user);
});

// posts-------------------------------------------------

app.get("/api/v1/posts/:id", (req, res) => {
  const userId = req.params.id;
  const dataUser = JSON.parse(
    fs.readFileSync("./resources/posts.json", "utf-8")
  );

  const user = dataUser.find((user) => user.id == userId);
  //   console.log(user);
  if (!user) {
    return res.send("không tìm thấy ID");
  } else {
    res.send(user);
  }
});

app.get("/api/v1/posts", (req, res) => {
    const dataUser = JSON.parse(
        fs.readFileSync("./resources/posts.json", "utf-8")
      );
      res.send(dataUser);
    });


app.post("/api/v1/posts", (req, res) => {

});

app.put("/api/v1/posts/:id", (req, res) => {
  const postId = req.params.id;
  const newData = req.body;
  // Chỉnh sửa dữ liệu của post có postId bằng cách cập nhật các trường mới
  // Sau đó gửi thông tin về post đã chỉnh sửa về client
});

app.delete("/api/v1/posts/:id", (req, res) => {
  const postId = req.params.postId;
  let user = JSON.parse(fs.readFileSync("./resources/posts.json"));
  const index = user.findIndex((user) => user.id === +postId);
  user.splice(index, 1);
  fs.writeFileSync("./resources/posts.json", JSON.stringify(user));
  res.send(user);
});

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
