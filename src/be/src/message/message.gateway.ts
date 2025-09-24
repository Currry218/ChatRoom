// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   MessageBody,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { MessageService } from './message.service';

// @WebSocketGateway({ cors: true }) // enable CORS for testing
// export class MessagesGateway {
//   @WebSocketServer()
//   server: Server;

//   constructor(private readonly messagesService: MessageService) {}

//   @SubscribeMessage('sendMessage')
//   async handleMessage(@MessageBody() payload: { user: string; text: string }) {
//     const savedMsg = await this.messagesService.create(
//       payload.user,
//       payload.text,
//     );
//     this.server.emit('newMessage', savedMsg); // broadcast to all clients
//   }
// }
