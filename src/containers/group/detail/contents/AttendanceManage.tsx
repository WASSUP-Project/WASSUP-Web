"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./AttendanceManage.module.css";
import { Pagination, Button } from "@nextui-org/react";
import usePagination from "@/hooks/usePagination";
import {
  AttendanceStatus,
  MemberWithAttendanceStatus,
  getMembersWithAttendanceStatus,
  updateAttendanceStatus,
  updateAttendanceStatusAll,
} from "@/services/attendance/attendance";

type AttendanceManageProps = {
  id: number;
};

export default function AttendanceManage(props: AttendanceManageProps) {
  const [members, setMembers] = useState<MemberWithAttendanceStatus[]>([]);
  const [currentMembers, setCurrentMembers] = useState<
    MemberWithAttendanceStatus[]
  >([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { currentPage, totalPages, setTotalItems, setPage } = usePagination(1);

  const filteredMembers = useMemo(() => {
    if (searchKeyword) {
      return members.filter((member) =>
        member.memberName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    } else {
      return members;
    }
  }, [members, searchKeyword]);

  useEffect(() => {
    const data = getMembersWithAttendanceStatus(props.id);
    data.then((data) => {
      setMembers(data as MemberWithAttendanceStatus[]);
    });
  }, [props.id]);

  useEffect(() => {
    const start = (currentPage - 1) * 7;
    const end = start + 7;
    setCurrentMembers(filteredMembers.slice(start, end));
    setTotalItems(filteredMembers.length);
  }, [currentPage, filteredMembers, setTotalItems]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const requestUpdateAttendanceStatus = async (
    memberId: number,
    status: string
  ) => {
    // 이전 상태 저장
    const beforeMember = members.find((member) => member.memberId === memberId);
    const beforeStatus = beforeMember?.status;

    // UI 미리 변경
    const updatedMembers = members.map((member) => {
      if (member.memberId === memberId) {
        return {
          ...member,
          status: status,
        };
      }
      return member;
    });
    setMembers(updatedMembers as MemberWithAttendanceStatus[]);

    // API 호출
    const response = await updateAttendanceStatus({
      memberId: memberId,
      status: status,
    });

    // API 호출 실패 시 UI 원복
    if (response.status !== 200) {
      alert("출석 상태 변경에 실패했습니다.");
      const restoredMembers = members.map((member) => {
        if (member.memberId === memberId) {
          return {
            ...member,
            status: beforeStatus,
          };
        }
        return member;
      });
      setMembers(restoredMembers as MemberWithAttendanceStatus[]);
    }
  };

  const requestUpdateAttendanceStatusAll = async (status: number) => {
    // 이전 상태 저장
    const beforeMembers = members;

    // UI 미리 변경
    const updatedMembers = members.map((member) => {
      return {
        ...member,
        status: status === 0 ? "ATTENDANCE" : "LEAVING",
      };
    });
    setMembers(updatedMembers);

    // API 호출
    const response = await updateAttendanceStatusAll(props.id, status);

    // API 호출 실패 시 UI 원복
    if (response.status !== 200) {
      alert("출석 상태 변경에 실패했습니다.");
      setMembers(beforeMembers);
    }
  };

  const createButtonsByMemberStatus = (
    member: MemberWithAttendanceStatus,
    status: AttendanceStatus
  ) => {
    switch (status) {
      case AttendanceStatus.ATTENDANCE:
        return (
          <>
            <Button size="md" className={styles.button_attendance} disabled>
              등원
            </Button>
            <Button
              size="md"
              className={styles.button_normal}
              onClick={() =>
                requestUpdateAttendanceStatus(member.memberId, "ABSENCE")
              }
            >
              결석
            </Button>
            <Button
              size="md"
              className={styles.button_normal}
              onClick={() =>
                requestUpdateAttendanceStatus(member.memberId, "LEAVING")
              }
            >
              하원
            </Button>
          </>
        );
      case AttendanceStatus.ABSENCE:
        return (
          <>
            <Button
              size="md"
              className={styles.button_normal}
              onClick={() =>
                requestUpdateAttendanceStatus(member.memberId, "ATTENDANCE")
              }
            >
              등원
            </Button>
            <Button size="md" className={styles.button_absence} disabled>
              결석
            </Button>
            <Button
              size="md"
              className={styles.button_normal}
              onClick={() =>
                requestUpdateAttendanceStatus(member.memberId, "LEAVING")
              }
            >
              하원
            </Button>
          </>
        );
      case AttendanceStatus.LEAVING:
        return (
          <>
            <Button
              size="md"
              className={styles.button_normal}
              onClick={() =>
                requestUpdateAttendanceStatus(member.memberId, "ATTENDANCE")
              }
            >
              등원
            </Button>
            <Button
              size="md"
              className={styles.button_normal}
              onClick={() =>
                requestUpdateAttendanceStatus(member.memberId, "ABSENCE")
              }
            >
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
              <Button
                size="md"
                className={styles.button_attendance}
                onClick={() => requestUpdateAttendanceStatusAll(0)}
              >
                전체 출석
              </Button>
              <Button
                size="md"
                className={styles.button_leave}
                onClick={() => requestUpdateAttendanceStatusAll(3)}
              >
                전체 하원
              </Button>
            </div>
          </div>
          <div className={styles.list}>
            {filteredMembers.length === 0 && <div>인원이 없습니다.</div>}
            {currentMembers.map((member) => (
              <div key={member.memberId} className={styles.list_item}>
                <div className={styles.list_item_name}>{member.memberName}</div>
                <div className={styles.buttons}>
                  {createButtonsByMemberStatus(
                    member,
                    AttendanceStatus.of(member.status)
                  )}
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
