import { Component, OnInit, ElementRef, HostListener , Input} from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../../core/auth.service";
import { AuthenticationService } from '../../auth/authentication.service';
import { SocketService } from "src/app/services/services";

@Component({
  selector: 'app-government-header',
  templateUrl: './government-header.component.html',
  styleUrls: ['./government-header.component.scss']
})
export class GovernmentHeaderComponent implements OnInit {

  isOpen: boolean = false;
  public links = new Array<{ url: string, title: string, tooltip: string, icon?: string, badge?: number, class: string }>();

  ngOnInit() {
    this.links.push(
      { url: './marketplace', title: 'Marketplace', tooltip: '', icon: '', class: '' },
      { url: './property/view', title: 'Listings', tooltip: '', icon: '', class: '' },
      { url: './transactions', title: 'Transactions', tooltip: '', icon: '', class: '' },
      { url: './tax', title: 'Taxes', tooltip: '', icon: '', class: '' },
      { url: './propertyconfirm', title: 'Transfers', tooltip: '', icon: '', class: '' }
    )

  }
  showLoading: boolean;
  constructor(
    private _elementRef: ElementRef,
    private router: Router,
    private auth: AuthService,
    private authService: AuthenticationService,
    private socketService: SocketService
  ) {

    this.currentUser = this.authService.currentUser;
  }
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

  profile() {
    this.router.navigate(["/profile"]);
  }
  logout() {
    this.socketService.logout_notify();
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
