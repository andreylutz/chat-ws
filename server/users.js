const { trimStr } = require("./helpers");

let users = [];

const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (user) => trimStr(user.name) === userName && trimStr(user.room) === userRoom
  );
};

/** Проверит есть ли пользователь если нет то добавит его и вернет текущего пользователя
 * @param newUser - новый пользователь
 * @returns данные по текущему пользователю
 */
const addUser = (newUser) => {
  const existingUser = findUser(newUser);
  !existingUser && users.push(newUser);

  const currentUser = existingUser || newUser;

  return { existingUser: !!existingUser, user: currentUser };
};

module.exports = {
  addUser,
  findUser,
};
