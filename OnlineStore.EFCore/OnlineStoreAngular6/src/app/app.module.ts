import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';

import { CalendarModule } from 'primeng/calendar';
import { ShipperComponent } from './shipper/shipper.component';

import { MenuModule } from 'primeng/menu';

import { AppRoutingModule } from './app-routing.module';

import { CommonModule } from "@angular/common";
import { ProductComponent } from './product/product.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { AirportComponent } from './airport/airport.component';
// import { AirportComponent } from './airport/airport.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { MatTableModule } from '@angular/material/table';
// import {MatPaginatorModule} from '@angular/material/paginator';

import {FileUploadModule} from 'primeng/fileupload';

import { NgxMaskModule } from 'ngx-mask';










import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from "@angular/material";


import { SupplierComponent } from './supplier/supplier.component';
// import { OrderDetailComponent } from './orderdetail/orderdetail.component';
// import { OrderComponent } from './order/order.component';

import { DropdownModule } from 'primeng/dropdown';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { PersonComponent } from './person/person.component';
import { NoteComponent } from './note/note.component';
// import { ManComponent } from './man/man.component';


// import { OrderDetailsComponent } from './order/order-detail/order-detail.component';





@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CustomerComponent,
    EmployeeComponent,
    ShipperComponent,
    ProductComponent,
    StudentComponent,
    CourseComponent,
    AirportComponent,
    SupplierComponent,
    OrderComponent,
    OrderDetailComponent,
    PersonComponent,
    NoteComponent,
    // ManComponent
    // OrderComponent,
    // OrderDetailsComponent
    // AirportComponent

  ],
  imports: [
    BrowserModule,
    DataTableModule,
    ButtonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    BrowserAnimationsModule,
    CalendarModule,
    MenuModule,
    AppRoutingModule,
    CommonModule,
    RadioButtonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    DropdownModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatNativeDateModule,
    CommonModule, DataTableModule,
    FileUploadModule,
    NgxMaskModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
