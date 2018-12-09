import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,Nav, LoadingController, MenuController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage, FirstRunPage } from '../';
import { StorageProvider } from '../../providers/storage/storage';

interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  
   // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
    account: { 
      user_firstname: string, 
      user_lastname: string, 
      user_name: string, 
      user_email: string, 
      user_password: string
     } = {
		user_firstname: '',
		user_lastname: '',
		user_name: '',
		user_email: '',
    user_password: ''
  };

    
  
  public loading;
  public loadingcheck;
  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public storage: StorageProvider,
    public menu: MenuController,
    public nav: Nav
    ) {

    this.menu.enable(false);   

    this.loading = this.loadingCtrl.create({
      content: 'Creating Account...',
      dismissOnPageChange: true
    });
	
    this.loadingcheck = this.loadingCtrl.create({
      content: 'Checking details...',
      dismissOnPageChange: true
    });

      
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
    
  }
  checkValidations(){   
    
    if(this.account.user_name && 
      this.account.user_lastname && 
      this.account.user_email &&
      this.account.user_firstname &&
      this.account.user_password
      ){
        if(this.account.user_name.length >=5 ){
          if(this.account.user_password.length >=8){
            return true;
          }else{
            return false;
          } 
        }else{
          return false;
        }   
          
      
    }else{
      return false;
    }
    
  }

  doSignup() {    
    this.loading.present();
      //Attempt to login in through our User service
      this.user.signup(this.account).subscribe((resp) => {

        this.loading.dismiss();
        this.storage.setUser(resp);
        this.navCtrl.push(MainPage);
      }, (err) => {
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: 'top',
          dismissOnPageChange: true
        });
        toast.present();
      });

  }
  loginPage(){
    this.navCtrl.push(FirstRunPage);
  }
  
  
}
