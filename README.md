# filmcounter

Movie ticket booking app built with Next.js (App Router).

```bash
npm install
npm run dev   # http://localhost:3000
```

## Styling

The UI is styled with **Tailwind CSS v4**. A few interactive components (Button, Input, Dialog) are built on **antd** for behaviour such as focus trapping, loading states and keyboard handling, and are restyled with Tailwind.

### Where things live

| What                                              | Where                                                                      |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| Design tokens (colors, font, shadows, animations) | `@theme` block in [`src/app/globals.css`](src/app/globals.css)             |
| antd token overrides                              | [`src/lib/antd-theme.ts`](src/lib/antd-theme.ts)                           |
| Reusable UI primitives                            | [`src/components/ui/`](src/components/ui/) (import from `@/components/ui`) |
| Class-name helper                                 | `cn()` in [`src/lib/cn.ts`](src/lib/cn.ts)                                 |

### Conventions

- **Style with utility classes in the component.** Avoid new CSS files and `style={{}}`. Inline styles are only for runtime values Tailwind can't know ahead of time, such as a movie's poster color from data.
- **Use tokens, not raw colors.** Write `bg-paper`, `text-ink`, `border-divider`, `text-accent`, `bg-night/60` instead of hex or `rgba()` values. Add a new color to `@theme` before using it.
- **Combine classes with `cn()`.** It merges conflicting Tailwind classes, so a `className` prop passed to a component overrides its defaults:
  ```tsx
  <div className={cn("px-4 text-ink", isActive && "text-accent", className)} />
  ```
- **Promote repeated patterns to `components/ui`.** When the same set of classes appears in a few places, make a small component. Keep variant maps in a plain object, as in [`button-styles.ts`](src/components/ui/button-styles.ts).
- **Wrap antd components, don't use them directly in pages.** Wrappers in `components/ui` keep the antd API and its styling in one place.
- **Keep the two token sources in sync.** If you change a color in `globals.css`, update `antd-theme.ts` too. antd needs literal values to generate its hover and active shades.

### Why utilities win over antd

`globals.css` declares the cascade layer order `theme, base, antd, components, utilities`, and `AntdRegistry layer` puts antd's CSS-in-JS into the `antd` layer. Tailwind utilities therefore always override antd defaults without `!important`.

### Formatting

Code is formatted with Prettier. [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sorts Tailwind classes, including inside `cn()` and `clsx()` calls.

```bash
npm run format        # format everything
npm run format:check  # check only (CI)
```

Enable "format on save" in your editor with Prettier as the default formatter.
