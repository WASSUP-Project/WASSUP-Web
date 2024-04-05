"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Spacer from "@/components/Spacer";
import styles from "./Login.module.css";
import Link from "next/link";
import { login } from "@/services/login/login";

export default function Login() {
  const validationSchema = yup.object().shape({
    id: yup
      .string()
      .required("아이디를 입력해주세요.")
      .min(5, "5자 이상 입력해주세요."),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "8자 이상 입력해주세요."),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const requestLogin = async () => {
    const loginRequest = {
      adminId: formik.values.id,
      password: formik.values.password,
    };
    const response = await login(loginRequest);
    console.log(response);

    if (response) {
      localStorage.setItem("accessToken", response.token);
      window.location.href = "/";
    } else {
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <div className={styles.signupContainer}>
        <Spacer height={5} />

        <div className={styles.title}>와썹 로그인</div>
        <div className={styles.description}>
          아이디와 비밀번호를 정확히 입력해주세요.
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
            <div className={styles.bottomGroup}>
              <div className={styles.linkGroup}>
                <Link href="/find/id" className={styles.link}>
                  아이디 찾기
                </Link>
                <Link href="/find/password" className={styles.link}>
                  비밀번호 찾기
                </Link>
                <Link href="/signup" className={styles.link}>
                  회원가입
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
                  onClick={requestLogin}
                >
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>

        <Spacer height={5} />
      </div>
    </>
  );
}
