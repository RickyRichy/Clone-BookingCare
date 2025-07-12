import bcrypt from "bcryptjs";
import db from "../models/index"
import { where } from "sequelize";

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      })
      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

let getUserInfoByID = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: uid
        },
        raw: true,
      })
      if (user) {
        resolve(user)
      }
      else {
        resolve([])
      }
    } catch (error) {
      reject(error)
    }
  })
}
 let updateUserData = (data) => {
  console.log("Updated data")
  console.log(data)
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: data.id,
        }
      })
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      }
      else {
        resolve();
      }
    } catch (error) {
      reject(error)
    }
  })
 }

 let deleteUserByID = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: uid
        }
      })
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error)
    }
  })
 }

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoByID: getUserInfoByID,
  updateUserData: updateUserData,
  deleteUserByID: deleteUserByID,
}