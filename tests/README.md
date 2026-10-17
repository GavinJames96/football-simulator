# v0.4 baseline checks

1. Open `index.html` using GitHub Pages (or a local HTTP server).
2. Confirm 22 on-field players, a distinct football icon, and smooth off-ball motion.
3. Test play/pause, step, reset, and 2×/5× playback.
4. Select each formation; verify 11 players per team and no exceptions.
5. Edit attributes, substitute players, and run the batch tests.
6. Compare match outcomes at the same seed against v0.3.0 before merging.

### Automatic checks

Run `node tests/check.mjs` from the repository root. This performs syntax checks and verifies that the original source function bodies are unchanged via SHA-256 of the canonical source lines, not a functional browser test.

For future changes, keep `js/match-renderer.js` unchanged unless explicitly authorising a visual change.
