import { Component, OnInit, ElementRef, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/auth.service";
import { AuthenticationService } from "../../../auth/authentication.service";
import { SocketService } from "src/app/services/services";

@Component({
  selector: "stbui-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  styleUrls: ["./toolbar-user.component.scss"]
})
export class ToolbarUserComponent implements OnInit {
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

  constructor(
    private _elementRef: ElementRef,
    private router: Router,
    private auth: AuthService,
    private authService: AuthenticationService,
    private socketService: SocketService
  ) {
    this.currentUser = this.auth;
  }

  ngOnInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.socketService.logout_notify();
    this.authService.logout();

    this.router.navigate(["/login"]);
    // this.auth.signOut().then(() => {
    //   this.router.navigate(["/login"]);
    // });
  }
}
