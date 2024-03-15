import React, { ChangeEvent, FormEvent, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Input from "../constants/Input";
import { Details } from "../utils/types";

const Login = () => {
  const [details, setDetails] = useState<Partial<Details>>({
    email: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const mobileScreen = useMediaQuery({
    query: "(max-width: 850px)",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enqueueSnackbar("login successfull", {
      variant: "success",
    });
  };

  return (
    <div className="flex h-screen max-h-screen flex-row-reverse items-center justify-center bg-[#242424] p-4 text-white">
      <div className="flex grow items-center justify-center">
        <div className="w-full max-w-[388px] space-y-4">
          {mobileScreen && (
            <div className="h-[180px] w-full">
              <img
                src="https://res.cloudinary.com/megamart/image/upload/f_auto,q_auto/v1/worldref/lztlc4pnvbuanpauarga"
                alt="login-art"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          )}
          <h1 className="text-2xl font-semibold">Welcome Back 👋</h1>
          <div>
            <p className="text-sm text-gray-400">
              Today is a new day. It's your day. You shape it.
            </p>
            <p className="text-sm text-gray-400">Sign in to start shopping.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
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
                placeholder: "At least 6 characters",
                required: true,
                onChange: handleChange,
                value: details.password,
              }}
            />
            <p className="cursor-pointer text-right text-xs text-blue-600">
              Forgot Password?
            </p>
            <button
              type="submit"
              className="h-[52px] w-full rounded-lg bg-black text-center text-white"
            >
              Sign in
            </button>
            <p className="text-center text-xs">
              not a user?
              <Link className="text-blue-600" to="/register">
                {" "}
                sign up
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

export default Login;
