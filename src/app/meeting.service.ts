import { Injectable } from '@angular/core';
import { Meeting } from './models/Meeting';
import { of, observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private meetings: Meeting[] = [];

  private meetingsSubject = new BehaviorSubject<Meeting[]>(this.meetings);
  meetings$ = this.meetingsSubject.asObservable();

  constructor() { }

  getMeetings(): Meeting[] {
    return this.meetings;
  }

  bookMeeting(meeting: Meeting) {
    this.meetings.push(meeting);
    this.meetingsSubject.next(this.meetings);
  }

  deleteMeeting(meetingId: number) {
    console.log(this.meetings);
    console.log(meetingId);
    this.meetings = this.meetings.filter(meeting => meeting.id !== meetingId);
    console.log(this.meetings);
  }

  getNextId(): number {
    return this.meetings.length > 0 ? Math.max(...this.meetings.map(m => m.id)) + 1 : 1;
  }

  getMeetingsByRoom(selectedRoom: any) {
    const filteredMeetings = this.meetings.filter(meeting => meeting.room === selectedRoom);
    return new BehaviorSubject(filteredMeetings).asObservable();  
  }
}
