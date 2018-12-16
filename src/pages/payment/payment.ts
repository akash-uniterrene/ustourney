import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController, NavParams, MenuController, Platform, ViewController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TournamentProvider } from '../../providers/tournament/tournament';
import { User } from '../../providers';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  public item : any = {
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
  }
  private userInfo : any = {
	  user_id:localStorage.getItem('user_id'),
	  tournament_id:'',
  };
  private amount : number = parseInt(localStorage.getItem('wallet'));
  constructor(public navCtrl: NavController,
    public tournament: TournamentProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menu: MenuController,
	public platform: Platform,
	public alertCtrl: AlertController,
	navParams: NavParams, 
	public user: User, 
	public viewCtrl: ViewController) {
	   this.item = navParams.get('item');
  }

  ionViewDidLoad() {
   console.log(this.item);
   this.userInfo.tournament_id = this.item.tournament_id;
  }
  
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Pubg Username',
      inputs: [
        {
          name: 'pubg_username',
          placeholder: 'Enter your Pubg Username'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
			this.joinTournament(data)
          }
        }
      ]
    });
    prompt.present();
  }
  
  joinTournament(pubg_username){
	 console.log(pubg_username); 
	 if(this.amount < 100){
		let toast = this.toastCtrl.create({
		  message: "Your wallet does not sufficiant amount to join tournament",
		  duration: 3000,
		  position: 'top',
		  dismissOnPageChange: true
		});
	} else {	
	 let loading = this.loadingCtrl.create({
      content: 'Joining match...',
     });
	  loading.present();
	  this.user.updatePubgusername({user_id:localStorage.getItem('user_id'),pubg_username:pubg_username.pubg_username}).subscribe((resp) => {
		  
	  }, (err) => {
		
      });  
		//Attempt to login in through our User service
      this.tournament.joinTournament(this.userInfo).subscribe((resp) => {
        loading.dismiss();
        // Unable to sign up
		let toast = this.toastCtrl.create({
		  message: "You have Successfully Joined Tournament.",
		  duration: 3000,
		  position: 'top',
		  dismissOnPageChange: true
		});
		toast.present();
      }, (err) => {
		loading.dismiss();
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: "Failed to join tournament. Please try letter",
          duration: 3000,
          position: 'top',
          dismissOnPageChange: true
        });
        toast.present();
      });
	}
  }
  
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
