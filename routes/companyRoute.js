const express = require("express");
const {
  getCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getFilteredCompanies,
} = require("../controllers/company");
const router = express.Router();

router.route("/companies").get(getCompanies);
router.route("/filtercompanies").post(getFilteredCompanies);
router.route("/company/:id").get(getSingleCompany);
router.route("/company/new").post(createCompany);
router.route("/company/:id").put(updateCompany);
router.route("/company/:id").delete(deleteCompany);

module.exports = router;
