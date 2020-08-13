const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');

// Body Parser
app.use(express.json());

// Connect to DB
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to DB!');
	}
);

// Import routes
const postRoute = require('./routes/posts');

// Route middlewares
app.use('/posts', postRoute);

app.get('/', (req, res) => {
	res.send('Home');
});

app.listen(5000 || process.env.PORT, () => console.log('Server is running...'));
