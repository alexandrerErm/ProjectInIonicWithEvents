import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverLanguagePage } from './popover-language.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverLanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverLanguagePageRoutingModule {}
