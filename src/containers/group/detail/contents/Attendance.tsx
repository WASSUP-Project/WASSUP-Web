"use client";

import styles from "./Attendance.module.css";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Snippet,
  Spinner,
  Progress,
  Button,
} from "@nextui-org/react";
import {
  ResponseCode,
  ResponseMembers,
  getAttendanceInfo,
  getAttendancePageUniqueCode,
} from "@/services/attendance/attendance";
import AttendanceManage from "./AttendanceManage";

type PageType = "info" | "manage";

type AttendanceProps = {
  id: number;
};

export default function Attendance(props: AttendanceProps) {
  const [selectedPage, setSelectedPage] = useState<PageType>("info");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attendanceCode, setAttendanceCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attendanceRate, setAttendanceRate] = useState<number>(0);
  const [absentMembers, setAbsentMembers] = useState<ResponseMembers[]>([]);

  useEffect(() => {
    const fetchAttendanceInfo = async () => {
      try {
        const attendanceInfo = await getAttendanceInfo(props.id);
        if (!attendanceInfo) {
          alert(
            "출석 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요."
          );
          return;
        }

        setAttendanceRate(attendanceInfo.attendanceRate);
        setAbsentMembers(attendanceInfo.notAttendanceMembers);
      } catch (error) {
        console.error("출석 정보를 불러오는데 실패: ", error);
        alert("출석 정보를 불러오는 중에 오류가 발생했습니다.");
      }
    };

    fetchAttendanceInfo();
  }, [props.id, selectedPage]);

  const generateAttendanceCode = async () => {
    onOpen();
    setIsLoading(true);
    const code = await getAttendanceCode();
    if (!code) {
      alert("출석 링크를 생성하는데 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    setAttendanceCode(code);
    setIsLoading(false);
  };

  async function getAttendanceCode(): Promise<string> {
    const response = (await getAttendancePageUniqueCode(
      props.id
    )) as ResponseCode;
    return response.code;
  }

  function generateAttendancePageLink() {
    return `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/attendance?code=${attendanceCode}`;
  }

  return (
    <>
      <h1 className={styles.title}>출결 관리</h1>
      <div className={styles.switch}>
        <Button
          className={
            selectedPage === "info"
              ? styles.switch_button_active
              : styles.switch_button
          }
          onPress={() => setSelectedPage("info")}
        >
          출결 현황
        </Button>
        <Button
          className={
            selectedPage === "manage"
              ? styles.switch_button_active
              : styles.switch_button
          }
          onPress={() => setSelectedPage("manage")}
        >
          출결 관리
        </Button>
      </div>
      <div className={styles.container}>
        {selectedPage === "info" ? (
          <div className={styles.content}>
            <div className={styles.buttonContainer}>
              <Button
                className={styles.button}
                onClick={generateAttendanceCode}
              >
                출석 링크
              </Button>
            </div>
            <div className={styles.summary}>
              <Progress
                label="금일 출석률"
                aria-label="Downloading..."
                size="md"
                value={attendanceRate}
                color="primary"
                showValueLabel={true}
                className={styles.attendanceRate}
              />
              <div className={styles.absent}>
                <h3 className={styles.absentTitle}>금일 미출석 인원</h3>
                <ul className={styles.absentList}>
                  {absentMembers.map((member) => (
                    <li key={member.memberId} className={styles.absentMembers}>
                      {member.memberName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <AttendanceManage id={props.id} />
        )}
      </div>

      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-0">
                출석 페이지
              </ModalHeader>
              <ModalBody>
                <>
                  <div>아래 링크는 24시간 동안 유효합니다.</div>
                  {isLoading ? (
                    <Spinner size="lg" />
                  ) : (
                    <Snippet symbol="" variant="bordered">
                      {generateAttendancePageLink()}
                    </Snippet>
                  )}
                </>
              </ModalBody>
              <ModalFooter>
                <Button className={styles.modalButton} onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
