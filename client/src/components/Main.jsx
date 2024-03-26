import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Main.module.css";

const FIELDS = {
  ROOM: "room",
  NAME: "name",
};

export const Main = () => {
  const { ROOM, NAME } = FIELDS;
  const [values, setValues] = useState({ [ROOM]: "", [NAME]: "" });

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
              name="name"
              value={values[NAME]}
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
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
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
