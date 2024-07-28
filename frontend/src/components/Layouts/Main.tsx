import { CSSProperties } from "react";
import { Layout } from "antd";

import Navigation from "../Navigation";

function withLayout() {
  const { Content } = Layout;

  const contentStyle: CSSProperties = {
    padding: "40px 75px",
    background: "#FFF",
  };

  return (WrapperComponent: React.ComponentType) =>
    (props: JSX.IntrinsicAttributes) =>
      (
        <Layout>
          <Navigation />
          <Content style={contentStyle}>
            <WrapperComponent {...props} />
          </Content>
        </Layout>
      );
}

export default withLayout;
