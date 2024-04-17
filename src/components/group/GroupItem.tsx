/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { group } from "@/types/group/group";
import styles from "./GroupItem.module.css";
import Image from "next/image";
import { firebaseStorage } from "@/utils/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

export default function GroupItem(props: group) {
  const [isLoading, setIsLoading] = useState(true);
  const [groupImage, setGroupImage] = useState<string>("");

  useEffect(() => {
    const func = async () => {
      const reference = ref(firebaseStorage, props.imageUrl);
      await getDownloadURL(reference).then((url: any) => {
        setGroupImage(url);
        setIsLoading(false);
      });
    };
    func();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner size="lg" className={styles.group_image} />
      ) : (
        <Image
          width={150}
          height={100}
          src={groupImage}
          alt="group"
          className={styles.group_image}
        />
      )}
      <div className={styles.group_info}>
        <div className={styles.group_name}>{props.groupName}</div>
        <div className={styles.group_address}>{props.address}</div>
        <div className={styles.group_member}>
          <div className={styles.group_member_count}>
            인원 <b>{props.totalMember}</b>명
          </div>
          <div className={styles.group_wait_member_count}>
            가입 대기 중인 인원 <b>{props.waitingMember}</b>명
          </div>
        </div>
      </div>
    </div>
  );
}
