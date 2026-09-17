import ChatWindow from "@/components/ChatWindow";
import Sidebar from "@/components/Sidebar";
import { Col, Row } from "antd";

export default function ChatRoomPage() {
  return (
    <Row>
      <Col lg={6} xxl={4}>
        <Sidebar />
      </Col>
      <Col lg={18} xxl={20}>
        <ChatWindow />
      </Col>
    </Row>
  );
}
