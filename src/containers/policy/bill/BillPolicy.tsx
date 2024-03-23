import Spacer from "@/components/Spacer";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import styles from "./BillPolicy.module.css";

export default function Main() {
  return (
    <>
      <div className={styles.container}>
        <Nav text="로그인" positiveText="회원가입" />

        <Spacer height={7} />

        <div className={styles.content_white}>
          <div className={styles.title}>요금 정책</div>
        </div>

        <Spacer height={5} />

        <div className={styles.bill_info}>
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <div className={styles.card}>
                <p className="text-lg">
                  <b>Free</b>
                </p>
                <p className="text-sm">간단한 그룹 생성</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className={styles.card}>
                <b>무료</b>로 시작할 수 있습니다. <br />
                <b>그룹 생성</b>이 가능합니다. <br />
                <b>최대 30명</b>의 인원을 추가할 수 있습니다. <br />
                <b>출결 관리 기능</b>을 사용할 수 있습니다. <br />
                <b>그룹 관리 기능</b>을 사용할 수 있습니다.
              </div>
            </CardBody>
          </Card>

          <Spacer height={1} />

          <Card className={styles.pro_card}>
            <CardHeader className="flex gap-3">
              <div className={styles.card}>
                <p className="text-lg">
                  <div className={styles.pro_title}>
                    <b>Pro</b>
                  </div>
                </p>
                <p className="text-sm">고급 그룹 관리</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className={styles.card}>
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

        <Spacer height={7} />

        <Footer />
      </div>
    </>
  );
}
