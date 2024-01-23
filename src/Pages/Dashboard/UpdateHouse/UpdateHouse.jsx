import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosOpen from "../../../Hooks/useAxiosOpen";
import SectionTitle from "../../../Compoents/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateHouse = () => {
  const { name, address,city, date, roomSize,bedrooms,bathrooms,rent,number,description,_id } = useLoaderData();
  console.log(name);
  
  const {user} = useAuth();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosOpen();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        email:user.email,
        name: data.name,
        address: data.address,
        city: data.city,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        roomSize: data.roomSize,
        date: data.date,
        rent: data.rent,
        number: data.number,
        description: data.description,
        image: res.data.data.display_url,
      };
      //
      const menuRes = await axiosPublic.put(`/houses/${_id}`, menuItem);

      if (menuRes.data.modifiedCount > 0) {
        // show success popup
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the house.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
}
  return (
    <div>
      <SectionTitle
        subHeading={"what's New ?"}
        heading={"Update The House"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">House Name*</span>
              </label>
              <input
                type="text"
                defaultValue={name}
                placeholder="House Name"
                {...register("name", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">House address*</span>
              </label>
              <input
                type="text"
                defaultValue={address}
                placeholder="House address"
                {...register("address", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/* city */}
            {/* name, address, city, bedrooms, bathrooms, room size, picture, availability date, rent per month, phone number, and description */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">City*</span>
              </label>
              <input
                type="text"
                defaultValue={city}
                placeholder="City"
                {...register("city", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* bedrooms */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Bedrooms*</span>
              </label>
              <input
                type="text"
                defaultValue={bedrooms}
                placeholder="Bedrooms"
                {...register("bedrooms", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/* bathrooms */}
            {/* availability date, rent per month, phone number, and description */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Bathrooms*</span>
              </label>
              <input
                type="text"
                defaultValue={bathrooms}
                placeholder="Bathrooms"
                {...register("bathrooms", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* room size */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Room Size*</span>
              </label>
              <input
                type="text"
                defaultValue={roomSize}
                placeholder="Room size"
                {...register("roomSize", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-6">
            {/*  availability date */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text"> Availability Date*</span>
              </label>
              <input
                type="date"
                defaultValue={date}
                placeholder="Date"
                {...register("date", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* rent per month */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Rent per month*</span>
              </label>
              <input
                type="text"
                defaultValue={rent}
                placeholder="Rent per month"
                {...register("rent", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Phone number*</span>
            </label>
            <input
              type="text" 
              defaultValue={number}
              placeholder="Phone number"
              {...register("number", {
                required: true,
                pattern: {
                  value: /^(?:\+8801|8801|01)[13-9]\d{8}$/,
                  message: "Enter a valid Bangladeshi phone number",
                },
              })}
              className="input input-bordered w-full"
            />
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              defaultValue={description}
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-orange-700 text-white">
            Add Item <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHouse;
