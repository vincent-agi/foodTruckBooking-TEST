import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from '../app.component';
import { SharedModule } from '../modules/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
