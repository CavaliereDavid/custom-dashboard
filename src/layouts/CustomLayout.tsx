import { Button, Layout, Menu, theme } from "antd";
import {
  DashboardOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { createElement, useState } from "react";
import GridDashboard from "./GridDashboard";
import { useGridContext } from "../contexts";
import SwitchComponent from "../components/utils/SwitchComponent";

const { Header, Footer, Sider, Content } = Layout;

const items = [
  {
    key: "0",
    icon: createElement(DashboardOutlined),
    label: "Dashboard",
  },
  {
    key: "1",
    icon: createElement(AreaChartOutlined),
    label: "Area chart",
  },
  {
    key: "2",
    icon: createElement(PieChartOutlined),
    label: "Pie chart",
  },
  {
    key: "3",
    icon: createElement(BarChartOutlined),
    label: "Bar chart",
  },
  {
    key: "4",
    icon: createElement(LineChartOutlined),
    label: "Line chart",
  },
];

const CustomLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { addChart } = useGridContext();

  const handleMenuClick = (type: string) => {
    addChart(type);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="50"
        onMouseEnter={() => {
          if (collapsed) {
            setCollapsed(false);
          }
        }}
        onMouseLeave={() => {
          if (collapsed === false) {
            setCollapsed(true);
          }
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={items}
          onClick={({ key }) => {
            switch (key) {
              case "1":
                handleMenuClick("line");
                break;
              case "2":
                handleMenuClick("area");
                break;
              case "3":
                handleMenuClick("bar");
                break;
              default:
                break;
            }
          }}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Menu theme="light" mode="horizontal">
            <Menu.Item key="toggle">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
            </Menu.Item>
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="service">Service</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <SwitchComponent />
            <GridDashboard />
          </div>
        </Content>
        <Footer>
          Iris's insights © last update {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
