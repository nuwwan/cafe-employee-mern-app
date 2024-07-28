import { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { AlertMessage, Status } from "../../utils/constant";
import {
  addEmployeeReset,
  deleteEmployeeReset,
  updateEmployeeReset,
} from "../../store/employees/actions";

import {
  addEmployeeSelector,
  deleteEmployeeSelector,
  updateEmployeeSelector,
} from "../../store/employees/selectors";
import { ResetAction } from "../../utils/types";

export const enum EmployeeAlertMessage {
  ADD_SUCCESS = "Employee added successfully",
  ADD_ERROR = "Error adding employee",
  UPDATE_SUCCESS = "Employee updated successfully",
  UPDATE_ERROR = "Error updating employee",
  DELETE_SUCCESS = "Employee deleted successfully",
  DELETE_ERROR = "Error deleting employee",
}

const Alert = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const addEmployee = useSelector(addEmployeeSelector);
  const deleteEmployee = useSelector(deleteEmployeeSelector);
  const updateEmployee = useSelector(updateEmployeeSelector);

  useEffect(() => {
    const handleStatus = (
      status: Status,
      successMessage: string,
      errorMessage: string,
      resetAction: ResetAction
    ) => {
      if (status === Status.SUCCESS) {
        messageApi.open({
          type: AlertMessage.SUCCESS,
          content: successMessage,
        });
        dispatch(resetAction());
      } else if (status === Status.FAILURE) {
        messageApi.open({
          type: AlertMessage.ERROR,
          content: errorMessage,
        });
        dispatch(resetAction());
      }
    };

    handleStatus(
      addEmployee.status,
      EmployeeAlertMessage.ADD_SUCCESS,
      EmployeeAlertMessage.ADD_ERROR,
      addEmployeeReset
    );
    handleStatus(
      deleteEmployee.status,
      EmployeeAlertMessage.DELETE_SUCCESS,
      EmployeeAlertMessage.DELETE_ERROR,
      deleteEmployeeReset
    );
    handleStatus(
      updateEmployee.status,
      EmployeeAlertMessage.UPDATE_SUCCESS,
      EmployeeAlertMessage.UPDATE_ERROR,
      updateEmployeeReset
    );
  }, [addEmployee.status, deleteEmployee.status, updateEmployee.status]);

  return <>{contextHolder}</>;
};

export default Alert;
