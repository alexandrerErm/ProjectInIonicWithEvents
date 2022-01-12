import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPagePageRoutingModule } from './event-page-routing.module';

import { EventPagePage } from './event-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPagePageRoutingModule
  ],
  declarations: [EventPagePage]
})
export class EventPagePageModule {}
