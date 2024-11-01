export const validator = ({
  password,
  type,
}: {
  password: string;
  type: string;
}) => {
  switch (type) {
    case "length":
      return password.length > 4 && password.length <= 10;
    case "number":
      return /[0-9]/.test(password);
    case "special":
      const regex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      return regex.test(password);
  }
};
