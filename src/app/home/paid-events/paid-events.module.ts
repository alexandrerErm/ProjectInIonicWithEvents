import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaidEventsPageRoutingModule } from './paid-events-routing.module';

import { PaidEventsPage } from './paid-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaidEventsPageRoutingModule
  ],
  declarations: [PaidEventsPage]
})
export class PaidEventsPageModule {}
