import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Sponsor } from './sponsor.model';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage implements OnInit, OnDestroy {

  private sponsorSub: Subscription;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  sponsor = new Sponsor('a','b','c','d','e','f','g','h','j');

  constructor(
    private navCtlr: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnDestroy(): void {
    this.sponsorSub.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const sponsorid = params.sponsorid;
      this.sponsorSub = this.apiService
        .findSponsorWithId(sponsorid)
        .subscribe((sponsor) => {
          this.sponsor = sponsor;
        });
    });
  }

  navigateBack() {
    this.navCtlr.pop();
  }

}
