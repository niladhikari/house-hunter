



import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Compoents/SectionTitle/SectionTitle";
import useHouse from "../../../Hooks/useHouse";
import useAxiosOpen from "../../../Hooks/useAxiosOpen";

const ManageHouse = () => {
  const [house, , refetch] = useHouse();
  const axios = useAxiosOpen();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`/houses/${item._id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          // refetch to update the ui
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="">
      <SectionTitle
        subHeading={"Hurry Up"}
        heading={"MANAGE ALL ITEMS"}
      ></SectionTitle>
      <div className="bg-white p-12">
        <div>
          <h2 className="text-3xl font-semibold">
            Total Items : {house.length}
          </h2>
        </div>
        <div className="overflow-x-auto mt-4 rounded-xl ">
          <table className="table bg-yellow-100">
            {/* head */}
            <thead>
              <tr className="bg-orange-300 m-10">
                <th></th>
                <th>HOUSE IMAGE</th>
                <th>HOUSE NAME</th>
                <th>CITY</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {house.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.city}</td>
                  <td>
                    <Link to={`/dashboard/update/${item._id}`}>
                      <button
                        // onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost  bg-orange-300"
                      >
                        <FaRegEdit className="text-white text-2xl" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost  bg-red-600"
                    >
                      <RiDeleteBin5Line className="text-white text-2xl"></RiDeleteBin5Line>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageHouse;

 
