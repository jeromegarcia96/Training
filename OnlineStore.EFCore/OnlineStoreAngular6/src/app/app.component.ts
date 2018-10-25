import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems: MenuItem[];
  title = 'OnlineStoreAngular6';

  ngOnInit(): void {
    this.menuItems = [

      // { label: "Category", icon: "fa fa-calendar", routerLink: ['/category'] },
      // { label: "Customer", icon: "fa fa-user", routerLink: ['/customer'] },
      // { label: "Employee", icon: "fa fa-users", routerLink: ['/employee'] },
      // { label: "Shipper", icon: "fa fa-truck", routerLink: ['/shipper'] },
      // { label: "Product", icon: "fa-box", routerLink: ['/product'] },
      // { label: "Student", icon: "fa fa-user", routerLink: ['/student'] },
      // { label: "Course", icon: "fa fa-book", routerLink: ['/course'] },
      // { label: "Airport", icon: "fa fa-plane", routerLink: ['/airport'] },
      // { label: "Supplier", icon: "fa fa-plane", routerLink: ['/supplier'] },
      // { label: "Order", icon: " fa fa-align-justify", routerLink: ['/order'] },
      // { label: "OrderDetail", icon: "fa fa-list", routerLink: ['/orderdetail'] }
      // { label: "Person", icon: " fa fa-align-justify", routerLink: ['/person'] },
      { label: "Note", icon: " fa fa-sticky-note", routerLink: ['/note'] }

    ]
  }
}



