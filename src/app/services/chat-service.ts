import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMessage, Message, MessageContainer, IMessageContainer } from '../app.model';
import { Http, Headers, RequestOptions, Response, URLSearchParams, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Auth } from '../components/auth/auth.service';

@Injectable()
export class ChatService {

  constructor(private http: Http) { }

  private apiUrl = environment.uri_php;
  private apiUrlMessages = this.apiUrl + environment.uri_mess;
  private apiUrlAddMessages = this.apiUrl + environment.uri_add_mess;

  getMessages(auth:Auth): Observable<any> {
    // ...using get request
    let url = this.apiUrlMessages+'?user=' + this.getUserEmail(auth);
    //console.log(url);
    return this.http.get(url)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  sentMessage(model: IMessageContainer): any {
    console.log('start sentCart');

    //let messageContainer = new MessageContainer(model.from, model.to, model.message);
    console.log(JSON.stringify(model));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Accept", 'application/json');

    var requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrlAddMessages,
      headers: headers,
      body: JSON.stringify(model)
    });

    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        console.log("sentMess map");
        console.log(res);
        if (res) {
          return { status: res.status, json: res.json() }
        }
      });
  }

 findObjInArray(idP: number, arrayObj: any[]): number {

    let indexP: number = -1;
    for (var i = 0; i < (arrayObj.length); i++) {
      if (arrayObj[i].id == idP) {
        indexP = i;
        break;
      }
    }
    return indexP;
  }

  hideContact( srtSplit: string): string {
    let newSrt = srtSplit;
    let resSplit: string[] = srtSplit.split("@");
    if (resSplit.length > 0) newSrt = resSplit[0];
    return newSrt;
  }

  findObByNameInArray(name: string, arrayObj: any[]): number {

    let indexP: number = -1;
    for (var i = 0; i < (arrayObj.length); i++) {
      if (arrayObj[i].name == name) {
        indexP = i;
        break;
      }
    }
    return indexP;
  } 

getUserEmail(auth: Auth): string {
    let user_email = "";
    if (auth !=null && auth.authenticated()) {
      user_email = auth.userProfile.email;
    }
    //console.log("authenticated: " + auth.authenticated());
    //console.log("user_id: " + user_email);
    return user_email;
    //return auth.userProfile.identities[0].user_id;
  }
}

