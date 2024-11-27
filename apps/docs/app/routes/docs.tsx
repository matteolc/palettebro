import { Outlet } from "@remix-run/react";

export default function Component() {
  return (
    <div className="p-10 prose max-w-fit">
      <Outlet />
    </div>
  );
}
