# Football Simulator v0.4 (structural refactor)

This is the existing v0.3 match engine reorganised into standalone CSS and JavaScript files. All original player movement, football movement, action decisions, rendering and game UI implementation is preserved. **No new match mechanics have been introduced.**

## Hosting

Upload the contents of this package to the **development** branch, preserving the folder hierarchy. Keep `index.html` at repository root. To test this branch via GitHub Pages without changing the live `main` deployment, use a local static server or preview branch. Do not switch your live GitHub Pages deployment to development unless intentionally testing it publicly.

## Script structure

The JavaScript uses normal ordered `<script>` tags rather than ES modules. This deliberately preserves global lexical bindings and evaluation behaviour from the original one-file application.

- `js/player.js`: attributes, initial players, and shared state.
- `js/team.js`: team and formation assignment.
- `js/tactics.js`: positional targets.
- `js/match-engine.js`: simulation, passes, shots, substitutions state, and match time.
- `js/match-renderer.js`: unchanged visual smoothing and Canvas drawing. **Protected visual baseline.**
- `js/main.js`: UI event handlers, stats, tests, and bootstrapping.
- `css/style.css`: unchanged original styling.
- `data/players.json`: future placeholder. Player data remains embedded in `js/player.js` for exact baseline behaviour.

## Checks

Run `node tests/check.mjs` to check syntax and that the extracted JavaScript content matches v0.3. Also test in a browser before merging; syntax checks alone do not verify rendering.
