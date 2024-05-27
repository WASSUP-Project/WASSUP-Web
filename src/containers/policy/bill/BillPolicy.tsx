"use client";

import Spacer from "@/components/Spacer";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import styles from "./BillPolicy.module.css";

export default function BillPolicy() {
  return (
    <div className={styles["bill-policy"]}>
      <div className={styles["bill-policy__content"]}>
        <Spacer height={7} />
        <div className={styles["bill-policy__header"]}>
          <div className={styles["bill-policy__title"]}>요금 정책</div>
        </div>
        <Spacer height={5} />
        <div className={styles["bill-policy__container"]}>
          <div className={styles["bill-policy__info"]}>
            <Card className={styles["bill-policy__card"]}>
              <CardHeader className={styles["bill-policy__card-header"]}>
                <div className={styles["bill-policy__card-content"]}>
                  <p className="text-lg">
                    <b>Free</b>
                  </p>
                  <p className="text-sm">간단한 그룹 생성</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className={styles["bill-policy__card-body"]}>
                <div className={styles["bill-policy__card-content"]}>
                  <b>무료</b>로 시작할 수 있습니다. <br />
                  <b>그룹 생성</b>이 가능합니다. <br />
                  <b>최대 30명</b>의 인원을 추가할 수 있습니다. <br />
                  <b>출결 관리 기능</b>을 사용할 수 있습니다. <br />
                  <b>그룹 관리 기능</b>을 사용할 수 있습니다.
                </div>
              </CardBody>
            </Card>

            <Spacer height={1} />

            <Card
              className={`${styles["bill-policy__card"]} ${styles["bill-policy__card--pro"]}`}
            >
              <CardHeader className={styles["bill-policy__card-header"]}>
                <div className={styles["bill-policy__card-content"]}>
                  <p className="text-lg">
                    <div className={styles["bill-policy__pro-title"]}>
                      <b>Pro</b>
                    </div>
                  </p>
                  <p className="text-sm">고급 그룹 관리</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className={styles["bill-policy__card-body"]}>
                <div className={styles["bill-policy__card-content"]}>
                  <b>월 4,900원</b>으로 시작할 수 있습니다. <br />
                  <b>그룹 생성</b>이 가능합니다. <br />
                  <b>최대 200명</b>의 인원을 추가할 수 있습니다. <br />
                  <b>출결 관리 기능</b>을 사용할 수 있습니다. <br />
                  <b>고급 그룹 관리 기능</b>을 사용할 수 있습니다. <br />
                  <b>안심 등하원 메시지</b>를 사용할 수 있습니다.
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <Spacer height={7} />
      </div>
    </div>
  );
}
