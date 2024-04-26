"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { groupInfo } from "@/types/group/group";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import styles from "./GroupDetail.module.css";
import MemberManage from "./contents/MemberManage";
import Attendance from "./contents/Attendance";
import GroupManage from "./contents/GroupManage";
import GroupNotice from "./contents/GroupNotice";
import { getGroup } from "@/services/group/group";

export default function GroupDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [groupData, setGroupData] = useState<groupInfo | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>("manage");
  const [selectedId, setSelectedId] = useState<number>(0);

  useEffect(() => {
    setSelectedId(parseInt(searchParams.get("id") || "0"));

    async function fetchGroupData() {
      const data = await getGroup(selectedId);
      setGroupData({
        id: data.id,
        name: data.groupName,
        address: data.address,
        groupImage: data.imageUrl,
        description: data.groupDescription,
        businessNumber: data.businessNumber,
      });
    }

    if (selectedId) {
      fetchGroupData();
    }
  }, [searchParams, selectedId]);

  const items = [
    {
      key: "manage",
      label: "인원 관리",
    },
    {
      key: "attendance",
      label: "출결 관리",
    },
    {
      key: "notice",
      label: "공지 작성",
    },
    {
      key: "edit",
      label: "그룹 설정",
    },
    {
      key: "home",
      label: "내 그룹으로",
    },
  ];

  function handleAction(key: string) {
    switch (key) {
      case "manage":
        setSelectedAction(key);
        break;
      case "attendance":
        setSelectedAction(key);
        break;
      case "notice":
        setSelectedAction(key);
        break;
      case "edit":
        setSelectedAction(key);
        break;
      case "home":
        router.push("/group");
        break;
    }
  }

  function selectedActionToString() {
    switch (selectedAction) {
      case "manage":
        return ["manage"];
      case "attendance":
        return ["attendance"];
      case "notice":
        return ["notice"];
      case "edit":
        return ["edit"];
    }
  }

  function renderComponent(id: number, groupData: groupInfo | null) {
    switch (selectedAction) {
      case "manage":
        return <MemberManage id={id} />;
      case "attendance":
        return <Attendance />;
      case "notice":
        return <GroupNotice />;
      case "edit":
        return <GroupManage id={id} groupData={groupData} />;
    }
  }
  return (
    <>
      {groupData ? (
        <div className={styles.container}>
          <div className={styles.list_container}>
            <h1 className={styles.group_title}>{groupData.name}</h1>
            <Listbox
              items={items}
              aria-label="Dynamic Actions"
              onAction={(key) => handleAction(key.toString())}
              disabledKeys={selectedActionToString()}
            >
              {(item) => (
                <ListboxItem
                  key={item.key}
                  color={item.key === "home" ? "danger" : "default"}
                  className={
                    item.key === "home"
                      ? "text-danger"
                      : selectedAction === item.key
                      ? styles.selected_item
                      : "text-default"
                  }
                >
                  <div className={styles.list_item}>{item.label}</div>
                </ListboxItem>
              )}
            </Listbox>
          </div>

          <div className={styles.group_info_container}>
            {renderComponent(selectedId, groupData)}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      )}
    </>
  );
}
