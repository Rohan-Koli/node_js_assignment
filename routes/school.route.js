const express = require('express');
const schoolsRouter = express.Router();
const {getSchools,addSchool} = require("../controllers/school.controller.js")
const { body, validationResult } = require('express-validator');
const { School } = require("../models");

  

const validateGetSchool = [
  body('latitude')
    .notEmpty().withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),

  body('longitude')
    .notEmpty().withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),

  // Middleware to return errors if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
schoolsRouter.get('/listSchools',validateGetSchool,getSchools);

const validateAddSchool = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('address')
    .notEmpty().withMessage('Address is required')
    .isString().withMessage('Address must be a string'),

  body('latitude')
    .notEmpty().withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),

  body('longitude')
    .notEmpty().withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),

  // Middleware to return errors if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

schoolsRouter.post("/addSchool",validateAddSchool,addSchool)

module.exports = schoolsRouter;
