"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import styles from "./MyInquiry.module.css";

type Inquiry = {
  id: number;
  title: string;
  content: string;
  isAnswered: boolean;
  createdAt: string;
  answeredAt: string;
  answer: string;
};

export default function InquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 1,
      title: "첫 번째 문의!",
      content: "안녕하세요. 문의를 써보고 싶었어요.",
      isAnswered: true,
      createdAt: "2024-03-19",
      answeredAt: "2021-03-22",
      answer: "감사합니다. 좋은 하루 되세요.",
    },
    {
      id: 2,
      title: "제 원래 비밀번호를 알 수 있는 방법이 있나요?",
      content: "제가 비밀번호를 분실했는데 그 비밀번호를 다시 찾고 싶어요.",
      isAnswered: false,
      createdAt: "2023-03-21",
      answeredAt: "",
      answer: "",
    },
    {
      id: 3,
      title: "출석체크 내역을 수정하려면 어떻게 해야 하나요?",
      content: "출석체크 내역을 수정하고 싶은데 어떻게 해야 하나요?",
      isAnswered: false,
      createdAt: "2023-03-22",
      answeredAt: "",
      answer: "",
    },
  ]);

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>({
    id: 0,
    title: "",
    content: "",
    isAnswered: false,
    createdAt: "",
    answeredAt: "",
    answer: "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // TODO: API 연결 - 실제 데이터 가져오기
  useEffect(() => {
    const fetchInquiries = async () => {
      const response = await fetch("/api/inquiries");
      const data = await response.json();
      setInquiries(data);
    };
    fetchInquiries();
  }, []);

  const handleInquiryClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    onOpen();
  };

  return (
    mounted && (
      <>
        <div className={styles.container}>
          <h1 className={styles.title}>문의 내역</h1>
          <ul className={styles.inquiryList}>
            {inquiries.map((inquiry: Inquiry) => (
              <li key={inquiry.id} className={styles.inquiryItem}>
                <div className={styles.inquiryHeader}>
                  <h2 className={styles.inquiryTitle}>{inquiry.title}</h2>
                  <div className={styles.inquiryStatus}>
                    {inquiry.isAnswered ? (
                      <div className={styles.ok}>답변 완료</div>
                    ) : (
                      "답변 대기"
                    )}
                  </div>
                </div>
                <div className={styles.inquiryDate}>{inquiry.createdAt}</div>
                {inquiry.isAnswered ? (
                  <Button
                    onPress={() => handleInquiryClick(inquiry)}
                    className={styles.inquiryButton}
                  >
                    상세보기
                  </Button>
                ) : (
                  <div style={{ height: "40px" }}></div>
                )}
              </li>
            ))}
          </ul>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {selectedInquiry ? "" : selectedInquiry!.title}
                  </ModalHeader>
                  <ModalBody>
                    {selectedInquiry && (
                      <>
                        <h3 className={styles.modal__content_Title}>문의</h3>
                        <p className={styles.inquiryContent}>
                          {selectedInquiry.content}
                        </p>
                        <div className={styles.answerDate}>
                          {selectedInquiry.createdAt}
                        </div>
                        {selectedInquiry.answer && (
                          <>
                            <h3 className={styles.modal__content_Title}>
                              답변
                            </h3>
                            <p className={styles.answerContent}>
                              {selectedInquiry.answer}
                            </p>
                            <div className={styles.answerDate}>
                              {selectedInquiry.answeredAt}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                      확인
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </>
    )
  );
}
