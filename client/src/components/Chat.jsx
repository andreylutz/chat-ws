import { socket } from "../services/io";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setNotifications((_notifications) => [..._notifications, data]);
    });
  }, []);

  return <div>Chat</div>;
};
