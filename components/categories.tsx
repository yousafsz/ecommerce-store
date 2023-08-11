import Link from "next/link";
import { cn } from "@/lib/utils";

import * as React from "react";

// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

const categories = ({routes, title}: any) => {
  return (
    <NavigationMenu className="-m-2 xs:m-0">
      <NavigationMenuList className="m-0">
        <NavigationMenuItem className="m-0">
          <NavigationMenuTrigger className="text-sm lg:text-lg font-semibold">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid sm:gap-3 sm:p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] m-0">
              {routes.map((route: any) => (
                <ListItem href="/docs" key={route.href} title="">
                  <Link
                    href={route.href}
                    className={cn(
                      "text-sm m-0 transition-colors hover:text-neutral-700",
                      route.active ? "text-neutral-500" : "text-black"
                    )}
                  >
                    {route.label}
                  </Link>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/*  <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {components.map((component) => (
            <ListItem
              key={component.title}
              title={component.title}
              href={component.href}
            >
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href="/docs" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Documentation
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default categories;
