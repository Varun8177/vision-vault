import React, { ChangeEvent, FormEvent, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Input from "../constants/Input";

type Details = {
  email: string;
  password: string;
};

const Signup = () => {
  const [details, setDetails] = useState<Details>({ email: "", password: "" });
  const { enqueueSnackbar } = useSnackbar();
  const mobileScreen = useMediaQuery({
    query: "(max-width: 850px)",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(details);
    enqueueSnackbar({
      message: "signup successfull",
      variant: "success",
    });
  };

  return (
    <div className="flex h-screen max-h-screen flex-row-reverse items-center justify-center bg-[#242424] p-4 text-white">
      <div className="flex grow items-center justify-center">
        <div className="w-full max-w-[388px] space-y-4">
          {mobileScreen && (
            <div className={"h-[180px] w-full"}>
              <img
                src="https://res.cloudinary.com/megamart/image/upload/f_auto,q_auto/v1/worldref/lztlc4pnvbuanpauarga"
                alt="login-art"
                className={"h-full w-full rounded-lg object-cover"}
              />
            </div>
          )}
          <h1 className="text-2xl font-semibold text-white">
            Welcome to Vision Vault
          </h1>
          <div>
            <div>
              <p className="text-sm text-gray-400">
                Today is a new day. It's your day. You shape it.
              </p>
              <p className="text-sm text-gray-400">
                Sign up to start shopping.
              </p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Username"
              attributes={{
                id: "email",
                name: "email",
                type: "email",
                placeholder: "example123@example.com",
                required: true,
                onChange: handleChange,
                value: details.email,
                autoFocus: true,
              }}
            />
            <Input
              label="Password"
              attributes={{
                id: "password",
                name: "password",
                type: "password",
                placeholder: "At least 8 characters",
                required: true,
                onChange: handleChange,
                value: details.password,
              }}
            />
            <button
              type="submit"
              className="h-[52px] w-full rounded-lg bg-black text-center text-white hover:bg-black"
            >
              sign up
            </button>
            <p className="text-center text-xs">
              Already a user?
              <Link className="text-blue-600" to="/login">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* image section */}
      {!mobileScreen && (
        <div
          className={twMerge(
            "h-full w-1/2",
            mobileScreen && "h-[180px] w-[388px]",
          )}
        >
          <img
            src="https://res.cloudinary.com/megamart/image/upload/f_auto,q_auto/v1/worldref/lztlc4pnvbuanpauarga"
            alt="login-art"
            className={"h-full w-full rounded-lg object-cover"}
          />
        </div>
      )}
    </div>
  );
};

export default Signup;
