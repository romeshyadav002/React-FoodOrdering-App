import RestaurantCard from './RestaurantCard';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import useRestaurantList from '../utils/useRestaurantList';

//2. Body Component
const Body = () => {
  //Local state variable = Super powerful variable
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); //Filtered Restaurants
  const [searchRestaurant, setSearchRestaurant] = useState(''); //Search Restaurants
  const onlineStatus = useOnlineStatus(); //fetching online status through custom hook.
  const listOfRestaurants = useRestaurantList(); //fetching restaurants list through custom hook.

  //check if there's internet or not & show message.
  if (onlineStatus === false)
    return <h1>Looks your offline. Check your internet connection.</h1>;

  if (listOfRestaurants.length === 0) return <Shimmer />;

  return (
    <>
      <section className="">
        <input
          className="border-2 border-slate-400 m-4 p-1"
          type="text"
          value={searchRestaurant}
          onChange={(e) => {
            setSearchRestaurant(e.target.value);
            const filteredRes = listOfRestaurants.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(searchRestaurant.toLowerCase());
            });
            setFilteredRestaurants(filteredRes);
          }}
        />
        <button
          className="bg-sky-800 text-slate-200 p-2 rounded hover:bg-sky-950"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (restaurants) => restaurants.info.avgRating > 4,
            );
            setFilteredRestaurants(filteredList); //updating the state
          }}
        >
          Top Rated Restaurants
        </button>
      </section>
      <section className="flex flex-wrap">
        {searchRestaurant.length > 0
          ? //showing only filtered restaurants
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            ))
          : //showing all the restaurants
            listOfRestaurants.map((restaurant) => (
              <Link
                to={'/restaurant/' + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard key={restaurant.info.id} resData={restaurant} />
              </Link>
            ))}
      </section>
    </>
  );
};

export default Body;
