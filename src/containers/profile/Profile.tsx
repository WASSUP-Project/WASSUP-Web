"use client";

import React, { useState, useEffect } from "react";
import { ResponseAdmin, getAdminName } from "@/services/admin/admin";
import styles from "./Profile.module.css";
import { Spinner } from "@nextui-org/react";

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
                  <div>
                    <div>
                      <h1>{admin.name}님 환영합니다!</h1>
                      <h2>관리자 페이지입니다.</h2>
                    </div>
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
