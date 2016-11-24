import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Input, Output, EventEmitter} from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ProfileRoutes }               from '../profile/profile.routes';
const routes: Routes = [
 { path: '', component: HomeComponent },
 ...ProfileRoutes,
 { path: '**', redirectTo: '' }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})


export class Angular2ShopRoutingModule {   

 }

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);