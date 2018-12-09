import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-money',
  templateUrl: 'add-money.html',
})
export class AddMoneyPage {
	public amount : number = 100;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMoneyPage');
  }
  
  addCoin(item){
	this.amount = 0; 
	this.amount = item;
  }
  
  makePayment(){
	let amount : number = this.amount*100;
	var options = {
      description: 'pubg tournament premium',
      image: 'http://ustourney.cryptofficial.net/pubgImages/payment-logo.jpg',
      currency: 'INR',
      key: 'rzp_test_xV4r0EQROatoGV',
      amount: amount,
      name: 'US Tourney Wallet',
      prefill: {
        email: localStorage.getItem('user_email'),
        contact: '',
        name: localStorage.getItem('user_firstname')+' '+localStorage.getItem('user_lastname')
      },
      theme: {
        color: '#ffffff'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = function(payment_id) {
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = function(error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  
  
}
