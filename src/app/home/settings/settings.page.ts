import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: User;
  lang;
  language: string = this.translateService.currentLang;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    public translateService: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const lang = localStorage.getItem('lang') || 'en';
    this.translateService.setDefaultLang(lang);
  }

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.authService.user.subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
  }

  async onSubmit(form) {
    if (form.value.password !== form.value.confirmPassword) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: 'The password are not equal.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.authService.updateUser(
        form.value.name,
        form.value.password,
        this.user.id
      );
    }
  }

  changeLang(event) {
    localStorage.setItem('lang', event.target.value);
    this.translateService.use(event.target.detail);
    location.reload();
  }
}
