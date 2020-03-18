// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-notifications',
//   templateUrl: './notifications.component.html',
//   styleUrls: ['./notifications.component.scss']
// })
// export class NotificationsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NotificationService, SocketService } from '../../services/services';
@Component({
  moduleId: module.id,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public message : any;
  displayedColumns: string[] = ['message'];

  constructor(private _notificationService: NotificationService, private socketService : SocketService) {
    //   this._notificationService.requestPermission();
  }
  ngOnInit() {
    this.message = this.socketService.messages;
    console.log(this.message);
  }
  notify() {
      let data: Array < any >= [];
      data.push({
          'title': 'Approval',
          'alertContent': 'This is First Alert -- By Debasis Saha'
      });
      data.push({
        'title': this.message[0].title,
        'alertContent': this.message.message
    });
      // data.push({
      //     'title': 'Request',
      //     'alertContent': 'This is Second Alert -- By Debasis Saha'
      // });
      // data.push({
      //     'title': 'Leave Application',
      //     'alertContent': 'This is Third Alert -- By Debasis Saha'
      // });
      // data.push({
      //     'title': 'Approval',
      //     'alertContent': 'This is Fourth Alert -- By Debasis Saha'
      // });
      // data.push({
      //     'title': 'To Do Task',
      //     'alertContent': 'This is Fifth Alert -- By Debasis Saha'
      // });
    //   this._notificationService.generateNotification(data);
  }
}