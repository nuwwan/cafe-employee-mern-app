import { EMPTY, GenderOptions } from "./constant";
import { CafeType, ErrorObject } from "./types";

export const genderOption = Object.values(GenderOptions).filter((item) => {
  return isNaN(Number(item));
});

export const isValueChanged = (array: unknown[]): boolean => {
  return array.some((item) => {
    if (typeof item === "object") {
      return Object.values(item as string[]).some((value) => {
        return value !== EMPTY;
      });
    }
    return item !== EMPTY;
  });
};

export const isUndefinedOrEmpty = (v?: string | number) => {
  return v === undefined || v === EMPTY;
};

export const getCafes = (cafes: CafeType[]) => {
  return cafes.map((cafe) => {
    return {
      placeName: cafe?.cafeName,
      label: cafe?.cafeName,
      value: cafe?.cafeId,
    };
  });
};

export const isErrorOnSubmit = (value: ErrorObject) => {
  const errorMessages: (string | undefined)[] = Object.entries(value).map(
    ([key, value]) => value.message
  );
  return errorMessages.length > 0;
};
