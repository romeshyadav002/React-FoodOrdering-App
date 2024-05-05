import React from 'react';
import { ReactDOM, createRoot } from 'react-dom/client';

// JSX (transpiled before it reaches the JS)- PARCEL - BABEL
// JSX => babel transpiles to React.createElement => ReactElement -JS object => HTMLElement(render)
const title = (
  <h1 id="heading" className="head">
    Namaste React using JSX 🚀
  </h1>
);

const Footer = () => (
  <h1 id="heading" className="head">
    Namaste React using JSX 🚀
  </h1>
);

// React Functional Component
//component composition -> one component in another component
const HeadingComponent = () => {
  return (
    <div id="container">
      {title}
      <h1 id="heading" className="head">
        Namaste React Functional Component 🚀
      </h1>
      {/* // three ways of calling the another component */}
      {Footer()}
      <Footer />
      <Footer></Footer>
    </div>
  );
};

//Rendering react
const root = createRoot(document.getElementById('root'));

/*
render() => renders a JS object(heading) and 
creates the tag which browser understands puts it up in the DOM.
*/
// root.render(heading);
root.render(<HeadingComponent />);
