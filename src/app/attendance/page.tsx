import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function AttendancePage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10rem",
        }}
      >
        <Image
          src="/attendance.png"
          alt="Image of something relevant"
          width={1000}
          height={250}
        ></Image>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
        }}
      >
        <Button color="primary">
          <Link href="/">돌아가기</Link>
        </Button>
      </div>
    </>
  );
}
