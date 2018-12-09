import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TournamentProvider } from '../../providers/tournament/tournament';
/**
 * Generated class for the AnnouncementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage {
  private tournament_id: any;
  public messages : any = [];
  
  public announcement : any = {
	'tournament_id':'1',
	'message':'',
	'user_id':localStorage.getItem('user_id'),
  }; 
  public userStatus : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public tournament: TournamentProvider) {
	this.tournament_id = navParams.get('tournament_id');
	this.userStatus = navParams.get('userStatus');
  }

  ionViewDidLoad() {
    this.tournament.getmessages({tournament_id:this.tournament_id})
	.then(data => {
		let item = data[0];
		for (var key in item) {
		  this.messages.push(item[key]);
		}
	});
  }
  
  
  sendMessage(){
	this.announcement.tournament_id = this.tournament_id;
	this.tournament.postAnnounce(this.announcement).subscribe((resp) => {
        // Unable to sign up
		let toast = this.toastCtrl.create({
		  message: "Tournament has been successfully created",
		  duration: 3000,
		  position: 'top',
		  dismissOnPageChange: true
		});
		toast.present();
      }, (err) => {
        let toast = this.toastCtrl.create({
          message: "Failed to post announcement.",
          duration: 3000,
          position: 'top',
          dismissOnPageChange: true
        });
        toast.present();
      });
	}
  
}
