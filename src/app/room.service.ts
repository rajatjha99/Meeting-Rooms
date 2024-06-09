import { Injectable } from '@angular/core';
import { Room } from './models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: Room[] = Array.from({ length: 10 }, (_, i) => new Room(i, `Meeting Room #${i + 1}`));

  constructor() { }

  getRooms(): Room[] {
    return this.rooms;
  }

  updateRoomStatus(roomId: number, status: 'Available' | 'In-Use' | 'Booked') {
    const room = this.rooms.find(room => room.id === roomId);
    if (room) {
      room.status = status;
    }
  }
}
