const { trimStr } = require("./helpers");

let users = [];

/** Проверит есть ли пользователь если нет то добавит его и вернет текущего пользователя
 * @param newUser - новый пользователь
 * @returns данные по текущему пользователю
 */
const addUser = (newUser) => {
  const userName = trimStr(newUser.name);
  const userRoom = trimStr(newUser.room);

  const existingUser = users.find(
    (user) => trimStr(user.name) === userName && trimStr(user.room) === userRoom
  );

  !existingUser && users.push(newUser);

  const currentUser = existingUser || newUser;

  return { existingUser: !!existingUser, user: currentUser };
};

module.exports = {
  addUser,
};
