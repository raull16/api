const express = require('express');
const app = express();

// Allow all JSON data
app.use(express.json());

// Log everything that comes in
app.post('/', (req, res) => {
    const data = req.body;
    
    console.log('========================================');
    console.log('📦 NEW DETECTION RECEIVED!');
    console.log('========================================');
    console.log(`🐾 Pet Name: ${data.petName}`);
    console.log(`💰 Money/s: $${data.moneyPerSecond}`);
    console.log(`🧬 Mutation: ${data.mutation}`);
    console.log(`⚔️ In Duel: ${data.isDuel ? 'YES' : 'NO'}`);
    console.log(`🔗 Job ID: ${data.jobId}`);
    console.log(`👤 Owner: ${data.owner}`);
    console.log(`👥 Players: ${data.playerCount}/${data.maxPlayers}`);
    console.log(`🕐 Time: ${new Date(data.timestamp * 1000).toLocaleString()}`);
    console.log('========================================\n');
    
    // Send success response back to Roblox
    res.json({ 
        status: 'success', 
        message: 'Data received by Vexis API',
        received: {
            pet: data.petName,
            money: data.moneyPerSecond,
            duel: data.isDuel,
            jobId: data.jobId
        }
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'alive', 
        message: 'Vexis Finder API is running',
        endpoints: {
            post: 'Send data to / with JSON body'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Vexis API running on port ${PORT}`);
    console.log(`📍 Waiting for POST requests at: https://vexisaj.up.railway.app/`);
});
