/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import styles from "./GroupNotice.module.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { groupInfo } from "@/types/group/group";

type notice = {
  id: number;
  title: string;
  content: string;
};

type GroupNoticeProps = {
  id: number;
  groupData: groupInfo | null;
};

export default function GroupNotice(props: GroupNoticeProps) {
  const [notices, setNotices] = useState<notice[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function fetchNotices() {
      // 추후 API로 대체
      setTitle(
        `[${props.groupData?.name}] ${new Date()
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .replace("년 ", "년 ")
          .replace("월 ", "월 ")
          .replace("일", "일")} 소식입니다.`
      );

      // 임시 데이터
      setNotices([
        {
          id: 1,
          title: "[테스트그룹] 2024년 5월 4일 소식입니다.",
          content:
            "안녕하세요. 테스트그룹입니다. 다름이 아니라 기말고사가 다가오고 있습니다. 이번 기말고사 대비 기간은 5월 22일부터 6월 7일까지입니다. 기간 동안에는 모든 학생들이 기말고사를 준비하도록 합니다. 감사합니다.",
        },
        {
          id: 2,
          title: "[테스트그룹] 2024년 5월 1일 소식입니다.",
          content:
            "안녕하세요. 테스트그룹입니다. 금일 5월 1일부터 일주일간 토익 특별 강의가 진행됩니다. 토익을 준비하시는 학생들은 꼭 참석하시기 바랍니다. 감사합니다.",
        },
        {
          id: 3,
          title: "[테스트그룹] 2024년 4월 14일 소식입니다.",
          content:
            "안녕하세요. 테스트그룹입니다. 이번 주 토요일에는 4월자 생일 파티가 있습니다. 많은 참석 부탁드립니다.",
        },
        {
          id: 4,
          title: "[테스트그룹] 2024년 4월 2일 소식입니다.",
          content: "안녕하세요. 테스트그룹입니다.",
        },
        {
          id: 5,
          title: "[테스트그룹] 2024년 3월 22일 소식입니다.",
          content: "안녕하세요. 테스트그룹입니다.",
        },
        {
          id: 6,
          title: "[테스트그룹] 2024년 3월 14일 소식입니다.",
          content: "안녕하세요. 테스트그룹입니다.",
        },
        {
          id: 7,
          title: "[테스트그룹] 2024년 3월 7일 소식입니다.",
          content: "안녕하세요. 테스트그룹입니다.",
        },
        {
          id: 8,
          title: "[테스트그룹] 2024년 2월 20일 소식입니다.",
          content: "안녕하세요. 테스트그룹입니다.",
        },
        {
          id: 9,
          title: "[테스트그룹] 2024년 2월 13일 소식입니다.",
          content: "안녕하세요. 테스트그룹입니다.",
        },
        {
          id: 10,
          title: "[테스트그룹] 2024년 2월 2일 소식입니다.",
          content: "안녕하세요. 테스트그룹입니다.",
        },
      ]);
    }

    fetchNotices();
  }, []);

  function requestSendNotice() {
    // 몌시지 전송 API 호출
    onOpenChange();
    alert("소식이 전송되었습니다.");
    // 공지사항 업데이트
    setNotices([
      {
        id: 1,
        title: title,
        content: message,
      },
      ...notices,
    ]);
    setMessage("");
  }

  return (
    <>
      <h1 className={styles.title}>공지사항</h1>
      <div className={styles.container}>
        <div className={styles.notice_header}>
          <div className={styles.title}>보낸 이력</div>
          <Button color="primary" className={styles.button} onClick={onOpen}>
            공지 작성
          </Button>
        </div>
        <div className={styles.notice_container}>
          {notices.length === 0 ? (
            <div className={styles.empty_notice}>공지사항이 없습니다.</div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className={styles.notice}>
                <div className={styles.notice_title}>{notice.title}</div>
                <div className={styles.notice_content}>{notice.content}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-0">
                메시지 전송
              </ModalHeader>
              <ModalBody className={styles.modal__body}>
                <>
                  <div className={styles.modal_content_title}>
                    제목: {title}
                  </div>
                  <textarea
                    className={styles.modal_content_textarea}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력해주세요."
                  ></textarea>
                </>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>돌아가기</Button>
                <Button
                  className={styles.send_button}
                  onPress={onClose}
                  onClick={() => requestSendNotice()}
                >
                  전송하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
