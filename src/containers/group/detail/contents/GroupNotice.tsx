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

type notice = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function GroupNotice() {
  const [notices, setNotices] = useState<notice[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 추후 API로 대체
  useEffect(() => {
    async function fetchNotices() {
      // const response = await fetch("/api/notices");
      // const data = await response.json();
      setNotices([
        {
          id: 1,
          title: "공지사항 제목1",
          content: "내용1",
          createdAt: "2024-03-23",
        },
        {
          id: 2,
          title: "공지사항 제목2",
          content: "내용2",
          createdAt: "2024-03-26",
        },
        {
          id: 3,
          title: "공지사항 제목3",
          content: "내용3",
          createdAt: "2024-03-30",
        },
      ]);
    }

    fetchNotices();
  }, []);

  return (
    <>
      <h1 className={styles.title}>공지사항</h1>
      <div className={styles.container}>
        <div className={styles.button_group}>
          <Button color="primary" className={styles.button} onClick={onOpen}>
            공지 작성
          </Button>
        </div>
        <div className={styles.notice_container}>
          <div className={styles.title}>보낸 이력</div>
          {notices.length === 0 ? (
            <div className={styles.empty_notice}>공지사항이 없습니다.</div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className={styles.notice}>
                <div className={styles.notice_title}>{notice.title}</div>
                <div className={styles.notice_content}>{notice.content}</div>
                <div className={styles.notice_date}>{notice.createdAt}</div>
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
                  <h3 className={styles.modal__content_Title}>메시지</h3>
                  <textarea
                    className={styles.message_textarea}
                    placeholder="메시지를 입력해주세요."
                  ></textarea>
                </>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onClose}>
                  돌아가기
                </Button>
                <Button color="primary" onPress={onClose}>
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
