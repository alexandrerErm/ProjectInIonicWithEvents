/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  titleFilter = true;
  user: User;
  allEvents = new Array();
  allSpeakers = new Array();
  events = new Array();
  speakers = new Array();
  startDate: Date;
  endDate: Date;
  isLoading;

  private eventSub: Subscription;
  private eventSub1: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private translateService: TranslateService
  )  {
    this.initializeApp();
  }

  initializeApp() {
    const lang = localStorage.getItem('lang') || 'en';
    this.translateService.setDefaultLang(lang);
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
    this.eventSub1.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.eventSub = this.apiService.findEvents().subscribe();
    this.eventSub1 = this.apiService.events.subscribe((data = Array()) => {
      if (data) {
        this.events = data;
        this.allEvents = data;
        this.isLoading = false;
      }
    });

    this.eventSub = this.apiService.findSpeakers(null).subscribe();
    this.eventSub1 = this.apiService.speakers.subscribe((data = Array()) => {
      this.speakers = data;
    });

    this.menuCtrl.enable(true);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
    this.menuCtrl.enable(false);
  }

  ionChange(event) {
    if (this.titleFilter) {
      this.events = this.allEvents;
      if(!event.detail.value){
        this.events = this.allEvents;
      }
      this.events = this.events.filter(res => res.title.toLocaleLowerCase().includes(event.detail.value));
    } else {
      this.apiService.findSpeakers(event.detail.value).subscribe();
      this.apiService.speakers.subscribe((data = Array()) => {
        this.speakers = data;
      });
    }
  }

  filterModal() {
    this.modalCtrl
      .create({
        component: FilterComponent,
        componentProps: {},
      })
      .then((modalEl) => {
        modalEl.present();
        modalEl.onDidDismiss();

        this.apiService.titleChanged.subscribe((data) => {
          if (data !== null) {
            this.titleFilter = data;
          }
        });
        if (this.titleFilter) {
          this.apiService.startDateSub.subscribe((data) => {
            if (data) {
              this.events = this.allEvents;
              this.startDate = data;
              this.events = this.events.filter(
                (event) => event.startDate > this.startDate
              );
            } else {
              this.startDate = null;
            }
          });
          this.apiService.endDateSub.subscribe((data1) => {
            if (data1 && !this.startDate) {
              this.events = this.allEvents;
              this.endDate = data1;
              this.events = this.events.filter(
                (event) => event.endDate < this.endDate
              );
            } else if (data1 && this.startDate) {
              this.events = this.allEvents;
              this.events = this.events.filter(
                (event) => event.startDate > this.startDate
              );
              this.endDate = data1;
              this.events = this.events.filter(
                (event) => event.endDate < this.endDate
              );
              console.log(this.events);
            } else if (!data1) {
              this.endDate = null;
            }
          });
          if (!this.startDate && !this.endDate) {
            this.events = this.allEvents;
          }
        }
      });
  }

  signUp() {
    this.authService.logout();
    this.router.navigateByUrl('auth');
  }
}
