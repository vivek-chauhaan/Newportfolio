# Server
NODE_ENV=development
PORT=8080

# MongoDB
# Local:  mongodb://127.0.0.1:27017/portfolio_db
# Atlas:  mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio_db
# MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db
# MONGO_URI=mongodb://127.0.0.1:27017/SnapPost
MONGO_URI=mongodb+srv://sheyanshmishra92_db_user:DEJ0T4zkgpOT4IU2@cluster0.jcp5my2.mongodb.net/portfolio_db?retryWrites=true&w=majority


# JWT
JWT_ACCESS_SECRET=replace_with_a_long_random_secret_for_access_tokens
JWT_REFRESH_SECRET=replace_with_a_long_random_secret_for_refresh_tokens
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS - comma separated list of allowed origins
CLIENT_ORIGIN=http://localhost:5173

# Default admin (seeded automatically on first server start if no admin exists)
ADMIN_DEFAULT_NAME=Admin
ADMIN_DEFAULT_EMAIL=admin@gmail.com
ADMIN_DEFAULT_PASSWORD=Admin@123

# Uploads
MAX_UPLOAD_MB=5

# Public base URL of this backend (used to build absolute file URLs)
SERVER_PUBLIC_URL=http://localhost:8080
