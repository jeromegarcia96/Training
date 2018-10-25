import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../domain/course';
import { CourseService } from '../../services/course.services';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [CourseService]
})
export class CourseComponent implements OnInit {
  courseList: Course[];
  selectCourse: Course;
  courseForm: FormGroup;
  isAddCourse: boolean;
  indexOfCourse: number = 0;
  isDeleteCourse: boolean;
  totalRecords: number = 0;
  searchCourseName: string = "";

  constructor(private courseService: CourseService, private fb: FormBuilder) { }

  @ViewChild('dt') public dataTable: DataTable;

  ngOnInit() {
    this.courseForm = this.fb.group({
      'courseID': new FormControl(''),
      'courseName': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'creditUnit': new FormControl('', Validators.required),
      'creditHours': new FormControl('', Validators.required),
      'instructionID': new FormControl('', Validators.required),
      'room': new FormControl('', Validators.required),
      'studentsInClass': new FormControl('', Validators.required),
      'department': new FormControl('', Validators.required),
      'description': new FormControl(),
      'isLecture': new FormControl('', Validators.required),
      'isLaboratory': new FormControl('', Validators.required)
    });

    // this.loadAllCategories();
  }

  loadAllCategories() {
    this.courseService.getCourse().then(result => {
      this.courseList = result;
    })
  }

  paginate($event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.courseService.getCourseWithPagination($event.first, $event.rows, this.searchCourseName).then(result => {
      this.totalRecords = result.totalRecords;
      this.courseList = result.results;
    })
  }

  searchCourse() {
    if (this.searchCourseName.length != 1) {
      this.resetTable();
    }
  }

  resetTable() {
    this.dataTable.reset();
  }

  addCourse() {
    this.courseForm.enable();
    this.isAddCourse = true;
    this.isDeleteCourse = false;
    this.selectCourse = {} as Course;
  }

  editCourse(Course) {
    this.courseForm.enable();
    this.isAddCourse = false;
    this.isDeleteCourse = false;
    this.indexOfCourse = this.courseList.indexOf(Course);
    this.selectCourse = Course;
    this.selectCourse = Object.assign({}, this.selectCourse);
  }

  deleteCourse(Course) {
    this.courseForm.disable();
    this.isDeleteCourse = true;
    this.indexOfCourse = this.courseList.indexOf(Course);
    this.selectCourse = Course;
    this.selectCourse = Object.assign({}, this.selectCourse);
  }


  okDelete() {
    let tmpCourseList = [...this.courseList];
    this.courseService.deleteCourse(this.selectCourse.courseID).then(() => {
      tmpCourseList.splice(this.indexOfCourse, 1);
      this.courseList = tmpCourseList;
      this.selectCourse = null;
    });
  }

  saveCourse() {
    let tmpCourseList = [...this.courseList];
    if (this.isAddCourse === true) {


      this.courseService.addCourse(this.selectCourse).then(result => {
        tmpCourseList.push(result);
        this.courseList = tmpCourseList;
        this.selectCourse = null;
      });
    }
    else {
      this.courseService.editCourse(this.selectCourse.courseID, this.selectCourse).then(result => {
        tmpCourseList[this.indexOfCourse] = result;
        this.courseList = tmpCourseList;
        this.selectCourse = null;
      });
    }
  }

  cancelCourse() {
    this.selectCourse = null;
  }
}
