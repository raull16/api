const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`⚡ VEXIS WEBSOCKET SERVER STARTED on port ${PORT}`);
console.log(`📍 WebSocket URL: wss://vexisaj.up.railway.app`);

// Store all connected clients
const clients = new Set();

wss.on('connection', (ws, req) => {
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`✅ ROBLOX CLIENT CONNECTED: ${clientIP}`);
    clients.add(ws);
    
    // Send welcome message
    ws.send(JSON.stringify({ type: 'connected', message: 'Connected to Vexis WebSocket!' }));
    
    ws.on('message', (data) => {
        try {
            const message = data.toString();
            console.log(`📦 RECEIVED FROM ROBLOX: ${message}`);
            
            const parsed = JSON.parse(message);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`🐾 PET: ${parsed.petName}`);
            console.log(`💰 MONEY: $${parsed.moneyPerSecond}/s`);
            console.log(`🧬 MUTATION: ${parsed.mutation}`);
            console.log(`⚔️ DUEL: ${parsed.isDuel ? 'YES ⚔️' : 'NO'}`);
            console.log(`🔗 JOB ID: ${parsed.jobId}`);
            console.log(`👤 OWNER: ${parsed.owner}`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            
            // Send confirmation back to Roblox
            ws.send(JSON.stringify({ 
                type: 'received', 
                message: 'Data received by Vexis Server',
                timestamp: Date.now()
            }));
            
        } catch (e) {
            console.log(`⚠️ RAW MESSAGE: ${data.toString()}`);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
        }
    });
    
    ws.on('close', () => {
        console.log(`❌ CLIENT DISCONNECTED: ${clientIP}`);
        clients.delete(ws);
    });
    
    ws.on('error', (error) => {
        console.error(`⚠️ WEBSOCKET ERROR: ${error.message}`);
    });
});

console.log(`🎯 Waiting for Roblox to connect to wss://vexisaj.up.railway.app...`);
