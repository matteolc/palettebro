import React from "react";

export const BlockSection = {
    authentication: "authentication",
    sidebar: "sidebar"
}

export const BlocksMap = {
    "login-01": {
        section: BlockSection.authentication,
        name: "Login 01",
        description: "A simple login form.",
        component: React.lazy(() => import("~/components/blocks/login-01/page.tsx")),
    },
    "login-02": {
        section: BlockSection.authentication,
        name: "Login 02",
        description: "A two column login page with a cover image.",
        component: React.lazy(() => import("~/components/blocks/login-02/page.tsx")),
    },
    "login-03": {
        section: BlockSection.authentication,
        name: "Login 03",
        description: "A login page with a muted background color.",
        component: React.lazy(() => import("~/components/blocks/login-03/page.tsx")),
    },
    "login-04": {
        section: BlockSection.authentication,
        name: "Login 04",
        description: "A login page with form and image.",
        component: React.lazy(() => import("~/components/blocks/login-04/page.tsx")),
    },
    "login-05": {
        section: BlockSection.authentication,
        name: "Login 05",
        description: "A simple email-only login page.",
        component: React.lazy(() => import("~/components/blocks/login-05/page.tsx")),
    },
    "sidebar-01": {
        section: BlockSection.sidebar,
        name: "Sidebar 01",
        description: "A simple sidebar with navigation.",
        component: React.lazy(() => import("~/components/blocks/sidebar-01/page.tsx")),
    },
    "sidebar-02": {
        section: BlockSection.sidebar,
        name: "Sidebar 02",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-02/page.tsx")),
    },
    "sidebar-03": {
        section: BlockSection.sidebar,
        name: "Sidebar 03",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-03/page.tsx")),
    },
    "sidebar-04": {
        section: BlockSection.sidebar,
        name: "Sidebar 04",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-04/page.tsx")),
    },
    "sidebar-05": {
        section: BlockSection.sidebar,
        name: "Sidebar 05",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-05/page.tsx")),
    },
    "sidebar-06": {
        section: BlockSection.sidebar,
        name: "Sidebar 06",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-06/page.tsx")),
    },
    "sidebar-07": {
        section: BlockSection.sidebar,
        name: "Sidebar 07",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-07/page.tsx")),
    },
    "sidebar-08": {
        section: BlockSection.sidebar,
        name: "Sidebar 08",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-08/page.tsx")),
    },
    "sidebar-09": {
        section: BlockSection.sidebar,
        name: "Sidebar 09",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-09/page.tsx")),
    },
    "sidebar-10": {
        section: BlockSection.sidebar,
        name: "Sidebar 10",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-10/page.tsx")),
    },
    "sidebar-11": {
        section: BlockSection.sidebar,
        name: "Sidebar 11",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-11/page.tsx")),
    },
    "sidebar-12": {
        section: BlockSection.sidebar,
        name: "Sidebar 12",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-12/page.tsx")),
    },
    "sidebar-13": {
        section: BlockSection.sidebar,
        name: "Sidebar 13",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-13/page.tsx")),
    },
    "sidebar-14": {
        section: BlockSection.sidebar,
        name: "Sidebar 14",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-14/page.tsx")),
    },
    "sidebar-15": {
        section: BlockSection.sidebar,
        name: "Sidebar 15",
        description: "A sidebar with navigation and user profile.",
        component: React.lazy(() => import("~/components/blocks/sidebar-15/page.tsx")),
    },
}