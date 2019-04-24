import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppTestFunctionsRemoteComponent } from './test-functions-remote.component';
import { AppTestFunctionsLocallyComponent } from './test-functions-locally.component';
import { AppTestStubFilesystemComponent } from './test-stub-filesystem.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'test-stub-filesystem'
  },
  {
    path: 'test-functions-locally',
    component: AppTestFunctionsLocallyComponent
  },
  {
    path: 'test-functions-remote',
    component: AppTestFunctionsRemoteComponent
  },
  {
    path: 'test-stub-filesystem',
    component: AppTestStubFilesystemComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: !environment.production
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
