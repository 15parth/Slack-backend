import { createMessageService } from "../service/messageService.js"
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECIEVED_EVENT } from "../utils/common/eventConstants.js"

export default function messageHandler(io,socket){
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data,cb){
   console.log(data)
  const {channelId}= data;
  const messageResponse = await createMessageService(data);
  
//   socket.broadcast.emit(NEW_MESSAGE_RECIEVED_EVENT, messageResponse)

   io.to(channelId).emit(NEW_MESSAGE_RECIEVED_EVENT, messageResponse)

  cb({
    success: true,
    message: 'Successfully created the data',
    data: messageResponse
  })
})
}

