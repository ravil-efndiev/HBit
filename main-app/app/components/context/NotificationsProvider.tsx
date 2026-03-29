"use client";

import { createNotification } from "@/actions/notification.action";
import { ParsedNotification } from "@/lib/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export const eventTypes = {
  friendRequestSent: "FRIEND_REQUEST_SENT",
  friendRequestAccepted: "FRIEND_REQUEST_ACCEPTED",
} as const;

interface NotificationsContextType {
  notificaitons: ParsedNotification[];
  setNotifications: Dispatch<SetStateAction<ParsedNotification[]>>;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

interface Props extends PropsWithChildren {
  initialNotifications: ParsedNotification[];
  userPublicId: string;
}

const NotificationsProvider = ({
  initialNotifications,
  userPublicId,
  children
}: Props) => {
  const [notificaitons, setNotifications] =
    useState<ParsedNotification[]>(initialNotifications);

  useEffect(() => {
    const eventSrc = new EventSource(
      `/api/events?userPublicId=${userPublicId}`,
      {
        withCredentials: true,
      },
    );

    eventSrc.onopen = () => console.log("connect");

    for (const eventType of Object.values(eventTypes)) {
      eventSrc.addEventListener(eventType, async (event) => {
        const payload = JSON.parse(event.data);
        const res = await createNotification({type: eventType,payload});
        if (!res.ok) {
          return console.error(res.error);
        }

        const notificaiton = res.notification;

        setNotifications((prev) => [
          ...prev,
          {
            id: notificaiton.id,
            type: notificaiton.type,
            recievedAt: notificaiton.createdAt,
            payload,
          },
        ]);
      });
    }

    return () => eventSrc.close();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{ notificaitons, setNotifications }}
    >{children}</NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const value = useContext(NotificationsContext);

  if (!value) {
    throw new Error(
      "NotificationsContext can only be accessed from its provider",
    );
  }

  return value;
};

export default NotificationsProvider;
