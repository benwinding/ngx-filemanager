import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppTestPageComponent } from './test-page.component';
import { AppTestBlankComponent } from './test-blank.component';

const routes: Routes = [
  {
    path: 'test-page',
    component: AppTestPageComponent
  },
  {
    path: 'test-blank',
    component: AppTestBlankComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
