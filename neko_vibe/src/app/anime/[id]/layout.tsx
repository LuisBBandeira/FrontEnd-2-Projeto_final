import React from "react";
import NavBar from "../../../components/base/navbar/NavBar";
import Footer from "../../../components/base/footer/Footer";

const Layout = ({children} : {children: React.ReactNode }) => {
    return (
        <div>
          <NavBar />
            <div className="bg-white">
              {children}
            </div>
          <Footer />
        </div>
      );
    };
    

export default Layout