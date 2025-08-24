import { JOIN_CHANNEL } from "../utils/common/eventConstants.js";

export default function messageHandlers(io, sockets){
    sockets.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb) {
        const roomId= data.channelId;
        sockets.join(roomId);
        console.log(`User ${sockets.id} joined the channel : ${roomId}`)
        cb({
            success:true,
            message:'Successfully joined the channel',
            data: roomId
        })
    })
}