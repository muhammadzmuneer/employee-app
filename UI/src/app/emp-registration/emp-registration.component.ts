import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/EmployeeModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { MessageService } from 'primeng/api';

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
          this._message.add({ severity: 'success', summary: 'Success', detail: 'Employee Registered Successfully'})
        }
        else {
          this._message.add({ severity: 'error', summary: 'Error', detail: 'Error while registering the employee'})
        }
      } ,
      error: () => this._message.add({ severity: 'error', summary: 'Error', detail: 'Error while registering the employee'}),
    });

    setTimeout(() => {
        this.loading = false
    }, 2000);
}
}
