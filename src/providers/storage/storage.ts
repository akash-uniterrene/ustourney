import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  constructor(
	public httpclient: HttpClient,
	private storage: Storage, 
	private platform: Platform, 
	private transfer: FileTransfer,
	private file: File,
	private http: Http
  ) {
  }
  
    fileTransfer: FileTransferObject = this.transfer.create();

	setUser(user : any){
		for (var key in user) {
		  if (user.hasOwnProperty(key)) {          
			  localStorage.setItem(key,user[key])
		  }
		}
	}
	
	



}
