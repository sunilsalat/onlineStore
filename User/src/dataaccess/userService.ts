import { User } from "../models/User";

export const createUser = async (data) => {
  const userObj = await User.create(data);
  return userObj;
};

export const getUsers = async (filters: any) => {
  const usersObj = await User.find();
  return usersObj;
};
