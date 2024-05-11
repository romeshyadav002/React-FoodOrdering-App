import React, { lazy, Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Components/Header';
import Body from './Components/Body';
import About from './Components/About';
import Error from './Components/Error';
import Contacts from './Components/Contacts';
import RestaurantMenu from './Components/RestaurantMenu';
import Loading from './Components/Loading';
import UserContext from './utils/UserContext';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
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
        path: '/grocery',
        element: (
          <Suspense fallback={<Loading />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: '/contacts',
        element: <Contacts />,
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
