import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, PopoverController } from '@ionic/angular';
import { AuthService } from './auth.service';
import * as $ from 'jquery';
import { PopoverLanguagePage } from './popover-language/popover-language.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isSignUpMode = false;
  loginFail = false;
  nameExist = false;

  constructor(
    private route: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private popoverCtrl: PopoverController,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const lang = localStorage.getItem('lang') || 'en';
    console.log(lang);
    this.translateService.setDefaultLang(lang);
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async onSubmit(form: NgForm) {
    if (!this.isSignUpMode) {
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging In', translucent: true})
        .then((loadingEl) => {
          loadingEl.present();
          this.authService
            .loginUser(form.value.username, form.value.password)
            .subscribe((data) => {
              if (data.length !== 0) {
                this.login();
              } else {
                this.loginFail = true;
              }
              loadingEl.dismiss();
              form.reset();
            });
        });
    } else {
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Register...', translucent: true })
        .then(async (loadingEl) => {
          loadingEl.present();
          if (form.value.password !== form.value.confirmPassword) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Alert',
              message: 'The password are not equal.',
              buttons: ['OK'],
            });
            await alert.present();
          } else {
            this.authService
              .userregistration(form.value.username, form.value.password)
              .subscribe((data) => {
                if (data.data.id === null) {
                  this.nameExist = true;
                } else {
                  this.login();
                }
                loadingEl.dismiss();
                form.reset();
              });
          }
        });
    }
  }

  onSwitchMode(form: NgForm) {
    this.isSignUpMode = !this.isSignUpMode;
    form.reset();
    this.loginFail = false;
  }

  login() {
    this.authService.login();
    this.route.navigateByUrl('home');
  }

  async openLanguagePopover(ev){
    const popover = await this.popoverCtrl.create({
      component: PopoverLanguagePage,
      event: ev
    });
    await popover.present();
  }
}
