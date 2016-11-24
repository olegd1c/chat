import { Component, OnInit } from '@angular/core';
import {IRepsMessage, IMessage, Message, IMessageContainer, MessageGroup} from '../../app.model';
import {ChatService} from '../../services/chat-service';
import {Observable} from 'rxjs/Rx';
import { GroupPipe } from '../../pipes/group-pipe.pipe';
import { Auth } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages: Message[];
  groupsMes: MessageGroup[];
  groupFilter: MessageGroup;
  countEmail: string;
  model: IMessageContainer;

  constructor(private chatService: ChatService, private groupPipe: GroupPipe, private auth: Auth) {
    this.defVal();
  }

  ngOnInit() {
    this.refreshData();
    this.setFrom();
  }

  private defVal() {
    this.groupsMes = new Array<MessageGroup>();
    this.messages = new Array<Message>();
    this.model = {from:'',to:'',message:''};
  }

  private setFrom() {
    console.log("setFrom: "+this.model.from);
    if ((this.model.from == "") && this.auth.authenticated()) {
      this.model.from = this.chatService.getUserEmail(this.auth);
      //console.log("setFrom: "+this.auth.userProfile.email);
    }
  }

  private refreshData(): void {
    if (!this.auth.authenticated()) {
      //console.log("defVal");
      this.defVal();
      this.updateMessages();
      this.subscribeToData();
    }
    else {
      //console.log("load");
      this.setFrom();
      //console.log("auth: "+this.auth.userProfile);
      this.chatService.getMessages(this.auth).subscribe(
        (res:IRepsMessage) => {
          if (this.groupFilter != null) {
            //console.log("groupFilter: " + this.groupFilter.name + " " + this.groupFilter.countStyle);
            //console.log(this.groupsMes);
          }
          if(res.success) {
            this.messages = res.messages;
            this.groupsMes = res.groups;
          }
          else{
            console.log("error: "+res.message);      
          }
          //console.log("groupsMes: ");
          //console.log(this.groupsMes);
          this.updateMessages();
          this.subscribeToData();
        }
        ,
        err => { console.log(err); });
    }
  }

  private subscribeToData(): void {
    Observable.timer(5000).first().subscribe(() => this.refreshData());
  }

  private updateMessages() {

    if (this.groupFilter == null && this.groupsMes != null && this.groupsMes.length > 0) {
      //console.log("updateMessages");
      this.groupsMes[0].countStyle = true;
      this.groupFilter = this.groupsMes[0];

      this.model.to = this.groupFilter.name;
    }
    this.destroyStyle(true);

    /*
    this.groupsMes = new Array<MessageGroup>();
  for (var _i = 0; _i < this.messages.length; _i++) {
      var ar = this.messages[_i];
      //if(this.groupsMes.indexOf(ar.from)==-1){
        this.groupsMes.push(new MessageGroup(ar.from));      
      //}
      //if(this.groupsMes.indexOf(ar.to)==-1){
        this.groupsMes.push(new MessageGroup(ar.to));      
      //}    
  }
  
    for (let i in this.messages) {
      
      
    } 
    */

  }
  destroyStyle(chek: boolean) {
    if (this.groupFilter != null) {
      let indexG = this.chatService.findObByNameInArray(this.groupFilter.name, this.groupsMes);
      if (indexG >= 0) this.groupsMes[indexG].countStyle = chek;
    }

  }
  private sentMessage() {
    //console.log('start sentCart M');
    this.chatService.sentMessage(this.model)
      .subscribe(
      res => {
        //console.log("sentCart subscribe");
        if (res.status = 200 && res.json.success == 1) {
          //console.log("sentCart subscribe ok");
          this.model.message = "";
        }
      },
      err => {
        // Log errors if any
        console.log(err);
      });
    ;
  }

  onFiiterGroup($event) {
    //this.groupPipe
    //console.log("Pipe "+$event);
    this.destroyStyle(false);
    this.groupFilter = $event;
    this.groupFilter.countStyle = true;
    this.messages = this.groupPipe.transform(this.messages, this.groupFilter);
    this.model.to = this.groupFilter.name;
  }

}
