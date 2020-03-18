import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { UserNotificationModel } from './user-notification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit {
  cssPrefix: string = 'toolbar-notification';
  isOpen: boolean = false;
  notifications: UserNotificationModel[] = [];

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    // this.notifications.length = 0;
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(
      targetElement
    );
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
  constructor(
    private _elementRef: ElementRef,
    private router : Router,
    @Inject('userNotificationService') private service
  ) {
    this.select();
  }
  toggleDropdown() {
    if (!this.isOpen) { this.notifications = this.service.select(); }
    this.isOpen = !this.isOpen;
  }

  select() {
    this.notifications = this.service.select();
  }

  delete(event, notification) {
    event.stopPropagation();
    this.notifications = this.service.delete(notification);
  }
  routingPages(notify: any){
    console.log(notify);
    this.toggleDropdown();
    this.router.navigate([notify.url]);
  }

  ngOnInit() {
  }

}
