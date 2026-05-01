const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`✅ WebSocket server started on port ${PORT}`);
console.log(`📍 Connect to: wss://vexisfinder.up.railway.app`);

wss.on('connection', (ws) => {
    console.log('✅ Client connected!');
    
    ws.on('message', (message) => {
        console.log(`📦 Received: ${message.toString()}`);
        
        // Send confirmation back
        ws.send('Received: ' + message.toString());
    });
    
    ws.on('close', () => {
        console.log('❌ Client disconnected');
    });
    
    ws.on('error', (error) => {
        console.log(`⚠️ Error: ${error.message}`);
    });
});
