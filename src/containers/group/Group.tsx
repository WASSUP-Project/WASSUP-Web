"use client";

import Spacer from "@/components/Spacer";
import GroupItem from "@/components/group/GroupItem";
import styles from "./Group.module.css";
import Nav from "@/components/nav/Nav";
import { useState } from "react";
import { admin } from "@/types/user/admin";
import { group } from "@/types/group/group";
import Link from "next/link";
import PositiveButton from "@/components/buttons/PositiveButton";

export default function Group() {
  const [user, setUser] = useState<admin | null>({
    id: 1,
    name: "홍길동",
    phone: "010-1234-5678",
    createdAt: "2021-10-01T00:00:00.000Z",
    updatedAt: "2021-10-01T00:00:00.000Z",
  });

  const [groups, setGroups] = useState<group[] | null>([
    {
      id: 1,
      name: "아이사랑수학학원",
      address: "서울특별시 구로구 항동로 2길 36, 3층",
      memberCount: 32,
      waitMemberCount: 5,
      groupImage: "https://via.placeholder.com/120",
    },
    {
      id: 2,
      name: "아이사랑영어학원",
      address: "서울특별시 구로구 항동로 2길 36, 4층",
      memberCount: 17,
      waitMemberCount: 2,
      groupImage: "https://via.placeholder.com/120",
    },
  ]);

  return (
    <>
      <div className={styles.container}>
        <Nav
          text={user ? user.name : "로그인"}
          positiveText={user ? "내 그룹" : "회원가입"}
        />

        <Spacer height={7} />

        <div className={styles.content_white}>
          <div className={styles.title}>{user?.name}님의 그룹</div>
        </div>

        <Spacer height={5} />

        <div className={styles.group_container}>
          {groups ? (
            groups.map((group) => (
              <div key={group.id}>
                <Link href={`/group/${group.id}`}>
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
    </>
  );
}
