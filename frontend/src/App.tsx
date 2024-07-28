import { ConfigProvider } from "antd";

import Routes from "./Routes";
import { theme } from "./utils/theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Routes />
    </ConfigProvider>
  );
}

export default App;
