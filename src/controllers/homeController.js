import db from "../models/index"
import CRUDservice from "../services/CRUDservice";

let getHomepage = async (req, res) => {
  try {
    let data = await db.User.findAll({
      raw: true,
    });
    return res.render("homepage.ejs", {
      data: JSON.stringify(data)
    })
  } catch (e) {
    console.log(e)
  }
}

let getCRUDpage = (req, res) => {
  return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message);
  return res.send("Post CRUD from server")
}

let getCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUser();
  return res.render("getCRUD.ejs", {
    dataTable: data,
  })
}

let editCRUD = async (req, res) => {
  let uid = req.query.id;
  console.log(uid);
  if (uid) {
    let userData = await CRUDservice.getUserInfoByID(uid);
    return res.render("editCRUD.ejs", {
      userData: userData, //x <- y
    })
  }
  else {
    return res.send("User not found");
  }
}

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDservice.updateUserData(data);
  return res.render("getCRUD.ejs", {
    dataTable: allUsers,
  })
}

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDservice.deleteUserByID(id);
    return res.send("Deleted successfully.")
  } else {
    return res.send("User not found.")
  }
}

module.exports = {
  getHomepage: getHomepage,
  getCRUDpage: getCRUDpage,
  postCRUD: postCRUD,
  getCRUD: getCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
}