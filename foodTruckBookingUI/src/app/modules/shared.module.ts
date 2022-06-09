import { NgModule } from '@angular/core';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { BookingModule } from './booking.module';
import { BookingComponent } from '../shared/booking/booking.component';
import { ShowBookingComponent } from '../shared/booking/show-booking/show-booking.component';
import { MakeBookingComponent } from '../shared/booking/make-booking/make-booking.component';
import { ReactiveFormsModule } from '@angular/forms';

const materialSharedModule = [
  MatToolbarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatSnackBarModule,
  MatCommonModule,
  MatPaginatorModule,
  MatNativeDateModule
]


@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent,
    ShowBookingComponent,
    BookingComponent,
    MakeBookingComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BookingModule,
    ...materialSharedModule
  ],
  exports: [
    TopbarComponent,
    FooterComponent,
    BookingComponent,
    MakeBookingComponent,
    ReactiveFormsModule,
    ...materialSharedModule
  ]
})
export class SharedModule { }
