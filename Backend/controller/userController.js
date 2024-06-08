import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken' // for authentication
import bcrypt from 'bcrypt'  // for inncreption
import validator from 'validator' // for validation


// login user-->

const loginUser=async (req,res)=>{

    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"user does not exists"})

        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})


        }

        const token=createToken(user._id)

        res.json({success:true,token})


        
    } catch (error) {
        console.log(error);

        res.json({success:false,message:"Error"})



    }



}

// Creating token------>

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}



// register user---------->

const registerUser=async (req,res)=>{
    const {name,password,email}=req.body;
    try{

        //checking is user already exists
        const exists= await userModel.findOne({email})
       if (exists) {
        return res.json({success:false,message:"user already exists"})
        
       }

       //validating email formate and strom=ng password--->

       if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter Valid Email"})
      }
   
      if(password.length<8){
        return res.json({success:false,message:"Please Enter Strong password"})

      }

      // hashing user password

      const salt=await bcrypt.genSalt(10)
    
      const hashedpassword=await bcrypt.hash(password,salt)

     
      // creating new User------------>

      const  newUser=new userModel({
        name:name,
        email:email,
        password:hashedpassword
      })

   // save user in database------->
     
   const user=await newUser.save()
   
   const token=createToken(user._id)
   res.json({success:true,token})


    }catch(error){
        console.log(error);

        res.json({success:false,message:"Error"})

    }


}






export {loginUser,registerUser}