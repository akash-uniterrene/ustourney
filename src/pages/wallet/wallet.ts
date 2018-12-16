import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
	
  public walletAmt : number = 0;
  public transactions = [];
  public profile :any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public user: User) {
	this.loadPage();
	this.profile = navParams.get('profile');
  }

  loadPage() {
	this.user.getProfile({'user_id':localStorage.getItem('user_id')}).then(data => {
		this.profile = data;
		this.walletAmt = data['wallet'];
	});  
	//this.walletAmt = parseInt(localStorage.getItem('wallet'));
    this.user.getTranactions({user_id:localStorage.getItem('user_id')})
	.then(data => {
		let item = data[0];
		for (var key in item) {
		  this.transactions.push(item[key]);
		}
	});
  }
  
  addMoney() {
	this.navCtrl.push('AddMoneyPage');
  }
  
  withdrawMoney(){
	this.navCtrl.push('WithdrawMoneyPage');
  }
  
  doInfinite(infiniteScroll) {
	setTimeout(() => {
	  this.loadPage();
	  infiniteScroll.complete();
	}, 500);
  }
	
}
