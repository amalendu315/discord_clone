import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Discord",
  description: "Authenticating Discord clone",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full flex items-center justify-center">{children}</div>;
}
