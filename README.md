# Chat Room 
A web application for chatting
## Tech Stack
- **Backend Framework:** [NestJS]
- **Frontend Framework:** [ReactJS](https://handlebarsjs.com/)
- **Database:** MongoDB
- **Language:** JavaScript (Node.js runtime)
- **Version Control:** Git & GitHub



## Installation & Setup
#### 1. Clone the repository
```bash
git clone https://github.com/Currry218/ChatRoom.git
cd ChatRoom
```
#### 2. Install dependencies
Frontend
```bash
cd src/fe 
npm install
```
Backend
```bash
cd src/be 
npm install
```
#### 3. Create a MongoDB Cluster 
https://www.mongodb.com/docs/guides/atlas/cluster/
#### 4. Configure environment variables
Create a .env file in the root directory:
```bash
env
DB_USERNAME=yourUsername
DB_PASSWORD=yourPassword
DB_URI=mongodb+srv://yourUsername:yourPassword@youruri.mongodb.net/
JWT_SECRET=yourJwtSecret
EXP_IN_ACCESS_TOKEN=15m
EXP_IN_REFRESH_TOKEN=7d
SALT_ROUND=10
FRONT_END_URL=http://localhost:5173
```

#### 5. Start the application
Frontend
```bash
npm run dev
```
Frontend
```bash
npm run start:dev
```
The app will be available at http://localhost:3000 with backend and  http://localhost:5173 with frontend
