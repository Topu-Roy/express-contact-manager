//* method : get
//* route : /api/contacts
//* access : public
const getAllContacts = (req, res) => {
  res.json({ message: "get all contacts" });
};

//* method : post
//* route : /api/contacts
//* access : public
const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required !");
  }
  res.json({ message: "create new contact" });
};

//* method : get
//* route : /api/contacts/:id
//* access : public
const getContact = (req, res) => {
  res.json({ message: `Get contact for id ${req.params.id}` });
};

//* method : put
//* route : /api/contacts/:id
//* access : private
const updateContact = (req, res) => {
  res.json({ message: `Update contact for id ${req.params.id}` });
};

//* method : delete
//* route : /api/contacts/:id
//* access : priv
const deleteContact = (req, res) => {
  res.json({ message: `Delete contact for id ${req.params.id}` });
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
