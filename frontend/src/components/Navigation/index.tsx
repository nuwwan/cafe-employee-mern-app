import { useNavigate, useLocation } from "react-router-dom";
import { Menu, theme, Layout } from "antd";

import { ROUTES } from "../../utils/constant";

const enum MenuItems {
  CAFE = "cafes",
  EMPLOYEES = "employees",
}

type NavigationType = {
  key: MenuItems;
  label: string;
  route: string;
};
const { useToken } = theme;

const Navigation = () => {
  const { token } = useToken();
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const headerStyle = {
    padding: "0px",
    borderBottom: "0px",
  };
  const menuStyle = { padding: "0px 60px" };

  const { Header } = Layout;

  const items = [
    {
      key: MenuItems.CAFE,
      label: "Cafes",
      route: ROUTES.CAFES,
    },
    {
      key: MenuItems.EMPLOYEES,
      label: "Employees",
      route: ROUTES.EMPLOYEES,
    },
  ];

  const handleRoute = (item: NavigationType) => {
    navigator(item.route);
  };

  return (
    <Header style={headerStyle}>
      <Menu mode="horizontal" style={menuStyle}>
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            style={{
              fontWeight: token.fontWeightStrong,
              color: pathname.split("/").includes(item.key)
                ? token.colorPrimary
                : token.colorText,
            }}
            onClick={() => handleRoute(item)}
          >
            {item.label.toLocaleUpperCase()}
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default Navigation;
