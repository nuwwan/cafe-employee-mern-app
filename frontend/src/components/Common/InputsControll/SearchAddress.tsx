import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { CafeLocationType, CafeType } from "../../../utils/types";
import {
  FORM_FIELD_CONSTANT,
  GOOGLE_MAP_API_KEY,
} from "../../../utils/constant";

interface InputPropsType {
  fieldName: string;
  placeholder?: string;
  name: FORM_FIELD_CONSTANT.LOCATION;
  width?: number;
  handleValueChange?: (value: string) => void;
}

const SearchAddress = (props: InputPropsType) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: GOOGLE_MAP_API_KEY,
    });

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
            <Select
              showSearch
              value={value}
              defaultValue={value}
              style={{
                minWidth: width ? width + "px" : "100%",
              }}
              placeholder={placeholder}
              showArrow={false}
              filterOption={false}
              clearIcon={true}
              loading={isPlacePredictionsLoading}
              onSearch={(e) => {
                getPlacePredictions({ input: e });
              }}
              options={(placePredictions || [value]).map((d) => ({
                value: d.description,
              }))}
              onChange={(e) => {
                onChange(e);
                handleValueChange && handleValueChange(e);
              }}
            />
          </Form.Item>
        );
      }}
    />
  );
};

export default SearchAddress;
