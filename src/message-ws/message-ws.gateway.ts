import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';


@WebSocketGateway({cors: true})
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messageWsService: MessageWsService,
    private readonly jwtService: JwtService,

  ) {}
  async handleConnection(client: Socket) {
    //console.log('Cliente conectado: ', client.id);  
    
    const token = client.handshake.headers.authorization as string;
    let payload:JwtPayload;

    try {
      payload = this.jwtService.verify(token);  
      await this.messageWsService.registerClient(client,payload.id);
    } catch (error) {
      client.disconnect();
      return;
      
    }
    
    //console.log({payload});
    //console.log('Clientes conectados: ', this.messageWsService.getConnectedClients());
    //console.log({token});
    this.wss.emit('clients-updated', this.messageWsService.getConnectedClients());
  }
  handleDisconnect(client: Socket) {
    //console.log('Cliente desconectado: ', client.id);  
    //throw new Error('Method not implemented.');
    this.messageWsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messageWsService.getConnectedClients());
  }

  //message-from-client
  @SubscribeMessage('message-from-client')  
  onMessage(client: Socket, payload: NewMessageDto): void {
    console.log('Message received: ', payload,'id: ', client.id);
    this.wss.emit('message-from-server', 
    {
      fullName: this.messageWsService.getUserFullName(client.id),
      message:payload.message || 'Empty message!!!'
    });
    //message-from-server
    //* emite solo al cliente que envio el mensaje


    /* client.broadcast.emit('message-from-server', {
      fullName:'soy yo!!!',
      message:payload.message || 'Empty message!!!',
      //from: client.id,
    }); */
  }
}
