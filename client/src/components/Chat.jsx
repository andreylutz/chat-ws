import { socket } from "../services/io";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import EmojiPicker from "emoji-picker-react";
import { Messages } from "./Messages";
import icon from "../images/emoji.svg";
import styles from "../styles/Chat.module.css";

export const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState({ room: "", user: "" });
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpenEmoji, setOpenEmoji] = useState(false);

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

  const leftRoom = () => {};

  const handleChange = ({ target: { value } }) => setMessage(value);

  const onEmojis = ({ emoji }) => setMessage(`${message} ${emoji}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;

    socket.emit("sendMessage", { message, params });
    setMessage("");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>0 users in this room</div>
        <button className={styles.left} onClick={leftRoom}>
          Покинуть комнату
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={notifications} name={params.name} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Введите сообщение"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={icon} alt="" onClick={() => setOpenEmoji(!isOpenEmoji)} />
          {isOpenEmoji && (
            <div className={styles.emojis}>
              <EmojiPicker onEmojiClick={onEmojis} />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <input
            type="submit"
            onSubmit={handleSubmit}
            value="Отправить сообщение"
          />
        </div>
      </form>
    </div>
  );
};
