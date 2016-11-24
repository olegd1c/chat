export interface IMessage {
  id?: number;
  from?: string;
  to?: string;
  message?: string;
  date?: Date;
  description?: string;
}

export interface IMessageContainer {
  from?: string;
  to?: string;
  message?: string;
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
  message: string;
  messages: Message[];
  groups: MessageGroup[];
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

export interface IMessageGroup {
  name?: string;
  description?: string;
  countStyle?: boolean;
}

export class MessageGroup {
  constructor(
    public name: string,
    public countStyle: boolean
    ) {
  }
}