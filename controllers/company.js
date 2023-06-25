const Company = require("../models/companyModel");
const Features = require("../utils/features");

exports.getCompanies = async (req, res, next) => {
  try {
    const apiFeatures = new Features(Company.find(), req.query).search();
    // .filter();
    let companies = await apiFeatures.query;
    // const companies = await Company.find();
    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
exports.getFilteredCompanies = async (req, res, next) => {
  console.log(req.body);
  const categories = req.body.category;
  const skills = req.body.skills;
  const location = req.body.location;
  const timings = req.body.timings;
  const types = req.body.types;
  const duration = req.body.duration;
  let timingsValue = [];
  for (let key in timings) {
    if (timings[key] == true) {
      timingsValue.push(key);
    }
  }

  let typesValue = [];
  for (let key in types) {
    if (types[key] == true) {
      if (key === "workFromHome") typesValue.push("home");
      if (key === "inOffice") typesValue.push("office");
    }
  }

  const allQuery = [
    {
      duration: {
        $gte: duration[0],
        $lte: duration[1],
      },
    },
  ];
  if (categories.length !== 0) allQuery.push({ category: { $in: categories } });
  if (skills.length !== 0) allQuery.push({ skills: { $in: skills } });
  if (location.length !== 0) allQuery.push({ location: { $in: location } });
  if (timingsValue.length !== 0)
    allQuery.push({ timings: { $in: timingsValue } });
  if (typesValue.length !== 0) allQuery.push({ type: { $in: typesValue } });

  const query = {
    $and: allQuery,
  };

  const companies = await Company.find(query);
  console.log(companies);
  try {
    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
exports.getSingleCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(400).json({
        success: false,
        error: "Company not found",
      });
    }
    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
exports.updateCompany = async (req, res, next) => {
  let company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(400).json({
      success: false,
      error: "Company not found",
    });
  }
  req.body = {
    ...req.body,
    updatedAt: Date.now(),
  };
  console.log(req.body);

  company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    company,
  });
};

exports.deleteCompany = async (req, res, next) => {
  let company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(400).json({
      success: false,
      error: "Company not found",
    });
  }
  company = await Company.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Company deleted",
  });
};
