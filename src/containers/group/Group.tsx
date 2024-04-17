"use client";

import Spacer from "@/components/Spacer";
import GroupItem from "@/components/group/GroupItem";
import styles from "./Group.module.css";
import { useEffect, useState } from "react";
import { group } from "@/types/group/group";
import Link from "next/link";
import PositiveButton from "@/components/buttons/PositiveButton";
import { adminState } from "@/states/admin";
import { useRecoilValue } from "recoil";
import { getMyGroups } from "@/services/group/group";
import { Spinner } from "@nextui-org/react";

export default function Group() {
  const admin = useRecoilValue(adminState);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<group[] | null>([]);

  useEffect(() => {
    const data = getMyGroups();
    data
      .then((data) => {
        setGroups(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("[Error] 그룹 정보 불러오기 실패:", error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      ) : (
        <div className={styles.container}>
          <Spacer height={7} />

          <div className={styles.content_white}>
            <div className={styles.title}>{admin?.name}님의 그룹</div>
          </div>

          <Spacer height={5} />

          <div className={styles.group_container}>
            {groups ? (
              groups.map((group) => (
                <div key={group.id}>
                  <Link href={`/group/detail?id=${group.id}`}>
                    <GroupItem key={group.id} {...group} />
                  </Link>
                </div>
              ))
            ) : (
              <div className={styles.no_group}>그룹이 없습니다.</div>
            )}
          </div>

          <Spacer height={3} />

          <div className={styles.create_group}>
            {groups?.length ? (
              groups?.length >= 3 ? (
                <></>
              ) : (
                <Link href="/group/create">
                  <PositiveButton text="그룹 생성" />
                </Link>
              )
            ) : (
              <Link href="/group/create">
                <PositiveButton text="그룹 생성" />
              </Link>
            )}
            <Link href="/" className={styles.link}>
              홈으로 돌아갈래요.
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
