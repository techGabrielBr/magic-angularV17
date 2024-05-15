import { Routes } from "@angular/router";
import { SetListComponent } from "./components/set-list/set-list.component";
import { BoosterListComponent } from "./components/booster-list/booster-list.component";

export const publicRoutes: Routes = [
  {path: '', redirectTo: 'colecoes', pathMatch: 'full'},
  {path: 'colecoes', component: SetListComponent},
  {path: 'colecoes/booster/:id', component: BoosterListComponent}
]
