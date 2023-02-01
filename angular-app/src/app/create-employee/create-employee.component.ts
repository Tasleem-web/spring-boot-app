import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  employee = new Employee();
  isUpdateMode: boolean = false

  public createEmployee!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public _employeeService: EmployeeService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.employeeFormCreation();
    this._activatedRoute.params.subscribe((params: Params) => {
      console.log(params['id']);
      let id = params['id'];
      if (id) {
        this.getEmployeeById(id);
      }
    });

  }

  employeeFormCreation() {
    this.createEmployee = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
    });
  }

  getEmployeeById(id: number) {
    this._employeeService.getEmployeeById(id)
      .subscribe((data) => {
        console.log(data);
        this.createEmployee.patchValue(data);
        this.isUpdateMode = true
      })
  }
  saveEmployeeForm() {
    if (this.isUpdateMode) {
      this._employeeService.updateEmployee(this.createEmployee.value.id, this.createEmployee.value)
        .subscribe(data => {
          console.log(data);
          this.goToEmployeeList();
        }, error => {
          console.log(error);
        }, () => {
          console.log("Completed");
        })
    } else {

      this._employeeService.createEmployee(this.createEmployee.value)
        .subscribe(data => {
          console.log(data);
          this.goToEmployeeList();
        }, error => {
          console.log(error);
        }, () => {
          console.log("Completed");
        })
    }
  }

  goToEmployeeList() {
    this._router.navigate(['/'])
  }

}
