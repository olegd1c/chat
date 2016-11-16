export interface IMessage {
  id: number;
  from: string;
  to: string;
  message: string;
  date: Date;
}

export interface IMessageContainer {
  from: string;
  to: string;
  message: string;
}

export class MessageContainer {
  constructor(
    public from: string,
    public to: string,
    public message: string    
  ) {
  }
}


export interface IRepsMessage {
  success: number;
  messages: IMessage[];
}

export class Message {
  constructor(
    public id: number,
    public from: string,
    public to: string,
    public message: string,
    public date: Date
    ) {
  }
}

export class MessageGroup {
  constructor(
    public name: string,
    public countStyle: boolean
    ) {
  }
}