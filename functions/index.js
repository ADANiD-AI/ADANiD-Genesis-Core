// --- Start of functions/index.js ---
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');

// 1. Initialize Firebase Admin SDK
admin.initializeApp();

// 2. Initialize Database Connection (Mongoose)
const connectDB = require('./services/db/mongoConnect');
connectDB(); // Attempt to connect the database when function loads

const app = express();
app.use(express.json());

// 3. Import Routes
const identityRoutes = require('./routes/identityRoutes');
app.use('/api/v1/identity', identityRoutes); 

// Root Route
app.get('/', (req, res) => {
    res.status(200).send('ADANiD Genesis Core API is Active and DB Status: Initialized.');
});

// 4. Export the Express App as a single Firebase Function
exports.api = functions.https.onRequest(app);

// --- End of functions/index.js ---
