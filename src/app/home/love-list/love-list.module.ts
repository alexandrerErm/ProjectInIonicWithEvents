import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoveListPageRoutingModule } from './love-list-routing.module';

import { LoveListPage } from './love-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoveListPageRoutingModule
  ],
  declarations: [LoveListPage]
})
export class LoveListPageModule {}
