/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import { groupInfo } from "@/types/group/group";
import styles from "./GroupManage.module.css";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { deleteGroup, updateGroup } from "@/services/group/group";

import { v4 as uuid } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "@/utils/firebase";
import { useDaumPostcodePopup } from "react-daum-postcode";

type GroupManageProps = {
  id: number;
  groupData: groupInfo | null;
};

const validationSchema = yup.object().shape({
  description: yup.string().required("그룹 소개를 입력해주세요."),
  address: yup.string().required("대표 주소를 입력해주세요."),
  addressDetail: yup.string().optional(),
  businessNumber: yup.string().optional(),
  groupImage: yup.string().required("그룹 이미지를 업로드해주세요."),
});

export default function GroupManage(props: GroupManageProps) {
  const [groupDetail, setGroupDetail] = useState<groupInfo | null>(null);
  const [imageName, setImageName] = useState<string>("");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setGroupDetail(props.groupData);
        formik.setValues({
          description: props.groupData?.description || "",
          address: props.groupData?.address.split(") ")[0] + ")" || "",
          addressDetail: props.groupData?.address.split(") ")[1] || "",
          groupImage: props.groupData?.groupImage || "",
          businessNumber: props.groupData?.businessNumber || "",
        });
      } catch (error) {
        console.error("[Error] 그룹 정보 불러오기 실패:", error);
      }
    };
    fetchGroup();
  }, [props.id]);

  const formik = useFormik({
    initialValues: {
      description: "",
      address: "",
      addressDetail: "",
      groupImage: "",
      businessNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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

  const uploadGroupImage = (imageFile: File | null) => {
    if (!imageFile) {
      return;
    }
    const uploadFileName = uuid() + ".png";
    setImageName(uploadFileName);
    const imageRef = ref(firebaseStorage, uploadFileName);
    uploadBytes(imageRef, imageFile);
  };

  const requestUpdateGroup = async () => {
    try {
      const response = updateGroup(props.id, {
        description: formik.values.description,
        address: formik.values.address + " " + formik.values.addressDetail,
        imageUrl: imageName || "default.png",
        businessNumber: formik.values.businessNumber,
      });
      if (!response) {
        console.error("[Error] 그룹 정보 수정 실패");
      }
    } catch (error) {
      console.error("[Error] 그룹 정보 수정 실패:", error);
    }

    window.location.reload();
    alert("그룹 정보가 수정되었습니다.");
  };

  const requestDeleteGroup = () => {
    const response = deleteGroup(props.id);
    if (!response) {
      console.error("[Error] 그룹 정보 삭제 실패");
    }
  };

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
                placeholder="그룹 소개를 입력해주세요."
                value={formik.values.businessNumber}
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
                  onChange={(event) => {
                    formik.setFieldValue("groupImage", event.target.files?.[0]);
                    uploadGroupImage(event.target.files?.[0] as File);
                  }}
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
              onClick={requestUpdateGroup}
              className={styles.ok_button}
            >
              수정하기
            </Button>

            <Button
              color="danger"
              onClick={requestDeleteGroup}
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
