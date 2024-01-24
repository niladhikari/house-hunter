import { Link, useNavigate } from "react-router-dom";
import img1 from "../../../src/assets/image/authentication2.png";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import SocialLogin from "../SocialLogin/SocialLogin";
import useHouseOwner from './../../Hooks/useHouseOwner';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosOpen();
  const [isHouseOwner] = useHouseOwner();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo : data.photoURL,
            role : data.role,
            number : data.number
          };
          axios.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log(" user add in the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              {
                isHouseOwner && ( navigate('/dashboard/ownerHome'))
              }
              {
                !isHouseOwner && ( navigate('/dashboard/houseRenter'))
              }
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <img src={img1} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role </span>
                </label>
                <select
                  {...register("role", { required: true })}
                  name="role"
                  className="select select-bordered"
                >
                  <option value="default" disabled selected>
                    Select Role
                  </option>
                  <option value="houseOwner">House Owner</option>
                  <option value="houseRenter">House Renter</option>
                </select>
                {errors.role && (
                  <span className="text-red-600">Role is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  {...register("number", { required: true })}
                  name="number"
                  placeholder="Number"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Number is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <div className="flex justify-center mb-2">
              <p>
                <small>
                  Already registered?{" "}
                  <Link to="/login">
                    <span className="text-blue-600 font-bold">
                      Go to log in{" "}
                    </span>
                  </Link>
                </small>
                Or sign Up with
              </p>
            </div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
