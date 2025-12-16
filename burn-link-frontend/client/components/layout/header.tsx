import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="bg-secondary fixed top-0 z-40 flex w-full items-center justify-between px-[22px] py-6">
      <Link className="text-2xl text-black" to="/">
        <h4>Bearicorn Burn Link</h4>
      </Link>
      {/* <nav className="flex items-center gap-x-11">
      </nav> */}
    </header>
  );
};
