# Take-Home Exercise — Project Plan

---

## Prompt Used to Generate This Plan

"Read and analyze the take-home exercise at /Users/tylerbyrne/Downloads/take-home-test-v02/take-home.md. After reading the file, identify ALL discrete steps required to complete the exercise. Then, for each step, produce a structured document using EXACTLY the template below. Apply this template to every step. DO NOT fill out any steps in the document. Simply create a template that can be followed as I complete each step. The steps should cover the full arc of the project from dataset selection through final deliverables, which include: a deployed live URL, a public GitHub repo, a 3-5 minute Loom video covering concept/angle, one design tradeoff, 2-3 actual AI prompts (wins and misses), and one improvement with more time, and a one-page README covering approach, what was cut, and how to run locally. For the Choose a Dataset step specifically, the Implementation Notes Options / Angles Considered field should have a sub-entry for each of the three datasets with potential angles listed. Output the full document for all steps before asking any follow-up questions."

---

## STEP 1: Choose a Dataset

### Section 1 — Plan
**Purpose:** Select the single dataset that offers the most compelling creative angle for the experience.

**High-Level Tasks:**
- [x] Read all three datasets in full
- [x] Brainstorm a potential angle for each
- [x] Pick one dataset and commit to a specific angle

---

### Section 2 — Implementation Notes

**Analysis:**
I wanted to pick a dataset that has something surpising and lends emotion before the UI does anything. Two of the three passed that test

**Options / Angles Considered:**

**US Lighthouses**
- Angle: "Lights Out" a dark coastline where active lighthouses still sweep their beam and deactivated ones have gone cold. The story is about GPS making human navigation obsolete. I like the idea but the emotion has to be manufactured. The UI would be doing all the heavy lifting.

**Nuclear Detonations**
- Angle: "The Scale Problem" every test gets a circle. You scroll through 70 years of detonations and the circles grow. Then Tsar Bomba arrives and breaks the screen. 50,000 kilotons. The emotion is already attached without needing to be explained.

**Endangered Languages**
- Angle: "The Last Word" one language per screen. Its name, where it's spoken and how many people are left. The final screen is empty except for one line: *"Another language goes extinct every two weeks. This page will be out of date before you leave"* The data has people in it. Yaghan: 1 speaker. Taushiro: 1 speaker. Ubykh: 0. Breaks the sections up logically and makes the user view the numers as actual people

**Dataset Chosen:** Endangered Languages

**Reason:** The other two angles are about scale and loss in the abstract. This one is about specific people and I think there is the most emotion in that

**Decision Made:**
Endangered Languages, "The Last Word." Full-screen scroll cards. The last screen fades to nothing.

**Design Tradeoff:**
The coordinates were provided and I think a map would've been a cool idea. However, a map would've felt too informational. I think pulling everything out to specifics paried with a visual aspect is best here.

**AI Workflow Notes:**
- Prompt used: "I have three JSON datasets from a take-home brief: US lighthouses, nuclear detonations, and endangered languages. Read each dataset in full. For each one identify: (1) statistical outliers or data points that would surprise someone encountering this data for the first time, (2) patterns across the records that tell a story the raw numbers don't make obvious, (3) the single field or combination of fields that carries the most emotional weight. Then propose one specific creative angle per dataset, not a chart type, but a point of view, that could make someone feel something. Back each angle with evidence from the data itself. Rank all three and explain why."
- What worked: Claude surfaced the 1-speaker entries and the language isolate category immediately. These had the emotional core and came from the data, not the UI.
- What didn't work / done manually instead: kept pulling toward visual complexity. Maps, globes, scale comparisons. The coordinate fields were right there and it kept finding ways to use them. Every time I pushed for something more editorial it defaulted back toward plotting things spatially. The decision to strip it down to name, number, and a single line of copy was made against that

**What I'd Improve With More Time:**
Spending more time with each dataset before committing. I moved fairly quickly once the language data resonated. A slower pass might have surfaced an angle in the nuclear or lighthouse data that was worth considering longer.

---

## STEP 2: Define the Concept and Creative Angle

### Section 1 — Plan
**Purpose:** Translate the chosen dataset into a specific editorial angle — a point of view, emotional tone, and interaction metaphor — that will guide all subsequent design and build decisions.

**High-Level Tasks:**
- [x] Write a one-sentence concept statement ("This experience is about ___")
- [x] Identify the emotional register (melancholy, awe, urgency, wonder, etc.)
- [x] Sketch the core interaction metaphor (scroll journey, map, timeline, sound, etc.)
- [x] Identify 2–3 data fields that will carry the most narrative weight

---

### Section 2 — Implementation Notes

**Analysis:**
The concept needed a visual hook that captured the emotion before any data was explained. I thought the opening page was a good visualization of this. By the time the user clicks into the experience they already have a feeling attached to what a dot means.

**Options / Angles Considered:**
The original angle was purely text-driven, one language per full-screen card. The problem was that the emotion was almost entirely carried by the closing line. Switched to a dot-based visual system so the loss is visible throughout, not just at the end. Considered a map but ruled it out. A map makes it feel like geography. Dots make it feel like people.

**Decision Made:**
Concept statement: "This experience makes you watch language extinction happen while you are reading about it."

Emotional register: melancholy and urgency together. Not grief for something long gone but urgency for something still happening.

Interaction metaphor: dots as people. The opening page scatters all dots across the screen and removes them one by one over 10 seconds while the line "Another language goes extinct every two weeks. This page will be out of date before you leave" sits over the top. After the opening fades a Learn More button appears.

The main experience has 6 vertical sections, one per status category: Vulnerable, Definitely Endangered, Severely Endangered, Critically Endangered, On the Brink, Extinct. Each section is a horizontal scroll that snaps between individual languages ordered from most to fewest speakers. Left panel shows name, family, country, region, and speaker count. Right panel shows dots in that category's color, scaled so each dot represents a set number of speakers specific to that category. Dots fade as you move through languages. A progress bar at the bottom of each section tracks how far through that category you are

Key data fields carrying narrative weight:
- speakers: drives the dot count and is the primary visual for each language
- status: determines the category, the color, and the ordering of the whole experience
- name: the identity anchor on every card, the thing that will be lost

**Design Tradeoff:**
The dot scale is different per category so the dots stay readable at every level. A Vulnerable language with 500,000 speakers and an On the Brink language with 1 speaker both need their dots to mean something visually. A consistent global scale would be more honest but would make the high-end cards unreadable.

**What I'd Improve With More Time:**
The dot scaling per category was a practical call made quickly. With more time I would test whether a consistent global scale where the contrast between a full screen and one dot is even more dramatic would be worth the readability tradeoff at the high end.

---

## STEP 3: Set Up the Project and Deploy Pipeline

### Section 1 — Plan
**Purpose:** Create the GitHub repo, scaffold the project, and wire up continuous deployment so the live URL exists from day one.

**High-Level Tasks:**
- [ ] Create a new public GitHub repository
- [ ] Choose stack (Vanilla HTML/CSS/JS vs. framework) and scaffold the project
- [ ] Connect the repo to Vercel / Netlify / GitHub Pages for auto-deploy on push
- [ ] Confirm live URL resolves to a placeholder page
- [ ] Copy the dataset JSON file into the project

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 4: Design the Visual Language

### Section 1 — Plan
**Purpose:** Establish the typography, color palette, spacing scale, and overall visual tone before writing a single line of UI code.

**High-Level Tasks:**
- [ ] Choose a typeface pairing (or single typeface) that matches the emotional register
- [ ] Define a color palette (background, foreground, accent, data-encoding colors)
- [ ] Decide on layout structure: full-bleed, constrained column, grid, etc.
- [ ] Sketch or wireframe the key screen states (desktop + mobile)

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 5: Build the HTML/CSS Scaffold

### Section 1 — Plan
**Purpose:** Lay down the full responsive page skeleton — semantic HTML structure, CSS custom properties, reset, typography, and base layout — so all subsequent feature work has a clean foundation.

**High-Level Tasks:**
- [ ] Write semantic HTML structure (header, main, sections, footer as needed)
- [ ] Define CSS custom properties for the design tokens (colors, type scale, spacing)
- [ ] Implement responsive layout with CSS Grid or Flexbox
- [ ] Verify the shell renders correctly at 375px (mobile) and 1440px (desktop)
- [ ] Load fonts (Google Fonts CDN or self-hosted)

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 6: Implement the Data Layer

### Section 1 — Plan
**Purpose:** Load the JSON dataset, parse it, and derive any computed statistics or groupings that the visualization and copy will rely on.

**High-Level Tasks:**
- [ ] Fetch or import the JSON dataset
- [ ] Write data-transformation utilities (sort, group, normalize, compute derived values)
- [ ] Validate that edge cases in the data (nulls, outliers, zero values) are handled gracefully
- [ ] Expose a clean data interface that UI components can consume

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 7: Build the Core Visualization / Interactive Feature

### Section 1 — Plan
**Purpose:** Implement the primary interactive element that makes users feel something about the data — the heart of the experience.

**High-Level Tasks:**
- [ ] Build the main visual component (map, timeline, scroll-driven narrative, generative graphic, etc.)
- [ ] Bind the data layer to the visual component
- [ ] Implement the primary user interaction (hover, click, scroll, filter, etc.)
- [ ] Write any data-driven copy or annotations that appear in context
- [ ] Test that the interaction reads clearly on touch (mobile)

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 8: Integrate GSAP Animations

### Section 1 — Plan
**Purpose:** Add at least one GSAP-powered animation or interaction that elevates the motion design and demonstrates deliberate use of timing, easing, and sequencing.

**High-Level Tasks:**
- [ ] Install / CDN-link GSAP (and any plugins needed: ScrollTrigger, Flip, etc.)
- [ ] Design the specific animation(s): entrance, scroll-linked, hover, state-transition
- [ ] Implement and tune easing curves and durations to match the emotional register
- [ ] Ensure animations respect `prefers-reduced-motion`
- [ ] Confirm animations perform smoothly on a mid-range mobile device

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 9: Mobile QA and Responsive Polish

### Section 1 — Plan
**Purpose:** Confirm the experience works correctly and feels intentional on a real phone — not just "shrinks to fit" but genuinely designed for the small screen.

**High-Level Tasks:**
- [ ] Open the live URL on a physical phone (or DevTools mobile emulation at 375px and 390px)
- [ ] Fix any layout overflow, touch-target sizing, or font-size legibility issues
- [ ] Confirm GSAP interactions work on touch (tap, swipe as needed)
- [ ] Check that no horizontal scroll exists on mobile
- [ ] Validate performance: no jank, no layout shift on load

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 10: Final QA and Polish Pass

### Section 1 — Plan
**Purpose:** Do a clean sweep of the finished experience — zero console errors, sharp visual details, no dead states — before cutting the final deliverables.

**High-Level Tasks:**
- [ ] Open DevTools console: fix all errors and warnings
- [ ] Check all interactive states (hover, active, focus, empty/loading) are designed
- [ ] Review typography and spacing at both breakpoints for any rough edges
- [ ] Confirm the page title, meta description, and favicon are set
- [ ] Run a quick Lighthouse or PageSpeed check; fix any glaring performance issues
- [ ] Verify the deployed URL matches the local build exactly

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 11: Write the README

### Section 1 — Plan
**Purpose:** Produce the one-page README that lives in the repo, communicating approach, what was cut, and how to run locally.

**High-Level Tasks:**
- [ ] Write the "Approach" section: concept, angle, key design decisions
- [ ] Write the "What was cut" section: honest list of ideas that didn't make it in time
- [ ] Write the "How to run locally" section: clone, install (if any), open or serve
- [ ] Keep it to one page — scannable, no fluff

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 12: Record the Loom Video

### Section 1 — Plan
**Purpose:** Record a confident, structured 3–5 minute walkthrough that is the primary evaluation artifact — covering concept, tradeoffs, AI workflow, and what you'd do next.

**High-Level Tasks:**
- [ ] Open the live URL and prepare any code snippets or prompt logs to reference on screen
- [ ] Record segment 1 (≈60s): concept and the angle found in the data
- [ ] Record segment 2 (≈45s): one specific design tradeoff made and why
- [ ] Record segment 3 (≈90s): AI workflow — show 2–3 actual prompts, name both wins and misses, and explain what you chose to do yourself instead
- [ ] Record segment 4 (≈30s): one thing you'd improve with another day
- [ ] Watch back, confirm it is under 5 minutes and covers all four required topics
- [ ] Upload to Loom and copy the share link

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]

---

## STEP 13: Submit All Four Deliverables

### Section 1 — Plan
**Purpose:** Reply to the original email thread with all four required deliverables in one clean message.

**High-Level Tasks:**
- [ ] Confirm the deployed URL is live and publicly accessible
- [ ] Confirm the GitHub repo is public (or access shared with the invite email)
- [ ] Confirm the Loom link is set to "anyone with the link can view"
- [ ] Confirm the README is committed and visible on the repo's main page
- [ ] Reply to the email thread with all four items: deployed URL, GitHub repo, Loom link, and a note on where the README lives

---

### Section 2 — Implementation Notes
*(Leave these fields empty for now — they will be populated during execution)*

**Analysis:**
[empty]

**Options / Angles Considered:**
[empty]

**Decision Made:**
[empty]

**Design Tradeoff:**
[empty]

**AI Workflow Notes:**
- Prompt used: [empty]
- What worked: [empty]
- What didn't work / done manually instead: [empty]

**What I'd Improve With More Time:**
[empty]
