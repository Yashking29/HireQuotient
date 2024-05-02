# CHATGENIE - Real-Time Chat Application with LLM Integration

Welcome to ChatGenie! ChatGenie is a Node.js application designed to provide seamless real-time messaging capabilities while integrating with a Language Model API for enhanced user experience.

## Overview

ChatGenie utilizes Node.js along with Express, Mongoose, JWT (JSON Web Tokens), BcryptJs, and Socket.io to create a robust chat platform. It offers user authentication, message storage, and real-time chat functionality, along with the integration of a Language Model API for automatic responses when a user is busy.

## Features

1. **User Authentication**
   - Users can securely sign up with their email and password.
   - JWT is used for authentication, ensuring a secure login process.

2. **Real-Time Chat**
   - Enjoy instant messaging with real-time updates.
   - Socket.io facilitates efficient communication between users.

3. **Message Storage**
   - All messages are stored in MongoDB, ensuring reliability and scalability.
   - Past messages can be easily retrieved for reference during conversations.

4. **User Status and LLM Integration**
   - Users can set their status as 'AVAILABLE' or 'BUSY' to indicate their availability.
   - When a user is 'BUSY', ChatGenie automatically generates appropriate responses using a Language Model API.
   - API responses are handled promptly within 10 seconds for a seamless user experience.
   - Additionally, a mock API function is provided for cases where access to the Language Model API is unavailable.

## Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/Yashking29/HireQuotient.git
   ```

2. Navigate to the project directory:

   ```
   cd HireQuotient/Backend
   ```

3. Install dependencies using npm:

   ```
   npm install
   ```

4. Start the server:

   ```
   npm start
   ```

5. Access the application at http://localhost:3000.

## Usage

1. Sign up or log in with your email and password.
2. Set your status as 'AVAILABLE' or 'BUSY'.
3. Start chatting with friends in real-time!
4. If someone is 'BUSY', ChatGenie will automatically respond based on the context, ensuring uninterrupted communication flow.

## Contributors

 [Yash Hissaria](https://github.com/yashking29)
