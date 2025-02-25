import React from "react";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";


const Layout = ({children} : {children: React.ReactNode }) => {
    return (
        <div>
          <NavBar />
          <div>{children}</div>
          <Footer />
        </div>
      );
    };
    

export default Layout