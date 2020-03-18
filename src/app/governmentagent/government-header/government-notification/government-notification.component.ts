import { Component, ElementRef, HostListener, Inject,OnInit, ViewEncapsulation } from '@angular/core';
import { GovernmentNotificationModel } from './government-notification.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-government-notification',
  templateUrl: './government-notification.component.html',
  styleUrls: ['./government-notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GovernmentNotificationComponent implements OnInit {
  cssPrefix: string = 'toolbar-notification';
  isOpen: boolean = false;
  notifications: GovernmentNotificationModel[] = [];

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
    private router : Router,
    private _elementRef: ElementRef,
    @Inject('governmentNotificationService') private service
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
  routingPages(notify: any){
    console.log(notify);
    this.toggleDropdown();
    this.router.navigate([notify.url]);
  }
  delete(event, notification) {
    event.stopPropagation();
    this.notifications = this.service.delete(notification);
  }

  ngOnInit() {
  }

}
