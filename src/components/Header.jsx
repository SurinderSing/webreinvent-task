import React from "react";
import Nav from "./Nav";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Logo />
      <Nav />
    </header>
  );
}
