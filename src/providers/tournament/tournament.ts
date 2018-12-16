import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


import { Api } from '../api/api';
/*
  Generated class for the TournamentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TournamentProvider {

  constructor(public http: HttpClient,public api: Api) {
    console.log('Hello TournamentProvider Provider');
  }
  
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  createTournament(tournamentInfo: any) {
    let seq = this.api.post('create-tournament', tournamentInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
 editTournament(tournamentInfo: any) {
    let seq = this.api.post('edit-tournament', tournamentInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  
  joinTournament(userInfo: any) {
    let seq = this.api.post('join-tournament', userInfo).share();

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
  postAnnounce(postInfo: any) {
    let seq = this.api.post('post-announce', postInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  getmessages(params?: any){
	  let messages = [];	
	  let seq = this.api.get('messages', params).share();
	// don't have the data yet
		return new Promise(resolve => {
			seq.subscribe((res: any) => {
				messages.push(res);
				resolve(messages);
			}, err => {
				console.error('ERROR', err);
			});
		});	
  }
  
  getTournaments(params?: any) {
    let tournaments = [];	
	let seq = this.api.get('get-tournaments', params).share();
	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			tournaments.push(res);
			resolve(tournaments);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }
  
  getTournament(params: any){
	let user :any;
	let seq = this.api.get('/get-tournament', params).share();
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

}
