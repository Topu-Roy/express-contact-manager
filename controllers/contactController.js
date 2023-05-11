const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//* method : get
//* route : /api/contacts
//* access : public
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

//* method : post
//* route : /api/contacts
//* access : public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required !");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.json(contact);
});

//* method : get
//* route : /api/contacts/:id
//* access : public
const getContact = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.send(404);
    throw new Error("Contact not found. Please provide a ID");
  }

  const contact = await Contact.findById(req.params.id);

  if (contact === null) {
    res.json({ message: "Contact not found" });
  }
  res.json(contact);
});

//* method : put
//* route : /api/contacts/:id
//* access : private
const updateContact = asyncHandler(async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});

//* method : delete
//* route : /api/contacts/:id
//* access : priv
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: `Deleted contact for id ${req.params.id}` });
});

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
