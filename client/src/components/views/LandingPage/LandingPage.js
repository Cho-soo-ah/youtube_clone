import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Layout, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;
const { Content, Footer } = Layout;

function LandingPage(props) {
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert("로그아웃 되었습니다.");
        props.history.push("/login");
      } else {
        alert("로그아웃 하는데 실패하였습니다.");
      }
    });
  };
  return (
    <>
      <Content
        style={{
          padding: "50px",
        }}
      >
        <div className="site-layout-content">
          <Title level={3}>Hiii~~~</Title>
          <Button onClick={onClickHandler}>로그아웃</Button>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Boiler Plate © 2022
      </Footer>
    </>
  );
}

export default withRouter(LandingPage);
