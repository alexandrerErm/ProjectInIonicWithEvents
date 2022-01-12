import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaidEventsPage } from './paid-events.page';

const routes: Routes = [
  {
    path: '',
    component: PaidEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaidEventsPageRoutingModule {}
