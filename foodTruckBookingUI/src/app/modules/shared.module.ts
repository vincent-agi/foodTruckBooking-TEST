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
import { MatCommonModule } from '@angular/material/core';


const materialSharedModule = [
  MatToolbarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatSnackBarModule,
  MatCommonModule
]


@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    TopbarComponent,
    FooterComponent,
    ...materialSharedModule
  ]
})
export class SharedModule { }
