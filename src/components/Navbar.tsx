import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { DataContext } from "../contexts/DataContext";

type Props = {};

const Navbar = (props: Props) => {
  const dataContext = useContext(DataContext);
  return (
    <div className="flex w-full items-center justify-between border-b bg-[#161717] px-8 py-2 text-white">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/vision-vault-68501.appspot.com/o/vision-vault-logo.png?alt=media&token=88afd06b-9138-438d-b419-c5f856e167c9"
        alt="laptop-logo"
        className="h-14 w-fit cursor-pointer object-contain"
      />
      <div
        className="flex cursor-pointer items-center"
        onClick={async () => {
          await signOut(auth);
          dataContext?.emptyData();
        }}
      >
        <RiLogoutBoxLine size={25} />
        <p className={twMerge(`text-base first-letter:uppercase`)}>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
