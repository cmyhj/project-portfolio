# Papers Section Implementation Plan

> [!NOTE]
> This document may not reflect the current implementation.
> See the final report for up-to-date state:
> [Final Report](../reports/papers-section.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual "Papers/论文" section to the portfolio homepage that displays academic papers as a vertical list of glass-card rows (title, authors, venue, link icons), matching the existing Blog section's visual language.

**Architecture:** A single new section component `src/sections/Papers.tsx` (data array + GSAP scroll reveal + card rows) wired into `App.tsx` (render after `<Blog />`), `Navigation.tsx` (nav link `t('papers')`), and `LanguageContext.tsx` (zh/en translation keys). No new dependencies; reuses existing `glass-card` / `text-gradient` utilities and lucide-react icons.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, GSAP + ScrollTrigger, lucide-react.

## Global Constraints

- All UI copy must be bilingual via `useLanguage()` (`language === 'zh' ? ... : ...`), matching `Blog.tsx`.
- Theme colors: accent `#00a67d`, background `#181818`, `glass-card`/`text-gradient` utilities from `src/index.css`.
- Section layout wrapper: `<section className="relative w-full py-24 lg:py-32" id="...">` + `<div className="max-w-7xl mx-auto px-6 lg:px-12">` (copy from `Blog.tsx`).
- Section header pattern: green accent line (`w-12 h-0.5 bg-[#00a67d]`) + uppercase label + gradient `<h2>` with `<span className="text-gradient">` (copy from `Blog.tsx`).
- GSAP pattern: `gsap.context(() => {...}, sectionRef)` with `ScrollTrigger` on `start: 'top 85%'`, `toggleActions: 'play none none reverse'`, cleanup `return () => ctx.revert()`. `gsap.registerPlugin(ScrollTrigger)` at module top.
- No test framework exists in this repo (`package.json` has no `test` script). The test cycle for each task is `npm run build` (runs `tsc -b` + `vite build`) and `npm run lint`.
- Sample paper data is placeholder — mark it with a `// TODO: 替换为真实论文数据 (sample data)` comment; the user will replace it later.

---

### Task 1: Create `src/sections/Papers.tsx`

**Files:**
- Create: `src/sections/Papers.tsx`

**Interfaces:**
- Consumes: `useLanguage` from `@/context/LanguageContext`, `gsap`/`ScrollTrigger` from `gsap`, icons from `lucide-react`.
- Produces: default-exported component `Papers` (no props) that renders `<section id="papers">`.

- [ ] **Step 1: Write the component**

Create `src/sections/Papers.tsx` with the full content below.

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Github, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface PaperLink {
  label: string;
  href: string;
  icon: 'paper' | 'code' | 'project';
}

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  links: PaperLink[];
}

// TODO: 替换为真实论文数据 (sample data)
const papers: Paper[] = [
  {
    title: 'JAVEdit: Joint Audio-Visual Instruction-Guided Video Editing',
    authors: 'Muyuan Li, ...',
    venue: 'arXiv',
    year: '2026',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/', icon: 'paper' },
      { label: 'Code', href: 'https://github.com/', icon: 'code' },
    ],
  },
  {
    title: 'OpenVE-3M: Open Vocabulary Video Editing with 3 Million Instructions',
    authors: 'Muyuan Li, ...',
    venue: 'ECCV',
    year: '2026',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/', icon: 'paper' },
      { label: 'Project', href: 'https://example.com/', icon: 'project' },
    ],
  },
  {
    title: 'Cycle-World: Scalable World Modeling for Embodied Agents',
    authors: 'Muyuan Li, ...',
    venue: 'ECCV',
    year: '2026',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/', icon: 'paper' },
      { label: 'Code', href: 'https://github.com/', icon: 'code' },
    ],
  },
  {
    title: 'SPOT-E: Spatio-Temporal Object Placement and Editing in Video',
    authors: 'Muyuan Li, ...',
    venue: 'ECCV',
    year: '2026',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/', icon: 'paper' },
      { label: 'Project', href: 'https://example.com/', icon: 'project' },
    ],
  },
];

const linkIcons = {
  paper: FileText,
  code: Github,
  project: Globe,
};

const highlightAuthors = (authors: string) => {
  return authors.split(',').map((name, i) => (
    <span key={i}>
      {i > 0 && ', '}
      <span className={name.trim() === 'Muyuan Li' ? 'text-[#00a67d]' : undefined}>
        {name.trim()}
      </span>
    </span>
  ));
};

const Papers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current?.querySelectorAll('.paper-row');

      rows?.forEach((row, index) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32" id="papers">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-[#00a67d]" />
              <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
                {language === 'zh' ? '论文' : 'Publications'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {language === 'zh' ? '研究' : 'Research '}
              <span className="text-gradient">{language === 'zh' ? '成果' : 'Work'}</span>
            </h2>
          </div>
        </div>

        {/* Paper list */}
        <div ref={rowsRef} className="flex flex-col gap-6">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="paper-row group glass-card rounded-2xl p-6 lg:p-8
                         hover:bg-[#00a67d]/5 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Index + venue */}
                <div className="flex lg:flex-col lg:items-center gap-3 lg:gap-2 lg:w-24 shrink-0">
                  <span className="text-white/30 text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00a67d] px-2.5 py-1 bg-[#00a67d]/10 rounded-full font-medium">
                      {paper.venue} {paper.year}
                    </span>
                  </div>
                </div>

                {/* Title + authors */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2
                                 group-hover:text-[#00a67d] transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-white/60">
                    {highlightAuthors(paper.authors)}
                  </p>
                </div>

                {/* Link icons */}
                <div className="flex items-center gap-3 shrink-0">
                  {paper.links.map((link) => {
                    const Icon = linkIcons[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                                   flex items-center justify-center text-white/60
                                   hover:bg-[#00a67d] hover:text-white hover:border-[#00a67d]
                                   transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                  <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#00a67d]/0
                                  group-hover:bg-[#00a67d] items-center justify-center
                                  opacity-0 group-hover:opacity-100
                                  transform translate-x-2 group-hover:translate-x-0
                                  transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Papers;
```

- [ ] **Step 2: Verify typecheck + build**

Run: `npm run build`
Expected: exit 0, `tsc -b` passes and vite build completes with no errors. (The component is not imported anywhere yet, but the file must compile standalone.)

- [ ] **Step 3: Commit**

```bash
git add src/sections/Papers.tsx
git commit -m "feat(Papers): 添加论文版块组件（示例数据 + GSAP 动画）"
```

---

### Task 2: Wire into App, Navigation, and translations

**Files:**
- Modify: `src/App.tsx` (add import + render `<Papers />` after `<Blog />`, line 11/54 area)
- Modify: `src/sections/Navigation.tsx` (add `{ label: t('papers'), href: '#papers' }` to `navLinks` after the blog entry, line 25)
- Modify: `src/context/LanguageContext.tsx` (add `papers` key to both `zh` and `en` translation objects)

**Interfaces:**
- Consumes: `Papers` default export from `@/sections/Papers`; `t('papers')` must resolve (new translation key).
- Produces: section reachable at `#papers` in nav and rendered in page order after Blog.

- [ ] **Step 1: Add translation key**

In `src/context/LanguageContext.tsx`:

`zh` object (after the `blog: '博客',` line):
```ts
papers: '论文',
```
`en` object (after the `blog: 'Blog',` line):
```ts
papers: 'Publications',
```

- [ ] **Step 2: Add nav link**

In `src/sections/Navigation.tsx` `navLinks` array (after the blog entry, before contact):
```ts
{ label: t('papers'), href: '#papers' },
```

- [ ] **Step 3: Render the section**

In `src/App.tsx`:
1. Add import after `import Blog from '@/sections/Blog';`:
```ts
import Papers from '@/sections/Papers';
```
2. Add `<Papers />` right after `<Blog />` inside `<main>`:
```tsx
<Blog />
<Papers />
```

- [ ] **Step 4: Verify typecheck + build + lint**

Run: `npm run build` and `npm run lint`
Expected: both exit 0, no TS/lint errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/sections/Navigation.tsx src/context/LanguageContext.tsx
git commit -m "feat(Papers): 接入 App、导航栏与双语翻译"
```

---

### Task 3: Final verification

**Files:** (none)

- [ ] **Step 1: Full build + lint**

Run: `npm run build && npm run lint`
Expected: both exit 0.

- [ ] **Step 2: Manual smoke check**

Run: `npm run dev`, open the dev server, confirm:
- "论文 / Publications" nav link appears and smooth-scrolls to the section.
- The section renders 4 glass-card rows with venue badges, highlighted author name, and icon links.
- Toggling 中文/EN updates the section header and nav label.
- Scroll reveal animation plays on the rows.
- Confirm with the user that the sample data (`// TODO: 替换为真实论文数据`) is acceptable before they replace it.

- [ ] **Step 3: Commit (only if changes were made during smoke check)**
