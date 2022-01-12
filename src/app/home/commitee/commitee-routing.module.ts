import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommiteePage } from './commitee.page';

const routes: Routes = [
  {
    path: '',
    component: CommiteePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommiteePageRoutingModule {}
