import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private route: Router,
    private apiService: ApiService,
    private menuCtrl: MenuController,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const lang = localStorage.getItem('lang') || 'en';
    console.log(lang);
    this.translateService.setDefaultLang(lang);
  }

  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      this.user = data;
    });
  }

  onLogout() {
    this.menuCtrl.enable(false);
    this.authService.logout();
    this.route.navigateByUrl('/auth');
  }
}
