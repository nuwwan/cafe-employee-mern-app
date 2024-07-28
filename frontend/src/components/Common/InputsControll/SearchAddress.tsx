import { Form, Input, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { CafeLocationType, CafeType } from "../../../utils/types";
import {
  FORM_FIELD_CONSTANT,
} from "../../../utils/constant";

interface InputPropsType {
  fieldName: string;
  placeholder?: string;
  name: FORM_FIELD_CONSTANT.LOCATION;
  width?: number;
  handleValueChange?: (value: string) => void;
}

const SearchAddress = (props: InputPropsType) => {
  const { control } = useFormContext<CafeLocationType | CafeType>();

  const { fieldName, placeholder, name, width, handleValueChange } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => {
        return (
          <Form.Item
            name={name}
            label={fieldName}
            validateStatus={error?.message ? "error" : ""}
            help={error?.message && error.message}
          >
          
            <Input
              value={value as string}
              placeholder={placeholder}
              onChange={(e) => onChange(e)}
            />
          </Form.Item>
        );
      }}
    />
  );
};

export default SearchAddress;
