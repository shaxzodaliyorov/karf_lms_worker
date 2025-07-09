import { Button } from "@/common";
import { MenuDropdown } from "@/common/menu-drop-down";
import { HEADER_LINKS } from "@/constants";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-[70px] fixed top-0 left-0 bg-white z-[100] border-b">
      <div className="container flex items-center justify-between h-full ">
        <div className="flex items-center">
          <img src="/images/header_1.png" className="w-[34.87px] h-[34.87px]" />
          <img src="/images/header_2.png" className="w-[78.46px] h-[25.67px]" />
          <img
            src="/images/header_3.png"
            className="w-[56.666664123535156] h-[23.25px]"
          />
        </div>
        <div className="flex gap-x-4">
          {HEADER_LINKS.map((link) => (
            <Link
              to={link.href}
              className="text-base text-gray-800 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-x-4">
          <MenuDropdown
            align="center"
            trigger={
              <Button size="sm" variant="outline">
                <ChevronDown size={16} className="mr-2" /> ENG
              </Button>
            }
            options={[
              {
                label: "ENG",
              },
              {
                label: "KO",
              },
              {
                label: "UZ",
              },
            ]}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/auth/sign-in")}
          >
            Sign In
          </Button>
          <Button size="sm" onClick={() => navigate("/auth/select-role")}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};
