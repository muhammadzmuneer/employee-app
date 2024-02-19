import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from './models/DepartmentModel';
import { EmployeeService } from './_services/employee.service';
import { EmpSearchComponent } from './emp-search/emp-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(EmpSearchComponent) empSearch : EmpSearchComponent | undefined;
  departmentMasterList: Department[] = [];
  title = 'EMPLOYEE APP';

  constructor(private _empService: EmployeeService) { }

  ngOnInit(): void {
    this._empService.GetDepartmentMasterData().subscribe({
      next: (res => this.departmentMasterList = res)
    });
  }

  resetTheForms($event) {
    if($event.index == 1) {
      this.empSearch?.searchForm.reset();
      if(this.empSearch?.resultFlag != undefined) {
        this.empSearch.resultFlag = false;
      }
    }
  }
}
