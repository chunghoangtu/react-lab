import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

import { signInWithFacebook } from "@/services/auth.service";
import { useNavigate } from "@tanstack/react-router";

export default function Login() {
  const navigate = useNavigate();

  const handleFbLogin = async () => {
    const result = await signInWithFacebook();
    if (result) {
      await navigate({
        to: "/chatroom",
        replace: true,
      });
    }
  };

  return (
    <div>
      <Row
        justify='center'
        style={{ height: 800 }}
      >
        <Col span={8}>
          <Title
            style={{ textAlign: "center" }}
            level={3}
          >
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>Đăng nhập bằng Google</Button>
          <Button
            style={{ width: "100%" }}
            onClick={handleFbLogin}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
