import { doc, updateDoc } from "@firebase/firestore";
import db from "../firebase";


const useUpdateDoc = () => {

  const updateDocHandler = async (collection, id, updatedFields) => {
    const categoryDoc = doc(db, collection, id);

    await updateDoc(categoryDoc, updatedFields);
  };

  return updateDocHandler;
};

export default useUpdateDoc;