import bcrypt from 'bcrypt';

export const hash = async (password: string) => {
  return await bcrypt.hash(password, 12);
}

export const isEqual = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
}