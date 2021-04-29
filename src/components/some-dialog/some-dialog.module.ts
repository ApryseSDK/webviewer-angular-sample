import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SomeDialogComponent } from './some-dialog.component';
import {DialogModule} from 'primeng/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    SomeDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    DialogModule,
    NgbModule,
    NzModalModule 
  ],
  exports: [
    SomeDialogComponent
  ],
  providers: [

  ],
  bootstrap: [SomeDialogComponent]
})
export class SomeDialogModule { }
