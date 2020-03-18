// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// const SERVER_URL = 'http://localhost:9000/subscription';

// @Injectable()
// export class NotificationService {
//   constructor(private http: HttpClient) {}

//   public sendSubscriptionToTheServer(subscription: PushSubscription) {
//     console.log("Sending request for e=subscription");
//     return this.http.post(SERVER_URL, subscription);
//   }
// }
// }
import { Injectable, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators'
@Injectable()
export class NotificationService {
  public permission: Permission;
  constructor(appRef: ApplicationRef, updates: SwUpdate) {
      this.permission = this.isSupported() ? 'default' : 'denied';
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
  }
  public isSupported(): boolean {
      return 'Notification' in window;
  }
  public requestPermission(): void {
      let self = this;
      if ('Notification' in window) {
          Notification.requestPermission(function(status) {
              console.log(status);
              return self.permission = status;
          });
      }
  }
  public create(title: string, options ? : PushNotification): any {
      let self = this;
      self.permission = 'granted';
      return new Observable(function(obs) {
          if (!('Notification' in window)) {
              console.log('Notifications are not available in this environment');
              obs.complete();
          }
          if (self.permission !== 'granted') {
              console.log("The user hasn't granted you permission to send push notifications");
              obs.complete();
          }
          let _notify = new Notification(title, options);
          _notify.onshow = function(e) {
              return obs.next({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onclick = function(e) {
              return obs.next({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onerror = function(e) {
              return obs.error({
                  notification: _notify,
                  event: e
              });
          };
          _notify.onclose = function() {
              return obs.complete();
          };
      });
  }
  public generateNotification(source: Array < any > ): void {
      let self = this;
      source.forEach((item) => {
          let options = {
              body: item.alertContent,
              icon: "../../assets/images/8.jpg"
          };
          
          let notify = self.create(item.title, options).subscribe();
      })
  }
}
export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
  body ? : string;
  icon ? : string;
  tag ? : string;
  data ? : any;
  renotify ? : boolean;
  silent ? : boolean;
  sound ? : string;
  noscreen ? : boolean;
  sticky ? : boolean;
  dir ? : 'auto' | 'ltr' | 'rtl';
  lang ? : string;
  vibrate ? : number[];
}