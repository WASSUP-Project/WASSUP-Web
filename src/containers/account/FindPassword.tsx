"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Spacer from "@/components/Spacer";
import styles from "./FindPassword.module.css";
import Link from "next/link";
import Image from "next/image";
import { sendVerificationCode, verifyCode } from "@/services/signup/signup";
import {
  resetPassword,
  sendVerificationCodeForPassword,
} from "@/services/account/account";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { EyeFilledIcon } from "@/components/eyes/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/eyes/EyeSlashFilledIcon";
import { Button, useDisclosure } from "@nextui-org/react";

export default function FindPassword() {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const validationSchema = yup.object().shape({
    id: yup
      .string()
      .required("아이디를 입력해주세요.")
      .min(5, "5자 이상 입력해주세요."),
    phoneNumber: yup
      .string()
      .required("휴대폰 번호를 입력해주세요.")
      .matches(/^\d{10,11}$/, "유효한 휴대폰 번호를 입력해주세요."),
    verificationCode: yup
      .string()
      .required("인증번호를 입력해주세요.")
      .matches(/^\d{6}$/, "유효한 인증번호를 입력해주세요."),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      phoneNumber: "",
      verificationCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const requestSendVerificationCode = () => {
    if (!formik.values.phoneNumber) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }

    const response = sendVerificationCodeForPassword({
      adminId: formik.values.id,
      phoneNumber: formik.values.phoneNumber,
    });

    if (!response) {
      alert("작성한 정보가 올바르지 않습니다.");
      return;
    }

    sendVerificationCode(formik.values.phoneNumber);
    setIsSent(true);

    const phoneNumberInput = document.getElementById("phoneNumber");
    if (phoneNumberInput) {
      phoneNumberInput.setAttribute("disabled", "true");
    }

    formik.setFieldValue("phoneNumber", formik.values.phoneNumber);
  };

  const requestVerifyCode = async () => {
    if (!formik.values.verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    const data = await verifyCode({
      phoneNumber: formik.values.phoneNumber,
      inputCertificationCode: formik.values.verificationCode,
    });

    if (data) {
      setIsVerified(true);

      const verificationCodeInput = document.getElementById("verificationCode");
      if (verificationCodeInput) {
        verificationCodeInput.setAttribute("disabled", "true");
      }
    } else {
      setIsVerified(false);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const handlePasswordReset = () => {
    if (isSent && isVerified) {
      onOpen();
    } else {
      alert("휴대폰 번호 인증을 완료해주세요.");
    }
  };

  const requestResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      alert("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    const response = resetPassword({
      adminId: formik.values.id,
      phoneNumber: formik.values.phoneNumber,
      inputCertificationCode: formik.values.verificationCode,
      newPassword: newPassword,
    });

    if (!response) {
      alert("작성한 정보가 올바르지 않습니다.");
      return;
    }

    alert("비밀번호가 재설정되었습니다.");
  };

  return (
    <>
      <div className={styles.signupContainer}>
        <Spacer height={5} />

        <div className={styles.title}>비밀번호 재설정</div>
        <div className={styles.description}>
          아이디와 휴대폰 번호를 입력해주세요.
        </div>

        <Spacer height={5} />

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="아이디를 입력해주세요. (5자 이상)"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.id && formik.errors.id && (
                <div className={styles.errorMessage}>{formik.errors.id}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">휴대폰 번호</label>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="휴대폰 번호를 입력해주세요. (예시: 01012341234)"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {isSent ? (
                  <Image
                    src="../check.png"
                    alt="check"
                    width={20}
                    height={20}
                    className={styles.input_group_ok}
                  />
                ) : (
                  <button
                    type="button"
                    className={styles.input_group_button}
                    onClick={requestSendVerificationCode}
                  >
                    발송하기
                  </button>
                )}
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className={styles.errorMessage}>
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="verificationCode">인증번호</label>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  placeholder="인증번호를 입력해주세요."
                  value={formik.values.verificationCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {isSent ? (
                  isVerified ? (
                    <Image
                      src="../check.png"
                      alt="check"
                      width={20}
                      height={20}
                      className={styles.input_group_ok}
                    />
                  ) : (
                    <button
                      type="button"
                      className={styles.input_group_button}
                      onClick={requestVerifyCode}
                    >
                      인증하기
                    </button>
                  )
                ) : (
                  <></>
                )}
              </div>
              {formik.touched.verificationCode &&
                formik.errors.verificationCode && (
                  <div className={styles.errorMessage}>
                    {formik.errors.verificationCode}
                  </div>
                )}
            </div>
            <div className={styles.bottomGroup}>
              <div className={styles.linkGroup}>
                <Link href="/find/id" className={styles.link}>
                  아이디 찾기
                </Link>
                <Link href="/find/password" className={styles.link}>
                  비밀번호 찾기
                </Link>
                <Link href="/login" className={styles.link}>
                  로그인
                </Link>
              </div>
              <div className={styles.buttonGroup}>
                <Link href="/">
                  <button type="button" className={styles.cancelButton}>
                    돌아가기
                  </button>
                </Link>
                <button
                  type="submit"
                  className={styles.submitButton}
                  onClick={handlePasswordReset}
                >
                  재설정
                </button>
              </div>
            </div>
          </form>
        </div>

        <Spacer height={5} />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                비밀번호 재설정
              </ModalHeader>
              <ModalBody>
                <>
                  {isVerified ? (
                    <>
                      <div className={styles.inputGroup}>
                        <label htmlFor="newPassword">새 비밀번호</label>
                        <div className={styles.inputWithButton}>
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            placeholder="새 비밀번호를 입력해주세요."
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className={styles.eyes_button}
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          >
                            {isPasswordVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                        <div className={styles.inputWithButton}>
                          <input
                            type={isPasswordVisible2 ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="비밀번호를 다시 입력해주세요."
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className={styles.eyes_button}
                            onClick={() =>
                              setIsPasswordVisible2(!isPasswordVisible2)
                            }
                          >
                            {isPasswordVisible2 ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </ModalBody>
              <ModalFooter>
                <Link href={"/login"}>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={requestResetPassword}
                    className={styles.submitButton}
                  >
                    확인
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
