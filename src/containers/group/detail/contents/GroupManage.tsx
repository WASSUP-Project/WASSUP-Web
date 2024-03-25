"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import { groupInfo } from "@/types/group/group";
import styles from "./GroupManage.module.css";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

type GroupManageProps = {
  id: number;
};

const validationSchema = yup.object().shape({
  groupName: yup
    .string()
    .required("그룹명을 입력해주세요.")
    .min(3, "3자 이상 입력해주세요."),
  description: yup.string().required("그룹 소개를 입력해주세요."),
  businessNumber: yup.string(),
  address: yup.string().required("대표 주소를 입력해주세요."),
  groupImage: yup.string().required("그룹 이미지를 업로드해주세요."),
});

export default function GroupManage(props: GroupManageProps) {
  const [groupDetail, setGroupDetail] = useState<groupInfo | null>(null);

  useEffect(() => {
    // 추후 API로 대체
    async function fetchGroupDetail() {
      // const response = await fetch(`/api/group/${id}`);
      // const data = await response.json();
      setGroupDetail({
        // 임시 데이터
        id: 1,
        name: "아이사랑수학학원",
        address: "서울특별시 구로구 항동로 2길 36, 3층",
        description: "아이사랑수학학원입니다.",
        businessNumber: "123-45-67890",
        groupImage: "https://via.placeholder.com/120",
      });
    }

    if (props) {
      fetchGroupDetail();
    }
  }, [props]);

  function handleGroupUpdate() {
    console.log("handleGroupUpdate");
  }

  const formik = useFormik({
    initialValues: {
      groupName: "",
      description: "",
      businessNumber: "",
      address: "",
      groupImage: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  function handleDuplicateCheck() {
    console.log("handleDuplicateCheck");
  }

  return (
    <>
      <div className={styles.title}>그룹 설정</div>
      {groupDetail && (
        <div className={styles.container}>
          <div className={styles.sub_title}>
            그룹 정보를 정확히 입력해주세요.
          </div>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <label htmlFor="groupName">그룹명</label>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  placeholder="그룹명을 입력해주세요. (5자 이상)"
                  value={groupDetail.name}
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
                value={groupDetail.description}
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
                value={groupDetail.address}
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
                value={groupDetail.businessNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
          </form>
          <div className={styles.button_container}>
            <Button
              color="success"
              onClick={handleGroupUpdate}
              className={styles.ok_button}
            >
              수정하기
            </Button>

            <Button
              color="danger"
              onClick={handleGroupUpdate}
              className={styles.delete_button}
            >
              삭제하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
