import { useContext } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";

import { CafesContext } from "../cafeContext";
import { CafeType } from "../../../utils/types";
import {
  EMPTY,
  FORM_FIELD_CONSTANT,
  resetConfirm,
} from "../../../utils/constant";
import {
  addCafeRequest,
  updateCafeRequest,
} from "../../../store/cafes/actions";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { isUndefinedOrEmpty, isValueChanged } from "../../../utils/helper";
import { getCafesSelector } from "../../../store/cafes/selectors";

const useCafeFormAction = () => {
  const { cafeId, onClose, method } = useContext(CafesContext);

  const cafesData = useSelector(getCafesSelector);

  const dispatch = useDispatch();
  const { confirm } = Modal;

  const { watch, reset } = method;

  const handleClose = () => {
    reset();
    onClose();
  };

  const setFormValues = (id: string, setValue: UseFormSetValue<CafeType>) => {
    const editCafe = cafesData.cafes.find((cafe) => cafe.cafeId === id);

    if (editCafe) {
      const { cafeName, description, location, logo } = editCafe;

      setValue(FORM_FIELD_CONSTANT.LOGO, logo);
      setValue(FORM_FIELD_CONSTANT.CAFE_NAME, cafeName);
      setValue(FORM_FIELD_CONSTANT.LOCATION, location);
      setValue(FORM_FIELD_CONSTANT.DESCRIPTION, description);
    }
  };

  const handleFormSubmit: SubmitHandler<CafeType> = (values) => {
    const { cafeName, description, location, logo } = values;

    const fields = {
      [FORM_FIELD_CONSTANT.CAFE_NAME]: cafeName,
      [FORM_FIELD_CONSTANT.LOCATION]: location,
      [FORM_FIELD_CONSTANT.LOGO]: logo,
      [FORM_FIELD_CONSTANT.DESCRIPTION]: description,
      [FORM_FIELD_CONSTANT.CAFE_ID]: EMPTY,
    };

    const action = cafeId
      ? updateCafeRequest({ ...fields, cafeId })
      : addCafeRequest(fields);

    dispatch(action);
    handleClose();
  };

  const onExit = () => {
    const employeeFields = watch([
      FORM_FIELD_CONSTANT.CAFE_NAME,
      FORM_FIELD_CONSTANT.DESCRIPTION,
      FORM_FIELD_CONSTANT.LOCATION,
    ]);

    if (isValueChanged(employeeFields) && isUndefinedOrEmpty(cafeId)) {
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
    handleFormSubmit,
    onExit,

    cafeId,
    setFormValues,
  };
};

export default useCafeFormAction;
