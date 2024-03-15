import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

type Page = {
  path: string;
  element: React.ReactElement;
};

const Pages: Page[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
];

export default Pages;
