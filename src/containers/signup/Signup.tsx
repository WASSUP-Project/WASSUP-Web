import Spacer from "@/components/Spacer";
import styles from "./Signup.module.css";

export default function Signup() {
  return (
    <>
      <div className={styles.signupContainer}>
        <Spacer />

        <div className={styles.title}>와썹 회원 가입</div>
        <div className={styles.description}>
          회원 정보를 정확히 입력해주세요.
        </div>

        <Spacer />

        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="아이디를 입력해주세요."
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="passwordConfirmation">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="비밀번호를 다시 입력해주세요."
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력해주세요."
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">휴대폰 번호</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="휴대폰 번호를 입력해주세요."
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="verificationCode">인증번호</label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                placeholder="인증번호를 입력해주세요."
              />
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.submitButton}>가입하기</button>
            </div>
          </form>
        </div>

        <Spacer />
      </div>
    </>
  );
}
