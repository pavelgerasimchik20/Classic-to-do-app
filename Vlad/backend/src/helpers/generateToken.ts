import jwt from "jsonwebtoken";

const generateToken = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};

export default generateToken;