import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-love-list',
  templateUrl: './love-list.page.html',
  styleUrls: ['./love-list.page.scss'],
})
export class LoveListPage implements OnInit {
  user: User;
  eventsid = new Array();
  events = new Array();
  private eventSub: Subscription;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.eventsid = [];
    this.events = [];
    this.authService.user.subscribe((data) => {
      this.user = data;
    });
    this.getItems();
  }

  onCancelBooking(eventid, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.events = this.events.filter(event => event.id !== eventid);
    this.apiService.addToLoveList(eventid, this.user.id);
  }

  private getItems() {
    this.apiService.getLoveList(this.user.id).subscribe((data = Array()) => {
      this.eventsid = data;
      console.log(this.eventsid.length);
      this.eventsid.forEach((events) => {
        this.apiService.findEventById(events.eventid).subscribe(event => {
          if(event){
                console.log(event);
                this.events.push(event);
              }
        });
      });
    });
  }
}
