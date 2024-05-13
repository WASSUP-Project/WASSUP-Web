import MemberEdit from "@/containers/group/detail/contents/MemberEdit";
import { Suspense } from "react";

export default function GroupPage() {
  return (
    <Suspense fallback={<div></div>}>
      <MemberEdit />
    </Suspense>
  );
}
