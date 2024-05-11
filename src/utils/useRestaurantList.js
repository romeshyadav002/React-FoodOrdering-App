import { useState, useEffect } from 'react';
import { SWIGGY_API_URL } from '../utils/constant';

//This custom hook is responsible for fetching restaurants list which is a single responsible.
const useRestaurantList = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]); //All Restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); //Filtered Restaurants

  //useEffect(2 params) - callback function, dependencies
  useEffect(() => {
    getRestaurants();
  }, []);

  //get restaurants list
  const getRestaurants = async () => {
    //making swiggy api call
    const data = await fetch(SWIGGY_API_URL);
    const json = await data.json();
    console.log(json?.data?.cards[4]?.card?.card.gridElements);
    console.log(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setFilteredRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
  }; //getRestaurants

  return listOfRestaurants;
};

export default useRestaurantList;
