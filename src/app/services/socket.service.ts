import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io-client';
import { URI } from '../../config/url';
const SOCKET_URL = 'http://158.69.118.172:9000';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})

// export class SocketService {
//   private socket;

//   constructor() { }

//   public initSocket() {
//     this.socket = socketIO(SOCKET_URL);
//     console.log(this.socket);
//   }
// }

export class SocketService {
  socket: SocketIOClient.Socket;
  messageText: string;
  messages: Array<any>;
  constructor(private authService: AuthenticationService) { }

  public initSocket() {
   

      this.socket = socketIO(SOCKET_URL);

      console.log('socket', this.socket);
      if (this.socket.disconnected === true) {
        console.log('check your internet connection');
        // return;
      }
      console.log(this.authService.currentUser);
      this.messages = new Array();
      this.socket.emit('login', this.authService.currentUser);
      this.socket.on('show_notification', (msg: any) => {
        this.messages = msg;
      });
      this.socket.on('new_notification', (msg: any) => {
        console.log('BL 01');
        this.messages.push(msg);
        console.log(this.messages);
      });
      console.log(this.messages);
    }
  
  public logout_notify() {
    if(this.socket){
    this.socket.emit('logout', {
      msg: this.authService.currentUser
    });
   
   delete this.socket;
  }
  }
}
