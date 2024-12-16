import { NavLink, Outlet } from "@remix-run/react";
import { ExamplesNav } from "~/components/examples/examples-nav";
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/components/PageHeader";
import { Button } from "~/components/ui/button";

export default function Page() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Build your component library</PageHeaderHeading>
                <PageHeaderDescription>
                    Beautifully designed components that you can copy and paste into your
                    apps. Made with Tailwind CSS. Open source.
                </PageHeaderDescription>
                <PageActions>
                    <Button asChild size="sm">
                        <NavLink to="/docs">Get Started</NavLink>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                        <NavLink to="/blocks">Browse Blocks</NavLink>
                    </Button>
                </PageActions>
            </PageHeader>
            <div className="border-grid border-b">
                <div className="container py-4">
                    <ExamplesNav />
                </div>
            </div>
            <div className="py-8">
                <Outlet />
            </div>
        </>
    );
}