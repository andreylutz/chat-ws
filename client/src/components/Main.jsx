import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/Main.module.css';

const FIELDS = {
  ROOM: 'room',
  USERNAME: 'username'
}

export const Main = () => {
  const { ROOM, USERNAME } = FIELDS
  const [values, setValues] = useState({ [ROOM]: '', [USERNAME]: '' });

  function handleChange ({ target: { value, name } }) {
    setValues({ ...values, [name]: value })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Присоединиться</h1>
        <form className={styles.form}>
        <div className={styles.group}>
          <input 
            type='text' 
            name='username' 
            value={values[USERNAME]}
            placeholder='Имя пользователя'
            className={styles.input} 
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <div className={styles.group}>
          <input 
            type='text' 
            name='room' 
            value={values[ROOM]}
            placeholder='Название чата'
            className={styles.input} 
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <Link to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}>
          <button type='submit' className={styles.button}>
            Войти
          </button>
        </Link> 
        </form>
      </div>
    </div>
  )
}