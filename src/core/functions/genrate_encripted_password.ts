import * as bcrypt from 'bcrypt';

export async function genrateEncriptedPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}