
import { Component, OnInit, Input } from '@angular/core';
import { Message, IMessage } from '../../app.model';
import {ChatService} from '../../services/chat-service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {
  @Input() message: Message;
  model: IMessage;
  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.model = this.message;
    this.model.from = this.chatService.hideContact(this.message.from);
  }
}
