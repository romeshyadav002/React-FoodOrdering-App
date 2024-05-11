import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0); //for expanding accordian
  const { resId } = useParams(); //call useParam to get value of restaurant Id(resId) using object destructuring.

  //fetching restaurant info from custom hook (useRestaurantMenu)
  const resMenu = useRestaurantMenu(resId);

  if (resMenu === null) return <Shimmer />;
  console.log({ resMenu });
  //destructuring the restaurant's menu details
  const {
    name,
    cuisines,
    costForTwoMessage,
    locality,
    avgRating,
    totalRatingsString,
  } = resMenu?.cards[2]?.card?.card?.info;

  //order delivery details
  const { deliveryTime } = resMenu?.cards[2]?.card?.card?.info.sla;

  //menu
  const { itemCards } =
    resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;

  //filtering categories
  const categories =
    resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory',
    );

  console.log({ categories });

  return (
    <section className="w-9/12 mx-auto text-center">
      <div className="m-4 p-4 text-left flex flex-wrap justify-between">
        <div>
          <h1 className="font-bold my-4 text-4xl text-black">{name}</h1>
          <p className="text-lg text-slate-500">{cuisines.join(', ')} </p>
          <p className="text-lg text-slate-500">{locality}</p>
        </div>
        <div className="border-1 border-x-2 border-y-2 p-2 h-20 mt-8 rounded-lg">
          <h2 className="pt-1 text-lg text-green-700 font-bold border-dashed border-b-2">
            ⭐{avgRating}
          </h2>
          <h4 className="pt-1 text-xs text-slate-500">{totalRatingsString}</h4>
        </div>
      </div>
      <div className="border-dashed border-t-2 flex m-4 p-4">
        <h3 className="pt-1 text-lg text-slate-800 font-bold">
          🕗{deliveryTime} mins
        </h3>
        <p className="pt-1 pl-3 text-lg text-slate-800 font-bold">
          💵{costForTwoMessage}
        </p>
      </div>
      <section className="my-8">
        {/* Categories accordian */}
        {categories &&
          categories.map((category, index) => (
            /*
                    Controlled Component
                    --------------------
                    RestaurantCategory(Child component) is a controlled component, 
                    it will expand the accordian only when it's clicked, 
                    rest accordians are collapsed based upon RestaurantMenu which is a parent component.
                    */
            <RestaurantCategory
              key={category?.card?.card.title}
              data={category?.card.card}
              //expand the items only when we clicked, other accordians should be hided.
              showItems={index === showIndex ? true : false}
              /*
                        Lifting state up
                        -----------------
                        passing the function to set the index value in child component.
                        */
              setShowIndex={() => setShowIndex(index)}
            />
          ))}
      </section>
    </section>
  );
};

export default RestaurantMenu;
