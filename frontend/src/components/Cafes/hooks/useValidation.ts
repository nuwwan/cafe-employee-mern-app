import { object, string } from "yup";

import { FORM_FIELD_CONSTANT } from "../../../utils/constant";

const useValidation = () => {
  const nameValidation = string()
    .required("Name is required")
    .test(
      "Cafe name must be more than six characters",
      "Name must more than 6 characters",
      (value) => value.length >= 6
    );

  const employeeValidationSchema = {
    [FORM_FIELD_CONSTANT.CAFE_NAME]: nameValidation,
    [FORM_FIELD_CONSTANT.LOCATION]: string().required("Location is required"),
    [FORM_FIELD_CONSTANT.DESCRIPTION]: string().required(
      "Description is required"
    ),
  };

  return { cafeValidation: object(employeeValidationSchema) };
};

export default useValidation;
