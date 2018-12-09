import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,Nav, LoadingController, MenuController, Slides,Platform } from 'ionic-angular';
import { MainPage, FirstRunPage } from '../';
import { TournamentProvider } from '../../providers/tournament/tournament';
/**
 * Generated class for the CreateTournamentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-tournament',
  templateUrl: 'create-tournament.html',
})
export class CreateTournamentPage {
  form: FormGroup;
  public loading;
  showSkip = true;
  @ViewChild(Slides) slides: Slides;
  public winnersCount : any = [1];
  public tournamentForm : any = {
	'matchtype':'classic',
	'tournamenttype':'solo',
	'map':'erangel',
	'month':'',
	'time':'',
	'entry_fee':'',
	'winners':'1',
	'user_id':localStorage.getItem('user_id'),
	'winning_price': [],
	'per_kill': false
  }  
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public menu: MenuController,
    public platform: Platform,
    public tournament: TournamentProvider,
    public nav: Nav
  ) {
	    this.loading = this.loadingCtrl.create({
		  content: 'Creating Tournament...',
		  dismissOnPageChange: true
		});
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    
  }
  
  /* ionViewDidEnter() {
    this.platform.ready().then(() => {
      Keyboard.disableScroll(true);
    });
  }

  ionViewWillLeave() {
    this.platform.ready().then(() => {
      Keyboard.disableScroll(false);
    });
  } */
  
  checkValid(){
	  if(this.tournamentForm.month && this.tournamentForm.time){
		return true;	
	  } else {
		return false;
	  }
  }
  
  onSlideChangeStart(slider) {
	this.showSkip = !slider.isEnd();
  }
	
  nextSlide(slider){
	this.slides.slideNext(100)
  }
  
  
  onSelectChange(event){
	  this.winnersCount = [];
	  if(event == 0){
		this.winnersCount.push(1);
		this.tournamentForm.per_kill = true;
	  } else {	
		for(let i = 1; i<=event; i++){
			this.winnersCount.push(i);
		}
	  }
	  console.log(this.winnersCount);
	  
  }
  
  createTournament() {
	this.loading.present();
	//Attempt to login in through our User service
      this.tournament.createTournament(this.tournamentForm).subscribe((resp) => {
        this.loading.dismiss();
        // Unable to sign up
		let toast = this.toastCtrl.create({
		  message: "Tournament has been successfully created",
		  duration: 3000,
		  position: 'top',
		  dismissOnPageChange: true
		});
		toast.present();
		this.navCtrl.setRoot("HomePage");
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
