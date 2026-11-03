import { createLink, type LinkComponent } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type CustomLinkProps = { underline?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren;

const activeProps = {
  className: "font-bold",
};

function CustomLink({ children, className, ...props }: CustomLinkProps) {
  return (
    <a
      {...props}
      className={`text-muted-foreground mx-1 italic ${className ?? "font-light"}
        ${props.underline ? "underline" : ""}`}
    >
      {children}
    </a>
  );
}

const MyTanstackLink = createLink(CustomLink);

const MyLink: LinkComponent<typeof CustomLink> = (props) => {
  return (
    <MyTanstackLink
      preload={"intent"}
      activeProps={{ ...activeProps, underline: true }}
      {...props}
    />
  );
};

export default MyLink;
