import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any = [];
  public tournamentRecord : any = [];
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public tournament: TournamentProvider) {
    this.tournamentRecord = navParams.get('item');
  }
   
   ionViewDidLoad() {
    this.tournament.getTournament({tournament_id:this.tournamentRecord.tournament_id}).then(data => {
		this.item = data;
	});
	console.log(this.item);
  }
}
