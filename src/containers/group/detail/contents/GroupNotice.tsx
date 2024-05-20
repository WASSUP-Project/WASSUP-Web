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
  Spinner,
} from "@nextui-org/react";
import { groupInfo } from "@/types/group/group";
import {
  ResponseNotice,
  createNotice,
  getNotices,
} from "@/services/notice/notice";

type GroupNoticeProps = {
  id: number;
  groupData: groupInfo | null;
};

export default function GroupNotice(props: GroupNoticeProps) {
  const [notices, setNotices] = useState<ResponseNotice[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function fetchNotices() {
      const response = await getNotices(props.id);
      if (response) {
        setNotices(response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }

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
    }
    fetchNotices();
  }, []);

  function requestSendNotice() {
    const response = createNotice({
      id: props.id,
      title: title,
      content: message,
    });

    onOpenChange();
    alert("소식이 전송되었습니다.");

    // 공지사항 작성 후 다시 불러오는 것이 아니라 전송된 공지사항을 추가하는 방식, API 호출을 줄이기 위함
    setNotices([
      {
        id: 0,
        title: title,
        content: message,
      },
      ...(notices || []),
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
          {isLoading ? (
            <div className={styles.loading}>
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {notices === undefined || notices.length === 0 ? (
                <div className={styles.empty_notice}>공지사항이 없습니다.</div>
              ) : (
                notices.map((notice) => (
                  <div key={notice.id} className={styles.notice}>
                    <div className={styles.notice_title}>{notice.title}</div>
                    <div className={styles.notice_content}>
                      {notice.content}
                    </div>
                  </div>
                ))
              )}
            </>
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
