import { deleteDoc, doc } from "@firebase/firestore";
import db from "../firebase";

const useDeleteDoc = () => {
  const deleteDocHandler = async (collection, id) => {
    const categoryDoc = doc(db, collection, id);
    await deleteDoc(categoryDoc);
  };
  return deleteDocHandler;
};

export default useDeleteDoc;