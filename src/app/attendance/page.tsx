import AttendancePad from "@/containers/group/detail/contents/AttendancePad";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function AttendancePage() {
  return (
    <>
      <div>
        <AttendancePad />
        <Button color="primary">
          <Link href="/">돌아가기</Link>
        </Button>
      </div>
    </>
  );
}
