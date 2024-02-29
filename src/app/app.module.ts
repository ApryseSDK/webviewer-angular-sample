import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WithoutViewerComponent } from './without-viewer/without-viewer.component';
import { WithViewerComponent } from './with-viewer/with-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    WithoutViewerComponent,
    WithViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
