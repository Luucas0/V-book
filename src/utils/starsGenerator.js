import { Icon } from "@chakra-ui/icons";
import { BsStarFill } from "react-icons/bs";

export const starGenerator = (bookRating) =>{
    let arrayRating = [];
    for (let i = 1; i <= 5; i++) {
      arrayRating.push(
        <Icon
          key={i}
          as={BsStarFill}
          color={i <= bookRating ? "gold" : "blackAlpha.400"}
          h={4}
          w={4}
          alignSelf={"center"}
          mr="5px"
        />
      );
    }
  
return arrayRating
}