import useAppContext from "@/hooks/useAppContext";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";

const StyledPanel = styled(Collapse.Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const StyledLink = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useAppContext();

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse
      ghost
      defaultActiveKey={["1"]}
    >
      <StyledPanel
        header='Rooms'
        key='1'
      >
        {rooms.map((room) => (
          <StyledLink
            key={room.id}
            onClick={() => setSelectedRoomId(room.id)}
          >
            {room.name}
          </StyledLink>
        ))}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={handleAddRoom}
        >
          Add Room
        </Button>
      </StyledPanel>
    </Collapse>
  );
}
