"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import styles from "./Signup.module.css";
import Spacer from "@/components/Spacer";
import Link from "next/link";
import {
  signup,
  checkDuplicateId,
  sendVerificationCode,
  verifyCode,
} from "@/services/signup/signup";
import Image from "next/image";

const validationSchema = yup.object().shape({
  id: yup
    .string()
    .required("아이디를 입력해주세요.")
    .min(5, "5자 이상 입력해주세요."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "8자 이상 입력해주세요."),
  passwordConfirmation: yup
    .string()
    .required("비밀번호를 다시 입력해주세요.")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  name: yup.string().required("이름을 입력해주세요."),
  phoneNumber: yup
    .string()
    .required("휴대폰 번호를 입력해주세요.")
    .matches(/^\d{10,11}$/, "유효한 휴대폰 번호를 입력해주세요."),
  verificationCode: yup.string().required("인증번호를 입력해주세요."),
});

export default function Signup() {
  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      phoneNumber: "",
      verificationCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const [isDuplicateId, setIsDuplicateId] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const requestSignup = async () => {
    if (!formik.isValid) {
      return;
    }

    if (!isDuplicateId) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    if (!isVerified) {
      alert("휴대폰 인증을 해주세요.");
      return;
    }

    const data = signup({
      adminId: formik.values.id,
      password: formik.values.password,
      name: formik.values.name,
      phoneNumber: formik.values.phoneNumber,
    });

    if (await data) {
      alert("회원가입이 완료되었습니다.");
      window.location.href = "/";
    } else {
      alert("회원가입에 실패했습니다. [관리자 문의]");
    }
  };

  const requestCheckDuplicateId = async () => {
    if (formik.values.id.length < 5) {
      alert("아이디를 정확히 입력해주세요.");
      return;
    }

    const data = checkDuplicateId(formik.values.id);

    if ((await data) === false) {
      setIsDuplicateId(true);
      alert("사용 가능한 아이디입니다.");

      const idInput = document.getElementById("id");
      if (idInput) {
        idInput.setAttribute("disabled", "true");
      }

      formik.setFieldValue("id", formik.values.id);
    } else {
      setIsDuplicateId(false);
      alert("이미 사용 중인 아이디입니다.");
    }
  };

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

    const data = verifyCode({
      phoneNumber: formik.values.phoneNumber,
      inputCertificationCode: formik.values.verificationCode,
    });

    if (await data) {
      setIsVerified(true);
      alert("인증되었습니다.");

      const verificationCodeInput = document.getElementById("verificationCode");
      if (verificationCodeInput) {
        verificationCodeInput.setAttribute("disabled", "true");
      }

      formik.setFieldValue("verificationCode", formik.values.verificationCode);
    } else {
      setIsVerified(false);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <div className={styles.signupContainer}>
        <Spacer />

        <div className={styles.title}>와썹 회원 가입</div>
        <div className={styles.description}>
          회원 정보를 정확히 입력해주세요.
        </div>

        <Spacer height={5} />

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="id">아이디</label>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  id="id"
                  name="id"
                  placeholder="아이디를 입력해주세요. (5자 이상)"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {isDuplicateId ? (
                  <Image
                    src="check.png"
                    alt="check"
                    width={20}
                    height={20}
                    className={styles.input_group_ok}
                  />
                ) : (
                  <button
                    type="button"
                    className={styles.input_group_button}
                    onClick={() => requestCheckDuplicateId()}
                  >
                    중복확인
                  </button>
                )}
              </div>
              {formik.touched.id && formik.errors.id && (
                <div className={styles.errorMessage}>{formik.errors.id}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요. (8자 이상)"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.errorMessage}>
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="passwordConfirmation">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="비밀번호를 다시 입력해주세요."
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation && (
                  <div className={styles.errorMessage}>
                    {formik.errors.passwordConfirmation}
                  </div>
                )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력해주세요."
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.errorMessage}>{formik.errors.name}</div>
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
                    src="check.png"
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
                      src="check.png"
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
            <div className={styles.buttonGroup}>
              <Link href="/">
                <button type="button" className={styles.cancelButton}>
                  돌아가기
                </button>
              </Link>
              <button
                type="submit"
                className={styles.submitButton}
                onClick={requestSignup}
              >
                가입하기
              </button>
            </div>
          </form>
        </div>

        <Spacer />
      </div>
    </>
  );
}
