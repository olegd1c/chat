import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageGroup } from '../../app.model';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.css']
})
export class ChatGroupComponent implements OnInit {
  @Input() group: MessageGroup;
  @Output() fiiterGroup: EventEmitter<MessageGroup>;

  constructor() {
    this.fiiterGroup = new EventEmitter<MessageGroup>();
  }

  ngOnInit() {
  }


  filterGroup() {
    this.fiiterGroup.emit(this.group);
  }

  getStyle() {
    if (this.group.countStyle) {
      return "#FFFACD";
    } else {
      return "";
    }
  }

}
