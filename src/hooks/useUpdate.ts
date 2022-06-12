import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { Data } from "../type/DataType";

type SData = {
  type: string,
  item: string,
  mny: number,
}

export const useUpdate = () => {
  const updateData = async (ym:Date, data: Data[]) => {
    const tgtYm: string = (ym.getFullYear() * 100 + ym.getMonth()).toString();

    const gettingData = await getDocs(collection(db, 'user', 'tom', tgtYm));
    if(gettingData.empty){
      // 取得データがないと木
      data.forEach((d: Data) => {
        updateDatas(tgtYm, d);
      })
    }
    gettingData.forEach((gd) => {
      let prcss = false;
      data.forEach((d: Data) => {
        if(d.id === Number(gd.id)){
          // 画面データとDBが一緒の場合
          updateDatas(tgtYm, d)
          prcss = true;
       }
      });
      if(!prcss){
        const delDocRef = doc(db, 'user', 'tom', tgtYm, gd.id.toString());
        deleteDoc(delDocRef);
      }
    })
   };

   const updateDatas = (tgtYm: string, data: Data) => {
    const docRef = doc(db, 'user', 'tom', tgtYm, data.id.toString());
    const settingData: SData = {type: data.type, item: data.item, mny: data.mny};
    setDoc(docRef, settingData)
   }
  return {updateData};
}
