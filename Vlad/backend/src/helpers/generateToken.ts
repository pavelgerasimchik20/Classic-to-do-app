import jwt from "jsonwebtoken";

const generateToken = (email: string, password: string) => {
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};

export default generateToken;