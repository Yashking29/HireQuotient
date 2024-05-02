# Chat Application with User Authentication and Real-Time Messaging
This is a Node.js application utilizing Express, Mongoose, JWT (JSON Web Tokens), Bcrypt, and Socket.io to implement user authentication, real-time messaging, message storage, and user online status management.

Installation
Clone this repository to your local machine.
Navigate to the project directory.
Install dependencies using npm:


        bash
        Copy code
        npm install
        Setup
        Configure MongoDB:
        Install MongoDB on your system if you haven't already.
Create a new MongoDB database.
Update the MongoDB URI in config/default.json.
Set Environment Variables:
Create a .env file in the root directory.
Add the following environment variables:
makefile
Copy code
PORT=3000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
Usage
Start the server:

bash
Copy code
npm start
Access the application at http://localhost:3000.

Features
1. User Authentication
Registration and Login System: Users can sign up with an email and password.
JWT Authentication: JSON Web Tokens are used for managing authentication.
2. Chat Functionality
Real-Time Messaging: Users can send and receive real-time messages.
Socket.io Integration: Socket.io is utilized for efficient real-time communication.
3. Message Storage
MongoDB: All messages are stored in MongoDB.
Retrievable Messages: Messages in chat are retrievable for conversation between people.
4. User Online Status and LLM Integration
User Status: Users can set their status as 'AVAILABLE' or 'BUSY'.
Real-Time Status Update: Online status of users is updated in real-time.
Language Model Integration: If a recipient is 'BUSY', an appropriate response is generated using a language model API.
API Timeout Handling: API response from the Language Model should be sent within 10 seconds. If the API does not respond in 10 seconds, a standard message indicating the user is unavailable is sent.
Mock API Function (if needed)
In case an actual language model API is not accessible, a mock API function is provided. To use it, follow these steps:

Open utils/mockLLMAPI.js.
Uncomment the mock API function at the end of the file.
Ensure that utils/mockLLMAPI.js is imported wherever LLM integration is required.
This mock API function will generate a predefined response within 10 seconds.
Contributors
Your Name