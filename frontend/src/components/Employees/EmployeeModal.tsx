import { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Form, Row, Space } from "antd";
import { useSelector } from "react-redux";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

import TextInput from "../Common/InputsControll/TextInput";
import InputNumber from "../Common/InputsControll/NumberInput";
import SelectInput from "../Common/InputsControll/SelectInput";
import RadioOption from "../Common/InputsControll/RadioOption";

import useFormAction from "./hooks/useAction";
import { EmployeesContext } from "./employeeContext";

import { FORM_FIELD_CONSTANT } from "../../utils/constant";
import { EmployeeType, ErrorObject } from "../../utils/types";
import { genderOption, getCafes, isErrorOnSubmit } from "../../utils/helper";
import { getCafesSelector } from "../../store/cafes/selectors";
import FormAlert from "../Common/FormAlert";

const ActionDrawer = () => {
  const [isError, setErrorBanner] = useState(false);
  const cafesData = useSelector(getCafesSelector);
  const { isOpen, method } = useContext(EmployeesContext);
  const { handleFormSubmit, onExit, employeeId } = useFormAction();

  const { handleSubmit, clearErrors, watch } = method;

  const { employeeName, emailAddress, gender, phoneNumber } = watch();

  const onSubmit: SubmitHandler<EmployeeType> = (values) => {
    handleFormSubmit(values);
  };

  const onError: SubmitErrorHandler<EmployeeType> = (value) => {
    setErrorBanner(isErrorOnSubmit(value as ErrorObject));
  };

  const onCloseAlert = () => {
    setErrorBanner(false);
    clearErrors();
  };

  useEffect(() => {
    setErrorBanner(false);
  }, [employeeName, emailAddress, gender, phoneNumber, isOpen]);

  return (
    <FormProvider {...method}>
      <Modal
        title={`${employeeId ? "EDIT" : "CREATE"} EMPLOYEE`}
        width={720}
        open={isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        maskClosable={false}
        closable={false}
        footer={
          <Row justify="space-between">
            <div />
            <Space>
              <Button onClick={onExit}>close</Button>
              <Button onClick={handleSubmit(onSubmit, onError)} type="primary">
                ADD EMPLOYEE
              </Button>
            </Space>
          </Row>
        }
      >
        <Form layout="horizontal" hideRequiredMark>
          {isError && <FormAlert onCloseAlert={onCloseAlert} />}
          <Row gutter={16}>
            <Col span={12}>
              <TextInput
                fieldName="Name"
                placeholder="Enter your full name"
                maxLength={10}
                name={FORM_FIELD_CONSTANT.EMPLOYEE_NAME}
                showCount={true}
              />
            </Col>
            <Col span={12}>
              <TextInput
                fieldName="Email"
                placeholder="Enter your full email"
                name={FORM_FIELD_CONSTANT.EMAIL}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputNumber
                fieldName="Phone Number"
                placeholder="Enter mobile number"
                name={FORM_FIELD_CONSTANT.PHONE_NUMBER}
                maxLength={8}
              />
            </Col>
            <Col span={12}>
              <SelectInput
                fieldName="Cafe"
                placeholder="Select cafe"
                name={FORM_FIELD_CONSTANT.CAFE_OPTION}
                options={getCafes(cafesData.cafes)}
              />
            </Col>
            <Col>
              <RadioOption
                options={genderOption}
                fieldName="Gender"
                name={FORM_FIELD_CONSTANT.GENDER}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </FormProvider>
  );
};

export default ActionDrawer;
