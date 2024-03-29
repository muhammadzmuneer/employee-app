import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/EmployeeModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { MessageService } from 'primeng/api';
import { ApplicationConstants } from '../constants/app-constants';

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
          this._message.add({ severity: 'success', summary: 'Success', detail: ApplicationConstants.SEARCH_SUCCESS });
        }
        else {
          this.resultFlag = false;
          this._message.add({ severity: 'error', summary: 'Error', detail: ApplicationConstants.SEARCH_NODATA });
          this.searchForm.reset();
        }
      },
      error: () => this._message.add({ severity: 'error', summary: 'Error', detail: ApplicationConstants.SEARCH_ERROR }),
      complete: () => this.loading = false
    });
    setTimeout(() => {
      this.loading = false
    }, 2000);
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
