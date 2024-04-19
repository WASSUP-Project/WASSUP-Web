/* eslint-disable react-hooks/exhaustive-deps */
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
import { getGroupMembers } from "@/services/invite/invite";

type ManageType = "info" | "invite";

type MemberManageProps = {
  id: number;
};

export default function MemberManage(props: MemberManageProps) {
  const [members, setMembers] = useState<member[]>([]);
  const [currentMembers, setCurrentMembers] = useState<member[]>([]);
  const [selectedMember, setSelectedMember] = useState<member | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState<ManageType>("info");
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

  useEffect(() => {
    const data = getGroupMembers(props.id);
    data.then((data) => {
      setMembers(data);
    });
  }, [props.id, selectedPage]);

  useEffect(() => {
    const start = (currentPage - 1) * 7;
    const end = start + 7;
    setCurrentMembers(filteredMembers.slice(start, end));
    setTotalItems(filteredMembers.length);
  }, [currentPage, filteredMembers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleMemberClick = (id: number) => {
    setSelectedMember(
      filteredMembers.find((member) => member.id === id) || null
    );
    setSelectedModal("info");
    onOpen();
    console.log(`Member ${id} clicked!`);
  };

  const handleSendMessage = (id: number) => {
    setSelectedMember(
      filteredMembers.find((member) => member.id === id) || null
    );
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
      {selectedPage === "info" ? (
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
                {filteredMembers.length === 0 && <div>인원이 없습니다.</div>}
                {currentMembers.map((member) => (
                  <div key={member.id} className={styles.list_item}>
                    <div
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
                      />
                      <Image
                        src="/edit.png"
                        alt="edit"
                        width={36}
                        height={36}
                        className={styles.button_image}
                        onClick={() => handleEditMember(member.id)}
                      />
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
                              {selectedMember.phoneNumber}
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
                              {selectedMember.specifics}
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
                              {selectedMember.phoneNumber}
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
