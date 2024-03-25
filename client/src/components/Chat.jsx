import { socket } from "../services/io";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState(null);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      console.warn(data);
    });
  }, []);

  return <div>Chat</div>;
};
