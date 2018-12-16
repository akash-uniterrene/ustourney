import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController,Nav, LoadingController, MenuController, Platform } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the WithdrawMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw-money',
  templateUrl: 'withdraw-money.html',
})
export class WithdrawMoneyPage {
  public amount : number = 0;
  public loading;
  public wallet : any = localStorage.getItem('wallet');
  constructor(
	public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menu: MenuController,
	public platform: Platform,
    public nav: Nav
  ) 
  {
	  
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WithdrawMoneyPage');
  }
  
  withdrawPayment(){	
	var total = this.wallet - this.amount;
	if(total < 100 && (this.wallet < this.amount)){
		let toast = this.toastCtrl.create({
          message: "You are not allow to withdraw money !",
          duration: 3000,
          position: 'top',
        });
        toast.present();
	} else {
		let params : any = {
			amount:this.amount,
			user_id:localStorage.getItem('user_id'),
		};
	
		this.loading = this.loadingCtrl.create({
		  content: 'Updating Amount...',
		});
	
		this.loading.present();
		  //Attempt to login in through our User service
		  this.user.withdrawMoney(params).subscribe((resp) => {
			this.loading.dismiss();
			let toast = this.toastCtrl.create({
			  message: "your amount has been successfully updated",
			  duration: 3000,
			  position: 'top',
			});
			toast.present();
			this.navCtrl.push('WalletPage',{'profile':resp});
			}, (err) => {
			this.loading.dismiss();
			let toast = this.toastCtrl.create({
			  message: "Failed to updating record",
			  duration: 3000,
			  position: 'top',
			});
			toast.present();
		});
	}
	
	
	
  }

}
