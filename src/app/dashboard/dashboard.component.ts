import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MeetingService } from '../meeting.service';

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = 'Infrd Test';

  constructor(
    private authService: AuthService,
    private router: Router,
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
  }

  onBookMeeting() {
    const bookingModal: any = document.getElementById('bookingModal');
    const modal = new bootstrap.Modal(bookingModal);
    modal.show();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
