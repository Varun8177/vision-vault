import { ChangeEvent, FormEvent, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Input from "../constants/Input";
import { Details } from "../utils/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [details, setDetails] = useState<Details>({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const mobileScreen = useMediaQuery({
    query: "(max-width: 850px)",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password,
      );
      await updateProfile(res.user, { displayName: details.username });
      await setDoc(doc(db, "files", res.user.uid), { files: [] });
      enqueueSnackbar("signup successfull", {
        variant: "success",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          enqueueSnackbar("email already registered", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("something went wrong", {
            variant: "error",
          });
        }
      } else {
        enqueueSnackbar("something went wrong", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen max-h-screen grow flex-row-reverse items-center justify-center p-4">
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
          <h1 className="text-2xl font-semibold">Welcome to Vision Vault</h1>
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
              label="User Name"
              attributes={{
                id: "username",
                name: "username",
                type: "text",
                placeholder: "example123",
                required: true,
                onChange: handleChange,
                value: details.username,
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
            <button
              type="submit"
              className="flex h-[52px] w-full items-center justify-center rounded-lg bg-black text-center text-white hover:bg-black disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div role="status" className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                "sign up"
              )}
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
