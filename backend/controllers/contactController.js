import Contact from '../models/Contact.js';

export const saveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}; 