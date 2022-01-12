import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Event } from '../event.model';
import { Speaker } from '../speaker.model';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.page.html',
  styleUrls: ['./event-page.page.scss'],
})
export class EventPagePage implements OnInit, OnDestroy {
  eventTitle: string;
  eventSub: Subscription;
  eventSub1: Subscription;
  event: Event;
  user: User;

  paymentButtonVisibility = false;
  loveCheck = false;
  addList = true;
  isInLoveList = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.authService.user.subscribe((data) => {
      this.user = data;
      console.log(this.user);
      if (!this.user) {
        this.addList = false;
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.eventTitle = params.eventTitle;
      this.eventSub = this.apiService
        .findEventByTitle(this.eventTitle)
        .subscribe();
      this.apiService.event.subscribe((data) => {
        if (data) {
          this.event = data;
        }
      });
      if (this.user && this.event) {
        this.apiService
          .checkPayment(this.event.id, this.user.id)
          .subscribe((visibility) => {
            this.paymentButtonVisibility = visibility;
          });
        this.apiService
          .isEventInLoveList(this.event.id, this.user.id)
          .subscribe((check) => {
            this.isInLoveList = check;
          });
      }
    });
  }

  payment() {
    this.apiService.payment(this.event.id, this.user.id);
    this.paymentButtonVisibility = !this.paymentButtonVisibility;
    this.router.navigateByUrl('home');
  }

  onChange() {
    this.isInLoveList = !this.isInLoveList;
    this.apiService.addToLoveList(this.event.id, this.user.id);
    // this.router.navigateByUrl('home');
  }
}
