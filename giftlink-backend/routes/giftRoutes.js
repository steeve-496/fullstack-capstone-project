/*jshint esversion: 8 */
const express = require('express');
/*jshint esversion: 8 */
const router = express.Router();
/*jshint esversion: 8 */
const { connectToDatabase } = require('../models/db'); // Adjust the path to your db connection file
/*jshint esversion: 8 */
const { ObjectId } = require('mongodb'); // Import ObjectId to handle MongoDB ObjectId types

// Get all gifts
/*jshint esversion: 8 */
router.get('/', async (req, res) => {
    try {
        /*jshint esversion: 8 */
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();
        /*jshint esversion: 8 */
        // Task 2: use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts");
        /*jshint esversion: 8 */
        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        const gifts = await collection.find({}).toArray();

        // Task 4: return the gifts using the res.json method
        res.json(gifts);
        /*jshint esversion: 8 */
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

// Get a specific gift by ID
/*jshint esversion: 8 */
router.get('/:id', async (req, res) => {
    try {
        /*jshint esversion: 8 */
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();
        /*jshint esversion: 8 */
        // Task 2: use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts");
        /*jshint esversion: 8 */
        const id = req.params.id;
        /*jshint esversion: 8 */
        // Task 3: Find a specific gift by ID using the collection.findOne method and store in constant called gift
        const gift = await collection.findOne({ _id: new ObjectId(id) });

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

module.exports = router;
