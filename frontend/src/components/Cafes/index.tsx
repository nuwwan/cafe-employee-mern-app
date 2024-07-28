import { useState } from "react";
import { Button, Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import CafesTable from "./CafesListTable";
import ActionDrawer from "./AddCafeModal";
import SearchCafe from "./SearchCafeList";
import AlertHolder from "./CafeAlert";

import { CafeType } from "../../utils/types";
import { getDefaultCafeForm, ON_CHANGE } from "../../utils/constant";

import { CafesContext } from "./cafeContext";
import useFormAction from "./hooks/useFormAction";
import useValidation from "./hooks/useValidation";

const Employees = () => {
  const [isOpen, setModalOpen] = useState(false);
  const [cafeId, setCafeById] = useState<string>();

  const { setFormValues } = useFormAction();
  const { cafeValidation } = useValidation();

  const method = useForm<CafeType>({
    mode: ON_CHANGE,
    reValidateMode: ON_CHANGE,
    defaultValues: getDefaultCafeForm(),
    resolver: yupResolver(cafeValidation),
  });

  const showModal = (id?: string) => {
    setCafeById(id);
    if (id) setFormValues(id, method.setValue);
    method.clearErrors();
    setModalOpen(true);
  };

  const onClose = () => setModalOpen(false);

  return (
    <CafesContext.Provider
      value={{ showModal, onClose, isOpen, cafeId, method }}
    >
      <Row justify="space-between" className="mb-10">
        <Col>
          <SearchCafe />
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal()}
            icon={<PlusOutlined />}
          >
            Add New Cafe
          </Button>
        </Col>
      </Row>
      <CafesTable />
      {isOpen && <ActionDrawer />}
      <AlertHolder />
    </CafesContext.Provider>
  );
};

export default Employees;
