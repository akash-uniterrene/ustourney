import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  tournamentItems: any = [];
  item : any = [];
  constructor(public navCtrl: NavController, public tournament: TournamentProvider, public modalCtrl: ModalController) {
    /* this.tournamentItems = [
      {
		'matchtype':'classic',
		'tournamenttype':'solo',
		'map':'erangel',
		'month':'',
		'time':'',
		'user': {
			  'avatar': 'assets/img/marty-avatar.png',
			  'name': 'Marty McFly'
			},
		'entry_fee':'',
		'winning_type':'winning',
		'winning_amount':'',
		'image':'assets/pubgImages/tournament_1.jpg'
	  },
      {
		'matchtype':'classic',
		'tournamenttype':'solo',
		'map':'erangel',
		'month':'',
		'time':'',
		'user': {
			  'avatar': 'assets/img/marty-avatar.png',
			  'name': 'Marty McFly'
			},
		'entry_fee':'',
		'winning_type':'winning',
		'winning_amount':'',
		'image':'assets/pubgImages/tournament_1.jpg'
	  },
      {
		'matchtype':'classic',
		'tournamenttype':'solo',
		'map':'erangel',
		'month':'',
		'time':'',
		'user': {
			  'avatar': 'assets/img/marty-avatar.png',
			  'name': 'Marty McFly'
			},
		'entry_fee':'',
		'winning_type':'winning',
		'winning_amount':'',
		'image':'assets/pubgImages/tournament_1.jpg'
	  }
    ]; */
	
	this.getTournaments();

  }
  
  ionViewDidLoad() {
    // Build an empty form for the template to render
   
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
		  'tournament_id': item.tournament_id
		});
	}
	
	paymentPage(item){
		const modal = this.modalCtrl.create('PaymentPage', {
		  'item': item
		});
		modal.present()
	}
}
