/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./AttendancePad.module.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import {
  ResponseMembers,
  getMembersByLastFourDigits,
  requestAttendanceWithMemberId,
} from "@/services/attendance/attendance";

type AttendanceType = "ok" | "already" | "notfound";

export default function AttendancePad() {
  const searchParams = useSearchParams();
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [inputNumber, setInputNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attendanceType, setAttendanceType] = useState<AttendanceType>("ok");
  const [members, setMembers] = useState([] as ResponseMembers[]);

  useEffect(() => {
    setSelectedCode(searchParams.get("code") || "");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (/^\d$/.test(key)) {
        if (inputNumber.length < 4) {
          setInputNumber((prev) => prev + key);
        }
      } else if (key === "Backspace") {
        setInputNumber((prev) => prev.slice(0, -1));
      } else if (key === "Enter" && !isOpen) {
        handleConfirmClick();
      } else if (key === "Enter" && isOpen) {
        onOpenChange();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputNumber]);

  const handleNumberClick = (number: number) => {
    if (inputNumber.length < 4) {
      setInputNumber(inputNumber + number);
    }
  };

  const handleResetClick = () => {
    setInputNumber("");
  };

  const handleConfirmClick = async () => {
    if (inputNumber.length !== 4) {
      setErrorMessage("4자리 숫자를 입력하세요.");
      return;
    }
    setErrorMessage("");
    setInputNumber("");
    await requestAttendanceMembers();
    onOpen();
  };

  const requestAttendanceMembers = async () => {
    try {
      const response = await getMembersByLastFourDigits({
        code: selectedCode,
        phoneNumber: inputNumber,
      });

      if (!response || response.length === 0) {
        setAttendanceType("notfound");
        return;
      }

      setMembers(response);
      setAttendanceType("ok");
    } catch (error) {
      console.error(error);
    }
  };

  const requestAttendance = async (memberId: number) => {
    try {
      if (memberId === 0) {
        console.error("memberId is 0");
        return;
      }
      await requestAttendanceWithMemberId(memberId, selectedCode);

      setMembers([]);
      alert("출석이 완료되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1 className={styles.title}>
          <span>휴대폰 번호 뒤 4자리</span>를 입력해주세요
        </h1>
        <div className={styles.inputNumber}>
          <div className={styles.numberDisplay}>
            <div className={styles.num1}>{inputNumber[0]}</div>
            <div className={styles.num2}>{inputNumber[1]}</div>
            <div className={styles.num3}>{inputNumber[2]}</div>
            <div className={styles.num4}>{inputNumber[3]}</div>
          </div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
        <div className={styles.numberPad}>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
            <button
              key={i}
              className={styles.numberButton}
              onClick={() => handleNumberClick(i)}
            >
              {i}
            </button>
          ))}
          <div></div>
          <button
            className={styles.numberButton}
            onClick={() => handleNumberClick(0)}
          >
            0
          </button>
          <button className={styles.resetButton} onClick={handleResetClick}>
            초기화
          </button>
        </div>
        <button className={styles.confirmButton} onClick={handleConfirmClick}>
          출석 확인
        </button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) =>
            attendanceType === "ok" ? (
              <OkModal
                onClose={onClose}
                members={members}
                requestAttendance={requestAttendance}
              />
            ) : attendanceType === "already" ? (
              <AlreadyModal onClose={onClose} />
            ) : attendanceType === "notfound" ? (
              <NotFoundModal onClose={onClose} />
            ) : (
              <></>
            )
          }
        </ModalContent>
      </Modal>
    </div>
  );
}

interface OkModalProps {
  onClose: () => void;
  members: ResponseMembers[];
  requestAttendance: (id: number) => void;
}

function OkModal({ onClose, members, requestAttendance }: OkModalProps) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-0">선택하기</ModalHeader>
      <ModalBody className={styles.modal__body}>
        <div>출석할 인원을 선택해주세요.</div>
        {members.map((member) => (
          <div
            key={member.memberId}
            className={styles.memberName}
            onClick={() => {
              requestAttendance(member.memberId);
              onClose();
            }}
          >
            <span>{member.memberName}</span>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button onPress={onClose}>취소</Button>
      </ModalFooter>
    </>
  );
}

function AlreadyModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-0">출석</ModalHeader>
      <ModalBody className={styles.modal__body}>
        <div>이미 출석하셨습니다.</div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          확인
        </Button>
      </ModalFooter>
    </>
  );
}

function NotFoundModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-0">출석</ModalHeader>
      <ModalBody className={styles.modal__body}>
        <div>해당하는 인원이 없습니다.</div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          확인
        </Button>
      </ModalFooter>
    </>
  );
}
