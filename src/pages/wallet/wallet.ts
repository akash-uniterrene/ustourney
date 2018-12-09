import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
	
	public walletAmt = parseFloat(localStorage.getItem('wallet'));

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }
  
  addMoney() {
	this.navCtrl.push('AddMoneyPage');
  }
  
  withdrawMoney(){
	this.navCtrl.push('WithdrawMoneyPage');
  }
}
