import { useEffect, useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import EmployeesTable from "./EmployeesTable";
import EmployeeModal from "./EmployeeModal";
import Alert from "./Alert";

import { EmployeesContext } from "./employeeContext";
import { getEmployeesSelector } from "../../store/employees/selectors";
import { fetchEmployeesRequest } from "../../store/employees/actions";
import { getCafesSelector } from "../../store/cafes/selectors";

import { EmployeeType } from "../../utils/types";
import { EMPTY, getDefaultEmployeeForm, ON_CHANGE } from "../../utils/constant";

import useValidation from "./hooks/useValidation";
import useFormAction from "./hooks/useAction";

const { Title } = Typography;
interface CafeSummaryType {
  name: string;
  numberOfEmployees: string;
}

const Employees = () => {
  const employeesData = useSelector(getEmployeesSelector);
  const cafeData = useSelector(getCafesSelector);
  const [isOpen, setModalOpen] = useState(false);
  const [cafeDetails, setCafeDetails] = useState<CafeSummaryType>({
    name: EMPTY,
    numberOfEmployees: EMPTY,
  });
  const [employeeId, setEmployeeId] = useState<string | undefined>();

  const { setFormValues } = useFormAction();
  const { employeeValidation } = useValidation();
  const dispatch = useDispatch();
  const { cafeId: selectedCafeId } = useParams();

  const method = useForm<EmployeeType>({
    mode: ON_CHANGE,
    reValidateMode: ON_CHANGE,
    defaultValues: getDefaultEmployeeForm(),
    resolver: yupResolver(employeeValidation),
  });

  const showModal = (id?: string) => {
    setEmployeeId(id);
    if (id) setFormValues(id, employeesData.employees, method.setValue);
    method.clearErrors();
    setModalOpen(true);
  };

  useEffect(() => {
    const cafe = cafeData.cafes.find(({ cafeId }) => cafeId === selectedCafeId);

    if (cafe) {
      setCafeDetails({
        name: cafe.cafeName,
        numberOfEmployees: String(cafe.numberOfEmployees),
      });
    }

    dispatch(fetchEmployeesRequest(selectedCafeId));
  }, [selectedCafeId]);

  const onClose = () => setModalOpen(false);

  const employeeCount = selectedCafeId
    ? cafeDetails.numberOfEmployees
    : String(employeesData.employees.length);

  return (
    <EmployeesContext.Provider
      value={{ showModal, isOpen, onClose, employeeId, method }}
    >
      <Row justify="space-between" className="mb-10">
        <Col>
          <Title level={5}>
            {cafeDetails.name} Employees ({employeeCount})
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => showModal()}
            icon={<PlusOutlined />}
          >
            New Employee
          </Button>
        </Col>
      </Row>
      <EmployeesTable />
      {isOpen && <EmployeeModal />}
      <Alert />
    </EmployeesContext.Provider>
  );
};

export default Employees;
