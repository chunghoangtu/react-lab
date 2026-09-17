import { db } from "@/libs/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const addDocument = <T extends Record<string, unknown>>(
  collectionName: string,
  data: T
) => {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName: string): string[] => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(" ").filter((word) => word);

  const length = name.length;
  const flagArray: boolean[] = [];
  const result: string[] = [];
  const stringArray: string[] = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name: string): string[] => {
    const arrName: string[] = [];
    let curName = "";
    name.split("").forEach((letter: string) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k: number) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        const word = name[i];
        if (!word) continue;

        flagArray[i] = true;
        result[k] = word;

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce<string[]>((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
