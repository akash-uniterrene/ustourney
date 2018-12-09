import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTournamentPage } from './my-tournament';

@NgModule({
  declarations: [
    MyTournamentPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTournamentPage),
  ],
})
export class MyTournamentPageModule {}
