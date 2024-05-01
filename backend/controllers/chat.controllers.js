import Chat from '../models/Chat.models.js';
import User from '../models/User.models.js';

// Assuming userId1 and userId2 are the user IDs of the two users
export const getMessagesBetweenUsers = async (req, res) => {

    const { userId1, userId2 } = req.body;

  try {
    const chat = await Chat.findOne({
      participants: { $all: [userId1, userId2] }
    }).populate('messages.sender', 'username'); // Populate sender field with sender's username

    if (!chat) {
      // Chat not found
      return [];
    }
    // console.log(chat.messages);

    res.status(200).send(chat.messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};


export const createMessage = async (req, res) => {
    const { userId1, userId2, message } = req.body;

    try {
        // Find or create a chat document for the sender and recipient
        let chat = await Chat.findOne({
            participants: { $all: [userId1, userId2] }
        });

        if (!chat) {
            // If the chat document does not exist, create a new one
            chat = new Chat({
                participants: [userId1, userId2],
                messages: []
            });
        }

        // Append the new message to the chat
        chat.messages.push({ sender: userId1, text: message });

        // Save the chat document
        await chat.save();

        res.status(200).json(chat.messages);// Send the messages as response
    } catch (error) {
        console.error('Error creating message:',);
        res.status(500).send('Error creating message');
    }
}
