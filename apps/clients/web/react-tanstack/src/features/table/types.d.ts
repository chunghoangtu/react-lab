import PERSONS from "./MOCK_DATA.json";

declare global {
  type Person = (typeof PERSONS)[number];
  type User = {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    comments: string;
  };
}

export {};
