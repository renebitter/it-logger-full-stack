const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const Tech = require("../models/Tech");

// @route GET api/techs
// @desc GET all techs
router.get("/", async (req, res) => {
  try {
    const techs = await Tech.find();
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/techs
// @desc Add new tech
router.post(
  "/",
  [
    check("firstName", "First Name is required.").not().isEmpty(),
    check("lastName", "Last Name is required.").not().isEmpty(),
  ],
  async (req, res) => {
    const { firstName, lastName } = req.body;

    try {
      const newTech = new Tech({
        firstName,
        lastName,
      });

      const tech = await newTech.save();

      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// @route DELETE api/techs/:id
// @desc Delete tech
router.delete("/:id", async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: "tech not found." });

    tech = await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: "Tech deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
