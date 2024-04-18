"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./GroupInvite.module.css";
import Spacer from "@/components/Spacer";

const validationSchema = yup.object().shape({
  childName: yup.string().required("자녀 이름을 입력해주세요."),
  phoneNumber: yup
    .string()
    .required("전화번호를 입력해주세요.")
    .matches(/^\d{10,11}$/, "유효한 전화번호를 입력해주세요."),
  childBirth: yup.string().required("자녀 생일을 입력해주세요."),
  specialNote: yup.string().optional(),
  groupCode: yup.string().required("그룹 고유 코드를 입력해주세요."),
});

export default function GroupInvite() {
  const formik = useFormik({
    initialValues: {
      childName: "",
      phoneNumber: "",
      childBirth: "",
      specialNote: "",
      groupCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // API 연결
      // signupChild(values);
    },
  });

  const requestSignup = () => {
    if (!formik.isValid) {
      return;
    }

    console.log("Signup requested:", formik.values);
    // API 연결
    // signupChild(formik.values);
  };

  return (
    <>
      <div className={styles.container}>
        <Spacer />

        <div className={styles.title}>그룹 가입 신청</div>
        <div className={styles.description}>
          자녀 정보를 정확히 입력해주세요.
        </div>

        <Spacer height={5} />

        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <label htmlFor="childName">자녀 이름</label>
              <input
                type="text"
                id="childName"
                name="childName"
                placeholder="자녀 이름을 입력해주세요."
                value={formik.values.childName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.childName && formik.errors.childName && (
                <div className={styles.error_message}>
                  {formik.errors.childName}
                </div>
              )}
            </div>
            <div className={styles.input_group}>
              <label htmlFor="phoneNumber">전화번호</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="전화번호를 입력해주세요. (예시: 01012341234)"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className={styles.error_message}>
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
            <div className={styles.input_group}>
              <label htmlFor="childBirth">자녀 생일</label>
              <input
                type="date"
                id="childBirth"
                name="childBirth"
                value={formik.values.childBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.childBirth && formik.errors.childBirth && (
                <div className={styles.error_message}>
                  {formik.errors.childBirth}
                </div>
              )}
            </div>
            <div className={styles.input_group}>
              <label htmlFor="specialNote">자녀 특이사항</label>
              <textarea
                id="specialNote"
                name="specialNote"
                placeholder="자녀의 특이사항을 입력해주세요."
                value={formik.values.specialNote}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.specialNote && formik.errors.specialNote && (
                <div className={styles.error_message}>
                  {formik.errors.specialNote}
                </div>
              )}
            </div>
            <div className={styles.input_group}>
              <label htmlFor="groupCode">그룹 고유 코드</label>
              <input
                type="text"
                id="groupCode"
                name="groupCode"
                placeholder="그룹 고유 코드를 입력해주세요."
                maxLength={6}
                value={formik.values.groupCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.groupCode && formik.errors.groupCode && (
                <div className={styles.error_message}>
                  {formik.errors.groupCode}
                </div>
              )}
            </div>
            <div className={styles.button_group}>
              <button
                type="submit"
                className={styles.submit_button}
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
