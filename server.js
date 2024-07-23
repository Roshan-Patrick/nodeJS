const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/Retailshop');
const deviceRoutes = require('./routes/deviceInfo');
const cors = require('cors');
const setupSwagger = require('./swagger');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/retail', shopRoutes);
app.use('/api', deviceRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
