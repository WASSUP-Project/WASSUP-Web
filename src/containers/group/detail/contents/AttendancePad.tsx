"use client";

import React, { useState } from "react";
import styles from "./AttendancePad.module.css";

export default function AttendancePad() {
  const [inputNumber, setInputNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNumberClick = (number: number) => {
    if (inputNumber.length < 4) {
      setInputNumber(inputNumber + number);
    }
  };

  const handlePreviousClick = () => {
    setInputNumber(inputNumber.slice(0, -1));
  };

  const handleConfirmClick = () => {
    if (inputNumber.length === 4) {
      // TODO: API 연동
      // 서버에 4자리 숫자 전송
      // 서버에서 출석 정보 확인 후 결과 표시
    } else {
      setErrorMessage("4자리 숫자를 입력하세요.");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <span>이름:</span>
        </div>
      </header>
      <div className={styles.container}>
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
          {Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 0).map((i) => (
            <button
              key={i}
              className={styles.numberButton}
              onClick={() => handleNumberClick(i)}
            >
              {i}
            </button>
          ))}
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
    </>
  );
}
