import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTournamentPage } from './edit-tournament';

@NgModule({
  declarations: [
    EditTournamentPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTournamentPage),
  ],
})
export class EditTournamentPageModule {}
