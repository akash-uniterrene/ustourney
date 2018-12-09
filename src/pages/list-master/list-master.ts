import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, Nav} from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  tournamentItems : any = [];
  constructor( public tournament: TournamentProvider, public navCtrl: NavController, public nav: Nav) {
    this.getTournaments();
  }
  
  getTournaments(){
	this.tournament.getTournaments({filter:'coming'})
	.then(data => {
		let item = data[0];
		for (var key in item) {
		  this.tournamentItems.push(item[key]);
		}
	});
  }
  
	viewDetail(item) {
		this.navCtrl.push('ItemDetailPage', {
		  'item': item
		});
	}
	
	viewManage(){
		this.navCtrl.push('MyTournamentPage');
		
	}
	
	announce(tournament_id){
		this.navCtrl.push('AnnouncementPage', {
		  'tournament_id': tournament_id,'userStatus':'player'
		});		
	}
	
}