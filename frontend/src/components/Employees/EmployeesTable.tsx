import { useContext, useEffect, useMemo } from "react";
import { Button, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import { deleteEmployeeRequest } from "../../store/employees/actions";
import { fetchCafesRequest } from "../../store/cafes/actions";

import { deleteConfirm } from "../../utils/constant";

import { EmployeesContext } from "./employeeContext";
import { getEmployeesSelector } from "../../store/employees/selectors";

export const column = [
  { field: "employeeId", headerName: "EMPLOYEE ID" },
  { field: "employeeName", headerName: "NAME" },
  { field: "emailAddress", headerName: "EMAIL" },
  { field: "phoneNumber", headerName: "PHONE NUMBER" },
  { field: "daysWorkedInCafe", headerName: "DAYS WORKED" },
  { field: "cafeName", headerName: "CAFE NAME" },
];

function EmployeesTable() {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const employeesData = useSelector(getEmployeesSelector);

  const { showModal } = useContext(EmployeesContext);

  useEffect(() => {
    dispatch(fetchCafesRequest());
  }, [dispatch]);

  const actionButton = {
    headerName: "ACTIONS",
    field: "employeeId",
    lockPinned: true,
    pinned: "right",
    cellRendererFramework: ({ value }: { value: string }) => {
      return (
        <Space wrap>
          <Button
            size="small"
            onClick={() => {
              showModal(value);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            size="small"
            danger
            onClick={() => {
              showDeleteConfirm(value);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      );
    },
  };

  const columnDefs = [...column, actionButton];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      flex: 1,
    }),
    []
  );

  const showDeleteConfirm = (employeeId: string) => {
    confirm({
      ...deleteConfirm,
      title: "Are you sure you want to delete this employee?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteEmployeeRequest(employeeId));
      },
    });
  };

  const sortedEmployees = useMemo(() => {
    return employeesData.employees
      .filter((employee) => employee.daysWorkedInCafe !== undefined)
      .sort((a, b) => b.daysWorkedInCafe! - a.daysWorkedInCafe!);
  }, [employeesData.employees]);

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        domLayout="autoHeight"
        rowData={sortedEmployees}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        animateRows
      />
    </div>
  );
}

export default EmployeesTable;
