import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
const { Header } = Layout;

const items = [
  {
    icon: <HomeOutlined />,
    label: <a href="/">Home</a>,
    key: "home",
  },
  {
    icon: <UserOutlined />,
    label: <a href="/login">Login</a>,
    key: "login",
  },
  {
    icon: <UserAddOutlined />,
    label: <a href="/register">register</a>,
    key: "register",
  },
];
function NavBar() {
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
    console.log(current, e.key);
  };
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        onClick={onClick}
        selectedKeys={[current]}
      />
    </Header>
  );
}

export default NavBar;
