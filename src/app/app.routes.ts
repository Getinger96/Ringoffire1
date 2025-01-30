import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { MatCardModule } from '@angular/material/card';


export const routes: Routes = [
    {path:'', component:StartScreenComponent},
    {path:'game/:id',component: GameComponent}
];