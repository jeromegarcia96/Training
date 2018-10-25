import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../domain/student';
import { StudentService } from '../../services/student.services';
import { DatePipe } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService, DatePipe]
})

export class StudentComponent implements OnInit {
  studentList: Student[];
  selectStudent: Student;
  isAddStudent: boolean;
  indexOfStudent: number = 0;
  isDeleteStudent: boolean;
  studentForm: FormGroup;
  dateEnrolled: Date;
  totalRecords: number = 0;
  searchStudentName: string = "";
  isEnrolled:boolean;


  constructor(private studentService: StudentService,
    private fb: FormBuilder, private datePipe: DatePipe) { }

    @ViewChild('dt') public dataTable: DataTable;


  ngOnInit() {
    this.studentForm = this.fb.group({
      'student_id': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'gpa': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'major': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'religion': new FormControl(),
      'dateEnrolled': new FormControl(),
      'isEnrolled': new FormControl('', Validators.required)
    });

    this.loadAllStudents();
  }

  loadAllStudents() {
 
    this.studentService.getStudent().then(result => {
      this.studentList = result;

      for (let i = 0; i < this.studentList.length; i++) {
        this.studentList[i].dateEnrolled =
          this.datePipe.transform(this.studentList[i].dateEnrolled, 'yyyy-MM-dd'); 
      }
    })
  }

  paginate($event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.studentService.getStudentWithPagination($event.first, $event.rows, this.searchStudentName).then(result => {
      this.totalRecords = result.totalRecords;
      this.studentList = result.results;
    })
  }

  searchStudent() {
    if (this.searchStudentName.length != 1) {
      this.resetTable();
    }
  }

  resetTable() {
    this.dataTable.reset();
  }


  addStudent() {
    this.studentForm.enable();
    this.isAddStudent = true;
    this.isDeleteStudent = false;
    this.selectStudent = {} as Student;
  }

  editStudent(Student) {
    this.studentForm.enable();
    this.isAddStudent = false;
    this.isDeleteStudent = false;
    this.indexOfStudent = this.studentList.indexOf(Student);
    this.selectStudent = Student;
    this.selectStudent = Object.assign({}, this.selectStudent);
    this.dateEnrolled = new Date(this.selectStudent.dateEnrolled);
  

  }

  deleteStudent(Student) {
    this.studentForm.disable();
    this.isDeleteStudent = true;
    this.indexOfStudent = this.studentList.indexOf(Student);
    this.selectStudent = Student;
    this.selectStudent = Object.assign({}, this.selectStudent);
  }

  okDelete() {
    let tmpStudentList = [...this.studentList];
    this.studentService.deleteStudent(this.selectStudent.studentID)
      .then(() => {
        tmpStudentList.splice(this.indexOfStudent, 1);
        this.studentList = tmpStudentList;
        this.selectStudent = null;
      });
  }

  saveStudent() {
    let tmpStudentList = [...this.studentList];

    this.selectStudent.dateEnrolled =
      this.datePipe.transform(this.dateEnrolled, 'yyyy-MM-dd');

  

    if (this.isAddStudent == true) {
      this.studentService.addStudent(this.selectStudent).then(result => {
        result.dateEnrolled =
          this.datePipe.transform(this.dateEnrolled, 'yyyy-MM-dd');
      

        tmpStudentList.push(result);
        this.studentList = tmpStudentList;
        this.selectStudent = null;
      });
    }
    else {
      this.studentService.editStudent(this.selectStudent.studentID,
        this.selectStudent).then(result => {
          result.dateEnrolled =
            this.datePipe.transform(this.dateEnrolled, 'yyyy-MM-dd');
      
          tmpStudentList[this.indexOfStudent] = result;
          this.studentList = tmpStudentList;
          this.selectStudent = null;
        });
    }
  }

  cancelStudent() {
    this.selectStudent = null;
  }
}


