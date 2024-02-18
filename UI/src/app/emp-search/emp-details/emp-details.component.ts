import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})

export class EmpDetailsComponent implements OnInit {
  @Input() employeeDetailsFromSearch: any;
  @Input() departmentMasterList: any;

  ngOnInit(): void {
    this.employeeDetailsFromSearch.departmentId = this.departmentMasterList
      .find(f => f.departmentId == this.employeeDetailsFromSearch.departmentId).departmentName;
  }
}
