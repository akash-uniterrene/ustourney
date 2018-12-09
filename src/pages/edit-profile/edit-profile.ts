import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
	public edit_details : any = {
		user_firstname:'',
		user_lastname:'',
		user_email:'',
	}
	
	constructor(public navCtrl: NavController, public user: User, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
	  this.edit_details = navParams.get('profile');
	}
	
	updateProfile() {    
		const loader = this.loadingCtrl.create({
		  content: "Please wait...",
		  duration: 3000
		});
		loader.present();
		  //Attempt to login in through our User service
		this.user.updateProfile({user_id:this.edit_details.user_id,user_email:this.edit_details.user_email,user_firstname:this.edit_details.user_firstname,user_lastname:this.edit_details.user_lastname}).subscribe((resp) => {
			loader.dismiss();
			//this.storage.setUser(resp);
			let toast = this.toastCtrl.create({
			  message:"Changes has been successfully saved",
			  duration: 3000,
			  position: 'top',
			  dismissOnPageChange: true
			});
			toast.present();
		}, (err) => {
			// Unable to sign up
			let toast = this.toastCtrl.create({
			  message: "Failed to save changes. Please retry",
			  duration: 3000,
			  position: 'top',
			  dismissOnPageChange: true
			});
			toast.present();
		});

	}

}
