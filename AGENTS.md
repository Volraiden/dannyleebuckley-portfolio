## Learned User Preferences
- Prefers direct implementation over planning-heavy responses and expects immediate UI/code changes.
- Cares strongly about mobile polish and asks for professional, clean mobile UX parity with desktop.
- For the trusted logos section, wants all logos visible and expects both automatic scrolling and manual finger scrolling on mobile.
- Frequently requests exact asset swaps from provided image links/files and expects those specific logos/images to be used.

## Learned Workspace Facts
- Trusted/brand logo behavior is implemented primarily in `src/App.tsx` with related styling in `src/index.css`.
- The project builds with `npm run build` (`tsc -b && vite build`) and Netlify production builds use that same command.
- `fetchPriority` on the hero `<video>` in `src/App.tsx` caused TypeScript build failures in this workspace setup.
