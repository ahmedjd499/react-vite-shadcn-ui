import { Input } from "@/components/ui/input";
import { useState } from "react";
import PropTypes from "prop-types";

export default function PasswordInput({ field }) {
  const [show, setShow] = useState("password");

  const toggleShow = () => {
    setShow((prevShow) => (prevShow === "text" ? "password" : "text"));
  };

  return (
    <div className=" relative">
      <Input
        className="pr-10"
        id="password"
        placeholder="Enter password..."
        type={show}
        {...field}
      />
      <span
        className="absolute top-1/2 right-2 -translate-y-1/2 pointer"
        size="icon"
        onClick={toggleShow}
      >
        <EyeIcon className="h-5 w-5 cursor-pointer" />
        <span className="sr-only">Toggle password visibility</span>
      </span>
    </div>
  );
}

PasswordInput.propTypes = {
  field: PropTypes.object.isRequired,
};

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
