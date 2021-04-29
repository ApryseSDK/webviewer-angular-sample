import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { SomeDialogModule } from 'src/components/some-dialog/some-dialog.module';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SomeDialogModule,
    NgZorroAntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
