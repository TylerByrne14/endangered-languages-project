
## Approach

This project focuses on a specific angle found in the data: **the last speakers**. Eight languages in the dataset survive on five people or fewer. Two of them — Yaghan and Taushiro — are down to one speaker each.

The experience is structured in three parts:
1. **Intro** — A dot grid where each dot represents a category of endangerment. The dots fade out one by one, visualizing the rate of loss.
2. **Categories** — Four cards showing the endangerment tiers from Vulnerable to Critically Endangered. Clicking a card opens a detail view with five languages from that category.
3. **The Last Speakers** — A dedicated page highlighting the eight languages with five or fewer speakers, with visual emphasis on the two languages down to one person.

The visual system uses dots as a metaphor for people. Each language detail view shows a grid of dots scaled to the speaker count, making the difference between 500,000 speakers and 1 speaker visceral.

### Design Decisions

- **Vanilla stack** — HTML, CSS, and JavaScript with GSAP via CDN. No framework, no build step. This kept the project simple and the deploy pipeline instant 

- **Dot scaling per category** — The dot grid in each language card uses a different scale depending on the category. A Vulnerable language with 500,000 speakers and a language with 1 speaker both need their dots to be readable. A consistent global scale would be more honest but would make high-speaker-count cards unreadable.

- **No map** — The dataset includes coordinates for every language. A map would have been a fun choice. I ruled it out because a map makes this feel like a geography project when it's actually about specific people.

-**other angles considered** - I thought about making  comic strip styled page where the speaker of a lanague with only 1 goes about everyday life not being able to comunicate 
with others. This would be to get the point across about how difficult it must be and how other peope are headed for this fate. I decided against it given the time limit 

## What Was Cut

- **Individual language pages for all tiers** — Originally planned to have the last-speakers page be a 6th category in the grid. Pivoted to make it a dedicated third page to give the "one speaker left" angle more weight

- **More granular mobile QA** — Tested at 375px in DevTools but did not test on a physical device

## AI Workflow

I used Claude throughout the project. Here are a few specific prompts and how they went:

### Win: Dataset Analysis

**Prompt:**
>"Read and analyze the take-home exercise at /take-home-test-v02/take-home.md. After reading the file, identify ALL discrete steps required to complete the exercise. Then, for each step, produce a structured document using EXACTLY the template below. Apply this template to every step. DO NOT fill out any steps in the document. Simply create a template that can be followed as I complete each step. The steps should cover the full arc of the project from dataset selection through final deliverables, which include: a deployed live URL, a public GitHub repo, a 3-5 minute Loom video covering concept/angle, one design tradeoff, 2-3 actual AI prompts (wins and misses), and one improvement with more time, and a one-page README covering approach, what was cut, and how to run locally. Output the full document for all steps before asking any follow-up questions."

**What worked:** Claude built the skeleton of the document that I could follow and update as I went through the steps of this project

**Prompt:**
> "I have three JSON datasets from a take-home brief: US lighthouses, nuclear detonations, and endangered languages. Read each dataset in full. For each one identify: (1) statistical outliers or data points that would surprise someone encountering this data for the first time, (2) patterns across the records that tell a story the raw numbers don't make obvious, (3) the single field or combination of fields that carries the most emotional weight. Back each angle with evidence from the data itself."

**What worked:** Claude surfaced the 1-speaker entries (Yaghan and Taushiro) and the language isolate category immediately. This became the emotional core of the project. The prompt worked because I asked for analysis backed by evidence from the data itself, not just ideas.

**Prompt:**
> "Create a GSAP animation for the intro page. After the heading and subheading fade in, I want all the dots in the dot grid to fade out one by one in a random stagger pattern, moving downward as they disappear. Once the dots are gone, show the scroll indicator and enable scrolling."

**What worked:** Claude created a clean GSAP timeline that sequenced the text animations, then used `stagger: { amount: 5, from: 'random' }` to create the cascading dot fadeout effect. The animation felt cohesive and set the tone for the rest of the experience.

### Miss: Project Scaffolding
**Prompt:**
> "Scaffold a vanilla HTML CSS JS project structure for a single page data experience. No framework, no build step, GSAP via CDN. Set up the folder structure, a base HTML file with correct meta tags and script loading, a CSS and a JS placeholder."

**What didn't work:** The folder structure and base files were solid, but all the selectors came out as IDs instead of classes throughout. I caught it in review and fixed manually. Lesson: scaffolding prompts are fast but you have to QA the output before building on top of it.

### Partial Win: GSAP Pulse Animation
**Prompt (paraphrased):**
> "Create a pulse animation for the dot and concentric rings on the last-speakers page. The dot should pulse on first, then the inner ring, then the outer ring, creating a wave effect. Then all should fade off in the same sequence."

**What happened:** First attempt used CSS animations with delays but the timing felt wrong. Second attempt used GSAP but tried to animate a `::before` pseudo-element, which GSAP can't target directly. I refactored the HTML to use real DOM elements (`.last-circle-inner` and `.last-circle-outer`) and then the animation worked.

### What I Did Myself
All design decisions were mine. Claude kept suggesting maps, globes, and spatial plotting because the dataset has coordinates. Every time I pushed for something more editorial it defaulted back to plotting things spatially. The decision to strip it down to name, number, and a single line of copy was made against that pressure.

## How to Run Locally

This project has no build step or dependencies. To run it:

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd take-home-build
   ```

2. Open `index.html` in your browser.



## Project Structure

```
take-home-build/
├── index.html           # Main page
├── css/
│   └── style.css        # All styles (tokens, layout, components)
├── js/
│   └── main.js          # All interactions and GSAP animations
├── data/
│   └── endangered-languages.json
└── README.md
```

## Tech Stack

- Vanilla HTML/CSS/JavaScript
- GSAP 3.12.5 (core + ScrollTrigger) via CDN
- Google Fonts (Space Grotesk, Space Mono)
- Deployed to GitHub Pages
