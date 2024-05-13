"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./GroupInvite.module.css";
import Spacer from "@/components/Spacer";
import { joinGroup } from "@/services/invite/invite";

const validationSchema = yup.object().shape({
  name: yup.string().required("자녀 이름을 입력해주세요."),
  phoneNumber: yup
    .string()
    .required("전화번호를 입력해주세요.")
    .matches(/^\d{10,11}$/, "유효한 전화번호를 입력해주세요."),
  birth: yup.date().required("자녀 생일을 입력해주세요."),
  specifics: yup.string().optional(),
  groupCode: yup.string().required("그룹 고유 코드를 입력해주세요."),
});

export default function GroupInvite() {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      birth: "",
      specifics: "",
      groupCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const requestJoinGroup = async () => {
    if (!formik.isValid) {
      return;
    }

    const data = joinGroup({
      name: formik.values.name,
      phoneNumber: formik.values.phoneNumber,
      birth: formik.values.birth,
      specifics: formik.values.specifics,
      groupCode: formik.values.groupCode,
    });

    if (await data) {
      alert("가입 신청이 완료되었습니다.");
      window.location.href = "/";
    } else {
      alert("가입 신청에 실패했습니다. 다시 시도해주세요.");
    }
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
              <label htmlFor="name">자녀 이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="자녀 이름을 입력해주세요."
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.error_message}>{formik.errors.name}</div>
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
              <label htmlFor="birth">자녀 생일</label>
              <input
                type="date"
                id="birth"
                name="birth"
                value={formik.values.birth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.birth && formik.errors.birth && (
                <div className={styles.error_message}>
                  {formik.errors.birth}
                </div>
              )}
            </div>
            <div className={styles.input_group}>
              <label htmlFor="specifics">자녀 특이사항</label>
              <textarea
                id="specifics"
                name="specifics"
                placeholder="자녀의 특이사항을 입력해주세요."
                value={formik.values.specifics}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.specifics && formik.errors.specifics && (
                <div className={styles.error_message}>
                  {formik.errors.specifics}
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
                onClick={requestJoinGroup}
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
