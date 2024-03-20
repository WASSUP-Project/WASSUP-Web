"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import styles from "./Signup.module.css";
import Spacer from "@/components/Spacer";
import Link from "next/link";

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

const handleDuplicateCheck = () => {
  console.log("handleDuplicateCheck");
};

const handleSendVerificationCode = () => {
  console.log("handleSendVerificationCode");
};

const handleVerifyCode = () => {
  console.log("handleVerifyCode");
};

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

  return (
    <>
      <div className={styles.signupContainer}>
        <Spacer />

        <div className={styles.title}>와썹 회원 가입</div>
        <div className={styles.description}>
          회원 정보를 정확히 입력해주세요.
        </div>

        <Spacer />

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
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => handleDuplicateCheck()}
                >
                  중복확인
                </button>
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
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleSendVerificationCode}
                >
                  발송하기
                </button>
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
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleVerifyCode}
                >
                  인증하기
                </button>
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
              <button type="submit" className={styles.submitButton}>
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
