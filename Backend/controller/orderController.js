import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order from frontend--->

const placeOrder=async (req,res)=>{
    const frontend_url='http://localhost:5174'

  try{

    const newOrder=new orderModel({
        userId:req.body.userId,
        item:req.body.item,
        amount:req.body.amount,
        address:req.body.address

    })
    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});


    const line_item= req.body.item.map((item)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100*80
        },
        quantity:item.quantity
    }))

    line_item.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100*80
        },
        quantity:1
    })


    const session=await stripe.checkout.sessions.create({
        line_items:line_item,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })

    res.json({success:true,session_url:session.url})

  }catch(error){
    console.log(error);
    res.json({success:false,messsage:"Error"})

  }

}


// to varify payment status webHooks are the best way but here we used temperory method to varify the payment methods.


const verifyOrder=async (req,res)=>{
    const {orderId,success}=req.body;

   try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,messsage:"paid"});

        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,messsage:"not paid"});


        }

    
   } catch (error) {
         console.log(error);
         res.json({success:false,messsage:"Error"});
         
   }

}

// user orders for frontend----->

const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});


    }catch(error){
           console.log(error);
           res.json({success:false,message:"error"});
           
    }

}

// listing orders for admin pannel

const listOrders=async( req,res )=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}

// api for updating order status

const updateStatus=async (req,res)=>{
    try {
        
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"status updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
    
}



export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}