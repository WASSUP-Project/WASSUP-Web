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

type AttendanceType = "ok" | "already" | "duplicate" | "notfound";

export default function AttendancePad() {
  const [inputNumber, setInputNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [attendanceType, setAttendanceType] = useState<AttendanceType>("ok");

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

  const handlePreviousClick = () => {
    setInputNumber(inputNumber.slice(0, -1));
  };

  const handleResetClick = () => {
    setInputNumber("");
  };

  const handleConfirmClick = () => {
    if (inputNumber.length !== 4) {
      setErrorMessage("4자리 숫자를 입력하세요.");
      return;
    }
    setErrorMessage("");
    setInputNumber("");
    onOpen();
  };

  const requestAttendance = () => {
    // TODO: 출석 요청
    setAttendanceType("ok");
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
          {Array(1, 2, 3, 4, 5, 6, 7, 8, 9).map((i) => (
            <button
              key={i}
              className={styles.numberButton}
              onClick={() => handleNumberClick(i)}
              onKeyDown={(e) => e.preventDefault()}
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
              OkModal(onClose)
            ) : attendanceType === "already" ? (
              AlreadyModal(onClose)
            ) : attendanceType === "duplicate" ? (
              DuplicateMemberModal(onClose)
            ) : attendanceType === "notfound" ? (
              NotFoundModal(onClose)
            ) : (
              <></>
            )
          }
        </ModalContent>
      </Modal>
    </div>
  );
}

function OkModal(onClose: () => void) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-0">출석</ModalHeader>
      <ModalBody className={styles.modal__body}>
        <>
          <div>출석되었습니다.</div>
        </>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          확인
        </Button>
      </ModalFooter>
    </>
  );
}

function AlreadyModal(onClose: () => void) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-0">출석</ModalHeader>
      <ModalBody className={styles.modal__body}>
        <>
          <div>이미 출석하셨습니다.</div>
        </>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          확인
        </Button>
      </ModalFooter>
    </>
  );
}

function DuplicateMemberModal(onClose: () => void) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-0">선택하기</ModalHeader>
      <ModalBody className={styles.modal__body}>
        <>
          <div>출석할 인원을 선택해주세요.</div>
        </>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          확인
        </Button>
      </ModalFooter>
    </>
  );
}

function NotFoundModal(onClose: () => void) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-0">출석</ModalHeader>
      <ModalBody className={styles.modal__body}>
        <>
          <div>해당하는 인원이 없습니다.</div>
        </>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          확인
        </Button>
      </ModalFooter>
    </>
  );
}
