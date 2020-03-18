import { Injectable } from '@angular/core';
import { ToolbarNotificationModel } from './toolbar-notification.model';
import { NotificationService, SocketService } from '../../../services/services';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Injectable()
export class ToolbarNotificationService {
  private notifications: ToolbarNotificationModel[];

  constructor(private socketService : SocketService, private authService : AuthenticationService) {
    this.notifications = this.socketService.messages;
  }

  select(): ToolbarNotificationModel[] {
    this.notifications = this.socketService.messages;
    let data = {
      id: this.authService.currentUser.id
    };
    if(this.socketService && this.socketService.socket){
      this.socketService.socket.emit("on_notification", data);
      return this.notifications;
    }
  }

  delete(notification): ToolbarNotificationModel[] {
    let data = {
      id: this.authService.currentUser.id,
      notification: notification
    };
    this.socketService.socket.emit("read_notification", data);
    const i = this.notifications.indexOf(notification);
    this.notifications = [
      ...this.notifications.slice(0, i),
      ...this.notifications.slice(i + 1)
    ];

    return this.notifications;
  }
}
