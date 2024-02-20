import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/EmployeeModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  GetDepartmentMasterData() : Observable<any> {
    return this.http.get(this.baseApiUrl + 'employees/GetDepartmentMasterData');
  }

  RegisterEmployee(employeeModel : Employee) : Observable<any> {
    return this.http.post(this.baseApiUrl + 'employees/RegisterEmployee',employeeModel);
  }

  GetEmployeeDetails(employeeName: string) : Observable<any> {
    return this.http.get(this.baseApiUrl + 'employees/GetEmployeeDetails/'+employeeName);
  }
}
