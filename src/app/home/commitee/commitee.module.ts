import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommiteePageRoutingModule } from './commitee-routing.module';

import { CommiteePage } from './commitee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommiteePageRoutingModule
  ],
  declarations: [CommiteePage]
})
export class CommiteePageModule {}
