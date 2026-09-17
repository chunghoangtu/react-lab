import Message from "@/components/Message";
import useAppContext from "@/hooks/useAppContext";
import useAuth from "@/hooks/useAuth";
import useFirestore from "@/hooks/useFirestore";
import { addDocument } from "@/services/firebase.service";
import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import { type InputRef } from "antd";
import { useMemo, useRef, useState, type ChangeEvent } from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  flex: 0 0 56px;
  box-sizing: border-box;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__infor {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
`;

const StyledContent = styled.div`
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const StyledMessageList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const { selectedRoomId, selectedRoom, members, setIsInviteMemberVisible } = useAppContext();
  const {
    user: { uid, photoURL, displayName },
  } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);
  const messageListRef = useRef(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom?.id,
      displayName,
    });
    form.resetFields(["message"]);
    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef!.current!.focus();
      });
    }
  };

  const messagesQueryCondition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom?.id,
    }),
    [selectedRoom?.id]
  );

  const messages = useFirestore("messages", messagesQueryCondition);

  if (!selectedRoomId)
    return (
      <Alert
        title='Please select a chat room!'
        type='info'
        showIcon
        closable
        style={{
          margin: 10,
          padding: 10
        }}
      />
    );

  return (
    <StyledWrapper>
      <StyledHeader>
        <div className='header__info'>
          <p className='header__title'>{selectedRoom?.name}</p>
          <span className='header__description'>{selectedRoom?.description}</span>
        </div>
        <StyledButtonGroup>
          <Button
            icon={<UserAddOutlined />}
            type='text'
            onClick={() => setIsInviteMemberVisible(true)}
          >
            Invite
          </Button>
          <Avatar.Group
            size='small'
            max={{ count: 2 }}
          >
            {members.map((member: ChatMember) => (
              <Tooltip
                title={member.displayName}
                key={member.id}
              >
                <Avatar src={member.photoURL}>
                  {member.photoURL ? "" : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </StyledButtonGroup>
      </StyledHeader>
      <StyledContent>
        <StyledMessageList ref={messageListRef}>
          {messages.map((message: Message) => (
            <Message
              key={message.id}
              text={message.text}
              photoURL={message.photoURL}
              displayName={message.displayName}
              createdAt={message.createdAt}
            />
          ))}
        </StyledMessageList>
        <StyledForm form={form}>
          <Form.Item name='message'>
            <Input
              ref={inputRef}
              onChange={handleInputChange}
              onPressEnter={handleOnSubmit}
              placeholder='Your message...'
              variant='borderless'
              autoComplete='off'
            />
          </Form.Item>
          <Button
            type='primary'
            onClick={handleOnSubmit}
          >
            Gửi
          </Button>
        </StyledForm>
      </StyledContent>
    </StyledWrapper>
  );
}
