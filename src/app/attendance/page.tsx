import { Suspense } from "react";
import AttendancePad from "@/containers/group/detail/contents/AttendancePad";

export default function AttendancePage() {
  return (
    <Suspense fallback={<div></div>}>
      <AttendancePad />
    </Suspense>
  );
}
