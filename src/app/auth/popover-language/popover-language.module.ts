import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverLanguagePageRoutingModule } from './popover-language-routing.module';

import { PopoverLanguagePage } from './popover-language.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverLanguagePageRoutingModule
  ],
  declarations: [PopoverLanguagePage]
})
export class PopoverLanguagePageModule {}
