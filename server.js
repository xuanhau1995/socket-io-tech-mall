/**
 * cài đặt socket.io
 * - npm install socket.io
 * 1. on: nhận
 * 2. emit: gửi đi
 */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// Gọi Socket.io

// 1. on: nhận
// 2. emit: gửi

//  const { Server } = require('socket.io');
//  const io = new Server(server);

//cấu hình angular tới socket io
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

//  app.get('/', (req, res) => {
//    res.sendFile( __dirname + '/client.html' );
//  })

var array = [];

// kiểm tra kết nối
io.on("connection", (socket) => {
  console.log(socket.id + " đã kết nối");
  // thêm vào mảng
  array.push(socket.id);
  // Clent thì chỉ gửi lên server

  // Server khi gửi:

  // 1. Gửi cho chính họ
  //socket.emit('name', data);

  // 2. Gửi qua cho một người khác
  //id người nhận, dữ liệu
  //io.to(id).emit('name', data);

  // 3. Gửi cho những người khác, trừ client gửi
  //socket.broadcast.emit('name', data);

  // 4. Gửi cho tất cả
  //io.sockets.emit('name', data);

  // Gửi tên người đăng nhập qua client
  // socket.emit('name', socket.id);

  // Nhận từ client
  // socket.on('server', (data)=>{

  // Gửi qua client
  //socket.emit('client', data);
  //socket.broadcast.emit('client', data);
  //io.sockets.emit('client', data);

  // data lúc này gồm 2 cái: {text, id}
  // io.to(data.id).emit('client', {text:data.text, id:socket.id});

  // gửi cho chính họ
  // socket.emit('client2', {text:data.text, id:socket.id});
  // })

  // Nhận từ angular
  socket.on("on-chat-tech-mall", (data) => {
    // Gửi qua client
    socket.emit("nodejs", data);
    //socket.broadcast.emit('client', data);
    //io.sockets.emit('client', data);
    console.log({ data });
    // data lúc này gồm 2 cái: {text, id}
    // io.to(data.id).emit('client', {text:data.text, id:socket.id});

    // gửi cho chính họ
    // socket.emit('client2', {text:data.text, id:socket.id});
  });

  // kiểm tra thoát
  socket.on("disconnect", () => {
    // xóa người đã thoát ra khỏi mảng
    // array.splice(array.indexOf(socket.id), 1);

    console.log(socket.id + " đã thoát");
  });

  // gửi danh sách ra client
  io.sockets.emit("list", array);
});

server.listen(3100, () => console.log("listening on *:3100"));
