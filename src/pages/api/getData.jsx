// pages/api/getData.js
const data = require("../../../public/api/categories.json");

export default function handler(req, res) {
  res.status(200).json(data);
} // pages/api/getData.js
