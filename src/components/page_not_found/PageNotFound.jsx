import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

const  navigate = useNavigate()


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="flex text-neutral-400 flex-col justify-center  h-screen items-center ">
        <div className="text-9xl font-semibold">
          404
        </div>
        <h1 className="text-4xl font-semibold">Page not found!</h1>
        <p className="text-center">
          i tried to catch some fog, but i missed it
        </p>
        <button onClick={()=> navigate("/")} className="text-2xl font-semibold my-4 border rounded p-3  border-gray-200 hover:bg-gray-50 cursor-pointer ">GO TO HOME PAGE</button>
      </div>
    </div>
  );
};

export default PageNotFound;
