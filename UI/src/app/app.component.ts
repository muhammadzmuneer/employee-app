import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from './models/DepartmentModel';
import { EmployeeService } from './_services/employee.service';
import { EmpSearchComponent } from './emp-search/emp-search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(EmpSearchComponent) empSearch : EmpSearchComponent | undefined;
  departmentMasterList: Department[] = [];
  title = 'EMPLOYEE APP';

  constructor(private _empService: EmployeeService, private _router: Router) { }

  ngOnInit(): void {
    this._empService.GetDepartmentMasterData().subscribe({
      next: (res => this.departmentMasterList = res)
    });
  }

  navigateToRoute($event) {
    let index = $event?.index == null || $event?.index == undefined ? 0 : $event.index;
    if(index == 1) {
      this.empSearch?.searchForm.reset();
      if(this.empSearch?.resultFlag != undefined) {
        this.empSearch.resultFlag = false;
      }
      this._router.navigate(["./search"]);
    }
    else {
      this._router.navigate(["./register"]);
    }
  }
}
