import Link from "next/link";
import { ReactNode } from "react";

type OutlineLinkProps = {
  children: ReactNode;
  href: string;
};
const OutlineLink = ({ children, href, ...props }: OutlineLinkProps) => {
  return (
    <Link
      href={href}
      {...props}
      className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </Link>
  );
};

export default OutlineLink;
