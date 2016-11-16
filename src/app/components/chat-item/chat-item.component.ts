
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../app.model';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {
  @Input() message: Message;
  constructor() { }

  ngOnInit() {
  }

}
