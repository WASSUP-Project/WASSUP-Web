"use client";

import { useState, useEffect } from "react";
import { useMemo } from "react";
import Image from "next/image";
import { member } from "@/types/user/member";
import styles from "./MemberManage.module.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Pagination,
} from "@nextui-org/react";
import usePagination from "@/hooks/usePagination";
import MemberInvite from "./MemberInvite";

type ManageType = "info" | "invite";

type MemberManageProps = {
  id: number;
};

export default function MemberManage(props: MemberManageProps) {
  const [members, setMembers] = useState<member[]>([]);
  const [selectedMember, setSelectedMember] = useState<member | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { currentPage, totalPages, setPage } = usePagination(1, 16);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState<ManageType>("info");

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [members, searchKeyword]);

  useEffect(() => {
    // 추후 API로 대체
    const fetchMembers = async (currentPage: number) => {
      // const response = await fetch("/api/members");
      // const data = await response.json();
      // 임시 데이터
      if (currentPage === 2) {
        setMembers([
          {
            id: 9,
            name: "김민수",
            phone: "010-9012-3456",
            birth: "2008-09-09",
            description: "김민수입니다.",
          },
          {
            id: 10,
            name: "박민수",
            phone: "010-0123-4567",
            birth: "2009-10-10",
            description: "박민수입니다.",
          },
          {
            id: 11,
            name: "이민수",
            phone: "010-1234-5678",
            birth: "2010-11-11",
            description: "이민수입니다.",
          },
          {
            id: 12,
            name: "정민수",
            phone: "010-2345-6789",
            birth: "2011-12-12",
            description: "정민수입니다.",
          },
          {
            id: 13,
            name: "김영수",
            phone: "010-3456-7890",
            birth: "2012-01-01",
            description: "김영수입니다.",
          },
          {
            id: 14,
            name: "박영수",
            phone: "010-4567-8901",
            birth: "2013-02-02",
            description: "박영수입니다.",
          },
          {
            id: 15,
            name: "이영희",
            phone: "010-5678-9012",
            birth: "2014-03-03",
            description: "이영희입니다.",
          },
          {
            id: 16,
            name: "정영희",
            phone: "010-6789-0123",
            birth: "2015-04-04",
            description: "정영희입니다.",
          },
        ]);
      } else {
        setMembers([
          {
            id: 1,
            name: "홍길동",
            phone: "010-1234-5678",
            birth: "2000-01-01",
            description: "홍길동입니다.",
          },
          {
            id: 2,
            name: "김철수",
            phone: "010-2345-6789",
            birth: "2001-02-02",
            description: "김철수입니다.",
          },
          {
            id: 3,
            name: "이영희",
            phone: "010-3456-7890",
            birth: "2002-03-03",
            description: "이영희입니다.",
          },
          {
            id: 4,
            name: "박영수",
            phone: "010-4567-8901",
            birth: "2003-04-04",
            description: "박영수입니다.",
          },
          {
            id: 5,
            name: "정민수",
            phone: "010-5678-9012",
            birth: "2004-05-05",
            description: "정민수입니다.",
          },
          {
            id: 6,
            name: "김영수",
            phone: "010-6789-0123",
            birth: "2005-06-06",
            description: "김영수입니다.",
          },
          {
            id: 7,
            name: "박민수",
            phone: "010-7890-1234",
            birth: "2006-07-07",
            description: "박민수입니다.",
          },
          {
            id: 8,
            name: "이민수",
            phone: "010-8901-2345",
            birth: "2007-08-08",
            description: "이민수입니다.",
          },
        ]);
      }
    };

    fetchMembers(currentPage);
  }, [currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleMemberClick = (id: number) => {
    setSelectedMember(members.find((member) => member.id === id) || null);
    setSelectedModal("info");
    onOpen();
    console.log(`Member ${id} clicked!`);
  };

  const handleSendMessage = (id: number) => {
    setSelectedMember(members.find((member) => member.id === id) || null);
    setSelectedModal("message");
    onOpen();
    console.log(`Send message to member ${id}`);
  };

  const handleEditMember = (id: number) => {
    // 회원 정보 수정 페이지로 이동하는 로직을 추가합니다.
    console.log(`Edit member ${id}`);
  };

  return (
    <>
      <div className={styles.title}>인원 관리</div>
      <div className={styles.switch}>
        <Button
          className={
            selectedPage === "info"
              ? styles.switch_button_active
              : styles.switch_button
          }
          onPress={() => setSelectedPage("info")}
        >
          인원 확인
        </Button>
        <Button
          className={
            selectedPage === "invite"
              ? styles.switch_button_active
              : styles.switch_button
          }
          onPress={() => setSelectedPage("invite")}
        >
          초대하기
        </Button>
      </div>
      {selectedPage == "info" ? (
        <>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.search}>
                  <input
                    type="text"
                    placeholder="이름 검색"
                    value={searchKeyword}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              <div className={styles.list}>
                {filteredMembers.map((member) => (
                  <>
                    <div className={styles.list_item}>
                      <div
                        key={member.id}
                        className={styles.list_item_name}
                        onClick={() => handleMemberClick(member.id)}
                      >
                        {member.name}
                      </div>
                      <div className={styles.buttons}>
                        <Image
                          src="/message.png"
                          alt="message"
                          width={36}
                          height={36}
                          className={styles.button_image}
                          onClick={() => handleSendMessage(member.id)}
                        ></Image>
                        <Image
                          src="/edit.png"
                          alt="edit"
                          width={36}
                          height={36}
                          className={styles.button_image}
                          onClick={() => handleEditMember(member.id)}
                        ></Image>
                      </div>
                    </div>
                  </>
                ))}
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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) =>
                  selectedModal === "info" ? (
                    <>
                      <ModalHeader className="flex flex-col gap-0">
                        인원 정보
                      </ModalHeader>
                      <ModalBody className={styles.modal__body}>
                        {selectedMember && (
                          <>
                            <h3 className={styles.modal__content_Title}>
                              이름
                            </h3>
                            <p className={styles.member_info}>
                              {selectedMember.name}
                            </p>
                            <h3 className={styles.modal__content_Title}>
                              전화번호
                            </h3>
                            <p className={styles.member_info}>
                              {selectedMember.phone}
                            </p>
                            <h3 className={styles.modal__content_Title}>
                              생년월일
                            </h3>
                            <p className={styles.member_info}>
                              {selectedMember.birth}
                            </p>
                            <h3 className={styles.modal__content_Title}>
                              특이사항
                            </h3>
                            <p className={styles.member_info}>
                              {selectedMember.description}
                            </p>
                          </>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onPress={onClose}>
                          확인
                        </Button>
                      </ModalFooter>
                    </>
                  ) : (
                    <>
                      <ModalHeader className="flex flex-col gap-0">
                        메시지 전송
                      </ModalHeader>
                      <ModalBody className={styles.modal__body}>
                        {selectedMember && (
                          <>
                            <h3 className={styles.modal__content_Title}>
                              이름
                            </h3>
                            <p className={styles.member_info}>
                              {selectedMember.name}
                            </p>
                            <h3 className={styles.modal__content_Title}>
                              전화번호
                            </h3>
                            <p className={styles.member_info}>
                              {selectedMember.phone}
                            </p>
                            <h3 className={styles.modal__content_Title}>
                              메시지
                            </h3>
                            <textarea
                              className={styles.message_textarea}
                              placeholder="메시지를 입력해주세요."
                            ></textarea>
                          </>
                        )}
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
                  )
                }
              </ModalContent>
            </Modal>
          </div>
        </>
      ) : (
        <MemberInvite id={props.id} />
      )}
    </>
  );
}
