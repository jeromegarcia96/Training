import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../domain/supplier';
import { SupplierService } from '../../services/supplier.services';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [SupplierService]
})
export class SupplierComponent implements OnInit {
  supplierList: Supplier[];
  selectSupplier: Supplier;
  supplierForm: FormGroup;
  isAddSupplier: boolean;
  indexOfSupplier: number = 0;
  isDeleteSupplier:boolean;

  constructor(private supplierService: SupplierService, private fb: FormBuilder) { }

  ngOnInit() {
    this.supplierForm = this.fb.group({
      'supplierID': new FormControl(),
      'companyName': new FormControl('', Validators.required),
      'contactName': new FormControl('', Validators.required),
      'contactTitle': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fax': new FormControl('', Validators.required),
      'homePage': new FormControl('', Validators.required),
    });

    this.loadAllCategories();
  }

  loadAllCategories() {
    this.supplierService.getSupplier().then(result => {
      this.supplierList = result;
    })
  }

  addSupplier() {
    this.supplierForm.enable();
    this.isAddSupplier = true;
    this.isDeleteSupplier = false;
    this.selectSupplier = {} as Supplier;
  }

  editSupplier(Supplier) {
    this.supplierForm.enable();
    this.isAddSupplier = false;
    this.isDeleteSupplier = false;
    this.indexOfSupplier = this.supplierList.indexOf(Supplier);
    this.selectSupplier = Supplier;
    this.selectSupplier = Object.assign({}, this.selectSupplier);
  }

  deleteSupplier(Supplier) {
    this.supplierForm.disable();
    this.isDeleteSupplier = true;
    this.indexOfSupplier = this.supplierList.indexOf(Supplier);
    this.selectSupplier = Supplier;
    this.selectSupplier = Object.assign({}, this.selectSupplier);
  }

  
  okDelete() {
    let tmpSupplierList = [...this.supplierList];
    this.supplierService.deleteSupplier(this.selectSupplier.supplierID).then( () => {
      tmpSupplierList.splice(this.indexOfSupplier, 1);
      this.supplierList = tmpSupplierList;
      this.selectSupplier = null;
    });
  }

  saveSupplier() {
    let tmpSupplierList = [...this.supplierList];
    if(this.isAddSupplier === true){
      

      this.supplierService.addSupplier(this.selectSupplier).then(result => {
        tmpSupplierList.push(result);
        this.supplierList = tmpSupplierList;
        this.selectSupplier = null;
      });
    } 
    else {
      this.supplierService.editSupplier(this.selectSupplier.supplierID, this.selectSupplier).then(result => {
        tmpSupplierList[this.indexOfSupplier] = result;
        this.supplierList = tmpSupplierList;
        this.selectSupplier = null;
      });
    }
  }

  cancelSupplier() {
    this.selectSupplier = null;
  }
}
