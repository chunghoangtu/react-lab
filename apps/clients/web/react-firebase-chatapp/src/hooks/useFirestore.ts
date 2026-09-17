import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase/config";

const useFirestore = (collectionName: any, queryCondition: any) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionQuery = query(collection(db, collectionName), orderBy("createdAt"));
    if (queryCondition) {
      if (!queryCondition.compareValue || !queryCondition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionQuery = query(
        collectionQuery,
        where(queryCondition.fieldName, queryCondition.operator, queryCondition.compareValue)
      );
    }

    const unsubscribe = onSnapshot(collectionQuery, (snapshot: any) => {
      const documents = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collectionName, queryCondition]);

  return documents;
};

export default useFirestore;
