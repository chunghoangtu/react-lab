import { auth } from "@/libs/firebase/config";
import { addDocument, generateKeywords } from "@/services/firebase.service";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  type User,
  type UserCredential,
} from "firebase/auth";

const signUpNewUser = async (userCredential: UserCredential, providerId: string | null) => {
  try {
    const { user } = userCredential;

    await addDocument("users", {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      providerId,
      keywords: generateKeywords(user.displayName?.toLowerCase() ?? ""),
    });
  } catch (error: any) {
    throw new Error(error?.message, { cause: error });
  }
};

export const signInWithFacebook = async (): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithPopup(auth, new FacebookAuthProvider());
    const additionalUserInfo = getAdditionalUserInfo(userCredential);

    if (additionalUserInfo?.isNewUser) {
      await signUpNewUser(userCredential, additionalUserInfo?.providerId);
    }

    return userCredential;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const onAuthChange = (callback: Parameters<typeof onAuthStateChanged>[1]) =>
  onAuthStateChanged(auth, callback);

export const waitForAuthState = async (): Promise<User | null> => {
  await auth.authStateReady();
  return auth.currentUser;
};

export const signOutUser = async () => {
  await signOut(auth);
};
