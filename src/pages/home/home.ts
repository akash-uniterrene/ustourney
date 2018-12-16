import { Component } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams,  ToastController, MenuController } from 'ionic-angular';
import { FirstRunPage} from '../';
import { User } from '../../providers';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	introduction = 'CardsPage';  
	morePage = 'UserSettingsPage';
	ListPage = 'ListMasterPage';
	WalletPage = 'WalletPage';	
	private profile : any = [];
  constructor(
	public navCtrl: NavController, 
	public user: User,
	public storage: StorageProvider,
	public toastCtrl: ToastController,
    public navParams: NavParams,  
    public menu: MenuController,
    public nav: Nav
  ) 
  {
	  this.isUser();
	  /* for (var i = 0; i < localStorage.length; i++){
		this.profile[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
	  } */
  }
  
  isUser(){		 
	 if(localStorage.getItem('unique_name') || localStorage.getItem('user_id')){
	  for (var i = 0; i < localStorage.length; i++){
		this.profile[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
	  }
	} else{
	  this.nav.setRoot(FirstRunPage);      
	} 
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  createTournament(){
	  this.navCtrl.setRoot("CreateTournamentPage");
  }

}
