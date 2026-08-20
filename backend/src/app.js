const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { UPLOAD_ROOT } = require('./middleware/upload');

const app = express();

// Trust the first proxy hop (needed for correct rate-limit IP detection
// and secure cookies when deployed behind a reverse proxy / load balancer).
app.set('trust proxy', 1);

// ---- Security & core middleware ----
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow <img>/<a> to load uploaded files cross-origin
}));

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser tools (curl/Postman) with no Origin header.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// General API rate limiter (in addition to the stricter ones on /auth/login and /contact).
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
}));

// ---- Static file serving for uploads ----
app.use('/uploads', express.static(UPLOAD_ROOT));

// ---- API routes ----
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Portfolio API is running.' });
});

// ---- 404 + error handling (must be last) ----
app.use(notFound);
app.use(errorHandler);

module.exports = app;
