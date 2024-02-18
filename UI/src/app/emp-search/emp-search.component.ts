import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/EmployeeModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css'],
  providers: [MessageService]
})

export class EmpSearchComponent implements OnInit {
  @Input() departmentMasterList: any;
  loading: boolean = false;
  employeeDetails: Employee = new Employee;
  resultFlag: boolean = false;

  searchForm: FormGroup = this._fb.group({
    employeeName: ['', Validators.required]
  });

  constructor(private _fb: FormBuilder, 
    private _empService: EmployeeService,
    private _message: MessageService) { }

  ngOnInit(): void {

  }

  searchEmployee() {
    this.loading = true;
    var employeeName = this.searchForm.controls['employeeName'].value.trim();
    this._empService.GetEmployeeDetails(employeeName).subscribe({
      next: (res) => {
        if (res != null && res != undefined) {
          this.employeeDetails = res;
          this.resultFlag = true;
          this._message.add({ severity: 'success', summary: 'Success', detail: 'Employee Details fetched successfully' })
        }
        else {
          this.resultFlag = false;
          this._message.add({ severity: 'error', summary: 'Error', detail: 'No Details found' })
        }
      },
      error: () => this._message.add({ severity: 'error', summary: 'Error', detail: 'Error while fetching employee details' }),
      complete: () => this.loading = false
    });
    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

}
