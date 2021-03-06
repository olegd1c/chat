import { Component } from '@angular/core';
import { Auth } from '../auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mini chat!';
  constructor(private auth: Auth) {   
    console.log('app constructor');  
  }
}
