import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(public _employeeService: EmployeeService) { }

  employees!: Employee[]

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._employeeService.getEmployees()
      .subscribe(data => {
        console.log(data);
        this.employees = data;
      })
  }


  deleteEmployee(id: number) {
    this._employeeService.deleteEmployee(id)
      .subscribe(data => {
        console.log(data);
        this.getEmployees();
      })
  }
}
