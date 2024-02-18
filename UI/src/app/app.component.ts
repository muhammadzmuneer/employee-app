import { Component, OnInit } from '@angular/core';
import { Department } from './models/DepartmentModel';
import { EmployeeService } from './_services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  departmentMasterList: Department[] = [];
  title = 'EMPLOYEE APP';

  constructor(private _empService: EmployeeService) { }

  ngOnInit(): void {
    this._empService.GetDepartmentMasterData().subscribe({
      next: (res => this.departmentMasterList = res)
    });
  }

}
