const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/location');
const activityRoutes = require('./routes/activity');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/activity', activityRoutes);

// Socket.io for real-time location updates
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('updateLocation', (data) => {
    io.emit('newLocation', data); // Send to parent app
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));