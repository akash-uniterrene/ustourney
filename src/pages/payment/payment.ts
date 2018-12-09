import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,private iab: InAppBrowser) {
	   this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  
  makePayment(){
	var options = {
      description: 'Credits towards consultation',
      image: '../../assets/pubgImages/payment-logo.jpg',
      currency: 'INR',
      key: 'rzp_test_xV4r0EQROatoGV',
      amount: '100000',
      name: this.item.tournamenttype+' Pubg Tournament',
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
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
