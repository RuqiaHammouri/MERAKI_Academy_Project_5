const connection = require("./../../db/db");

const createNewGym = (req, res) => {
  const {
    name,
    phoneNumber,
    location,
    image,
    priceMonthly,
    description,
    is_delete,
  } = req.body;
  const gymQuery = `INSERT INTO gym  ( name, phoneNumber, location ,image , priceMonthly,description , is_delete ) VALUES (?,?,?,?,?,?,?)`;
  const data = [
    name,
    phoneNumber,
    location,
    image,
    priceMonthly,
    description,
    is_delete,
  ];
  connection.query(gymQuery, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: err,
      });
    }
    res.status(201).json({
      success: true,
      message: "Success new gym Added ",
      result: result,
    });
  });
};

const updateGymById = (req, res) => {
  const id = req.params.id;
  const { name, phoneNumber, location, image, priceMonthly, description } =
    req.body;
  const gymQuery = `UPDATE gym SET name="${name}", phoneNumber="${phoneNumber}" , location="${location}" ,image="${image}" ,priceMonthly="${priceMonthly}" ,description="${description}"  WHERE id = ${id}`;
  connection.query(gymQuery, (error, result, fields) => {
    if (error) {
      console.log(error.response);
      return;
    }
    res.status(200).json({
      success: true,
      message: "Success updated Gym by the id ",
      result: result,
    });
  });
};

const deleteGymById = (req, res) => {
  id = req.params.id;
  const gymQuery = `UPDATE gym SET is_delete="1"  WHERE id = ${id}`;
  connection.query(gymQuery, (error, result, fields) => {
    if (error) {
      console.log(error.response);
      return;
    }
    res.status(200).json({
      success: true,
      message: "Success deleted Gym by the id ",
      result: result,
    });
  });
};

module.exports = { createNewGym, updateGymById, deleteGymById };
