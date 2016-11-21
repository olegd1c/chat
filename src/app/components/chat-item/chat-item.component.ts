
import { Component, OnInit, Input } from '@angular/core';
import { Message, IMessage } from '../../app.model';
import {ChatService} from '../../services/chat-service';
import {Auth} from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {
  @Input() message: Message;
  model: IMessage;
  constructor(private chatService: ChatService, private auth: Auth) {

  }

  ngOnInit() {
    //console.log("from: " + this.message.from);
    this.model = this.chatService.cloneObj(this.model, this.message);
    //console.log("from1 : " + this.message.from);
    if (this.chatService.isYou(this.message, this.auth)) {
      this.model.description = environment.strYou;
    } else {
      this.model.description = this.model.from;
      this.model.description = this.chatService.hideContact(this.model.description);
    }
    //console.log("from 2: " + this.message.from);
  }

  getStyle() {

    //console.log("getStyle from: " + this.message.from);
    /*
    if (this.message.from == "olegd1c@gmail.com") {
      return true;
    } else {
      return false;
    }
*/
    if (this.chatService.isYou(this.message, this.auth)) {
      //console.log("getStyle from: find");
      return "40px";
    } else {
      return "0px";
    }
  }
}
