import Banner from "./Banner";
import Houses from "./Houses";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <h1 className="text-center text-3xl mt-10">Discover The Houses</h1>
            <Houses></Houses>
        </div>
    );
};

export default Home;