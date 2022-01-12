import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoveListPage } from './love-list.page';

const routes: Routes = [
  {
    path: '',
    component: LoveListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoveListPageRoutingModule {}
