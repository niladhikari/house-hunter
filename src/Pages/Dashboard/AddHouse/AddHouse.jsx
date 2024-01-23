import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosOpen from "../../../Hooks/useAxiosOpen";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import SectionTitle from "../../../Compoents/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddHouse = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosOpen = useAxiosOpen();
  const axiosPrivate = useAxios();
  const {user} = useAuth();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosOpen.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      // now send the house data to the server with the image url
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
      const menuRes = await axiosPrivate.post("/houses", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the house.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle
        subHeading={"what's New ?"}
        heading={"ADD AN New House"}
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
                placeholder="Bathrooms"
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
              type="text" // Change the type to "text" since phone numbers may contain non-numeric characters
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

export default AddHouse;
