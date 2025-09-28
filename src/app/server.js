const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const port = 3000;

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from a specific 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to MongoDB with the database name "orphanage"
mongoose.connect('mongodb://127.0.0.1:27017/orphanage', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
  console.log("Connected to MongoDB");
});
db.on('error', (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
db.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  mongoose.connect('mongodb://127.0.0.1:27017/orphanage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Define Donor schema and model
const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  donorCategory: { type: String, required: true },
  reasonForCategory: { type: String, required: true }
});

const Donor = mongoose.model("Donor", donorSchema);

// Define Food Donation schema and model
const foodDonationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  foodType: { 
    type: String, 
    required: true,
    enum: ['perishable', 'non-perishable', 'cooked', 'raw']
  },
  quantity: { 
    type: Number, 
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  contactPhone: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'Contact phone must be a 10-digit number']
  },
  donationDate: { type: Date, required: true }
});

const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema);

// Define Item Donation schema and model
const itemDonationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  address: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { 
    type: Number, 
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Clothes', 'Books', 'School Supplies', 'Other']
  },
  donationDate: { type: Date, required: true }
});

const ItemDonation = mongoose.model("ItemDonation", itemDonationSchema);

// Define Money Donation schema and model
const moneyDonationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'Phone must be a 10-digit number']
  },
  address: { type: String, required: true },
  amount: { 
    type: Number, 
    required: true,
    min: [1, 'Amount must be at least 1']
  },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['credit', 'debit']
  },
  donationDate: { type: Date, required: true }
});

const MoneyDonation = mongoose.model("MoneyDonation", moneyDonationSchema);

// Handle money donation submission
app.post('/donate/money', async (req, res) => {
  console.log('Request received for POST /donate/money', req.body);
  try {
    const { donorName, email, phone, address, amount, paymentMethod, donationDate } = req.body;

    // Validate required fields
    if (!donorName || !email || !phone || !address || !amount || !paymentMethod || !donationDate) {
      console.log('Missing required fields:', { donorName, email, phone, address, amount, paymentMethod, donationDate });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Additional validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone must be a 10-digit number' });
    }
    if (amount < 1) {
      return res.status(400).json({ success: false, message: 'Amount must be at least 1' });
    }
    if (!['credit', 'debit'].includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: 'Payment method must be either credit or debit' });
    }

    const donationData = {
      donorName,
      email,
      phone,
      address,
      amount,
      paymentMethod,
      donationDate: new Date(donationDate) // Use provided date
    };

    const newDonation = new MoneyDonation(donationData);
    await newDonation.save();
    console.log('Money donation saved successfully:', newDonation);
    res.status(201).json({ success: true, message: 'Money donation submitted successfully!', data: newDonation });
  } catch (error) {
    console.error('Error saving money donation:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Handle fetching all money donations
app.get('/donate/money', async (req, res) => {
  console.log('Request received for GET /donate/money');
  try {
    const donations = await MoneyDonation.find();
    if (donations.length > 0) {
      res.json({ success: true, data: donations });
    } else {
      res.json({ success: true, data: [], message: 'No money donations found' });
    }
  } catch (error) {
    console.error('Error fetching money donations:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle donor submission
app.post('/donor', async (req, res) => {
  console.log('Request received for POST /donor', req.body);
  try {
    const { fullName, email, phone, address, donorCategory, reasonForCategory } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !address || !donorCategory || !reasonForCategory) {
      console.log('Missing required fields:', { fullName, email, phone, address, donorCategory, reasonForCategory });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const donorData = {
      fullName,
      email,
      phone,
      address,
      donorCategory,
      reasonForCategory
    };

    const newDonor = new Donor(donorData);
    await newDonor.save();
    console.log('Donor saved successfully:', newDonor);
    res.status(201).json({ success: true, message: 'Donor details submitted successfully!', data: newDonor });
  } catch (error) {
    console.error('Error saving donor:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Handle fetching all donors
app.get('/donor', async (req, res) => {
  console.log('Request received for GET /donor');
  try {
    const donors = await Donor.find();
    if (donors.length > 0) {
      res.json({ success: true, data: donors });
    } else {
      res.json({ success: true, data: [], message: 'No donors found' });
    }
  } catch (error) {
    console.error('Error fetching donors:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle food donation submission
app.post('/donate/food', async (req, res) => {
  console.log('Request received for POST /donate/food', req.body);
  try {
    const { donorName, foodType, quantity, contactPhone, donationDate } = req.body;

    // Validate required fields
    if (!donorName || !foodType || !quantity || !contactPhone) {
      console.log('Missing required fields:', { donorName, foodType, quantity, contactPhone });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Additional validation
    if (!['perishable', 'non-perishable', 'cooked', 'raw'].includes(foodType)) {
      return res.status(400).json({ success: false, message: 'Invalid food type' });
    }
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }
    if (!/^\d{10}$/.test(contactPhone)) {
      return res.status(400).json({ success: false, message: 'Contact phone must be a 10-digit number' });
    }

    const donationData = {
      donorName,
      foodType,
      quantity,
      contactPhone,
      donationDate: donationDate ? new Date(donationDate) : new Date() // Use provided date or current server date
    };

    const newDonation = new FoodDonation(donationData);
    await newDonation.save();
    console.log('Food donation saved successfully:', newDonation);
    res.status(201).json({ success: true, message: 'Food donation submitted successfully!', data: newDonation });
  } catch (error) {
    console.error('Error saving food donation:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Handle fetching all food donations
app.get('/donate/food', async (req, res) => {
  console.log('Request received for GET /donate/food');
  try {
    const donations = await FoodDonation.find();
    if (donations.length > 0) {
      res.json({ success: true, data: donations });
    } else {
      res.json({ success: true, data: [], message: 'No food donations found' });
    }
  } catch (error) {
    console.error('Error fetching food donations:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle fetching all item donations
app.get('/donate/item', async (req, res) => {
  console.log('Request received for GET /donate/item');
  try {
    const donations = await ItemDonation.find();
    if (donations.length > 0) {
      res.json({ success: true, data: donations });
    } else {
      res.json({ success: true, data: [], message: 'No item donations found' });
    }
  } catch (error) {
    console.error('Error fetching item donations:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle item donation submission
app.post('/donate/item', async (req, res) => {
  console.log('Request received for POST /donate/item', req.body);
  try {
    const { donorName, address, itemName, quantity, category, donationDate } = req.body;

    // Validate required fields
    if (!donorName || !address || !itemName || !quantity || !category || !donationDate) {
      console.log('Missing required fields:', { donorName, address, itemName, quantity, category, donationDate });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Additional validation
    if (!['Clothes', 'Books', 'School Supplies', 'Other'].includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    const donationData = {
      donorName,
      address,
      itemName,
      quantity,
      category,
      donationDate: new Date(donationDate) // Use provided date
    };

    const newDonation = new ItemDonation(donationData);
    await newDonation.save();
    console.log('Item donation saved successfully:', newDonation);
    res.status(201).json({ success: true, message: 'Item donation submitted successfully!', data: newDonation });
  } catch (error) {
    console.error('Error saving item donation:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Define Adopter schema and model
const adopterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  income: { type: Number, required: true },
  occupation: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  familyType: { type: String, required: true },
  householdMembers: { type: Number, required: true },
  address: { type: String, required: true },
  preferredAge: { type: String, required: true },
  preferredGender: { type: String, required: true },
});

const Adopter = mongoose.model("Adopter", adopterSchema);

// Handle adoption application submission
app.post('/adoption-application', async (req, res) => {
  console.log('Request received for POST /adoption-application', req.body);
  try {
    const { fullName, age, email, phone, income, occupation, maritalStatus, familyType, householdMembers, address, preferredAge, preferredGender } = req.body;

    const adopterData = {
      fullName,
      age,
      email,
      phone,
      income,
      occupation,
      maritalStatus,
      familyType,
      householdMembers,
      address,
      preferredAge,
      preferredGender,
    };

    const newAdopter = new Adopter(adopterData);
    await newAdopter.save();
    res.status(201).json({ success: true, message: 'Adoption application submitted successfully!', data: newAdopter });
  } catch (error) {
    console.error('Error saving adopter:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Handle fetching all adopters
app.get('/adopter-details', async (req, res) => {
  console.log('Request received for GET /adopter-details');
  try {
    const adopters = await Adopter.find();
    if (adopters.length > 0) {
      res.json({ success: true, data: adopters });
    } else {
      res.json({ success: true, data: [], message: 'No adopters found' });
    }
  } catch (error) {
    console.error('Error fetching adopters:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Define Orphan schema and model
const orphanSchema = new mongoose.Schema({
  orphanId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  health: String,
  adoption_status: { type: String, required: true }
});

const Orphans = mongoose.model("Orphan", orphanSchema);

// Define Staff schema and model
const staffSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  experience: { type: Number, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  contact: { type: String, required: true }
});

const Staff = mongoose.model("Staff", staffSchema, 'staff');

// Serve the main HTML page (e.g., create-orphan.html) at a specific route
app.get('/create-orphan', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-orphan.html'));
});

// Add a root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Orphanage Management API. Use /orphans, /staff, /donor, /donate/food, /donate/item, or /donate/money for data or /create-orphan for the form.');
});

// Handle fetching all orphans
app.get('/orphans', async (req, res) => {
  console.log('Request received for GET /orphans');
  try {
    const orphans = await Orphans.find();
    if (orphans.length > 0) {
      res.json({ success: true, data: orphans });
    } else {
      res.json({ success: true, data: [], message: 'No orphans found' });
    }
  } catch (error) {
    console.error('Error fetching orphans:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle fetching a specific orphan by orphanId or _id
app.get('/orphans/:id', async (req, res) => {
  console.log('Request received for GET /orphans/:id', req.params.id);
  try {
    const id = req.params.id;
    let orphan;

    orphan = await Orphans.findOne({ orphanId: id });
    if (!orphan) {
      orphan = await Orphans.findById(id);
    }

    if (orphan) {
      res.json({ success: true, data: orphan });
    } else {
      res.status(404).json({ success: false, message: 'Orphan not found' });
    }
  } catch (error) {
    console.error('Error fetching orphan:', error.stack);
    res.status(500).json({ success: false, message: 'Server error occurred. Please try again later.' });
  }
});

// Handle orphan registration
app.post('/orphans', async (req, res) => {
  console.log('Request received for POST /orphans', req.body);
  try {
    const { orphanId, name, age, gender, health, adoptionStatus } = req.body;

    if (!['Male', 'Female'].includes(gender)) {
      return res.status(400).json({ success: false, message: 'Invalid gender value' });
    }

    if (!['Available', 'Adopted'].includes(adoptionStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid adoption status' });
    }

    const orphanData = {
      orphanId,
      name,
      age,
      gender,
      health,
      adoption_status: adoptionStatus
    };

    const orphan = new Orphans(orphanData);
    await orphan.save();
    res.status(201).json({ success: true, message: 'Orphan record saved successfully!', data: orphan });
  } catch (error) {
    console.error('Error saving orphan:', error.message);
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Orphan ID already exists' });
    } else {
      res.status(400).json({ success: false, message: error.message });
    }
  }
});

// Handle updating a specific orphan by orphanId
app.put('/orphans/:id', async (req, res) => {
  console.log('Request received for PUT /orphans/:id', req.params.id, req.body);
  try {
    const id = req.params.id;
    const { orphanId, name, age, gender, health, adoption_status } = req.body;

    // Validate required fields
    if (!orphanId || !name || !age || !gender || !adoption_status) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Validate orphanId matches URL parameter
    if (orphanId !== id) {
      return res.status(400).json({ success: false, message: 'Orphan ID in payload does not match URL parameter' });
    }

    // Validate gender and adoption_status
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ success: false, message: 'Invalid gender value' });
    }
    if (!['Available', 'Pending', 'Adopted'].includes(adoption_status)) {
      return res.status(400).json({ success: false, message: 'Invalid adoption status' });
    }

    const updatedOrphan = await Orphans.findOneAndUpdate(
      { orphanId: id },
      { name, age, gender, health, adoption_status },
      { new: true, runValidators: true }
    );

    if (updatedOrphan) {
      res.json({ success: true, message: 'Orphan updated successfully', data: updatedOrphan });
    } else {
      res.status(404).json({ success: false, message: 'Orphan not found' });
    }
  } catch (error) {
    console.error('Error updating orphan:', error.stack);
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
});

// Handle deleting a specific orphan by orphanId
app.delete('/orphans/:id', async (req, res) => {
  console.log('Request received for DELETE /orphans/:id', req.params.id);
  try {
    const id = req.params.id;
    const deletedOrphan = await Orphans.findOneAndDelete({ orphanId: id });

    if (deletedOrphan) {
      res.json({ success: true, message: 'Orphan deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Orphan not found' });
    }
  } catch (error) {
    console.error('Error deleting orphan:', error.stack);
    res.status(500).json({ success: false, message: 'Server error occurred. Please try again later.' });
  }
});

// Handle fetching all staff
app.get('/staff', async (req, res) => {
  console.log('Request received for GET /staff');
  try {
    const staff = await Staff.find();
    if (staff.length > 0) {
      res.json({ success: true, data: staff });
    } else {
      res.json({ success: true, data: [], message: 'No staff found' });
    }
  } catch (error) {
    console.error('Error fetching staff:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Handle fetching a specific staff by id
app.get('/staff/:id', async (req, res) => {
  console.log('Request received for GET /staff/:id', req.params.id);
  try {
    const id = req.params.id;
    const staff = await Staff.findOne({ id });

    if (staff) {
      res.json({ success: true, data: staff });
    } else {
      res.status(404).json({ success: false, message: 'Staff not found' });
    }
  } catch (error) {
    console.error('Error fetching staff:', error.stack);
    res.status(500).json({ success: false, message: 'Server error occurred. Please try again later.' });
  }
});

// Handle staff registration
app.post('/staff', async (req, res) => {
  console.log('Request received for POST /staff', req.body);
  try {
    const { id, name, age, gender, experience, address, role, contact } = req.body;

    if (!id || !name || !age || !gender || !experience || !address || !role || !contact) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ success: false, message: 'Invalid gender value' });
    }

    const staffData = { id, name, age, gender, experience, address, role, contact };
    const newStaff = new Staff(staffData);
    await newStaff.save();
    res.status(201).json({ success: true, message: 'Staff record created successfully!', data: newStaff });
  } catch (error) {
    console.error('Error saving staff:', error.message);
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Staff ID already exists' });
    } else {
      res.status(400).json({ success: false, message: error.message });
    }
  }
});

// Handle updating a specific staff by id
app.put('/staff/:id', async (req, res) => {
  console.log('Request received for PUT /staff/:id', req.params.id, req.body);
  try {
    const id = req.params.id;
    const { name, age, gender, experience, address, role, contact } = req.body;

    if (!name || !age || !gender || !experience || !address || !role || !contact) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ success: false, message: 'Invalid gender value' });
    }

    const updatedStaff = await Staff.findOneAndUpdate(
      { id },
      { name, age, gender, experience, address, role, contact },
      { new: true, runValidators: true }
    );

    if (updatedStaff) {
      res.json({ success: true, message: 'Staff updated successfully', data: updatedStaff });
    } else {
      res.status(404).json({ success: false, message: 'Staff not found' });
    }
  } catch (error) {
    console.error('Error updating staff:', error.stack);
    res.status(500).json({ success: false, message: 'Server error occurred. Please try again later.' });
  }
});

// Handle deleting a specific staff by id
app.delete('/staff/:id', async (req, res) => {
  console.log('Request received for DELETE /staff/:id', req.params.id);
  try {
    const id = req.params.id;
    const deletedStaff = await Staff.findOneAndDelete({ id });

    if (deletedStaff) {
      res.json({ success: true, message: 'Staff deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Staff not found' });
    }
  } catch (error) {
    console.error('Error deleting staff:', error.stack);
    res.status(500).json({ success: false, message: 'Server error occurred. Please try again later.' });
  }
});

// Debug endpoint to list all orphan IDs
app.get('/debug/orphans', async (req, res) => {
  try {
    const orphans = await Orphans.find({}, 'orphanId');
    res.json({ success: true, data: orphans.map(o => o.orphanId) });
  } catch (error) {
    console.error('Error in debug endpoint:', error.stack);
    res.status(500).json({ success: false, message: 'Server error in debug endpoint' });
  }
});

// Debug endpoint to list all staff IDs
app.get('/debug/staff', async (req, res) => {
  try {
    const staff = await Staff.find({}, 'id');
    res.json({ success: true, data: staff.map(s => s.id) });
  } catch (error) {
    console.error('Error in debug endpoint:', error.stack);
    res.status(500).json({ success: false, message: 'Server error in debug endpoint' });
  }
});

// Optional: Serve Angular app (after ng build)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
