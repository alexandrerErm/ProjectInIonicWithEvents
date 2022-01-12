import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Commitee } from './commitee.model';

@Component({
  selector: 'app-commitee',
  templateUrl: './commitee.page.html',
  styleUrls: ['./commitee.page.scss'],
})
export class CommiteePage implements OnInit, OnDestroy {

  commiteeSub: Subscription;
  commitee = new Commitee('a','b','c','d','e','z');

  constructor(
    private navCtlr: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnDestroy(): void {
    this.commiteeSub.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const commiteeid = params.commiteeid;
      this.commiteeSub = this.apiService
        .findCommiteeWithId(commiteeid)
        .subscribe((commitee) => {
          this.commitee = commitee;
        });
    });
  }

  navigateBack() {
    this.navCtlr.pop();
  }

}
