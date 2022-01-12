import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-language',
  templateUrl: './popover-language.page.html',
  styleUrls: ['./popover-language.page.scss'],
})
export class PopoverLanguagePage implements OnInit {

  languages = ['en','gr'];
  selected = '';

  constructor(private popover: PopoverController) { }

  ngOnInit() {
    this.selected = localStorage.getItem('lang');
  }

  select(lng){
    localStorage.setItem('lang', lng);
    this.popover.dismiss();
    location.reload();
  }

}
