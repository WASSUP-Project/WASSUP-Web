"use client";

import React, { useState, useEffect } from "react";
import { ResponseAdmin, getAdminName } from "@/services/admin/admin";
import styles from "./Profile.module.css";
import { Link, Spinner } from "@nextui-org/react";
import Image from "next/image";

export default function Profile() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<ResponseAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoading(true);
      setAccessToken(token);

      const response = getAdminName();
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
  }, [accessToken]);

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && (
        <div style={{ overflow: "scroll" }}>
          <div>
            {accessToken ? (
              <div>
                {admin ? (
                  <div className={styles.container}>
                    <Image
                      src="/profile.png"
                      alt="profile"
                      width={700}
                      height={650}
                    />
                    <Link href="/" className={styles.link}>
                      홈으로 돌아갈래요.
                    </Link>
                  </div>
                ) : (
                  <div>
                    <h1>관리자 정보를 불러오는 중입니다.</h1>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h1>로그인이 필요합니다.</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}