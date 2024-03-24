import { group } from "@/types/group/group";
import styles from "./GroupItem.module.css";
import Image from "next/image";

export default function GroupItem(props: group) {
  return (
    <div className={styles.container}>
      <Image
        width={150}
        height={100}
        src={props.groupImage}
        alt="group"
        className={styles.group_image}
      />
      <div className={styles.group_info}>
        <div className={styles.group_name}>{props.name}</div>
        <div className={styles.group_address}>{props.address}</div>
        <div className={styles.group_member}>
          <div className={styles.group_member_count}>
            인원 <b>{props.memberCount}</b>명
          </div>
          <div className={styles.group_wait_member_count}>
            가입 대기 중인 인원 <b>{props.waitMemberCount}</b>명
          </div>
        </div>
      </div>
    </div>
  );
}
