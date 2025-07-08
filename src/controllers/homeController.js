import db from "../models/index"
import CRUDservice from "../services/CRUDservice";

let getHomepage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("========================================================")
    console.log(data)
    console.log("========================================================")
    return res.render("homepage.ejs", {
      data: JSON.stringify(data)
    })
  } catch (e) {
    console.log(e)
  }
}

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message);
  return res.send("Post CRUD from server")
}

module.exports = {
  getHomepage: getHomepage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
}