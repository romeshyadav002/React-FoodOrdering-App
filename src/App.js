import React, { lazy, Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Components/Header';
import Body from './Components/Body';
import About from './Components/About';
import Error from './Components/Error';
import ContactUs from './Components/Contacts';
import RestaurantMenu from './Components/RestaurantMenu';
import Loading from './Components/Loading';
import UserContext from './utils/UserContext';
import Cart from './Components/Cart';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
//on demand lazy loading while clicking on Grocery for making it as a small bundler, check it in dist folder
const Grocery = lazy(() => import('./Components/Grocery'));

/*
    1. Header
        - Logo
        - Nav Items
    2. Body
        - Search
        - Restaurant Card
    3. Footer
        - Copyright
        - Links
        - Address
        - Contact
*/
const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    //make an api call and send username & password
    const data = {
      name: 'Romesh Yadav',
    };

    setUserName(data.name);
  }, []);

  return (
    <div>
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Header />
          <Outlet />
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

//Router Configuration
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<Loading />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: '/contacts',
        element: <ContactUs />,
      },
      {
        path: '/restaurant/:resId', //: - used for dynamic routing (resId is a param which differentiates the restaurants)
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />, //shows error page
  },
]);
const root = createRoot(document.getElementById('root'));

//Providing router configuration(appRouter) to the AppLayout
root.render(<RouterProvider router={appRouter} />);
