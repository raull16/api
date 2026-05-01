const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON data
app.use(express.json());

// Your endpoint - this is what the script will call
app.post('/', (req, res) => {
    console.log('Received detection:', req.body);
    
    // Log all the data from your Roblox script
    const data = req.body;
    console.log(`Pet: ${data.petName}`);
    console.log(`Money: ${data.moneyPerSecond}`);
    console.log(`Duel: ${data.isDuel}`);
    console.log(`Job ID: ${data.jobId}`);
    
    // Send success response
    res.json({ 
        status: 'success', 
        received: true,
        timestamp: Date.now()
    });
});

// Also accept GET to check if server is alive
app.get('/', (req, res) => {
    res.json({ status: 'alive', message: 'Vexis Finder API is running' });
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
