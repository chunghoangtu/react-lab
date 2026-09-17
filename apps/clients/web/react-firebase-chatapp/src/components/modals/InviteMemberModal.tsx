import { useState } from "react";
import { Form, Modal } from "antd";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";

import DebounceSelect from "@/components/DebounceSelect";
import useAppContext from "@/hooks/useAppContext";
import { db } from "@/libs/firebase/config";

const fetchUserList = async (search: string, currentMembers: ChatMember[]) => {
  const userQuery = query(
    collection(db, "users"),
    where("keywords", "array-contains", search?.toLowerCase()),
    orderBy("displayName"),
    limit(20)
  );

  const queriedData = await getDocs(userQuery);

  return queriedData.docs
    .map((userDocument): SelectOption => {
      const userData = userDocument.data();

      return {
        label: userData.displayName,
        value: userData.uid,
        photoURL: userData.photoURL,
      };
    }).filter((opt) => !currentMembers.map(curMember => curMember.id).includes(opt.value));
};

export default function InviteMemberModal() {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } =
    useAppContext();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [form] = Form.useForm();

  const closeModal = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  const handleInviteUser = () => {
    const roomDocRef = doc(db, 'rooms', selectedRoomId);
    updateDoc(roomDocRef, {
      members: [...selectedRoom!.members, ...selectedUsers.map((val: any) => val.value)]
    })

    closeModal();
  };

  return (
    <Modal
      title='Invite User'
      open={isInviteMemberVisible}
      onOk={handleInviteUser}
      onCancel={closeModal}
      destroyOnHidden
    >
      <Form
        form={form}
        layout='vertical'
      >
        <Form.Item
          name='search-user'
          label='User Names'
        >
          <DebounceSelect
            mode='multiple'
            value={selectedUsers}
            placeholder='Search by username'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setSelectedUsers(newValue)}
            style={{ width: "100%" }}
            currentOptions={selectedRoom?.members}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
