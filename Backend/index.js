import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const httpServer=http.createServer();


const app = express();

app.use(cors());
app.use(express.json());




const server=app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const io=new Server(server,{
    cors:{
        origin:'*',
        credentials:true
    }
})

//add users...
global.onlineUsers=new Map();


//socket connection
io.on("connection",(socket)=>{
  console.log(`socket is connected:${socket.id}`);
  global.chatSocket=socket;


//add-user
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id);
  })

//msg-send
  socket.on("send-msg",(data)=>{
    const sendUnderSocket=onlineUsers.get(data.to);
    if(sendUnderSocket){
      socket.to(sendUnderSocket).emit("msg-receive",data.message)
    }
  })
//send-notification
  socket.on("send-notification",(data)=>{
    const sendUnderSocket=onlineUsers.get(data.to);
    if(sendUnderSocket){
      socket.to(sendUnderSocket).emit("notification-receive",data.message)
    }
  })
})



