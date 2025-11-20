---
aside: true
---

# promise

<Badge type="info" class="size">
    <span>Minified</span>
    <span>4.00 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>1.39 KB</span>
</Badge>

**Functional utilities for promises.**

## Installation

::: code-group

```sh [npm]
npm install @monstermann/promise
```

```sh [pnpm]
pnpm add @monstermann/promise
```

```sh [yarn]
yarn add @monstermann/promise
```

```sh [bun]
bun add @monstermann/promise
```

:::

## Tree-shaking

### Installation

::: code-group

```sh [npm]
npm install -D @monstermann/unplugin-promise
```

```sh [pnpm]
pnpm -D add @monstermann/unplugin-promise
```

```sh [yarn]
yarn -D add @monstermann/unplugin-promise
```

```sh [bun]
bun -D add @monstermann/unplugin-promise
```

:::

### Usage

::: code-group

```ts [Vite]
// vite.config.ts
import promise from "@monstermann/unplugin-promise/vite";

export default defineConfig({
    plugins: [promise()],
});
```

```ts [Rollup]
// rollup.config.js
import promise from "@monstermann/unplugin-promise/rollup";

export default {
    plugins: [promise()],
};
```

```ts [Rolldown]
// rolldown.config.js
import promise from "@monstermann/unplugin-promise/rolldown";

export default {
    plugins: [promise()],
};
```

```ts [Webpack]
// webpack.config.js
const promise = require("@monstermann/unplugin-promise/webpack");

module.exports = {
    plugins: [promise()],
};
```

```ts [Rspack]
// rspack.config.js
const promise = require("@monstermann/unplugin-promise/rspack");

module.exports = {
    plugins: [promise()],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import promise from "@monstermann/unplugin-promise/esbuild";

build({
    plugins: [promise()],
});
```

:::
