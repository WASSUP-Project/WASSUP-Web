"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import styles from "./CreateGroup.module.css";
import Spacer from "@/components/Spacer";
import Link from "next/link";

const validationSchema = yup.object().shape({
  groupName: yup
    .string()
    .required("그룹명을 입력해주세요.")
    .min(3, "3자 이상 입력해주세요."),
  description: yup.string().required("그룹 소개를 입력해주세요."),
  email: yup.string().required("대표 이메일을 입력해주세요.").email(),
  emailVerificationCode: yup
    .string()
    .required("이메일 인증번호를 입력해주세요."),
  businessNumber: yup.string(),
  address: yup.string().required("대표 주소를 입력해주세요."),
  groupImage: yup.string().required("그룹 이미지를 업로드해주세요."),
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
      groupName: "",
      description: "",
      email: "",
      emailVerificationCode: "",
      businessNumber: "",
      address: "",
      groupImage: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <>
      <div className={styles.create_group_container}>
        <Spacer />

        <div className={styles.title}>와썹 그룹 생성</div>
        <div className={styles.description}>
          그룹 정보를 정확히 입력해주세요.
        </div>

        <Spacer height={5} />

        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <label htmlFor="groupName">그룹명</label>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  placeholder="그룹명을 입력해주세요. (5자 이상)"
                  value={formik.values.groupName}
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
              {formik.touched.groupName && formik.errors.groupName && (
                <div className={styles.error_message}>
                  {formik.errors.groupName}
                </div>
              )}
            </div>

            <div className={styles.input_group}>
              <label htmlFor="description">그룹 소개</label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="그룹 소개를 입력해주세요."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <div className={styles.error_message}>
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div className={styles.input_group}>
              <label htmlFor="address">대표 주소</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="대표 주소를 입력해주세요."
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <div className={styles.error_message}>
                  {formik.errors.address}
                </div>
              )}
            </div>

            <div className={styles.input_group}>
              <label htmlFor="businessNumber">사업자 번호 (선택)</label>
              <input
                type="text"
                id="businessNumber"
                name="businessNumber"
                placeholder="사업자 번호를 입력해주세요."
                value={formik.values.businessNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="email">대표 이메일</label>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="대표 이메일을 입력해주세요."
                  value={formik.values.email}
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
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error_message}>
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className={styles.input_group}>
              <label htmlFor="emailVerificationCode">인증번호</label>
              <div className={styles.input_with_button}>
                <input
                  type="text"
                  id="emailVerificationCode"
                  name="emailVerificationCode"
                  placeholder="인증번호를 입력해주세요."
                  value={formik.values.emailVerificationCode}
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
              {formik.touched.emailVerificationCode &&
                formik.errors.emailVerificationCode && (
                  <div className={styles.error_message}>
                    {formik.errors.emailVerificationCode}
                  </div>
                )}
            </div>

            <div className={styles.image_input}>
              <label htmlFor="groupImage">그룹 이미지</label>
              <div className={styles.image_input_container}>
                <input
                  type="file"
                  id="groupImage"
                  name="groupImage"
                  accept="image/*"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.image_input}
                  aria-label="그룹 이미지 업로드"
                />
              </div>
              {formik.touched.groupImage && formik.errors.groupImage && (
                <div className={styles.error_message}>
                  {formik.errors.groupImage}
                </div>
              )}
            </div>

            <div className={styles.button_group}>
              <Link href="/group">
                <button type="button" className={styles.cancel_button}>
                  돌아가기
                </button>
              </Link>
              <button type="submit" className={styles.submit_button}>
                생성하기
              </button>
            </div>
          </form>
        </div>

        <Spacer />
      </div>
    </>
  );
}
