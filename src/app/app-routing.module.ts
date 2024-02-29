import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutViewerComponent } from './without-viewer/without-viewer.component';
import { WithViewerComponent } from './with-viewer/with-viewer.component';

const routes: Routes = [
  { path: "with-viewer", component: WithViewerComponent },
  { path: 'without-viewer', component: WithoutViewerComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
