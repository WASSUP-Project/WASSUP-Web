import {
  Image,
  Button,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { member } from "@/types/user/member";
import styles from "./MemberInvite.module.css";
import { useEffect, useState } from "react";
import {
  RequestSendInvite,
  acceptInvite,
  getWaitingMembers,
  rejectInvite,
  sendInviteMessage,
} from "@/services/invite/invite";

type MemberInviteProps = {
  id: number;
};

export default function MemberInvite(props: MemberInviteProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [waitingMembers, setWaitingMembers] = useState<member[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const data = getWaitingMembers(props.id);
    data.then((data) => {
      setWaitingMembers(data);
      setIsLoading(false);
    });
  }, [props.id]);

  function requestSendInviteMessage(request: RequestSendInvite) {
    request.link = process.env.NEXT_PUBLIC_INVITE_URL!;

    const data = sendInviteMessage(request);
    data.then(() => {
      alert("초대 메시지가 전송되었습니다.");
      setPhoneNumber("");
    });

    onOpenChange();
  }

  function requestAcceptMember(id: number) {
    const data = acceptInvite(id);
    data.then(() => {
      setWaitingMembers(waitingMembers.filter((member) => member.id !== id));
    });

    alert("수락되었습니다.");
  }

  function requestRejectMember(id: number) {
    const data = rejectInvite(id);
    data.then(() => {
      setWaitingMembers(waitingMembers.filter((member) => member.id !== id));
    });

    alert("거절되었습니다.");
  }

  return isLoading ? (
    <div className={styles.loading}>
      <Spinner size="lg" />
    </div>
  ) : (
    <>
      <div className={styles.container}></div>
      <div>
        <div className={styles.container_title}>
          <div className={styles.title}>대기 중인 인원</div>
          <Button className={styles.invite_button} onPress={onOpen}>
            <Image
              src="/invite.png"
              alt="invite"
              width={35}
              height={35}
              radius="none"
            />
          </Button>
        </div>
        <div className={styles.sub_container}>
          <div className={styles.waitting_tile}>
            {waitingMembers.map((member) => (
              <div key={member.id} className={styles.waiting_member}>
                <div className={styles.member_info}>
                  <p>{member.name}</p>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <p>{member.phoneNumber}</p>
                </div>
                <div className={styles.member_buttons}>
                  <Button
                    color="primary"
                    className={styles.accept_button}
                    onClick={() => requestAcceptMember(member.id)}
                  >
                    수락
                  </Button>
                  <Button
                    color="secondary"
                    className={styles.reject_button}
                    onClick={() => requestRejectMember(member.id)}
                  >
                    거절
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {waitingMembers.length === 0 && <div>대기 중인 인원이 없습니다.</div>}
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
                  <h3 className={styles.modal__content_Title}>전화번호</h3>
                  <input
                    type="text"
                    className={styles.modal__content_input}
                    placeholder="전화번호를 입력해주세요. (01012341234)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>돌아가기</Button>
                <Button
                  className={styles.accept_button}
                  onPress={onClose}
                  onClick={() =>
                    requestSendInviteMessage({
                      id: props.id,
                      phoneNumber: phoneNumber,
                      link: "",
                    })
                  }
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
