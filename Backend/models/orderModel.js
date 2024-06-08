import mongoos from 'mongoose'

const orderSchema=new mongoos.Schema({
    userId:{type:String,required:true},
    items:{type:String,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}

})

const orderModel=mongoos.models.order || mongoos.model("order",orderSchema)

export default orderModel;