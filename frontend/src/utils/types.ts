import { z } from "zod";
import { AnyAction } from "redux";

import { cafeSchema, employeeSchema, searchSchema } from "./constant";

export type CafeLocationType = z.infer<typeof searchSchema>;

export type EmployeeType = z.infer<typeof employeeSchema>;

export type CafeType = z.infer<typeof cafeSchema>;

export type ResetAction = () => AnyAction;

export interface ErrorObject {
  [key: string]: {
    message: string;
    type: string;
    ref: {
      name: string;
    };
  };
}
