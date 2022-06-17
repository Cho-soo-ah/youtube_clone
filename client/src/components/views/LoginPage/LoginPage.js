import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Layout } from "antd";

import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

const { Content } = Layout;

const validateMessages = {
  required: "${label} 을 입력하세요.",
  types: {
    email: "유효한 이메일을 입력하세요.",
    number: "비밀번호가 올바르지 않습니다.",
  },
};

const LoginForm = ({ onChange, fields }) => {
  const dispatch = useDispatch();

  const onSubmitHandler = (value) => {
    console.log(value);
    let body = value;

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        // document.location = "/";
        alert("login");
      } else {
        alert("error");
      }
    });
  };
  return (
    <Form
      name="LoginForm"
      validateMessages={validateMessages}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
        console.log("allFields", allFields);
      }}
      onFinish={onSubmitHandler}
      style={{ width: "350px" }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input placeholder="email" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="password" size="large" />
      </Form.Item>
      <Form.Item style={{ justifyContent: "flex-end" }}>
        <Button type="primary" htmlType="submit" block size="large">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

function LoginPage() {
  const [fields, setFields] = useState([
    {
      name: ["email", "password"],
    },
  ]);
  return (
    <Content
      style={{
        padding: "50px",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoginForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
    </Content>
  );
}

export default withRouter(LoginPage);
