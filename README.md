
## Resume template cloner web tool

This repository now includes a small static web app that lets you:

1. Paste **Resume A** as the target template format.
2. Paste **Resume B** as the source content.
3. Auto-generate a new resume that keeps A's section order and style while filling content from matching headers in B.

Behavior:

- Matching is case-insensitive and punctuation-insensitive.
- Common header aliases are supported (e.g., `Work Experience` and `Experience`).
- If a section in A has no matching section in B, that section is removed completely (including empty space).

### Use offline on any laptop (no Python needed)

1. Share the single file `index.html`.
2. Double-click it (or right-click → Open with browser).
3. Paste Resume A and Resume B, then click **Clone B into A**.
4. Optionally click **Save This Tool as HTML** to export another copy of the same standalone tool.
