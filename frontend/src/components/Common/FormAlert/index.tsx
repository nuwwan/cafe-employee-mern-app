import { Alert } from "antd";
import React from "react";

interface Props {
  onCloseAlert: () => void;
}

const FormAlert = React.memo((props: Props) => {
  const { onCloseAlert } = props;
  return (
    <div style={{ padding: "0 0 20px 0" }}>
      <Alert
        message="Please fill in all the required fields."
        type="error"
        showIcon
        closable
        onClose={onCloseAlert}
      />
    </div>
  );
});

export default FormAlert;
