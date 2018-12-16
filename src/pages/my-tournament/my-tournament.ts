import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
/**
 * Generated class for the MyTournamentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-tournament',
  templateUrl: 'my-tournament.html',
})
export class MyTournamentPage {

   tournamentItems: any = [];
   item : any = [];
  constructor(public navCtrl: NavController, public tournament: TournamentProvider, public nav:Nav) {
    this.getTournaments();
  }
  
	getTournaments(){
		this.tournament.getTournaments({filter:'manage',user_id:localStorage.getItem('user_id')})
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
	
	edit(item){
		this.nav.setRoot('EditTournamentPage', {
		  'item': item
		});
		
	}
	
	viewPlayed(){
		this.navCtrl.push('ListMasterPage');
		
	}
	
	goWinners(tournament_id){
		this.navCtrl.push('WinnersPage',{tournament_id:tournament_id});
	}
	
	announce(tournament_id){
		this.navCtrl.push('AnnouncementPage', {
		  'tournament_id': tournament_id,'userStatus':'admin'
		});		
	}

}
