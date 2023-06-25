const mongoose = require("mongoose");

const companyschema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Enter Company name!"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Enter Company title!"],
    trim: true,
  },
  aboutUs: {
    type: String,
    required: [true, "Add comapny description!"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Enter Duration"],
  },
  stipendStart: {
    type: Number,
    default: 0,
  },
  stipendEnd: {
    type: Number,
  },
  applicants: {
    type: Number,
    default: 0,
  },
  openings: {
    type: Number,
    default: 0,
  },
  isBookmarked: {
    type: Boolean,
    default: false,
  },
  endsIn: {
    type: Number,
    default: 7,
  },
  experience: {
    type: String,
    required: [true, "Enter Experience"],
  },
  type: {
    type: String,
    required: [true, "Enter Company Type"],
  },
  timings: {
    type: String,
    required: [true, "Enter Company Timings"],
  },
  companyLogo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Enter Company Category"],
  },
  location: {
    type: String,
    required: [true, "Enter Company Location"],
  },
  skills: [
    {
      type: String,
    },
  ],
  responsibilities: [
    {
      type: String,
    },
  ],
  requirements: [
    {
      type: String,
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const companymodel = mongoose.model("comapny", companyschema);
module.exports = companymodel;
