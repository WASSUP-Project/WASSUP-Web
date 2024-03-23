import styles from "./FAQ.module.css";

export default function FAQ() {
  const questions = [
    {
      question: "계정을 만들려면 어떻게 해야 합니까?",
      answer:
        "홈페이지에서 회원가입 버튼을 클릭하고 간단한 양식을 작성하면 계정을 만들 수 있습니다.",
    },
    {
      question: "비밀번호를 잊어버렸습니다. 어떻게 해야 합니까?",
      answer:
        "로그인 페이지에서 '비밀번호 찾기' 링크를 클릭하고 아이디를 입력하면 비밀번호 재설정 안내를 받게 됩니다.",
    },
    {
      question: "제품에 문제가 있습니다. 어떻게 해야 합니까?",
      answer:
        "고객센터에 문의하거나 '고객 지원'에서 '문의하기' 메뉴를 이용하여 문제 내용을 자세히 설명해주세요.",
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.title}>자주 묻는 질문</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h3 className={styles.question}>{question.question}</h3>
            <p className={styles.answer}>{question.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
