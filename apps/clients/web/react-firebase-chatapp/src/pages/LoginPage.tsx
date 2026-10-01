import { Button, Col, Form, Input, Row, type FormProps } from "antd";
import Title from "antd/es/typography/Title";

import { signInWithFacebook, signInWithGoogle } from "@/services/auth.service";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type FieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values.username);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo.message);
};

export function useFetchJson(cb: Function = () => {}) {
  const [number, setNumber] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((json) => cb(json.name)); // Leanne Graham
  }, []);

  return { cb, setNumber, number };
}

export default function Login() {
  const navigate = useNavigate();
  const [test, setTest] = useState("");
  const [json, setJson] = useState("");

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (result) {
      await navigate({
        to: "/chatroom",
        replace: true,
      });
    }
  };

  const handleFbLogin = async () => {
    const result = await signInWithFacebook();
    if (result) {
      await navigate({
        to: "/chatroom",
        replace: true,
      });
    }
  };

  useFetchJson(setJson);

  return (
    <div>
      <Row
        justify='center'
        style={{ height: 800 }}
      >
        <Col span={8}>
          <Title
            data-testid='login-title'
            style={{ textAlign: "center" }}
            level={3}
          >
            Fun Chat
          </Title>
          <Form
            data-testid='login-form'
            name='basic'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item<FieldType>
              label='Username'
              name='username'
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input data-testid='login-username' />
            </Form.Item>

            <Form.Item<FieldType>
              label='Password'
              name='password'
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password data-testid='login-password' />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                data-testid='login-submit'
                type='primary'
                htmlType='submit'
                style={{ width: "100%", marginBottom: 5 }}
              >
                Submit
              </Button>
              <Button
                data-testid='login-google'
                style={{ width: "100%", marginBottom: 5 }}
                onClick={handleGoogleLogin}
              >
                Đăng nhập bằng Google
              </Button>
              <Button
                data-testid='login-facebook'
                style={{ width: "100%" }}
                onClick={handleFbLogin}
              >
                Đăng nhập bằng Facebook
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={() => setTest((test) => test + "1, ")}>Test Me</Button>
          <h3 data-testid='test-value'>{test}</h3>
          {json && <h3 data-testid='test-json'>{json}</h3>}
          <Button
            data-testid='login-goto-google'
            onClick={() => {
              window.location.href = "https://www.google.com";
            }}
            style={{ width: "100%", marginBottom: 5 }}
          >
            Go To Google
          </Button>
        </Col>
      </Row>
    </div>
  );
}
