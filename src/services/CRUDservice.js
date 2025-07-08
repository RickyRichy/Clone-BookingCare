import bcrypt from "bcryptjs";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPwdFromBcrypt = await hashUserPwd(data.password);
      await db.User.create({
        email: data.email,
        password: hashPwdFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNum: data.phoneNum,
        gender: data.gender === '1' ? true : false,
        roleID: data.roleID,
      })
      resolve("New user created successfully.");
    } catch (error) {
      reject(error)
    }
  })
}

let hashUserPwd = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPwd = bcrypt.hashSync(password, salt);
      resolve(hashPwd);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  createNewUser: createNewUser,
}