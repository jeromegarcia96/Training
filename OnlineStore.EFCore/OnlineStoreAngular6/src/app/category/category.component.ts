//#region backup
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Category } from '../../domain/category';
// import { CategoryService } from '../../services/category.services';
// import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
// import { DataTable } from 'primeng/primeng';

// import {MatTableDataSource} from '@angular/material';


// @Component({
//   selector: 'app-category',
//   templateUrl: './category.component.html',
//   styleUrls: ['./category.component.css'],
//   providers: [CategoryService]
// })
// export class CategoryComponent implements OnInit {
//   categoryList: Category[];
//   selectCategory: Category;
//   categoryForm: FormGroup;
//   isAddCategory: boolean;
//   indexOfCategory: number = 0;
//   isDeleteCategory: boolean;
//   totalRecords: number = 0;
//   searchCategoryName: string = "";





//   constructor(private categoryService: CategoryService, private fb: FormBuilder) { }

//   @ViewChild('dt') public dataTable: DataTable;

//   ngOnInit() {
//     this.categoryForm = this.fb.group({
//       'categoryName': new FormControl('', Validators.required),
//       'description': new FormControl('', Validators.required)
//     });

//     // this.loadAllCategories();
//   }

//   loadAllCategories() {
//     this.categoryService.getCategory().then(result => {
//       this.categoryList = result;
//     })
//   }

//   paginate($event) {
//     //event.first = Index of the first record
//     //event.rows = Number of rows to display in new page
//     //event.page = Index of the new page
//     //event.pageCount = Total number of pages

//     this.categoryService.getCategoryWithPagination($event.first, $event.rows, this.searchCategoryName).then(result => {
//       this.totalRecords = result.totalRecords;
//       this.categoryList = result.results;
//     })
//   }

//   searchCategory() {
//     if (this.searchCategoryName.length != 1) {
//       this.resetTable();
//     }
//   }

//   resetTable() {
//     this.dataTable.reset();
//   }

//   addCategory() {
//     this.categoryForm.enable();
//     this.isAddCategory = true;
//     this.isDeleteCategory = false;
//     this.selectCategory = {} as Category;
//   }

//   editCategory(Category) {
//     this.categoryForm.enable();
//     this.isAddCategory = false;
//     this.isDeleteCategory = false;
//     this.indexOfCategory = this.categoryList.indexOf(Category);
//     this.selectCategory = Category;
//     this.selectCategory = Object.assign({}, this.selectCategory);
//   }

//   deleteCategory(Category) {
//     this.categoryForm.disable();
//     this.isDeleteCategory = true;
//     this.indexOfCategory = this.categoryList.indexOf(Category);
//     this.selectCategory = Category;
//     this.selectCategory = Object.assign({}, this.selectCategory);
//   }


//   okDelete() {
//     let tmpCategoryList = [...this.categoryList];
//     this.categoryService.deleteCategory(this.selectCategory.categoryID).then(() => {
//       tmpCategoryList.splice(this.indexOfCategory, 1);
//       this.categoryList = tmpCategoryList;
//       this.selectCategory = null;
//     });
//   }

//   saveCategory() {
//     let tmpCategoryList = [...this.categoryList];
//     if (this.isAddCategory === true) {


//       this.categoryService.addCategory(this.selectCategory).then(result => {
//         tmpCategoryList.push(result);
//         this.categoryList = tmpCategoryList;
//         this.selectCategory = null;
//       });
//     }
//     else {
//       this.categoryService.editCategory(this.selectCategory.categoryID, this.selectCategory).then(result => {
//         tmpCategoryList[this.indexOfCategory] = result;
//         this.categoryList = tmpCategoryList;
//         this.selectCategory = null;
//       });
//     }
//   }

//   cancelCategory() {
//     this.selectCategory = null;
//   }


// }


//#endregion

import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../domain/category';
import { CategoryService } from '../../services/category.services';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  categoryList: Category[];
  selectCategory: Category;
  categoryForm: FormGroup;
  isAddCategory: boolean;
  indexOfCategory: number = 0;
  isDeleteCategory: boolean;
  totalRecords: number = 0;
  searchCategoryName: string = "";



  constructor(private categoryService: CategoryService, private fb: FormBuilder) { }

  @ViewChild('dt') public dataTable: DataTable;

  ngOnInit() {
    this.categoryForm = this.fb.group({
      'categoryName': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    });

    // this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.getCategory().then(result => {
      this.categoryList = result;
    })
  }

  paginate($event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.categoryService.getCategoryWithPagination($event.first, $event.rows, this.searchCategoryName).then(result => {
      this.totalRecords = result.totalRecords;
      this.categoryList = result.results;
    })
  }

  searchCategory() {
    if (this.searchCategoryName.length != 1) {
      this.resetTable();
    }
  }

  resetTable() {
    this.dataTable.reset();
  }

  addCategory() {
    this.categoryForm.enable();
    this.isAddCategory = true;
    this.isDeleteCategory = false;
    this.selectCategory = {} as Category;
  }

  editCategory(Category) {
    this.categoryForm.enable();
    this.isAddCategory = false;
    this.isDeleteCategory = false;
    this.indexOfCategory = this.categoryList.indexOf(Category);
    this.selectCategory = Category;
    this.selectCategory = Object.assign({}, this.selectCategory);
  }

  deleteCategory(Category) {
    this.categoryForm.disable();
    this.isDeleteCategory = true;
    this.indexOfCategory = this.categoryList.indexOf(Category);
    this.selectCategory = Category;
    this.selectCategory = Object.assign({}, this.selectCategory);
  }


  okDelete() {
    let tmpCategoryList = [...this.categoryList];
    this.categoryService.deleteCategory(this.selectCategory.categoryID).then(() => {
      tmpCategoryList.splice(this.indexOfCategory, 1);
      this.categoryList = tmpCategoryList;
      this.selectCategory = null;
    });
  }

  saveCategory() {
    let tmpCategoryList = [...this.categoryList];
    if (this.isAddCategory === true) {


      this.categoryService.addCategory(this.selectCategory).then(result => {
        tmpCategoryList.push(result);
        this.categoryList = tmpCategoryList;
        this.selectCategory = null;
      });
    }
    else {
      this.categoryService.editCategory(this.selectCategory.categoryID, this.selectCategory).then(result => {
        tmpCategoryList[this.indexOfCategory] = result;
        this.categoryList = tmpCategoryList;
        this.selectCategory = null;
      });
    }
  }

  cancelCategory() {
    this.selectCategory = null;
  }


}

