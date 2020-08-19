const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

//get all User's contacts
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new Contact
router.post(
  "/",
  [auth, check("name", "name is required").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { name, email, phone, type } = req.body;

      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update a contact
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure that user owns the contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not Authorized" });

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//delete a contact
router.delete("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure that user owns the contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not Authorized" });

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
