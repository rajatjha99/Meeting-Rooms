export class Room {
    constructor(
        public id: number,
        public name: string,
        public status: 'Available' | 'In-Use' | 'Booked' = 'Available'
    ) {}
}