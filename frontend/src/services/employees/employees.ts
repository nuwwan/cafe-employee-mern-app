import axios, { Axios } from "axios";
import { EmployeeType } from "../../utils/types";

export class Employees {
  _url: string;
  _network: Axios;

  constructor() {
    this._url = "http://localhost:4000/api/employee";
    this._network = axios;
  }

  addEmployee = (employee: EmployeeType) => {
    return this._network.post(`${this._url}`, employee);
  };

  getEmployees = (cafe?: string) => {
    const url = cafe ? `${this._url}?cafe=${cafe}` : this._url;
    return this._network.get(url);
  };

  deleteEmployee = (employeeId: string) => {
    return this._network.delete(`${this._url}/${employeeId}`);
  };

  updateEmployee = (employee: EmployeeType) => {
    return this._network.put(`${this._url}/${employee.employeeId}`, employee);
  };
}
