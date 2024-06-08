import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});

  const url='http://localhost:4014'

  const [token,setToken]=useState("")

  const [food_list,setFood_list]=useState([])


  const addToCart =async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }

  };



  const removeFromCart =async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
   if(token){
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
   }

  };
// calculate total cart Amount (total biil)------>
  const cartTotal = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

   const fetchFoodList=async ()=>{
       const response=await axios.get(url+"/api/food/list")
       setFood_list(response.data.data)
   }

// for retrieving data of cart after refresh the web page--->

   const loadCartData= async (token)=>{
    const response=await  axios.post(url+"/api/cart/get",{},{headers:{token}})

    setCartItem(response.data.cartData);

   }


// for fixing error of  reload we store our data (from localstorage) in the token state.
    
useEffect(()=>{

   async function loadData(){
    await  fetchFoodList()
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      
      await loadCartData(localStorage.getItem("token"))
  
    }
   }

   loadData();

},[])

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    cartTotal,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
