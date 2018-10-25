import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Person } from '../../domain/person';
import { PersonService } from '../../services/person.services';
import { DatePipe } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService, DatePipe]
  
})



export class PersonComponent implements OnInit {
  personList: Person[];
  selectPerson: Person;
  isAddPerson: boolean;
  indexOfPerson: number = 0;
  isDeletePerson: boolean;
  personFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  birthday: Date;
  totalRecords: number = 0;
  searchLastName: string = "";
 
  gender: string = "Male";

  todaydate: Date = new Date();


  url = '';
  selectedImage: any;

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }

      this.getImage(this.selectedImage).then(data => {
        this.selectedImage = data;
        let uint8array = new Uint8Array(this.selectedImage);
        let bytes: number[] = {} as number[];
  
        for (let i = 0; i < uint8array.length; i++) {
          bytes[i] = uint8array[i];
        }
  
        this.selectedImage = bytes;
      });
    }
  }

  getImage(myImage: File) {

		var loadedPromise = new Promise((resolve, reject) => {

			var reader = new FileReader();
			reader.readAsArrayBuffer(myImage)
			reader.onload = (event: any) => resolve(event.target.result);

		});

		return loadedPromise;
	}


  constructor(private personService: PersonService,
    private fb: FormBuilder, private datePipe: DatePipe) { }

  @ViewChild('dt') public dataTable: DataTable;


  @Input()
  hintLabel: string
  


  ngOnInit() {
    this.personFormGroup = this.fb.group({
      // 'personId': new FormControl(),
      'firstName': new FormControl('', Validators.required),
      'middleName': new FormControl(),
      'lastName': new FormControl('', Validators.required),
      'age': new FormControl(),
      'birthday': new FormControl({ value: '', disabled: true }, Validators.required),
      'photo': new FormControl(),
      'gender': new FormControl('', Validators.required),
      'relationshipStatus': new FormControl('', Validators.required),
      'nationality': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required),
      'religion': new FormControl(),
    });

    this.addressFormGroup = this.fb.group({
      'streetHouseNumBuilding': new FormControl('', Validators.required),
      'brgySubdv': new FormControl(),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'latitude': new FormControl('', Validators.required),
      'longitude': new FormControl('', Validators.required),
    });

    


    this.loadAllPersons();
  }

  loadAllPersons() {


    this.personService.getPerson().then(result => {
      this.personList = result;



      for (let i = 0; i < this.personList.length; i++) {
         this.personList[i].birthday =
          this.datePipe.transform(this.personList[i].birthday, 'yyyy-MM-dd');

   

      }


    })
  }

  paginate($event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.personService.getPersonWithPagination($event.first, $event.rows, this.searchLastName).then(result => {
      this.totalRecords = result.totalRecords;
      this.personList = result.results;
    })
  }

  searchPerson() {
    if (this.searchLastName.length != 1) {
      this.resetTable();
    }
  }

  resetTable() {
    this.dataTable.reset();
  }


  addPerson() {
    this.personFormGroup.enable();
    this.isAddPerson = true;
    this.isDeletePerson = false;
    this.selectPerson = {} as Person;

    this.url = '';

  }

  editPerson(Person) {
    this.personFormGroup.enable();
    this.isAddPerson = false;
    this.isDeletePerson = false;
    this.indexOfPerson = this.personList.indexOf(Person);
    this.selectPerson = Person;
    this.selectPerson = Object.assign({}, this.selectPerson);
    this.birthday = new Date(this.selectPerson.birthday);

  }

  deletePerson(Person) {
    this.personFormGroup.disable();
    this.isDeletePerson = true;
    this.indexOfPerson = this.personList.indexOf(Person);
    this.selectPerson = Person;
    this.selectPerson = Object.assign({}, this.selectPerson);
  }

  okDelete() {
    let tmpPersonList = [...this.personList];
    this.personService.deletePerson(this.selectPerson.personId)
      .then(() => {
        tmpPersonList.splice(this.indexOfPerson, 1);
        this.personList = tmpPersonList;
        this.selectPerson = null;
      });
  }

  savePerson() {
    let tmpPersonList = [...this.personList];

    this.selectPerson.birthday =
    this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');



    if (this.isAddPerson == true) {
      this.personService.addPerson(this.selectPerson).then(result => {
        result.birthday =
          this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');


        tmpPersonList.push(result);
        this.personList = tmpPersonList;
        this.selectPerson = null;
      });
    }
    else {
      this.personService.editPerson(this.selectPerson.personId,
        this.selectPerson).then(result => {
          result.birthday =
          this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');

          tmpPersonList[this.indexOfPerson] = result;
          this.personList = tmpPersonList;
          this.selectPerson = null;
        });
    }
  }

  cancelPerson() {
    this.selectPerson = null;
  }

  // onFileSelected(event) {
	// 	this.selectedImage = event.target.files[0];

	// 	this.getImage(this.selectedImage).then(data => {
	// 		this.selectedImage = data;
	// 		let uint8array = new Uint8Array(this.selectedImage);
	// 		let bytes: number[] = {} as number[];

	// 		for (let i = 0; i < uint8array.length; i++) {
	// 			bytes[i] = uint8array[i];
	// 		}

	// 		this.selectedImage = bytes;
	// 	});
	// }

	// getImage(myImage: File) {

	// 	var loadedPromise = new Promise((resolve, reject) => {

	// 		var reader = new FileReader();
	// 		reader.readAsArrayBuffer(myImage)
	// 		reader.onload = (event: any) => resolve(event.target.result);

	// 	});

	// 	return loadedPromise;
	// }

}

