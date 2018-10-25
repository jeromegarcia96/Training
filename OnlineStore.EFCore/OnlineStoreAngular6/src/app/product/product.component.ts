// import { Component, OnInit } from '@angular/core';
// import { Product } from '../../domain/product';
// import { ProductService } from '../../services/product.services';
// import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
// import { SupplierService } from 'src/services/supplier.services';
// import { CategoryService } from 'src/services/category.services';
// import { PaginatorModule } from 'primeng/primeng';
// import { Supplier } from 'src/domain/supplier';
// import { Category } from 'src/domain/category';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css'],
//   providers: [ProductService, SupplierService, CategoryService]
// })
// export class ProductComponent implements OnInit {
//   productList: Product[];
//   selectProduct: Product;
//   productForm: FormGroup;
//   isAddProduct: boolean;
//   indexOfProduct: number = 0;
//   isDeleteProduct: boolean;
//   totalRecords: number = 0;
//   searchProductName: string = "";
//   supplierList: Supplier[];
//   selectSupplier: Supplier;
//   categoryList: Category[];
//   selectCategory: Category;

//   constructor(private productService: ProductService, private fb: FormBuilder, private supplierService: SupplierService, private categoryService: CategoryService) { }


//   // <p-column field="productID" header="Product ID"></p-column>
//   // <p-column field="productName" header="Product Name"></p-column>
//   // <p-column field="supplierID" header="Supplier ID"></p-column>
//   // <p-column field="categoryID" header="Category ID"></p-column>
//   // <p-column field="unitsInStock" header="Units in stock"></p-column>
//   // <p-column field="unitPrice" header="Unit Price"></p-column>
//   // <p-column field="unitsOnOrder" header="Units on order"></p-column>
//   // <p-column field="reorderLevel" header="Reorder Level"></p-column>
//   // <p-column field="discontinued" header="Discontinued"></p-column>


//   ngOnInit() {
//     this.productForm = this.fb.group({
//       'productID': new FormControl(),
//       'productName': new FormControl(),
//       'supplier': new FormControl(),
//       'category': new FormControl(),
//       'unitsInStock': new FormControl(),
//       'unitPrice': new FormControl(),
//       'unitsOnOrder': new FormControl(),
//       'reorderLevel': new FormControl(),
//       'discontinued': new FormControl()
//     });

//     this.loadAllProducts();
//   }


//   loadAllProducts() {
//     this.categoryService.getCategory().then(categories => {
//       this.categoryList = categories;
//       this.supplierService.getSupplier().then(suppliers => {
//         this.supplierList = suppliers;
//         this.productService.getProduct().then(result => {
      
//           this.totalRecords = result.length;
//           this.productList = result;

//           for(var i=0; i < this.productList.length; i++) {
//             this.productList[i].supplierName = this.supplierList.find(x => x.supplierID ==
//             this.productList[i].supplierID).companyName;

//             this.productList[i].categoryName = this.categoryList.find(x => x.categoryID ==
//             this.productList[i].categoryID).categoryName;
//             // console.log(this.productList[i]);
//           }
//         });
//       });
//     }
//   }


//   // loadAllCategories() {
//   //   this.productService.getProduct().then(result => {
//   //     this.productList = result;
//   //   })
//   // }

//   addProduct() {
//     this.productForm.enable();
//     this.isAddProduct = true;
//     this.isDeleteProduct = false;
//     this.selectProduct = {} as Product;
//     this.selectCategory = {} as Category;
//     this.selectSupplier= {} as Supplier;
//   }

//   editProduct(Product) {
//     this.productForm.enable();
//     this.isAddProduct = false;
//     this.isDeleteProduct = false;
//     this.indexOfProduct = this.productList.indexOf(Product);
//     this.selectProduct = Product;

//     this.selectCategory = this.categoryList.find(x => x.categoryID == this.selectProduct.categoryID);
//     this.selectSupplier = this.supplierList.find(x => x.supplierID == this.selectProduct.supplierID);
//     this.selectProduct = Object.assign({}, this.selectProduct);
//   }

//   deleteProduct(Product) {
//     this.productForm.disable();
//     this.isDeleteProduct = true;
//     this.indexOfProduct = this.productList.indexOf(Product);
//     this.selectProduct = Product;
//     this.selectProduct = Object.assign({}, this.selectProduct);


//     this.selectCategory = this.categoryList.find(x => x.categoryID == this.selectProduct.categoryID);
//     this.selectSupplier = this.supplierList.find(x => x.supplierID == this.selectProduct.supplierID);
//     this.selectProduct = Object.assign({}, this.selectProduct);
//   }


//   okDelete() {
//     let tmpProductList = [...this.productList];
//     this.productService.deleteProduct(this.selectProduct.productID).then(() => {
//       tmpProductList.splice(this.indexOfProduct, 1);
//       this.productList = tmpProductList;
//       this.selectProduct = null;
//     });
//   }

//   saveProduct() {
//     let tmpProductList = [...this.productList];
//     if (this.isAddProduct === true) {

//       this.selectProduct.supplierID = this.selectSupplier.supplierID;
//       this.selectProduct.categoryID = this.selectCategory.categoryID;

//       this.productService.addProduct(this.selectProduct).then(result => {
//         tmpProductList.push(result);
//         this.productList = tmpProductList;

        
//         for(var i=0; i < this.productList.length; i++) {
//           this.productList[i].supplierName = this.supplierList.find(x => x.supplierID ==
//           this.productList[i].supplierID).companyName;

//           this.productList[i].categoryName = this.categoryList.find(x => x.categoryID ==
//           this.productList[i].categoryID).categoryName;
//           // console.log(this.productList[i]);
//         }

//         this.selectProduct = null;
//       });
//     }
//     else {
//       this.productService.editProduct(this.selectProduct.productID, this.selectProduct).then(result => {
//         tmpProductList[this.indexOfProduct] = result;
//         this.productList = tmpProductList;


//         for(var i=0; i < this.productList.length; i++) {
//           this.productList[i].supplierName = this.supplierList.find(x => x.supplierID ==
//           this.productList[i].supplierID).companyName;

//           this.productList[i].categoryName = this.categoryList.find(x => x.categoryID ==
//           this.productList[i].categoryID).categoryName;
//           // console.log(this.productList[i]);
//         }

//         this.selectProduct = null;
//       });
//     }
//   }

//   cancelProduct() {
//     this.selectProduct = null;
//   }
// }



import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.services';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SupplierService } from 'src/services/supplier.services';
import { CategoryService } from 'src/services/category.services';
import { PaginatorModule, DataTable } from 'primeng/primeng';
import { Supplier } from 'src/domain/supplier';
import { Category } from 'src/domain/category';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, SupplierService, CategoryService]
})
export class ProductComponent implements OnInit {
  productList: Product[];
  selectProduct: Product;
  productForm: FormGroup;
  isAddProduct: boolean;
  indexOfProduct: number = 0;
  isDeleteProduct: boolean;
  supplierList: Supplier[];
  selectSupplier: Supplier;
  categoryList: Category[];
  selectCategory: Category;
  totalRecords: number = 0;
  searchProductName: string = "";

  constructor(private productService: ProductService, private fb: FormBuilder,
    private supplierService: SupplierService, private categoryService: CategoryService) { }

  @ViewChild('dt') public dataTable: DataTable;
  ngOnInit() {
    this.productForm = this.fb.group({
      'supplier': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'productName': new FormControl('', Validators.required),
      'quantityPerUnit': new FormControl('', Validators.required),
      'unitPrice': new FormControl('', Validators.required),
      'unitsOnOrder': new FormControl('', Validators.required),
      'unitsInStock': new FormControl('', Validators.required),
      'reorderLevel': new FormControl('', Validators.required),
      'discontinued': new FormControl('', Validators.required),

    });

    this.loadAllProducts();
  }

  loadAllProducts() {

    this.categoryService.getCategory().then(categories => {
      this.categoryList = categories;
      this.supplierService.getSupplier().then(suppliers => {
        this.supplierList = suppliers;
        this.productService.getProduct().then(result => {
          this.productList = result;

          for(var i = 0 ; i < this.productList.length; i++){
            this.productList[i].supplierName = this.supplierList.find(su => su.supplierID == 
              this.productList[i].supplierID).companyName;
              this.productList[i].categoryName = this.categoryList.find(su => su.categoryID == 
                this.productList[i].categoryID).categoryName;  
          }
        })
      });
    });

    
  }

  paginate($event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.productService.getProductWithPagination($event.first, $event.rows, this.searchProductName)
      .then(result => {
        this.totalRecords = result.totalRecords;
        this.productList = result.results;

      })
  }

  searchProduct() {
    if(this.searchProductName.length != 1) {
      this.resetTable();
    }
  }

  resetTable() {
    this.dataTable.reset();
  }

  addProduct() {
    this.productForm.enable();
    this.isDeleteProduct = false;
    this.isAddProduct = true;
    this.selectProduct = {} as Product;
    this.selectCategory = {} as Category;
    this.selectSupplier = {} as Supplier;
    
  }

 
  editProduct(Product) {
    this.productForm.enable();
    this.isDeleteProduct = false;
    this.indexOfProduct = this.productList.indexOf(Product);
    this.isAddProduct = false;
    this.selectProduct = Product;

    this.selectCategory = this.categoryList.find(su => su.categoryID == this.selectProduct.categoryID);
    this.selectSupplier = this.supplierList.find(su => su.supplierID == this.selectSupplier.supplierID);
    this.selectProduct = Object.assign({}, this.selectProduct);    
  }

  deleteProduct(Product) {
    this.productForm.disable();
    this.isDeleteProduct = true;
    this.indexOfProduct = this.productList.indexOf(Product);
    this.selectProduct = Product;

    this.selectCategory = this.categoryList.find(su => su.categoryID == this.selectProduct.categoryID);
    this.selectSupplier = this.supplierList.find(su => su.supplierID == this.selectSupplier.supplierID);
    this.selectProduct = Object.assign({}, this.selectProduct);  
  }

  okDelete() {
    let tmpProductList = [...this.productList];
    this.productService.deleteProduct(this.selectProduct.productID)
        .then(() => {
          tmpProductList.splice(this.indexOfProduct, 1);
          this.productList = tmpProductList;
          this.selectProduct = null;
        });
  }


  saveProduct() {
    let tmpProductList = [...this.productList];

    this.selectProduct.supplierID = this.selectSupplier.supplierID;
    this.selectProduct.categoryID = this.selectCategory.categoryID;

    if (this.isAddProduct == true) {
      this.productService.addProduct(this.selectProduct).then(result => {
        tmpProductList.push(result);
        this.productList = tmpProductList;

        for(var i = 0 ; i < this.productList.length; i++){
          this.productList[i].supplierName = this.supplierList.find(su => su.supplierID == 
            this.productList[i].supplierID).companyName;
            this.productList[i].categoryName = this.categoryList.find(su => su.categoryID == 
              this.productList[i].categoryID).categoryName;  
        }

        this.selectProduct = null; 
      });
    }
    else {
      this.productService.editProduct(this.selectProduct.productID, this.selectProduct).then(result => {
        tmpProductList[this.indexOfProduct] = result;
        this.productList = tmpProductList;

        for(var i = 0 ; i < this.productList.length; i++){
          this.productList[i].supplierName = this.supplierList.find(su => su.supplierID == 
            this.productList[i].supplierID).companyName;
            this.productList[i].categoryName = this.categoryList.find(su => su.categoryID == 
              this.productList[i].categoryID).categoryName;  
        }
        
        this.selectProduct = null; 
      });
    }
    
  }

  cancelProduct() {
    this.selectProduct = null;
  }
}