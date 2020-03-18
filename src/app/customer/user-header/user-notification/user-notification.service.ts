import { Injectable } from '@angular/core';
import { UserNotificationModel } from './user-notification.model';
import { NotificationService, SocketService } from '../../../services/services';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Injectable()
export class UserNotificationService {
  private notifications: UserNotificationModel[];

  constructor(private _notificationService: NotificationService,
    private socketService : SocketService, private authService: AuthenticationService) {
    this.notifications = this.socketService.messages;
  }

  select(): UserNotificationModel[] {
    this.notifications = this.socketService.messages;
    let data = {
      id: this.authService.currentUser.id
    };
    if(this.socketService && this.socketService.socket){
      this.socketService.socket.emit("on_notification", data);
      return this.notifications;
    }
  }

  delete(notification): UserNotificationModel[] {
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
