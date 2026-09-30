import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

import { signInWithFacebook, signInWithGoogle } from "@/services/auth.service";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
        <Title data-testid="test-title">Test Title</Title>
        <Col span={8}>
          <Title
            style={{ textAlign: "center" }}
            level={3}
          >
            Fun Chat
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={handleGoogleLogin}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            style={{ width: "100%" }}
            onClick={handleFbLogin}
          >
            Đăng nhập bằng Facebook
          </Button>
          <Button onClick={() => setTest((test) => test + "1, ")}>Test Me</Button>
          <h3 data-testid='test-value'>{test}</h3>
          {json && <h3 data-testid='test-json'>{json}</h3>}
        </Col>
      </Row>
    </div>
  );
}
