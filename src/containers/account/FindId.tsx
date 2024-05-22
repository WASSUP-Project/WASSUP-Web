"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Spacer from "@/components/Spacer";
import styles from "./FindId.module.css";
import Link from "next/link";
import Image from "next/image";
import { sendVerificationCode } from "@/services/signup/signup";
import { findIdByCertification } from "@/services/account/account";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button, useDisclosure } from "@nextui-org/react";

export default function FindId() {
  const [isSent, setIsSent] = React.useState<boolean>(false);
  const [isVerified, setIsVerified] = React.useState<boolean>(false);
  const [adminId, setAdminId] = React.useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const validationSchema = yup.object().shape({
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

    const data = await findIdByCertification({
      phoneNumber: formik.values.phoneNumber,
      inputCertificationCode: formik.values.verificationCode,
    });

    if (data) {
      setIsVerified(true);
      setAdminId(data.adminId);
      onOpen();
    } else {
      setIsVerified(false);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className={styles.signupContainer}>
        <Spacer height={5} />

        <div className={styles.title}>아이디 찾기</div>
        <div className={styles.description}>
          휴대폰 번호 정확히 입력해주세요.
        </div>

        <Spacer height={5} />

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
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
                  //   onClick={}
                >
                  확인하기
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
                아이디 찾기
              </ModalHeader>
              <ModalBody>
                <p>
                  아이디는 <strong>{adminId}</strong> 입니다.
                </p>
              </ModalBody>
              <ModalFooter>
                <Link href={"/login"}>
                  <Button
                    color="primary"
                    onPress={onClose}
                    className={styles.submitButton}
                  >
                    로그인하러 가기
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
