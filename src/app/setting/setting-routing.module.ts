import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepassComponent } from './changepass/changepass.component';

const routes: Routes = [{ path: '', component: ChangepassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
