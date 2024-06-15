"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDaumPostcodePopup } from "react-daum-postcode";

import styles from "./CreateGroup.module.css";
import Spacer from "@/components/Spacer";
import Link from "next/link";
import {
  checkDuplicateGroupName,
  createGroup,
  sendVerificationCode,
  verifyCode,
} from "@/services/group/group";

const validationSchema = yup.object().shape({
  groupName: yup
    .string()
    .required("그룹명을 입력해주세요.")
    .min(3, "3자 이상 입력해주세요."),
  description: yup.string().required("그룹 소개를 입력해주세요."),
  email: yup
    .string()
    .required("대표 이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  verificationCode: yup.string().required("이메일 인증번호를 입력해주세요."),
  businessNumber: yup.string(),
  address: yup.string().required("대표 주소를 입력해주세요."),
});

export default function CreateGroup() {
  const [isDuplicateGroupName, setIsDuplicateGroupName] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      groupName: "",
      description: "",
      email: "",
      verificationCode: "",
      businessNumber: "",
      address: "",
      addressDetail: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      requestCreateGroup();
    },
  });

  const scriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: {
    address: any;
    addressType: string;
    bname: string;
    buildingName: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    formik.setFieldValue("address", fullAddress);
  };

  const handleClick = () => {
    open({
      onComplete: handleComplete,
      width: 500,
      height: 600,
      left: window.screen.width / 2 - 500 / 2,
      top: window.screen.height / 2 - 600 / 2,
    });
  };

  const requestCreateGroup = async () => {
    if (!isDuplicateGroupName) {
      alert("그룹명 중복확인을 해주세요.");
      return;
    }

    if (!isSent || !isVerified) {
      alert("이메일 인증번호를 발송해주세요.");
      return;
    }

    const requestCreateGroup = {
      groupName: formik.values.groupName,
      groupDescription: formik.values.description,
      address: formik.values.address + " " + formik.values.addressDetail,
      businessNumber: formik.values.businessNumber,
      email: formik.values.email,
      imageUrl: "groupDefault.png",
    };
    const response = await createGroup(requestCreateGroup);

    if (response) {
      alert("그룹이 생성되었습니다.");
    } else {
      alert("그룹 생성에 실패했습니다.");
    }
    window.location.href = "/group";
  };

  const requestCheckDuplicateGroupName = async () => {
    if (formik.values.groupName.length < 3) {
      alert("그룹명은 3자 이상 입력해주세요.");
      return;
    }

    const data = checkDuplicateGroupName(formik.values.groupName);

    if ((await data) === false) {
      setIsDuplicateGroupName(true);
      alert("사용 가능한 그룹명입니다.");

      const groupNameInput = document.getElementById("groupName");
      if (groupNameInput) {
        groupNameInput.setAttribute("disabled", "true");
      }

      formik.setFieldValue("groupName", formik.values.groupName);
    } else {
      setIsDuplicateGroupName(false);
      alert("이미 사용 중인 그룹명입니다.");
    }
  };

  const requestSendVerificationCode = () => {
    if (!formik.values.email) {
      alert("대표 이메일을 입력해주세요.");
      return;
    }

    sendVerificationCode(formik.values.email);
    setIsSent(true);

    const emailInput = document.getElementById("email");
    if (emailInput) {
      alert("인증번호가 발송되었습니다.");
      emailInput.setAttribute("disabled", "true");
    }

    formik.setFieldValue("email", formik.values.email);
  };

  const requestVerifyCode = async () => {
    if (!formik.values.verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    const data = verifyCode({
      email: formik.values.email,
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
                  placeholder="그룹명을 입력해주세요. (3자 이상)"
                  value={formik.values.groupName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => requestCheckDuplicateGroupName()}
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
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="대표 주소를 입력해주세요."
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  readOnly
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleClick}
                >
                  주소찾기
                </button>
              </div>
              {formik.touched.address && formik.errors.address && (
                <div className={styles.error_message}>
                  {formik.errors.address}
                </div>
              )}
            </div>

            <div className={styles.input_group}>
              <label htmlFor="businessNumber">추가 주소 (선택)</label>
              <input
                type="text"
                id="businessNumber"
                name="addressDetail"
                placeholder="추가 주소를 입력해주세요."
                value={formik.values.addressDetail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
                  onClick={requestSendVerificationCode}
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
              <label htmlFor="verificationCode">인증번호</label>
              <div className={styles.input_with_button}>
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
                  onClick={requestVerifyCode}
                >
                  인증하기
                </button>
              </div>
              {formik.touched.verificationCode &&
                formik.errors.verificationCode && (
                  <div className={styles.error_message}>
                    {formik.errors.verificationCode}
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
