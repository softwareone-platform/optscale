# qrcode-generator (vendored)

`qrcode.mjs` is `dist/qrcode.mjs` from [`qrcode-generator`](https://www.npmjs.com/package/qrcode-generator)
**2.0.4** by Kazuhiko Arase, MIT (see `LICENSE`), copied byte for byte. Do not edit it.

| Check                   | Value                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| npm tarball `integrity` | `sha512-mZSiP6RnbHl4xL2Ap5HfkjLnmxfKcPWpWe/c+5XxCuetEenqmNFf1FH/ftXPCtFG5/TDobjsjz6sSNL0Sr8Z9g==` |
| `qrcode.mjs` SHA-256    | `ea91d7118a5395289170da848b7c6758b996163bfbccf312591ab65a4911b7c0`                                |

**Why vendored:** `pnpm add` is blocked by `trustPolicy: no-downgrade` in `ngui/pnpm-workspace.yaml`, which
fails on an unrelated transitive dependency (`chokidar@4.0.3`, via `sass`). Once that is resolved, replace this
folder with the npm package and drop the ESLint ignore for `src/vendor/`.

`qrcode.d.ts` types only what the app uses. The app renders the matrix itself (`isDark`), so none of the
library's HTML-string output (`createSvgTag`, `createImgTag`, …) reaches the DOM.

To update: `npm pack qrcode-generator@<version>` into an empty folder, compare its `integrity` with
`npm view qrcode-generator@<version> dist.integrity`, copy `package/dist/qrcode.mjs` over this one and update
both checksums above.
