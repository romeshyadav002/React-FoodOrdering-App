import { useState, useEffect } from 'react';
import { SWIGGY_MENU_API_URL } from '../utils/constant';

//This custom hook is responsible for fetching restaurant info which is a single responsible.
const useRestaurantMenu = (resId) => {
  //calls only once after the initial component render
  const [restaurant, setRestaurant] = useState(null); //holds a restaurant details

  //calls only once after the initial component render
  useEffect(() => {
    getRestaurantInfo();
  }, []);

  //get restaurant details
  const getRestaurantInfo = async () => {
    const restaurantData = await fetch(SWIGGY_MENU_API_URL + resId); //fetching menu data
    const jsonResData = await restaurantData.json(); //converting fetched data to json

    //set restaurant
    setRestaurant(jsonResData.data);
  };

  return restaurant;
}; //useRestaurantMenu

export default useRestaurantMenu;
