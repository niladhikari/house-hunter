import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";

function App() {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp");

  return (
    <>
      <div>
        {noHeaderFooter || <Navbar></Navbar>}
        <div className=" min-h-[calc(100vh-225px)] max-w-7xl mx-auto">
          <Outlet></Outlet>
        </div>
        {noHeaderFooter || <Footer></Footer>}
      </div>
    </>
  );
}

export default App;
