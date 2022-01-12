import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeEventsPageRoutingModule } from './free-events-routing.module';

import { FreeEventsPage } from './free-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeEventsPageRoutingModule
  ],
  declarations: [FreeEventsPage]
})
export class FreeEventsPageModule {}
