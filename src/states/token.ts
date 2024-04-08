import { ResponseAdmin } from '@/services/admin/admin';
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist({
  key: "tokenState",
  storage: localStorage,
})

export const tokenState = atom({
  key: "tokenState",
  default: "" as string,
  effects_UNSTABLE: [persistAtom]
})

export const adminState = atom({
  key: "adminState",
  default: null as ResponseAdmin | null,
})