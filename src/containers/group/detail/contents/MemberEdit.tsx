/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./MemberEdit.module.css";
import Spacer from "@/components/Spacer";
import { useEffect, useState } from "react";
import { getMemberById, updateMember } from "@/services/member/member";
import { useSearchParams } from "next/navigation";

const validationSchema = yup.object().shape({
  name: yup.string().required("자녀 이름을 입력해주세요."),
  phoneNumber: yup
    .string()
    .required("전화번호를 입력해주세요.")
    .matches(/^\d{10,11}$/, "유효한 전화번호를 입력해주세요."),
  birth: yup.date().required("자녀 생일을 입력해주세요."),
  specifics: yup.string().optional(),
});

export default function MemberEdit() {
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      birth: "",
      specifics: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberById(selectedId);
      return data;
    }

    async function fetchDataAndSetValues() {
      const data = await fetchMemberData();

      if (!data) {
        return;
      }

      formik.setValues({
        name: data.name,
        phoneNumber: data.phoneNumber,
        birth: data.birth,
        specifics: data.specifics,
      });
    }

    setSelectedGroupId(parseInt(searchParams.get("group") || "0"));
    setSelectedId(parseInt(searchParams.get("id") || "0"));
    fetchDataAndSetValues();
  }, [searchParams, selectedId]);

  const requestEditMember = async () => {
    if (!formik.isValid) {
      return;
    }

    const data = updateMember({
      id: selectedId,
      name: formik.values.name,
      phoneNumber: formik.values.phoneNumber,
      birth: formik.values.birth,
      specifics: formik.values.specifics,
    });

    if (await data) {
      alert("인원 정보 수정이 완료되었습니다.");
      window.location.href = "/group/detail?id=" + selectedGroupId;
    } else {
      alert("인원 정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Spacer />

        <div className={styles.title}>인원 정보 수정</div>
        <div className={styles.description}>
          수정할 인원 정보를 정확히 입력해주세요.
        </div>

        <Spacer height={5} />

        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.input_member}>
              <label htmlFor="name">인원 이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="인원 이름을 입력해주세요."
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.error_message}>{formik.errors.name}</div>
              )}
            </div>
            <div className={styles.input_member}>
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
            <div className={styles.input_member}>
              <label htmlFor="birth">인원 생일</label>
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
            <div className={styles.input_member}>
              <label htmlFor="specifics">인원 특이사항</label>
              <textarea
                id="specifics"
                name="specifics"
                placeholder="인원의 특이사항을 입력해주세요."
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
            <div className={styles.button_group}>
              <button
                type="submit"
                className={styles.submit_button}
                onClick={requestEditMember}
              >
                수정하기
              </button>
            </div>
          </form>
        </div>

        <Spacer />
      </div>
    </>
  );
}
