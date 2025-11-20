import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/promise/",
    description: "Functional utilities for promises.",
    title: "promise",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            {
                base: "/Promise/",
                text: "Promise",
                items: [
                    { link: "create", text: "create" },
                    { link: "all", text: "all" },
                    { link: "allSettled", text: "allSettled" },
                    { link: "any", text: "any" },
                    { link: "debounce", text: "debounce" },
                    { link: "defer", text: "defer" },
                    { link: "is", text: "is" },
                    { link: "limit", text: "limit" },
                    { link: "orElse", text: "orElse" },
                    { link: "queue", text: "queue" },
                    { link: "reject", text: "reject" },
                    { link: "resolve", text: "resolve" },
                    { link: "then", text: "then" },
                    { link: "throttle", text: "throttle" },
                    { link: "wait", text: "wait" },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/promise" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
