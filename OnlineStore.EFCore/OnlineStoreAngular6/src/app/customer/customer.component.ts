import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../services/customer.services';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  customerList: Customer[];
  selectCustomer: Customer;
  customerForm: FormGroup;
  isAddCustomer: boolean;
  indexOfCustomer: number = 0;
  isDeleteCustomer:boolean;

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }



  ngOnInit() {
    this.customerForm = this.fb.group({
      'customerID': new FormControl(''),
      'companyName': new FormControl('', Validators.required),
      'contactName': new FormControl('', Validators.required),
      'contactTitle': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fax': new FormControl('', Validators.required)
    
    });

    this.loadAllCategories();
  }

  loadAllCategories() {
    this.customerService.getCustomer().then(result => {
      this.customerList = result;
    })
  }

  addCustomer() {
    this.customerForm.enable();
    this.isAddCustomer = true;
    this.isDeleteCustomer = false;
    this.selectCustomer = {} as Customer;
  }

  editCustomer(Customer) {
    this.customerForm.enable();
    this.isAddCustomer = false;
    this.isDeleteCustomer = false;
    this.indexOfCustomer = this.customerList.indexOf(Customer);
    this.selectCustomer = Customer;
    this.selectCustomer = Object.assign({}, this.selectCustomer);
  }

  deleteCustomer(Customer) {
    this.customerForm.disable();
    this.isDeleteCustomer = true;
    this.indexOfCustomer = this.customerList.indexOf(Customer);
    this.selectCustomer = Customer;
    this.selectCustomer = Object.assign({}, this.selectCustomer);
  }

  
  okDelete() {
    let tmpCustomerList = [...this.customerList];
    this.customerService.deleteCustomer(this.selectCustomer.customerID).then( () => {
      tmpCustomerList.splice(this.indexOfCustomer, 1);
      this.customerList = tmpCustomerList;
      this.selectCustomer = null;
    });
  }

  saveCustomer() {
    let tmpCustomerList = [...this.customerList];
    if(this.isAddCustomer === true){
      

      this.customerService.addCustomer(this.selectCustomer).then(result => {
        tmpCustomerList.push(result);
        this.customerList = tmpCustomerList;
        this.selectCustomer = null;
      });
    } 
    else {
      this.customerService.editCustomer(this.selectCustomer.customerID, this.selectCustomer).then(result => {
        tmpCustomerList[this.indexOfCustomer] = result;
        this.customerList = tmpCustomerList;
        this.selectCustomer = null;
      });
    }
  }

  cancelCustomer() {
    this.selectCustomer = null;
  }
}
