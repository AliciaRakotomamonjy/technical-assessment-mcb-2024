import { Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { InvitationComponent } from './invitation/invitation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: 'accueil', component: TemplateComponent,
    children: [
      {
        path: 'invitations',
        component: InvitationComponent
      },
    ]
  },
];
