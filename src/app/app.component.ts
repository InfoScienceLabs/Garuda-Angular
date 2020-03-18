import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';
import { SocketService } from './services/socket.service'
import { HttpClient } from "@angular/common/http";
import { Observable, } from 'rxjs';
import { AuthenticationService } from './auth/authentication.service';
import * as io from 'socket.io-client';

const VAPID_PUBLIC = "BCY5rctU3mz2q4T34YPDEVsN1I3H3-odzeuamwK_RCPNL-99zOOCKU8FDDtjyo4bm7NfNNpZck3NoLTShpCVgYM";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {

  public title: string = 'Browser Push Notifications!';
  messageText: string;
    messages: Array<any>;
    socket: SocketIOClient.Socket;

  constructor(private swPush: SwPush, private pushService: NotificationService,  private authService : AuthenticationService,
              private http : HttpClient, private  socketService : SocketService ) {
   
    // if(authService.isLoggedIn){
    //   this.socket = io.connect();
    //   this.messages = new Array();
    //   this.socket.on('message-received', (msg : any) =>{
    //     this.messages.push(msg);
    //   });
    //   this.socket.emit('event1', {
    //     msg : 'client to server'
    //   });
    //   this.socket.on('event2', (data : any) => {
    //     console.log(data.msg);
    //     this.socket.emit('event3', {
    //       msg: 'yes'
    //     })
    //   });
    //   this.socket.on('event4', (data: any) => {
    //     console.log(data.msg);
    // });

    // }
    this.pushService.requestPermission();
    this.socketService.initSocket();

    // console.log(swPush);
    
    // if (swPush.isEnabled) {
    //   console.log('notification');
    //   swPush
    //     .requestSubscription({
    //       serverPublicKey: VAPID_PUBLIC
    //     })
    //     .then(subscription => {
    //       console.log('notification');
    //       pushService.sendSubscriptionToTheServer(subscription).subscribe();
    //     })
    //     .catch(console.error);
    // }
  }
  notify() {

    this.pushService.isSupported();
    let data : Array <any>  = [];
    data.push({

      'title': 'Approval',

      'alertContent': 'This is First Alert -- By Debasis Saha'

      });

    data.push({

        'title': 'Request',

        'alertContent': 'This is Second Alert -- By Debasis Saha'

    });

    data.push({

        'title': 'Leave Application',

        'alertContent': 'This is Third Alert -- By Debasis Saha'

    });

    data.push({

        'title': 'Approval',

        'alertContent': 'This is Fourth Alert -- By Debasis Saha'

    });

    this.pushService.generateNotification(data);
  }

}