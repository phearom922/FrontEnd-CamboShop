import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TfiFaceSad } from "react-icons/tfi";

const NoProductNotFound = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center h-screen pb-20 text-neutral-400">
        <div className="relative">
          <HiOutlineShoppingBag size={200} />
          <div className="absolute left-20 top-26">
          <TfiFaceSad size={40}/>
          </div>
        </div> 
        <h1 className="text-4xl font-semibold">No Products Found!</h1>
        <p className="text-center">
          Your search did not match any products <br />
          Please tray again
        </p>
      </div>
    </div>
  );
};

export default NoProductNotFound;