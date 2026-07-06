# SDG Card Detail Design

## Goal

Add a student-friendly SDG reveal inside each project detail modal. The feature should feel like a classroom prompt: students click a button to ask which Sustainable Development Goal categories the project supports, then see a short suggested answer.

## User Experience

- Add one button in the opened card detail modal: `这个项目属于哪个 SDG？` in Chinese and `Which SDGs does this project support?` in English.
- The answer is hidden until clicked.
- After clicking, show one to three SDG badges with the SDG number, bilingual-aware goal name, and a brief reason.
- The panel should frame the result as a suggested discussion starting point, not as an official certification.
- The reveal state resets naturally when a different card modal is opened.

## Data And Logic

- Do not add SDG columns to `cards.csv` in this change.
- Add a small `src/lib/sdg.ts` classifier that maps existing card fields to SDG matches using keyword rules.
- The classifier must handle both Chinese and English card text because the website has a language toggle.
- Keep the SDG goal list, colors, and keyword rules in one module so future manual overrides can be added there if needed.
- Return the strongest one to three matches. If no rule matches, return SDG 9 as a conservative innovation fallback with a low-confidence explanation.

## UI Placement

- Place the SDG reveal between the modal hero/source links and the main project visual.
- Use existing modal spacing, dark surface styling, square 4-8px corners, and compact badges so the panel does not overpower the card content.
- On mobile, the panel should stack cleanly and avoid text overflow.

## Testing

- Add unit tests for the classifier with representative education, water/agriculture, accessibility, conflict, and ocean cases.
- Extend language label tests so both Chinese and English SDG reveal labels are covered.
- Run the targeted tests first, then full test, lint, and build verification before reporting completion.
