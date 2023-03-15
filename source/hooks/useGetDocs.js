import { collection, onSnapshot } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase";

const useGetDocs = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  // Pegando as coleções do Firestore
  const coll = collection(db, collectionName);

  useEffect(() => {

    //  Acessando os documentos
    // Função 'onSnapshot' tras as atualizações em tempo real
    const getDocs = onSnapshot(coll, snapshot => {

      // A função 'data()' expõe os dados do objeto
      const data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      setDocuments(data);
    });

    return () => {
      getDocs();
    }
  }, []);

  return documents;
};

export default useGetDocs;