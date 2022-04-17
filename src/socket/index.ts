import { WebSocketServer } from 'ws';

const ws = new WebSocketServer({ 
  port: 9001,
  maxPayload: 1024 * 1024 * 201
});

import { Message } from '../models';
import fs from 'fs';
import path from 'path';

const clients: Array<Object> = [];

const sendMessage = (body: any, type: string, from: number, to: number) => {
  clients.forEach((cl: any) => {
    if (
      (cl.from === from && cl.to === to) 
      || 
      (cl.from === to && cl.to === from)
    ){
      cl.client.send(JSON.stringify({
        type, from, to, body
      }))
    }
  })
}

ws.on('connection', (socket) => {
  console.log("Connected");

  socket.on('message', (message: any) => {
    const data = JSON.parse(message);
    switch (data.type) {

      case 'sendMessage':
        Message.create({
          from: data.from,
          to: data.to,
          text: data.text
        })
        .then((newMessage: any) => {
          sendMessage(newMessage, 'newMessage', newMessage.from, newMessage.to)
        })
        break;

      case 'sendFile':
        try {
          const fileName = `file_${new Date().getTime()}-${data.file.name}`;
          fs.writeFile(
            path.join(__dirname, '../uploads/', fileName), 
            Buffer.from(data.file.data, 'binary'), 
            (err: any) => {
              if (err) return console.log(err); 
              Message.create({
                from: data.from,
                to: data.to,
                file: JSON.stringify({
                  name: fileName,
                  size: data.file.size,
                  type: data.file.type
                }),
                text: fileName
              }).then((nm: any) => {
                sendMessage(nm, 'newMessage', nm.from, nm.to);                
              })
            }
          )
        }
        catch (err) {console.log(err);}
        break;

      case 'deleteMessage':
        Message.findOne({
          where: { id: data.msgID, from: data.from }
        })
        .then((message: any) => {
          if (message.file) {
            fs.unlinkSync(path.join(__dirname, '../uploads', JSON.parse(message.file).name))
          }
          return message.destroy()
        })
        .then(() => {
          sendMessage({
            msgID: data.msgID,
            msgIndex: data.msgIndex
          }, 'deleteMessage', data.from, data.to)
        })
        .catch(err => {console.log(err)})
        break;

      case 'editMessage':
        Message.findOne({
          where: { id: data.msgID, from: data.from }
        })
        .then((message: any) => {
          message.text = data.text;
          return message.save()
        })
        .then((um: any) => {
          sendMessage({message: um, msgIndex: data.msgIndex}, 'editMessage', um.from, um.to)
        })
        .catch(err => {console.log(err)})
        break;
      
      case 'join':
        clients.push({
          from: data.from,
          to: data.to,
          client: socket
        });
        break;
    }
  })
})