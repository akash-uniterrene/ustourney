import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,reorderArray,ToastController, AlertController } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
/**
 * Generated class for the WinnersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-winners',
  templateUrl: 'winners.html',
})
export class WinnersPage {
	public tournament_id : any;
	public players : any = [];
	public ids = [];
  constructor(public navCtrl: NavController,public alertCtrl : AlertController, public tournament: TournamentProvider,  public toastCtrl: ToastController, public navParams: NavParams) {
	  this.tournament_id = navParams.get('tournament_id');
  }

  ionViewDidLoad() {
    this.tournament.getTournament({tournament_id:this.tournament_id})
	.then(data => {
		let item = data['users'];
		this.players = item;
		console.log(this.players);
	});
  }
  
  
  reorderItems(indexes) {
    let element = this.players[indexes.from];
    this.players.splice(indexes.from, 1);
    this.players.splice(indexes.to, 0, element);
	console.log(this.players);
  }
  
  setWinners() {
    const confirm = this.alertCtrl.create({
      title: 'Announce Winners?',
      message: 'Make sure all winners are seted properly',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.confirmWinners();
            
          }
        }
      ]
    });
    confirm.present();
  }
  
  confirmWinners(){
	  let item = this.players;
	  for (var key in item) {
		  console.log(item[key].user_id);
		  this.ids.push(item[key].user_id);
	  }
	  console.log(this.ids);
	  let toast = this.toastCtrl.create({
          message: "Winners Has been announced Successfully",
          duration: 3000,
          position: 'top',
        });
      toast.present();
  }

}
