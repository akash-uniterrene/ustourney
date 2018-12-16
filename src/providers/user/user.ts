import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
   private imageURL = "https://dev.followthebirds.com/content/uploads/";
	constructor(
		public api: Api,
		private transfer: FileTransfer,
		private file: File
	)  { 
					
		}
	fileTransfer: FileTransferObject = this.transfer.create();
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  /* login(accountInfo: any) {
    let seq = this.api.post('sign_in', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  } */
  
  login(accountInfo: any) {
    let seq = this.api.post('sign_in', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('register', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
  
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  getfriends(id:number) {
	let frindlist = [];	
	let seq = this.api.get('friends/'+id, '').share();
	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			frindlist.push(res);
			resolve(frindlist);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }
  
  queryUsers(id:number,params?: any) {
    let frindlist = [];	
	let seq = this.api.get('search/'+id, params).share();
	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			frindlist.push(res);
			resolve(frindlist);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }
  
  getPendingRequest(type:string,id:number) {
	let frindlist = [];	
	let seq = this.api.get('people/'+type+'/'+id, '').share();
	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			frindlist.push(res);
			resolve(frindlist);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }
  
  getProfile(params: any){
	let user :any;
	let seq = this.api.get('profile', params).share();
	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			user = res;
			resolve(user);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }
  
  
	/**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  updateProfile(accountInfo: any) {
	  console.log("hi",accountInfo);
    let seq = this.api.post('update-profile', accountInfo).share();

    seq.subscribe((res: any) => {
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  updatePubgusername(accountInfo: any) {
    let seq = this.api.post('update-username', accountInfo).share();

    seq.subscribe((res: any) => {
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  
  getProfilePic(){
    if(localStorage.getItem('user_picture') != ''){
     /*  let userPic = localStorage.getItem('user_picture');
	  var arr = userPic.split("/");
	  var pic_name = arr[arr.length - 1];
	  let FullPath = this.file.externalRootDirectory+'FollowTheBirds/ProfilePic/' + pic_name; */
      let FullPath = this.imageURL+localStorage.getItem('user_picture');
      return FullPath;
    }
    
  }   
  
  photoUploader(params){
	let seq = this.api.post('upload', params.value).share();

	seq.subscribe((res: any) => {
		  // If the API returned a successful response, mark the user as logged in
		/* if (res.status == 'success') {
			//this._loggedIn(res);
		} else {
		} */
	}, err => {
		console.error('ERROR', err);
	});

		return seq;
  }
  getTranactions(params?: any) {
	let tranactions = [];	
	let seq = this.api.get('transactions', params).share();

	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			tranactions.push(res);
			resolve(tranactions);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  addMoney(params: any) {
	 console.log(params); 
    let seq = this.api.post('transaction_success', params).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  withdrawMoney(params: any) {
    let seq = this.api.post('withdraw_wallet', params).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
}
