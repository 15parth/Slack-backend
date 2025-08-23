import Message from '../schema/messageSchema'
import crudRepository from './crudRepository'

const messageRepository = {
  ...crudRepository(Message),

  getPaginatedMessages: async (messageParams, page, limit) => {
    const messages = await Message.find({ messageParams })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('senderId', 'username email avatar')

    const total = await Message.countDocuments({ messageParams })

    return { messages, total }
  },

  deleteMessage: async (messageId) => {
    return Message.findByIdAndDelete(messageId)
  }
}

export default messageRepository
