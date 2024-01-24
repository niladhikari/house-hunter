import useAllSales from "../../Hooks/useAllHouse";

const Houses = () => {
    const [allHouses] = useAllSales();
    console.log(allHouses);
    return (
        <div className="mt-10 mb-5 grid lg:grid-cols-3">
           
            {
                allHouses.map(house => <div key={house._id} className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img src={house.image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">House Name : {house.name}</h2>
                  <p>House Rent:${house.rent}</p>
                </div>
              </div>)
            }
        </div>
    );
};

export default Houses;