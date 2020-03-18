import { Component, OnInit, ElementRef, HostListener , Input} from "@angular/core";
import * as screenfull from 'screenfull';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.scss']
})
export class BuilderHeaderComponent implements OnInit {

  ngOnInit() {
  }
  @Input()
  customizer;
  @Input()
  sidenav;

  isFullscreen: boolean = false;
  showLoading: boolean;

  constructor(private _elementRef: ElementRef,
              private router: Router,
              private authService: AuthenticationService ){
    this.currentUser = this.authService.currentUser;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoading = true;
      } else if (event instanceof NavigationEnd) {
        this.showLoading = false;
      }
    });
  }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  isOpen: boolean = false;
  currentUser = null;

  @HostListener("document:click", ["$event", "$event.target"])
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



 

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
    // this.auth.signOut().then(() => {
    //   this.router.navigate(["/login"]);
    // });
  }
}
