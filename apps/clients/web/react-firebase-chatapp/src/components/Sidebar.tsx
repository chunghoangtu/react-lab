import RoomList from "@/components/RoomList";
import UserInfor from "@/components/UserInfor";
import { Col, Row } from "antd";
import styled from "styled-components";

const StyledSidebar = styled.div`
  background: #013b32;
  color: white;
  height: 100vh;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Row>
        <Col span={24}>
          <UserInfor />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </StyledSidebar>
  );
}
