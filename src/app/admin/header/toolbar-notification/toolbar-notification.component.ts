import { Component, ElementRef, HostListener, Inject } from '@angular/core';
import { ToolbarNotificationModel } from './toolbar-notification.model';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/services';
@Component({
  selector: 'stbui-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent {
  cssPrefix: string = 'toolbar-notification';
  isOpen: boolean = false;
  notifications: ToolbarNotificationModel[] = [];

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
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
    private router: Router,
    private _elementRef: ElementRef,
    @Inject('toolbarNotificationService') private service
  ) {
    this.select();
  }

  toggleDropdown() {
    if (!this.isOpen) { this.notifications = this.service.select(); }
    this.isOpen = !this.isOpen;
  }
  routingPages(notify: any){
    console.log(notify);
    this.toggleDropdown();
    console.log(notify.url);
    this.router.navigate([notify.url]);
  }

  select() {
    this.notifications = this.service.select();
  }

  delete(event, notification) {
    event.stopPropagation();
    this.notifications = this.service.delete(notification);
  }
}
