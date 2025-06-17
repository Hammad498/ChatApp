import Message from "../models/messageModel.js";


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


export const addMsg=async(req,res)=>{}