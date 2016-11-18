import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageGroup,IMessageGroup } from '../../app.model';
import {ChatService} from '../../services/chat-service';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.css']
})
export class ChatGroupComponent implements OnInit {
  @Input() group: MessageGroup;
  @Output() fiiterGroup: EventEmitter<MessageGroup>;
  model:IMessageGroup;

  constructor(private chatService: ChatService) {
    this.fiiterGroup = new EventEmitter<MessageGroup>();
  }

  ngOnInit() {
    this.model = this.group;
    this.model.description = this.model.name;
    //this.model = {"name":this.group.name, "description":this.group.name, "countStyle": this.group.countStyle};
    this.model.description = this.chatService.hideContact(this.model.description); 
    //console.log(this.group);
  }

  filterGroup() {
    console.log("filterGroup");
    //console.log(this.group);
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
