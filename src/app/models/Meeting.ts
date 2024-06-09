export class Meeting {
    constructor(
      public id: number,
      public username: string,
      public room: string,
      public date: string,
      public fromTime: string,
      public toTime: string,
      public agenda: string
    ) {}
}