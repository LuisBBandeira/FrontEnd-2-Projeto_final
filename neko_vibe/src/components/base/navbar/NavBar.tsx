import SearchBar from "./SearchBar"

const NavBar = () =>{
    return(

        <header className="bg-white w-full h-20 shadow-md">
            <nav className="grid grid-cols-3 gap-x-12 items-center justify-items-center w-full px-6 h-full">

                <div className="flex text-left text-black">
                    <a href="#" className="hover:text-cyan-600 transition-colors">Home</a>
                </div>

       
                <div className="w-full justify-items-center mx-auto ">
                    <SearchBar />
                </div>

            
                <div className=" flex w-fit text-right">
                    <button className="text-white bg-cyan-600 px-6 py-2 rounded-md hover:bg-cyan-700 transition-colors">
                        Sign in
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default NavBar