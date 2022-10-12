export const cartTotal = (cartArr) =>{
   let count = 0;  
    cartArr.forEach(element => {
        count = count + element.totalPrice 
    });

    return count
}