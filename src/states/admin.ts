import { ResponseAdmin } from '@/services/admin/admin';
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

let localStorage: Storage | null = null;
if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}

const { persistAtom } = recoilPersist({
  key: "adminState",
  storage: localStorage!,
})

export const adminState = atom<ResponseAdmin | null>({
  key: "adminState",
  default: null,
  effects_UNSTABLE: [persistAtom]
})