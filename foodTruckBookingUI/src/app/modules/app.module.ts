import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from '../app.component';
import { SharedModule } from '../modules/shared.module';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
