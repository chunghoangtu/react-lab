type ChatUser = {
  displayName?: string;
  email?: string;
  uid?: string;
  photoURL?: string;
};

type ChatMember = {
  id: string;
} & ChatUser;

type Room = {
  id: string;
  members: string[];
  name: string;
  description: string;
};

type Message = {
  id: string;
  text?: string;
  uid?: string;
  roomId?: string;
  photoURL?: string;
  displayName?: string;
  createdAt?: import("firebase/firestore").Timestamp;
};

type SelectOption = {
  label: string,
  value: string,
  photoURL?: string
}