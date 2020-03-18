import { Injectable } from '@angular/core';
import { GovernmentNotificationModel } from './government-notification.model';
import { SocketService, NotificationService } from '../../../services/services';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Injectable()
export class GovernmentNotificationService {
  private notifications: GovernmentNotificationModel[];

  constructor(private _notificationService: NotificationService,
    private socketService : SocketService, private authService: AuthenticationService) {
    this.notifications = this.socketService.messages;
  }

  select(): GovernmentNotificationModel[] {
    this.notifications = this.socketService.messages;
    let data = {
      id: this.authService.currentUser.id
    };
    this.socketService.socket.emit("on_notification", data);
    return this.notifications;
  }

  delete(notification): GovernmentNotificationModel[] {
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
