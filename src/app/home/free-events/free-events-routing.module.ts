import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeEventsPage } from './free-events.page';

const routes: Routes = [
  {
    path: '',
    component: FreeEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeEventsPageRoutingModule {}
