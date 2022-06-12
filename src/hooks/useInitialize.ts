import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { Data } from "../type/DataType";

export const useInitialize = () => {
  const getMonthData = async (ym: Date) => {
    var getData: Data[] = [];
    const tgtYm: string = (ym.getFullYear() * 100 + ym.getMonth()).toString();
    const querySnapshot = await getDocs(collection(db, 'user', 'tom', tgtYm));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      getData.push({
        id: Number(doc.id),
        type: doc.data().type,
        item: doc.data().item,
        mny: Number(doc.data().mny),
      });
      console.log(getData)
    });
    return getData;
  };
  return {getMonthData};
}
