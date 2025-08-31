import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";

const menus = [
  { name: "검색", to: "/search" },
  { name: "도서관 리스트", to: "/libraries" },
];

export default function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="bg-background/50 fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-5 backdrop-blur md:px-10 lg:px-20">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold tracking-tighter">
          도서관⁺
        </Link>
        <Separator orientation="vertical" className="mx-4 h-6" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                  {menu.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">chan</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="mr-2 size-4" />
                    프로파일
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="mr-2 size-4" />
                    설정
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="mr-2 size-4" />
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-1 md:gap-2 lg:gap-3">
          <Button asChild variant="outline">
            <Link to="/auth/login">로그인</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">회원가입</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
