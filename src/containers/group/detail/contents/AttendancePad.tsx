"use client";

import React, { useState } from "react";
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

  const handleNumberClick = (number: number) => {
    if (inputNumber.length < 4) {
      setInputNumber(inputNumber + number);
    }
  };

  const handlePreviousClick = () => {
    setInputNumber(inputNumber.slice(0, -1));
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
        <div className={styles.inputNumber}>
          <input
            type="number"
            value={inputNumber}
            maxLength={4}
            onChange={(e) => setInputNumber(e.target.value)}
          />
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
          <button
            className={styles.previousButton}
            onClick={handlePreviousClick}
          >
            ←
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
