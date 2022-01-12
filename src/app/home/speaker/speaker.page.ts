import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Speaker } from '../speaker.model';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.page.html',
  styleUrls: ['./speaker.page.scss'],
})
export class SpeakerPage implements OnInit, OnDestroy {
  private speakerSub: Subscription;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  speaker = new Speaker('a', 'a', 'b', 'c', 'f', 1);

  constructor(
    private navCtlr: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}
  ngOnDestroy(): void {
    this.speakerSub.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const speakerid = params.speakerid;
      this.speakerSub = this.apiService
        .findSpeakerswithId(speakerid)
        .subscribe((speaker) => {
          this.speaker = speaker;
        });
    });
  }

  navigateBack() {
    this.navCtlr.pop();
  }
}
