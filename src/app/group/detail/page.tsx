import { Suspense } from "react";
import GroupDetail from "@/containers/group/detail/GroupDetail";

export default function GroupDetailPage() {
  return (
    <Suspense fallback={<div></div>}>
      <GroupDetail />
    </Suspense>
  );
}
