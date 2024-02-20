import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/EmployeeModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { MessageService } from 'primeng/api';
import { ApplicationConstants } from '../constants/app-constants';

@Component({
  selector: 'app-emp-registration',
  templateUrl: './emp-registration.component.html',
  styleUrls: ['./emp-registration.component.css'],
  providers: [MessageService]
})

export class EmpRegistrationComponent implements OnInit {
 @Input() departmentMasterList: any;
  loading: boolean = false;
  employeeForm: Employee = new Employee;
  maxDate = new Date();
  isCalenderInvalid = false;
  isDropdownInvalid = false;

  registrationForm : FormGroup = this._fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',Validators.required],
    dob: ['',Validators.required],
    department: ['',Validators.required]
  });

  constructor(private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _message: MessageService) {}

  ngOnInit(): void {

  }

  registerEmployee() {
    this.loading = true;
    this.employeeForm.FirstName = this.registrationForm.controls['firstName'].value.trim();
    this.employeeForm.LastName = this.registrationForm.controls['lastName'].value.trim();
    this.employeeForm.Email = this.registrationForm.controls['email'].value.trim();
    this.employeeForm.DepartmentId = this.registrationForm.controls['department'].value;
    this.employeeForm.Dob = this.registrationForm.controls['dob'].value;

    this._empService.RegisterEmployee(this.employeeForm).subscribe({
      next: (res)=>{
        if(res) {
          this._message.add({ severity: 'success', summary: 'Success', detail: ApplicationConstants.REGISTER_SUCCESS});
          this.registrationForm.reset();
        }
        else {
          this._message.add({ severity: 'error', summary: 'Error', detail: ApplicationConstants.REGISTER_ERROR});
        }
      } ,
      error: () => this._message.add({ severity: 'error', summary: 'Error', detail: ApplicationConstants.REGISTER_ERROR}),
    });

    setTimeout(() => {
        this.loading = false
    }, 2000);
  }

  checkDuplicateEmployeeRegistration() {
    this._empService.GetEmployeeDetails(this.registrationForm.controls['firstName'].value.trim()).subscribe({
      next: (res) => {
        if (res != null && res != undefined) {
          if(this.registrationForm.controls['lastName'].value.trim().toLowerCase() == res.lastName.toLowerCase() &&
            this.registrationForm.controls['email'].value.trim().toLowerCase() == res.email.toLowerCase()) {
            this._message.add({ severity: 'error', summary: 'Error', detail: ApplicationConstants.REGISTER_DUPLICATE });
            this.registrationForm.reset();
          }
          else {
            this.registerEmployee();
          }
        }
        else {
          this.registerEmployee();
        }
      }
    });
  }

  validateDateField() {
    this.isCalenderInvalid = this.registrationForm.controls['dob'].invalid;
  }

  validateDropdown() {
    this.isDropdownInvalid = this.registrationForm.controls['department'].invalid;
  }

  onlyAlphabetsAndSpace($event) {
    var charCode = $event.keyCode;

    if((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32) {
      return true;
    }
    else {
      return false;
    }  
  }

  pasteEvent(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let data = clipboardData?.getData('text');
    var regEx = new RegExp(/^[a-zA-Z ]*$/);
    if ((data != null && data != undefined) && (!regEx.test(data) || data.length >50)) {
      event.preventDefault();
      this._message.add({ severity: 'error', summary: 'Error', detail: ApplicationConstants.INVALID_DATA })
    }
  }
}
