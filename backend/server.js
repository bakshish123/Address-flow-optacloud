const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const locationRoutes = require('./routes/locationRoutes');
const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', locationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));