import useAppContext from "@/hooks/useAppContext";
import useAuth from "@/hooks/useAuth";
import { addDocument } from "@/services/firebase.service";
import { Form, Input, Modal } from "antd";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useAppContext();
  const {
    user: { uid },
  } = useAuth();
  const [form] = Form.useForm();

  const closeModal = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleAddRoom = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    closeModal();
  };

  return (
    <Modal
      title='Add Room'
      open={isAddRoomVisible}
      onOk={handleAddRoom}
      onCancel={closeModal}
      destroyOnHidden
    >
      <Form
        form={form}
        layout='vertical'
      >
        <Form.Item
          label='Room Name'
          name='name'
        >
          <Input placeholder="Enter room's name..." />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
        >
          <Input placeholder='Enter description...' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
