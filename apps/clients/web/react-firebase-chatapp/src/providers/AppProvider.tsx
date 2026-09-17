import useAuth from "@/hooks/useAuth";
import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import useFirestore from "../hooks/useFirestore";

export type AppContextType = {
  rooms: Room[];
  members: ChatMember[];
  selectedRoom: Room | null;
  isAddRoomVisible: boolean;
  setIsAddRoomVisible: Dispatch<SetStateAction<boolean>>;
  selectedRoomId: string;
  setSelectedRoomId: Dispatch<SetStateAction<string>>;
  isInviteMemberVisible: boolean;
  setIsInviteMemberVisible: Dispatch<SetStateAction<boolean>>;
  clearState: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);

type AppProviderProps = PropsWithChildren;

export default function AppProvider({ children }: AppProviderProps) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const {
    user: { uid },
  } = useAuth();

  const roomsQueryCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsQueryCondition);

  const selectedRoom = useMemo<Room | null>(
    () => rooms.find((room: Room) => room.id === selectedRoomId) || null,
    [rooms, selectedRoomId]
  );

  const usersQueryCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom?.members ?? [],
    };
  }, [selectedRoom?.members]);
  const members = useFirestore("users", usersQueryCondition);

  const clearState = () => {
    setSelectedRoomId("");
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
