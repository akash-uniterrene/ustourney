import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
	public amount : number = 0;
	public loading;
  constructor(public navCtrl: NavController) {
  }
  
  addCoin(item){
	this.amount = 0; 
	this.amount = item;
  }
  
  pay() {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_Zrfx3pymHeiPjb',
      amount: '5000',
      name: 'foo',
      prefill: {
        email: 'akash@dutta.com',
        contact: '8879524924',
        name: 'Akash Dutta'
      },
      theme: {
        color: '#F37254'
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
