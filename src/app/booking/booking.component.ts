import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MeetingService } from '../meeting.service';
import { RoomService } from '../room.service';
import { Room } from '../models/Room';
import { Meeting } from '../models/Meeting';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  username: any = localStorage.getItem('userName');
  date: string = '';
  fromTime: string = '';
  toTime: string = '';
  room: string = '';
  agenda: string = '';
  rooms: Room[] = [];
  showOtherOptions = false;

  constructor(
    private meetingService: MeetingService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const meeting = new Meeting(
        this.meetingService.getNextId(), // Assuming a method to get the next ID
        this.username,
        form.value.room,
        form.value.date,
        form.value.fromTime,
        form.value.toTime,
        form.value.agenda
      );
      this.meetingService.bookMeeting(meeting);
      form.reset();
      this.username = localStorage.getItem('userName');
      this.showOtherOptions = false;
    }
  }

  valueSelected() {
    this.showOtherOptions = !this.showOtherOptions;
  }

  isValidTime(fromTime: string, toTime: string): boolean {
    const startTime = '9:00 am';
    const endTime = '6:00 pm';
    const fromTimeParts = fromTime.split(' ');
    const toTimeParts = toTime.split(' ');
    let fromTimeHours = parseInt(fromTimeParts[0].split(':')[0], 10);
    const fromTimeMinutes = parseInt(fromTimeParts[0].split(':')[1], 10);
    const fromTimePeriod = fromTimeParts[1];
    let toTimeHours = parseInt(toTimeParts[0].split(':')[0], 10);
    const toTimeMinutes = parseInt(toTimeParts[0].split(':')[1], 10);
    const toTimePeriod = toTimeParts[1];

    // Convert 12-hour clock to 24-hour clock
    if (fromTimePeriod === 'pm' && fromTimeHours !== 12) {
      fromTimeHours += 12;
    }
    if (toTimePeriod === 'pm' && toTimeHours !== 12) {
      toTimeHours += 12;
    }

    // Check if from time is between 9:00 am and 6:00 pm
    if (fromTimeHours < 9 || fromTimeHours > 18) {
      return false;
    }

    // Check if to time is between 9:00 am and 6:00 pm
    if (toTimeHours < 9 || toTimeHours > 18) {
      return false;
    }

    // Check if the difference between from time and to time is at least 30 minutes
    const fromTimeMinutesTotal = fromTimeHours * 60 + fromTimeMinutes;
    const toTimeMinutesTotal = toTimeHours * 60 + toTimeMinutes;
    if (toTimeMinutesTotal - fromTimeMinutesTotal < 30) {
      console.log('a');
      return false;
    }

    return true;

  }

}
