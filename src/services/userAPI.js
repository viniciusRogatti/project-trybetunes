const USER_KEY = 'user';

const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const getUser = () => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
  return user;
};

export const createUser = (user) => {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  saveUser({ ...emptyUser, ...user });
};

export const updateUser = (updatedUser) => {
  saveUser({ ...updatedUser });
};
