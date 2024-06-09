import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../models/Meeting';

@Component({
  selector: 'app-meeting-status',
  templateUrl: './meeting-status.component.html',
  styleUrls: ['./meeting-status.component.css']
})
export class MeetingStatusComponent implements OnInit {
  meetings: Meeting[] = [];
  roomMeetings: any[] = [];
  selectedRoom: string = '';
  rooms: string[] = ['Meeting Room #1', 'Meeting Room #2', 'Meeting Room #3', 'Meeting Room #4', 'Meeting Room #5', 'Meeting Room #6', 'Meeting Room #7', 'Meeting Room #8', 'Meeting Room #9', 'Meeting Room #10'];

  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
    this.meetings = this.meetingService.getMeetings();
    this.selectedRoom = this.rooms[0];
    this.meetingService.meetings$.subscribe(() => {
      this.onRoomChange();
    });
    // this.onRoomChange();
  }

  onRoomChange() {
    this.meetingService.getMeetingsByRoom(this.selectedRoom).subscribe((data: any) => {
      this.roomMeetings = data;
    });
    console.log(this.roomMeetings);
  }

  deleteMeeting(i: any) {
    this.meetingService.deleteMeeting(i);
    this.meetings = this.meetingService.getMeetings();
    this.onRoomChange();
  }
}
