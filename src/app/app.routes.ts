import {RouterModule, Routes} from '@angular/router';
import {PodcastListComponent} from './podcast-list';
import {PlayerOutletComponent} from './audio-player';

const routes : Routes = [
    {path: '', component: PodcastListComponent},
    {path: 'play/:guid', component: PlayerOutletComponent}
]

export const MyRouter = RouterModule.forRoot(routes);