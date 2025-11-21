export const validatePassword = (password: string) => {
  const spaceRegex = /^[^\s]+$/;
  if (password.length < 6) return "Password has to be 6 characters or longer";
  if (password.length > 30) return "Password is too long";
  if (!spaceRegex.test(password)) return "Password must not contain any spaces";
};

export const validateName = (name: string) => {
  if (name.length < 3) return "Name has to be 3 characters or longer";
  if (name.length > 24) return "Name has to be shorter than 24 characters";
};

export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return "Invalid email!";
}
