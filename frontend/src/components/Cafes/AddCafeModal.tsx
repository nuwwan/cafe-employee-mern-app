import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row, Space, Modal } from "antd";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

import useFormAction from "./hooks/useFormAction";

import TextInput from "../Common/InputsControll/TextInput";
import TextAreaInput from "../Common/InputsControll/TextAreaInput";
import ImageUpload from "../Common/InputsControll/ImageUpload";

import { CafeType, ErrorObject } from "../../utils/types";
import { FORM_FIELD_CONSTANT } from "../../utils/constant";
import FormAlert from "../Common/FormAlert";
import { CafesContext } from "./cafeContext";
import SearchAddress from "../Common/InputsControll/SearchAddress";
import { isErrorOnSubmit } from "../../utils/helper";

const ActionDrawer = () => {
  const [isError, setErrorBanner] = useState(false);
  const { isOpen, method } = useContext(CafesContext);
  const { handleFormSubmit, onExit, cafeId } = useFormAction();

  const { handleSubmit, watch, clearErrors } = method;

  const { cafeName, description, location } = watch();

  const onSubmit: SubmitHandler<CafeType> = (values) => {
    handleFormSubmit(values);
  };

  const onError: SubmitErrorHandler<CafeType> = (value) => {
    setErrorBanner(isErrorOnSubmit(value as ErrorObject));
  };

  const closeAlert = () => {
    setErrorBanner(false);
    clearErrors();
  };

  useEffect(() => {
    setErrorBanner(false);
  }, [cafeName, description, location, isOpen]);

  return (
    <FormProvider {...method}>
      <Modal
        title={`${cafeId ? "EDIT" : "CREATE"} CAFE`}
        width={820}
        open={isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        maskClosable={false}
        footer={
          <Row justify="space-between">
            <div />
            <Space>
              <Button onClick={onExit}>close</Button>
              <Button onClick={handleSubmit(onSubmit, onError)} type="primary">
                Add Cafe
              </Button>
            </Space>
          </Row>
        }
        closable={false}
      >
        <Form layout="horizontal" hideRequiredMark>
          {isError && <FormAlert onCloseAlert={closeAlert} />}
          <Row gutter={16}>
            <Col span={12}>
              <TextInput
                fieldName="Cafe Name"
                placeholder="Enter cafe name"
                maxLength={10}
                name={FORM_FIELD_CONSTANT.CAFE_NAME}
                showCount={true}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ImageUpload fieldName="" name={FORM_FIELD_CONSTANT.LOGO} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <TextAreaInput
                fieldName="Description"
                placeholder="Enter mobile description"
                name={FORM_FIELD_CONSTANT.DESCRIPTION}
                maxLength={256}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <SearchAddress
                fieldName="Location"
                name={FORM_FIELD_CONSTANT.LOCATION}
                placeholder="Search cafe location"
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </FormProvider>
  );
};

export default ActionDrawer;
