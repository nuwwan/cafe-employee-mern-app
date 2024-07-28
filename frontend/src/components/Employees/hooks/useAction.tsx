import { useCallback, useContext } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { EmployeeType } from "../../../utils/types";
import { EmployeesContext } from "../employeeContext";
import {
  EMPTY,
  FORM_FIELD_CONSTANT,
  resetConfirm,
} from "../../../utils/constant";
import {
  addEmployeeRequest,
  updateEmployee,
} from "../../../store/employees/actions";
import { isUndefinedOrEmpty, isValueChanged } from "../../../utils/helper";
import { getEmployeesSelector } from "../../../store/employees/selectors";

const useFormAction = () => {
  const { employeeId, onClose, method } = useContext(EmployeesContext);
  const employeesData = useSelector(getEmployeesSelector);
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const { reset, watch } = method;

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, []);

  const setFormValues = (
    id: string,
    employees: EmployeeType[],
    setValue: UseFormSetValue<EmployeeType>
  ) => {
    const employee = employees.find((employee) => employee.employeeId === id);

    if (employee) {
      const {
        employeeName,
        emailAddress,
        phoneNumber,
        cafeId,
        cafeName,
        gender,
      } = employee;

      const cafeOption = {
        value: cafeId || EMPTY,
        label: cafeName || EMPTY,
        placeName: cafeName || EMPTY,
      };

      setValue(FORM_FIELD_CONSTANT.EMPLOYEE_NAME, employeeName);
      setValue(FORM_FIELD_CONSTANT.EMAIL, emailAddress);
      setValue(FORM_FIELD_CONSTANT.PHONE_NUMBER, phoneNumber);
      setValue(FORM_FIELD_CONSTANT.CAFE_OPTION, cafeOption);
      setValue(FORM_FIELD_CONSTANT.CAFE_ID, cafeId);
      setValue(FORM_FIELD_CONSTANT.GENDER, gender);
    }
  };

  const handleFormSubmit: SubmitHandler<EmployeeType> = (values) => {
    const { employeeName, emailAddress, phoneNumber, gender, cafeOption } =
      values;
    const editEmployee = employeesData.employees.find(
      (employee) => employee.employeeId === employeeId
    );

    const fields = {
      [FORM_FIELD_CONSTANT.EMPLOYEE_NAME]: employeeName,
      [FORM_FIELD_CONSTANT.EMAIL]: emailAddress,
      [FORM_FIELD_CONSTANT.PHONE_NUMBER]: phoneNumber,
      [FORM_FIELD_CONSTANT.GENDER]: gender,
      [FORM_FIELD_CONSTANT.CAFE_OPTION]: cafeOption,
      [FORM_FIELD_CONSTANT.PRV_CAFE_ID]: editEmployee?.cafeId,
    };

    const action = employeeId
      ? updateEmployee({ ...fields, employeeId })
      : addEmployeeRequest(fields);

    dispatch(action);
    handleClose();
  };

  const onExit = () => {
    const employeeFields = watch([
      FORM_FIELD_CONSTANT.EMPLOYEE_NAME,
      FORM_FIELD_CONSTANT.EMAIL,
      FORM_FIELD_CONSTANT.PHONE_NUMBER,
      FORM_FIELD_CONSTANT.GENDER,
      FORM_FIELD_CONSTANT.CAFE_OPTION,
    ]);

    if (isValueChanged(employeeFields) && isUndefinedOrEmpty(employeeId)) {
      confirm({
        ...resetConfirm,
        icon: <ExclamationCircleFilled />,
        onOk: handleClose,
      });
    } else {
      handleClose();
    }
  };

  return {
    setFormValues,
    handleFormSubmit,
    handleClose,
    onExit,
    employeeId,
  };
};

export default useFormAction;
