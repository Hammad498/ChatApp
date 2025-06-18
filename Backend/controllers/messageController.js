import Message from "../models/message.model.js";


export const getAllMsg=async(req,res)=>{
    const {from, to} = req.body;
    if(!from || !to){
        return res.status(400).json({message: "From and To fields are required"});
    }
    try {
        const messages = await Message.find({
            users: {
                $all: [from, to]
            }
            // $or:[{sender : from, reciever : to,},{sender : to, reciever : from,}]
        }).sort({updatedAt: 1});
        
        const projectedMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message
            };
        });
        
        res.status(200).json(projectedMessages);
    } catch (error) {
        res.status(500).json({message: "Error fetching messages", error: error.message});
    }
}


export const addMsg=async(req,res)=>{
    const {from,to,message}=req.body;
    if(!from || !to || !message){
        return res.status(400).json({message: "From, To and Message fields are required"});
    }
    try {
        const data = await Message.create({
            message: { text: message },
            // users: [from, to],
            sender: from,
            receiver: to
        });
        
        if(data){
            return res.status(200).json({message: "Message added successfully"});
        } else {
            return res.status(400).json({message: "Failed to add message"});
        }
    } catch (error) {
        res.status(500).json({message: "Error adding message", error: error.message});
    }
}