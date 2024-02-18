import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  GetDepartmentMasterData() : Observable<any> {
    return this.http.get(this.baseUrl + 'employees/GetDepartmentMasterData');
  }

  RegisterEmployee(employeeModel : Employee) : Observable<any> {
    return this.http.post(this.baseUrl + 'employees/RegisterEmployee',employeeModel);
  }

  GetEmployeeDetails(employeeName: string) : Observable<any> {
    return this.http.get(this.baseUrl + 'employees/GetEmployeeDetails/'+employeeName);
  }
}
