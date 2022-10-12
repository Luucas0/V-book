import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Spacer,
  Image,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { BiBookBookmark } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { postLogoutUser } from "../state/user";
import { getGenres } from "../state/genres";

import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "@chakra-ui/react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const genres = useSelector((state) => state.genres);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGenres()).then();
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(postLogoutUser());
    navigate("/login");
  };

  const [isNotSmallerScreen] = useMediaQuery("(min-width: 700px)");

  return (
    <Box>
      <Flex
        pos="flex"
        top="1rem"
        right="1rem"
        align="center"
        justify="space-between"
        w="100%"
        px={"40px"}
      >
        <Link to="/">
          <Image
            boxSize="100px"
            objectFit="cover"
            src="https://media-exp1.licdn.com/dms/image/C560BAQGp306CSTk2yg/company-logo_200_200/0/1586255689376?e=2147483647&v=beta&t=uqldPM3J_8r8Vkg5xdZ0vsou-o3MCjNmgZjzC9nEpk4"
            alt="Vbook logo"
            minW={"fit-content"}
            mr="20px"
          />
        </Link>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            aria-label="categories"
            minW={"fit-content"}
            _hover={{ color: "#d43c8c" }}
          >
            Categories
          </MenuButton>
          <MenuList>
            {genres?.map((genre, i) => {
              return (
                <Link to={`/category/${genre.id} `} key={i}>
                  <MenuItem _hover={{ color: "#d43c8c" }}>
                    {genre.genreName}
                  </MenuItem>
                </Link>
              );
            })}
          </MenuList>
        </Menu>

        <Spacer />

        {isNotSmallerScreen ? (
          user.id ? (
            <>
              <Link to="/cart">
                <Button
                  variant="ghost"
                  aria-label="Cart"
                  minW={"fit-content"}
                  _hover={{ color: "#d43c8c" }}
                >
                  <FaShoppingCart />
                </Button>
              </Link>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                  aria-label="user"
                  minW={"fit-content"}
                  _hover={{ color: "#d43c8c" }}
                >
                  {user.userName}
                </MenuButton>
                <MenuList>
                  <Link to={`/favorites`}>
                    <MenuItem icon={<FaHeart />} _hover={{ color: "#d43c8c" }}>
                      Favorites
                    </MenuItem>
                  </Link>
                  <Link to={`/boughtItems`}>
                    <MenuItem
                      icon={<BiBookBookmark />}
                      _hover={{ color: "#d43c8c" }}
                    >
                      Purchase history
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link to={`/me`}>
                    <MenuItem
                      icon={<ExternalLinkIcon />}
                      _hover={{ color: "#d43c8c" }}
                    >
                      Your account
                    </MenuItem>
                  </Link>
                  {user.role === "admin" && (
                    <Link to={`/admin`}>
                      <MenuItem
                        icon={<ExternalLinkIcon />}
                        _hover={{ color: "#d43c8c" }}
                      >
                        Admin panel
                      </MenuItem>
                    </Link>
                  )}
                </MenuList>
              </Menu>

              <Button
                colorScheme="pink"
                rounded="md"
                variant="ghost"
                aria-label="Logout"
                minW={"fit-content"}
                onClick={handleClick}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                colorScheme="pink"
                rounded="md"
                variant="ghost"
                aria-label="Login"
                mx={1}
                my={5}
                w="100%"
              >
                Login
              </Button>
            </Link>
          )
        ) : user.id ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FiMenu />}
              variant="ghost"
              aria-label="user"
              minW={"fit-content"}
              _hover={{ color: "#d43c8c" }}
            >
              
            </MenuButton>
            <MenuList>
              <Link to={`/favorites`}>
                <MenuItem icon={<FaHeart />} _hover={{ color: "#d43c8c" }}>
                  Favorites
                </MenuItem>
              </Link>
              <Link to={`/cart`}>
                <MenuItem
                  icon={<FaShoppingCart />}
                  _hover={{ color: "#d43c8c" }}
                >
                  Cart
                </MenuItem>
              </Link>
              <Link to={`/boughtItems`}>
                <MenuItem
                  icon={<BiBookBookmark />}
                  _hover={{ color: "#d43c8c" }}
                >
                  Purchase history
                </MenuItem>
              </Link>
              <MenuDivider />
              <Link to={`/me`}>
                <MenuItem
                  icon={<ExternalLinkIcon />}
                  _hover={{ color: "#d43c8c" }}
                >
                  Your account
                </MenuItem>
              </Link>
              {user.role === "admin" && (
                <Link to={`/admin`}>
                  <MenuItem
                    icon={<ExternalLinkIcon />}
                    _hover={{ color: "#d43c8c" }}
                  >
                    Admin panel
                  </MenuItem>
                </Link>
              )}
              <MenuItem
                icon={<ExternalLinkIcon />}
                color="#d43c8c"
                aria-label="Logout"
                onClick={handleClick}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/login">
            <Button
              colorScheme="pink"
              rounded="md"
              variant="ghost"
              aria-label="Login"
              mx={1}
              my={5}
              w="100%"
            >
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
