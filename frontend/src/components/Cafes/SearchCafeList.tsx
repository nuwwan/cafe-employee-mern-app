import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

import SearchAddress from "../Common/InputsControll/SearchAddress";

import { FORM_FIELD_CONSTANT } from "../../utils/constant";

import { CafeLocationType } from "../../utils/types";
import { fetchCafesRequest } from "../../store/cafes/actions";

const SearchCafe = () => {
  const methods = useForm<CafeLocationType>();
  const dispatch = useDispatch();

  const handleValueChange = (value: string) => {
    dispatch(fetchCafesRequest(value));
  };

  return (
    <FormProvider {...methods}>
      <SearchAddress
        fieldName=""
        name={FORM_FIELD_CONSTANT.LOCATION}
        placeholder="Search cafe"
        width={350}
        handleValueChange={handleValueChange}
      />
    </FormProvider>
  );
};

export default SearchCafe;
