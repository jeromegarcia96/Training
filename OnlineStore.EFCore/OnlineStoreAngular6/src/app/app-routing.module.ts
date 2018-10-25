import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShipperComponent } from './shipper/shipper.component';
import { ProductComponent } from './product/product.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { AirportComponent } from './airport/airport.component';
import { SupplierComponent } from './supplier/supplier.component';
import { OrderComponent } from './order/order.component';
import {OrderDetailComponent} from './order/order-detail/order-detail.component'
import { PersonComponent } from './person/person.component';
import { NoteComponent } from './note/note.component';


const routes: Routes = [
  { path: '', redirectTo: '/note', pathMatch: 'full' },
  { path: 'note', component: NoteComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'shipper', component: ShipperComponent },
  { path: 'product', component: ProductComponent },
  { path: 'student', component: StudentComponent },
  { path: 'course', component: CourseComponent },
  { path: 'airport', component: AirportComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'person', component: PersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

