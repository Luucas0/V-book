export const isInFavorites = (userFavourites, bookId) => {

    let arr = userFavourites || []
    
    return !!(arr.find(m=>m.bookId === bookId)) 
      
      
  }
  
  