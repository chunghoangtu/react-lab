import useAppContext from "@/hooks/useAppContext";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }

  .cta {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
`;

export default function UserInfor() {
  const { clearState } = useAppContext();
  const navigate = useNavigate();
  const {
    user: { displayName, photoURL },
    signOut,
  } = useAuth();

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(query(collection(db, "users")),  (snapshot) => {
  //     console.log("users:", snapshot.docs.map((doc) => doc.data()));
  //   },
  //   (error) => {
  //     console.error("users listener error:", error);
  //   });

  //   return unsubscribe;
  // }, []);

  const handleSignOut = async () => {
    clearState();
    await signOut();
    await navigate({
      to: "/login",
      replace: true,
    });
  };

  return (
    <StyledWrapper>
      <div>
        <Avatar src={photoURL}>{photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Button
        className='cta'
        ghost
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </StyledWrapper>
  );
}
