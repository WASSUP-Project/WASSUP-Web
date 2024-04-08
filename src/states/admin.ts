import { ResponseAdmin } from '@/services/admin/admin';
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist({
  key: "adminState",
  storage: localStorage,
})

export const adminState = atom({
  key: "adminState",
 default: null as ResponseAdmin | null,
  effects_UNSTABLE: [persistAtom]
})