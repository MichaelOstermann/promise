import { defineConfig } from "@monstermann/barrels"
import { flat } from "@monstermann/barrels-flat"
import { namespace } from "@monstermann/barrels-namespace"

export default defineConfig([
    namespace({
        entries: "./packages/promise/src/Promise",
    }),
    flat({
        entries: "./packages/promise/src",
        include: ["*", "Promise/index.js"],
    }),
])
