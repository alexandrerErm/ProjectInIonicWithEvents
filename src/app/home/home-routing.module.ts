import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'paid-events',
    loadChildren: () =>
      import('./paid-events/paid-events.module').then(
        (m) => m.PaidEventsPageModule
      ),
  },
  {
    path: 'event/:eventTitle',
    loadChildren: () =>
      import('./event-page/event-page.module').then(
        (m) => m.EventPagePageModule
      ),
  },
  {
    path: 'speaker/:speakerid',
    loadChildren: () =>
      import('./speaker/speaker.module').then((m) => m.SpeakerPageModule),
  },
  {
    path: 'love-list',
    loadChildren: () =>
      import('./love-list/love-list.module').then((m) => m.LoveListPageModule),
  },
  {
    path: 'commitee/:commiteeid',
    loadChildren: () => import('./commitee/commitee.module').then( m => m.CommiteePageModule)
  },
  {
    path: 'sponsor/:sponsorid',
    loadChildren: () => import('./sponsor/sponsor.module').then( m => m.SponsorPageModule)
  },
  {
    path: 'free-events',
    loadChildren: () => import('./free-events/free-events.module').then( m => m.FreeEventsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
