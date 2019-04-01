import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppTestPageComponent } from './test-page.component';

const routes: Routes = [{
  path: 'test-page',
  component: AppTestPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
