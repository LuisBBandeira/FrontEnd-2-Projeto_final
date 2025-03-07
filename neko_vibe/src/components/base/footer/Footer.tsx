const Footer = () =>{
    return(

        <div>
            <footer>
                <div className=" grid bg-purple-900 justify-items-center h-44">
                    <div>a</div>
                    <div className="bg-black h-2 w-4/5 rounded"></div>
                    <div className="grid grid-rows-2 justify-items-center ">
                        <div className=" grid grid-cols-2 gap-4 justify-center h-fit">
                            <div>Discord</div>
                            <div>Linkdin</div>
                        </div>
                        <div className=" justify-items-center">
                            <h3>©2025 Nekovibe | Powered by Jikan API</h3>
                            <h3>Develop by <a className=" text-yellow-400 neon-yellow" href="https://github.com/LuisBBandeira" >LuisBBandeira</a></h3>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer