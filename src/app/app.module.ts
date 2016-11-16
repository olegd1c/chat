import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing,
         appRoutingProviders }  from './components/application/app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { Auth } from './components/auth/auth.service';
import { AppComponent } from './components/application/app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatService } from './services/chat-service';
import { ChatGroupComponent } from './components/chat-group/chat-group.component';
import { GroupPipe } from './pipes/group-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChatItemComponent,
    ChatGroupComponent,
    AuthComponent,
    ProfileComponent,
    GroupPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders,ChatService,Auth,GroupPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
