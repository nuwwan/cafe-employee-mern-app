import { ModalFuncProps } from "antd";
import z from "zod";

export const GOOGLE_MAP_API_KEY = "AIzaSyAUDllPJzvIBlJJ1xuCDXFiuesBsEgXLuw";

export enum ROUTES {
  CAFES = "/cafes",
  EMPLOYEES = "/employees",
  BAD_ROUTE = "*",
}

export const EMPTY = "";

export const ON_CHANGE = "onChange";

export const enum Status {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  LOADING = "LOADING",
  IDEAL = "IDEAL",
}

const defaultCafe = { value: "", label: "", placeName: "" };

export enum FORM_FIELD_CONSTANT {
  EMPLOYEE_ID = "employeeId",
  EMPLOYEE_NAME = "employeeName",
  EMAIL = "emailAddress",
  PHONE_NUMBER = "phoneNumber",
  DAYS_WORKED_IN_CAFE = "daysWorkedInCafe",

  CAFE_NAME = "cafeName",
  CAFE_OPTION = "cafeOption",
  GENDER = "gender",
  DESCRIPTION = "description",
  LOCATION = "location",
  NUMBER_OF_EMPLOYEES = "numberOfEmployees",
  CAFE_ID = "cafeId",
  LOGO = "logo",
  PRV_CAFE_ID = "prvCafeId",
  START_DATE = "startDate",
}

export enum GenderOptions {
  MALE = "Male",
  FEMALE = "Female",
}
export const deleteConfirm: ModalFuncProps = {
  okText: "Yes",
  okType: "danger",
  cancelText: "No",
  content: "This action cannot be undone.",
};

export const resetConfirm: ModalFuncProps = {
  title: "Do you want to discard this changes?",
  content: "You have unsaved changes that will be discarded.",
  okText: "Yes",
  okType: "danger",
  cancelText: "No",
};

export const gender = Object.keys(GenderOptions).filter((item) => {
  return isNaN(Number(item));
});

export const employeeSchema = z.object({
  [FORM_FIELD_CONSTANT.EMPLOYEE_ID]: z.string().optional(),
  [FORM_FIELD_CONSTANT.EMPLOYEE_NAME]: z
    .string()
    .max(10)
    .min(6)
    .or(z.string().default(EMPTY)),
  [FORM_FIELD_CONSTANT.EMAIL]: z.string(),
  [FORM_FIELD_CONSTANT.PHONE_NUMBER]: z
    .number()
    .max(8)
    .or(z.string().default("")),
  [FORM_FIELD_CONSTANT.DAYS_WORKED_IN_CAFE]: z.number().default(0).optional(),
  [FORM_FIELD_CONSTANT.CAFE_OPTION]: z
    .object({
      value: z.string(),
      label: z.string(),
      placeName: z.string(),
    })
    .default(defaultCafe),
  [FORM_FIELD_CONSTANT.CAFE_NAME]: z.string().optional(),
  [FORM_FIELD_CONSTANT.GENDER]: z
    .enum(["Male", "Female"])
    .or(z.string().default("")),
  [FORM_FIELD_CONSTANT.CAFE_ID]: z.string().optional(),
  [FORM_FIELD_CONSTANT.PRV_CAFE_ID]: z.string().optional(),
  [FORM_FIELD_CONSTANT.START_DATE]: z.string().optional(),
});

export const getDefaultEmployeeForm = () => {
  return employeeSchema.parse({
    [FORM_FIELD_CONSTANT.EMPLOYEE_ID]: EMPTY,
    [FORM_FIELD_CONSTANT.EMPLOYEE_NAME]: EMPTY,
    [FORM_FIELD_CONSTANT.EMAIL]: EMPTY,
    [FORM_FIELD_CONSTANT.PHONE_NUMBER]: EMPTY,
    [FORM_FIELD_CONSTANT.DAYS_WORKED_IN_CAFE]: 0,
    [FORM_FIELD_CONSTANT.CAFE_OPTION]: defaultCafe,
    [FORM_FIELD_CONSTANT.GENDER]: EMPTY,
    [FORM_FIELD_CONSTANT.CAFE_ID]: EMPTY,
    [FORM_FIELD_CONSTANT.CAFE_NAME]: EMPTY,
    [FORM_FIELD_CONSTANT.PRV_CAFE_ID]: EMPTY,
  });
};

export const cafeSchema = z.object({
  [FORM_FIELD_CONSTANT.CAFE_NAME]: z
    .string()
    .max(10)
    .min(6)
    .or(z.string().default("")),
  [FORM_FIELD_CONSTANT.DESCRIPTION]: z.string().max(256),
  [FORM_FIELD_CONSTANT.LOCATION]: z.string(),
  [FORM_FIELD_CONSTANT.NUMBER_OF_EMPLOYEES]: z.number().optional(),
  [FORM_FIELD_CONSTANT.CAFE_ID]: z.string().or(z.string().default("")),
  [FORM_FIELD_CONSTANT.LOGO]: z.string().optional(),
});

export const getDefaultCafeForm = () => {
  return cafeSchema.parse({
    [FORM_FIELD_CONSTANT.CAFE_NAME]: EMPTY,
    [FORM_FIELD_CONSTANT.DESCRIPTION]: EMPTY,
    [FORM_FIELD_CONSTANT.LOCATION]: EMPTY,
    [FORM_FIELD_CONSTANT.NUMBER_OF_EMPLOYEES]: 0,
    [FORM_FIELD_CONSTANT.CAFE_ID]: EMPTY,
    [FORM_FIELD_CONSTANT.LOGO]: EMPTY,
  });
};

export const searchSchema = z.object({
  [FORM_FIELD_CONSTANT.LOCATION]: z.string(),
});

export const enum AlertMessage {
  SUCCESS = "success",
  ERROR = "error",
}
