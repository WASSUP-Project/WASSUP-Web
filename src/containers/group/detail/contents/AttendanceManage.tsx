"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./AttendanceManage.module.css";
import { Pagination, Link, Button } from "@nextui-org/react";
import usePagination from "@/hooks/usePagination";
import { getGroupMembers } from "@/services/member/member";
import { member, memberForAttendance } from "@/types/user/member";

type AttendanceManageProps = {
  id: number;
};

export default function AttendanceManage(props: AttendanceManageProps) {
  const [members, setMembers] = useState<memberForAttendance[]>([]);
  const [currentMembers, setCurrentMembers] = useState<memberForAttendance[]>(
    []
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const { currentPage, totalPages, setTotalItems, setPage } = usePagination(1);

  const filteredMembers = useMemo(() => {
    if (searchKeyword) {
      return members.filter((member) =>
        member.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    } else {
      return members;
    }
  }, [members, searchKeyword]);

  // API 구현 예정
  //   useEffect(() => {
  //     const data = getGroupMembers(props.id);
  //     data.then((data) => {
  //       setMembers(data);
  //     });
  //   }, [props.id]);

  useEffect(() => {
    setMembers([
      {
        id: 1,
        name: "김철수",
        status: 0,
      },
      {
        id: 2,
        name: "이영희",
        status: 1,
      },
      {
        id: 3,
        name: "박민수",
        status: 1,
      },
      {
        id: 4,
        name: "최영수",
        status: 0,
      },
      {
        id: 5,
        name: "김민지",
        status: 0,
      },
      {
        id: 6,
        name: "박민지",
        status: 3,
      },
      {
        id: 7,
        name: "이민지",
        status: 3,
      },
      {
        id: 8,
        name: "최민지",
        status: 3,
      },
      {
        id: 9,
        name: "김민수",
        status: 0,
      },
      {
        id: 10,
        name: "박민수",
        status: 1,
      },
      {
        id: 11,
        name: "이민수",
        status: 1,
      },
      {
        id: 12,
        name: "최민수",
        status: 0,
      },
    ]);
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * 7;
    const end = start + 7;
    setCurrentMembers(filteredMembers.slice(start, end));
    setTotalItems(filteredMembers.length);
  }, [currentPage, filteredMembers, setTotalItems]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const createButtonsByMemberStatus = (status: number) => {
    switch (status) {
      case 0:
        return (
          <>
            <Button size="md" className={styles.button_attendance} disabled>
              등원
            </Button>
            <Button size="md" className={styles.button_normal}>
              결석
            </Button>
            <Button size="md" className={styles.button_normal}>
              하원
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Button size="md" className={styles.button_normal}>
              등원
            </Button>
            <Button size="md" className={styles.button_absence} disabled>
              결석
            </Button>
            <Button size="md" className={styles.button_normal}>
              하원
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Button size="md" className={styles.button_normal}>
              등원
            </Button>
            <Button size="md" className={styles.button_normal}>
              결석
            </Button>
            <Button size="md" className={styles.button_leave} disabled>
              하원
            </Button>
          </>
        );
      default:
        return (
          <>
            <Button size="md" className={styles.button_attendance} disabled>
              등원
            </Button>
            <Button size="md" className={styles.button_absence} disabled>
              결석
            </Button>
            <Button size="md" className={styles.button_leave} disabled>
              하원
            </Button>
          </>
        );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <input
              type="text"
              placeholder="이름 검색"
              value={searchKeyword}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <div className={styles.controll_buttons}>
              <Button size="md" className={styles.button_attendance}>
                전체 출석
              </Button>
              <Button size="md" className={styles.button_leave}>
                전체 하원
              </Button>
            </div>
          </div>
          <div className={styles.list}>
            {filteredMembers.length === 0 && <div>인원이 없습니다.</div>}
            {currentMembers.map((member) => (
              <div key={member.id} className={styles.list_item}>
                <div className={styles.list_item_name}>{member.name}</div>
                <div className={styles.buttons}>
                  {createButtonsByMemberStatus(member.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          <Pagination
            showControls
            total={totalPages}
            initialPage={1}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  );
}
