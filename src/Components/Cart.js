import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem, clearCart } from '../utils/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CDN_URL } from '../utils/constant';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  return (
    <section className="md:flex md:justify-center  w-4/5 mx-auto md:my-5 fmd:flex-wrap gap-5">
      <div className="md:w-1/2 w-full">
        {cartItems.length < 1 ? null : (
          <div className="flex justify-between py-2 my-2 text-lg items-center ">
            <p className="">Your Cart</p> <hr className="" />
            <button
              disabled={cartItems.length > 0 ? false : true}
              className="text-normal bg-red-500 text-white px-2 py-1"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
          </div>
        )}
        <hr className="my-2 border-gray-200 border-2" />
        {cartItems.map((item) => {
          const itemPrice = item.card.info.price
            ? item.card.info.price / 100
            : item.card.info.defaultPrice / 100;
          return (
            <div
              data-testid="cartItems"
              key={item?.card.info.id}
              className="flex flex-wrap gap-5  my-2 items-center shadow-lg rounded-lg p-2"
            >
              <img
                className="md:w-1/3 h-full"
                src={CDN_URL + item.card.info.imageId}
              />
              <div className="md:w-1/3 text-md ">
                <p className="font-bold">{item?.name}</p>

                <p className="">Rs. {itemPrice}</p>
                <p className="my-2 font-bold text-lg">
                  Total price: {(item.itemCount * itemPrice).toFixed(2)}
                </p>
              </div>
              <div>
                <button
                  className="bg-gray-900 text-white px-2"
                  onClick={() => dispatch(decrementItem(item))}
                >
                  -
                </button>
                <span className="mx-2">{item.itemCount}</span>
                <button
                  className="bg-gray-900 text-white px-2"
                  onClick={() => dispatch(incrementItem(item))}
                >
                  +
                </button>
                <p className="my-2 font-bold"></p>
              </div>
            </div>
          );
        })}
      </div>
      {cartItems.length == 0 ? null : (
        <div className="flex flex-col justify-center items-center md:w-1/3 w-full pl-2 md:border-l-2 md:border-gray-200 ">
          <p className="my-2 py-2 text-xl font-bold">
            Total price: Rs.{' '}
            {cartItems.length &&
              cartItems
                .map((item) => {
                  const itemPrice = item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100;
                  return item.itemCount * itemPrice;
                })
                .reduce((acc, curr) => acc + curr, 0)
                .toFixed(2)}
          </p>
          <button className="px-2 py-1 bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:border-2 hover:border-gray-900">
            Checkout&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
