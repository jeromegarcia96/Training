import { Component, OnInit } from '@angular/core';
import { Shipper } from '../../domain/shipper';
import { ShipperService } from '../../services/shipper.services';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css'],
  providers: [ShipperService]
})
export class ShipperComponent implements OnInit {
  shipperList: Shipper[];
  selectShipper: Shipper;
  shipperForm: FormGroup;
  isAddShipper: boolean;
  indexOfShipper: number = 0;
  isDeleteShipper:boolean;

  constructor(private shipperService: ShipperService, private fb: FormBuilder) { }

  ngOnInit() {
    this.shipperForm = this.fb.group({
      'shipperID': new FormControl(),
      'companyName': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required)
    });

    this.loadAllCategories();
  }

  loadAllCategories() {
    this.shipperService.getShipper().then(result => {
      this.shipperList = result;
    })
  }

  addShipper() {
    this.shipperForm.enable();
    this.isAddShipper = true;
    this.isDeleteShipper = false;
    this.selectShipper = {} as Shipper;
  }

  editShipper(Shipper) {
    this.shipperForm.enable();
    this.isAddShipper = false;
    this.isDeleteShipper = false;
    this.indexOfShipper = this.shipperList.indexOf(Shipper);
    this.selectShipper = Shipper;
    this.selectShipper = Object.assign({}, this.selectShipper);
  }

  deleteShipper(Shipper) {
    this.shipperForm.disable();
    this.isDeleteShipper = true;
    this.indexOfShipper = this.shipperList.indexOf(Shipper);
    this.selectShipper = Shipper;
    this.selectShipper = Object.assign({}, this.selectShipper);
  }

  
  okDelete() {
    let tmpShipperList = [...this.shipperList];
    this.shipperService.deleteShipper(this.selectShipper.shipperID).then( () => {
      tmpShipperList.splice(this.indexOfShipper, 1);
      this.shipperList = tmpShipperList;
      this.selectShipper = null;
    });
  }

  saveShipper() {
    let tmpShipperList = [...this.shipperList];
    if(this.isAddShipper === true){
      

      this.shipperService.addShipper(this.selectShipper).then(result => {
        tmpShipperList.push(result);
        this.shipperList = tmpShipperList;
        this.selectShipper = null;
      });
    } 
    else {
      this.shipperService.editShipper(this.selectShipper.shipperID, this.selectShipper).then(result => {
        tmpShipperList[this.indexOfShipper] = result;
        this.shipperList = tmpShipperList;
        this.selectShipper = null;
      });
    }
  }

  cancelShipper() {
    this.selectShipper = null;
  }
}
