import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Main.module.css";

const FIELDS = {
  ROOM: "room",
  USERNAME: "userName",
};

export const Main = () => {
  const { ROOM, USERNAME } = FIELDS;
  const [values, setValues] = useState({ [ROOM]: "", [USERNAME]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (event) => {
    const isDisabled = Object.values(values).some((value) => !value);
    if (isDisabled) event.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Присоединиться</h1>
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="userName"
              value={values[USERNAME]}
              placeholder="Имя пользователя"
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              value={values[ROOM]}
              placeholder="Название комнаты"
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <Link
            className={styles.group}
            to={`/chat?userName=${values[USERNAME]}&room=${values[ROOM]}`}
            onClick={handleClick}
          >
            <button type="submit" className={styles.button}>
              Войти
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
