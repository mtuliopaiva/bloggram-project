import { useState, useEffect } from "react";
import { db } from "../firebase/config";
// methods from firebase (looks like sql)
import {
  collection,
  query,
  ordeerBy,
  onSnapshot,
  where,
  orderBy,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);
  
    useEffect(() => {
      const loadData = async () => {
        if (cancelled) return;
  
        setLoading(true);
        const collectionRef = await collection(db, docCollection);
  
        try {
          let q;
          q = await query(collectionRef, orderBy("createdAt", "desc"));
  
          await onSnapshot(q, (QuerySnapshot) => {
            setDocuments(
              QuerySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
          setError(error.message);
          setLoading(false);
        }
      };
      loadData();
    }, [docCollection, search, uid, cancelled]);
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return [documents, loading, error];
  };



  // deal with memory leak
        //firebase method - check the updated data in the firebase
