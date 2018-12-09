import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
/**
 * Generated class for the EditTournamentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-tournament',
  templateUrl: 'edit-tournament.html',
})
export class EditTournamentPage {
	public tournamentForm : any = {
	'matchtype':'classic',
	'tournamenttype':'solo',
	'map':'erangel',
	'month':'',
	'time':'',
	'entry_fee':'',
	'winning_type':'winning',
	'winning_amount':'',
  }
  public loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public tournament: TournamentProvider) {
	  this.tournamentForm = navParams.get('item');
	  this.loading = this.loadingCtrl.create({
		  content: 'Updating Tournament...',
		  dismissOnPageChange: true
	  });
  }

  ionViewDidLoad() {
    console.log(this.tournamentForm);
  }
  
  editTournament(){
	 this.loading.present();
	  console.log(this.tournamentForm);
	//Attempt to login in through our User service
      this.tournament.editTournament(this.tournamentForm).subscribe((resp) => {
        this.loading.dismiss();
        // Unable to sign up
		let toast = this.toastCtrl.create({
		  message: "Tournament has been successfully created",
		  duration: 3000,
		  position: 'top',
		  dismissOnPageChange: true
		});
		toast.present();
      }, (err) => {
		this.loading.dismiss();
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: "Failed to create tournament. Please check your details",
          duration: 3000,
          position: 'top',
          dismissOnPageChange: true
        });
        toast.present();
      }); 
  }
  
  goBack(){
	  this.navCtrl.setRoot("HomePage");
  }

}
