"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import Layout from "@/components/Layout";
import ScrollMask from "@/components/ScrollMask";
import NoResultSearch from "@/components/NoResultSearch";
import useEventsStore from "@/store/useEventsStore";
import Head from "./Head";
import Message from "./Message";
import Messanger from "./Messanger";
import NoMessages from "./NoMessages";
import styles from "./MessagesScreen.module.sass";

import { messages } from "@/mocks/messages";
import {
  getMessageList,
  GetUserChatlist,
} from "services/api/chat/chatServices";
import { useChatStore } from "@/store/chatStore/chatStore";

const MessagesScreen = ({}) => {
  const [tab, setTab] = useState<string>("primary");
  const [search, setSearch] = useState("");
  const mobile = useMediaQuery("(max-width: 767px)");
  const [active, setActive] = useState(mobile ? "" : "0");
  const [visibleMessanger, setVisibleMessanger] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { openMobileNavigation, closeMobileNavigation } = useEventsStore();
  const {
    setMessages,
    setActiveConversation,
    activeConversation,
    setChatlis,
    chatlist,
  } = useChatStore();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getUsermessage = async () => {
    try {
      setMessages([]);
      const response = await getMessageList({ to_user: activeConversation });
      setMessages(response?.chat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (activeConversation) {
      getUsermessage();
    }
  }, [activeConversation]);
  const getChatlist = async () => {
    try {
      setChatlis([]);
      const response = await GetUserChatlist();
      setChatlis(response?.chat_list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChatlist();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const tabs = [
    {
      title: "Primary",
      value: "primary",
    },
    {
      title: "Request",
      value: "request",
    },
  ];

  const filteredMessages = chatlist;
  // chatlist.filter((message) => {
  //   if (tab === "primary") {
  //     return message.type == "primary";
  //   } else if (tab === "request") {
  //     return message.type == "request";
  //   }
  //   return true;
  // });

  if (!isMounted) return null;

  return (
    <Layout classSidebar={styles.sidebarLeft}>
      {mobile ? (
        <div className="row">
          {visibleMessanger ? (
            <Messanger
              onClose={() => {
                setVisibleMessanger(false);
                openMobileNavigation();
              }}
            />
          ) : (
            <div className="row-sidebar">
              <Head
                search={search}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                tabs={tabs}
                tab={tab}
                setTab={setTab}
              />
              {chatlist.length > 0 ? (
                search === "" ? (
                  <ScrollMask className={styles.body} isMobileNavigation>
                    <div className={styles.list}>
                      {filteredMessages.map((message) => (
                        <Message
                          item={message}
                          key={message.id}
                          active={active}
                          onClick={() => {
                            setActiveConversation(message?.second_id);
                            setActive(message.second_id);
                            setVisibleMessanger(true);
                            closeMobileNavigation();
                          }}
                        />
                      ))}
                    </div>
                  </ScrollMask>
                ) : (
                  <NoResultSearch search={search} />
                )
              ) : (
                <NoMessages />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="row">
          <div className="row-sidebar">
            <Head
              search={search}
              handleSearchChange={handleSearchChange}
              handleSearchSubmit={handleSearchSubmit}
              tabs={tabs}
              tab={tab}
              setTab={setTab}
            />
            {chatlist.length > 0 ? (
              search === "" ? (
                <ScrollMask className={styles.body}>
                  <div className={styles.list}>
                    {filteredMessages.map((message) => (
                      <Message
                        item={message}
                        key={message.id}
                        active={active}
                        onClick={() => {
                          setActiveConversation(message?.second_id);
                          setActive(message?.second_id);
                        }}
                      />
                    ))}
                  </div>
                </ScrollMask>
              ) : (
                <NoResultSearch search={search} />
              )
            ) : (
              <NoMessages />
            )}
          </div>
          <Messanger />
        </div>
      )}
    </Layout>
  );
};

export default MessagesScreen;
