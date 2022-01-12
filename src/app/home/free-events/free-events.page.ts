import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-free-events',
  templateUrl: './free-events.page.html',
  styleUrls: ['./free-events.page.scss'],
})
export class FreeEventsPage implements OnInit, OnDestroy {
  user: User;
  eventsid = new Array();
  events = new Array();
  private eventSub: Subscription;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

  ngOnInit() {
    this.authService.user.subscribe((data) => {
      this.user = data;
    });
    this.eventSub = this.apiService
      .getPaidEvents(this.user.id)
      .subscribe((data = Array()) => {
        this.eventsid = data;
        this.eventsid.forEach((events) => {
            this.apiService.findEventById(events.eventid).subscribe((d) => {
              if(d.price.toString() === '0'){
                this.events.push(d);
              }
            });
        });
      });
  }
}
