import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL: string = "http://localhost:8080/api/v1";

  constructor(public _httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(`${this.baseURL}/employees`);
  }

  createEmployee(payload: Employee): Observable<Object> {
    return this._httpClient.post(`${this.baseURL}/employee`, payload);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this._httpClient.delete(`${this.baseURL}/employee/${id}`);
  }

  getEmployeeById(id: number): Observable<Object> {
    return this._httpClient.get(`${this.baseURL}/employee/${id}`);
  }

  updateEmployee(id: number, payload: Employee): Observable<Object> {
    return this._httpClient.put(`${this.baseURL}/employee/${id}`, payload);
  }

}
