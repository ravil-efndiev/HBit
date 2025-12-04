export const usernameRegex = /^[A-Za-z0-9_]+$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateUsername = (username: string) => {
  if (username.length < 3)
    throw new Error("Username has to be 3 characters or longer");
  if (username.length > 24)
    throw new Error("Username has to be shorter than 24 characters");
  if (!usernameRegex.test(username))
    throw new Error(
      "Username can only contain letters, numbers and underscores"
    );
};

export const validatePassword = (password: string) => {
  const spaceRegex = /^[^\s]+$/;
  if (password.length < 6)
    throw new Error("Password has to be 6 characters or longer");
  if (password.length > 30) throw new Error("Password is too long");
  if (!spaceRegex.test(password))
    throw new Error("Password must not contain any spaces");
};

export const validateName = (name: string) => {
  if (name.length < 3) throw new Error("Name has to be 3 characters or longer");
  if (name.length > 24)
    throw new Error("Name has to be shorter than 24 characters");
};

export const validateEmail = (email: string) => {
  if (!emailRegex.test(email)) throw new Error("Invalid email!");
};
