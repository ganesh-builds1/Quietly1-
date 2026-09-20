# Breathe — Meditation App

A dependency-free, mobile-first implementation of the five-screen Breathe concept.

## Run

From `D:\website\breathe-app`:

```powershell
python -m http.server 8080
```

Then open <http://localhost:8080>.

You can also open `index.html` directly, though a local server is recommended.

## Screens and interactions

- **Breathe:** animated breathing orb; tap it to pause/resume; live phase and elapsed time; audio toggle; Session Complete link.
- **Sleep:** featured and list play/pause controls.
- **Session Complete:** Journal and Finish actions.
- **Journey:** reference calendar and tappable day states.
- **Journal / You:** mood slider, selectable/addable tags, editable reflection, and local save.

The bottom navigation links Breathe, Sleep, Journey, and You. The interface uses the reference's exact Fraunces/Inter Google Fonts, color tokens, wording, inline SVG icon paths, gradients, and core measurements. Desktop uses a responsive, bezel-free framed app surface.

## Files

- `index.html` — semantic app views and original SVG artwork
- `styles.css` — responsive visual system and animation
- `app.js` — navigation and interactions
