"use client";

import React, { useState, useEffect } from "react";
import { ResponseAdmin, getAdmin } from "@/services/admin/admin";
import styles from "./Profile.module.css";
import { Link, Spinner } from "@nextui-org/react";

export default function Profile() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<ResponseAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      const response = getAdmin();
      response
        .then((data) => {
          setAdmin(data || null);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("[Error] 관리자 정보 불러오기 실패:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && (
        <>
          <div className={styles.profileContent}>
            {accessToken ? (
              admin ? (
                <div className={styles.profile}>
                  <div className={styles.info}>
                    <h2 className={styles.name}>{admin.name} 님</h2>
                    <p className={styles.infoItem}>
                      <strong>연락처:</strong> {admin.phone}
                    </p>
                    <p className={styles.infoItem}>
                      <strong>관리 그룹수:</strong> {admin.groupCount}
                    </p>
                    <p className={styles.infoItem}>
                      <strong>관리 인원수:</strong> {admin.memberCount}
                    </p>
                    <p className={styles.infoItem}>
                      <strong>가입일:</strong> {admin.createdAt}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.message}>
                  <h1>관리자 정보를 불러오는 중입니다.</h1>
                </div>
              )
            ) : (
              <div className={styles.message}>
                <h1>로그인이 필요합니다.</h1>
              </div>
            )}
          </div>
          <Link href="/" className={styles.link}>
            홈으로 돌아갈래요.
          </Link>
        </>
      )}
    </div>
  );
}
