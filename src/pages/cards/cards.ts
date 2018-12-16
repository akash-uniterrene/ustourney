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
	
  }
  
  ionViewDidLoad() {
    this.getTournaments();
  }
  
  getTournaments(){
	this.tournament.getTournaments({filter:'coming',user_id:localStorage.getItem('user_id')})
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
	
	paymentPage(item){
		const modal = this.modalCtrl.create('PaymentPage', {
		  'item': item
		});
		modal.present()
	}
}
