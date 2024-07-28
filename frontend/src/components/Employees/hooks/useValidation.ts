import { object, string } from "yup";
import { FORM_FIELD_CONSTANT } from "../../../utils/constant";

import "yup-phone-lite";

const useValidation = () => {
  const mobileValidation = string()
    .phone("SG", "Please enter a valid phone number")
    .required("A phone number is required");

  const nameValidation = string()
    .required("Name is required")
    .test(
      "employee name length is more than six",
      "Name must more than 6 characters",
      (value) => value.length >= 6
    );

  const employeeValidationSchema = {
    [FORM_FIELD_CONSTANT.EMPLOYEE_NAME]: nameValidation,
    [FORM_FIELD_CONSTANT.EMAIL]: string()
      .required("Email is required")
      .email("Must be a valid email"),
    [FORM_FIELD_CONSTANT.PHONE_NUMBER]: mobileValidation,
    [FORM_FIELD_CONSTANT.GENDER]: string().required("Gender is required"),
  };

  return { employeeValidation: object(employeeValidationSchema) };
};

export default useValidation;
