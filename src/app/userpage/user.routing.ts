import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component' ;


export const UserRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'pages/user',
        component: UserComponent
     },{
         path: 'pages/subscriptions',
         component: SubscriptionsComponent
     
	}]
}
];
