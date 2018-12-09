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
  public tournament_id : any;
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public tournament: TournamentProvider) {
    this.tournament_id = navParams.get('tournament_id') || 1;
  }
   
   ionViewDidLoad() {
    this.tournament.getTournament({tournament_id:this.tournament_id}).then(data => {
		this.item = data;
	});
	console.log(this.item);
  }
}
