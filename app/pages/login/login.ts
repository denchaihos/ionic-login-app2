import { Component } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';

import {Login} from '../../providers/login/login'
import {TabsPage} from '../tabs/tabs'

interface HTTPResult {
  ok: boolean,
  token?: string,
  msg?: string
}

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [Login]
})
export class LoginPage {
  username: string
  password: string
  localStorage: LocalStorage

  constructor(private navCtrl: NavController,
    private loginProvider: Login) {
    this.localStorage = new Storage(LocalStorage)
    
    this.localStorage.get('token')
      .then(token => {
        if (token) {
          this.navCtrl.setRoot(TabsPage)
        }
      });
  }

  login() {
    this.loginProvider.doLogin(this.username, this.password)
      .then(res => {
        let result = <HTTPResult>res;
        if (result.ok) {
          this.localStorage.set('token', result.token)
          this.navCtrl.setRoot(TabsPage)
        } else {
          alert(result.msg)
        }
      }, err => {
        alert('ไม่สามารถเชื่อมกับ server ได้')
      });
  }
}
