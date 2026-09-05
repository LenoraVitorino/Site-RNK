# Site-RNK

## Design tooling

This project uses [Impeccable](https://impeccable.style) for design guidance in Claude Code.
The skill lives in `.claude/skills/impeccable/`, with the design-check hooks in `.claude/settings.json`.

Run these inside Claude Code:

```
/impeccable init        # one-time setup: writes PRODUCT.md
/impeccable craft       # shape then build a surface
/impeccable audit       # accessibility, performance, responsive checks
/impeccable critique    # UX design review
/impeccable polish      # final pass before shipping
```

Type `/impeccable` alone to see all 23 commands. To update the skill later, run `npx impeccable update` from the project root.

## Other agent skills

Additional skills are installed with [`npx skills add`](https://github.com/vercel-labs/skills) into `.agents/skills/`
and symlinked into `.claude/skills/` for Claude Code. `skills-lock.json` tracks their sources.

| Source | Skills |
|---|---|
| `vercel-labs/agent-skills` | `web-design-guidelines`: review UI against Vercel's Web Interface Guidelines |
| `anthropics/skills` | `web-artifacts-builder`: multi-component React/Tailwind/shadcn artifacts |
| `emilkowalski/skills` | `animate`, `animate-expo`, `animation-vocabulary`, `apple-design`, `ask-sonner`, `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `pick-ui-library`, `prototype`, `review-animations`, `write-swift` |

## Product context

`PRODUCT.md` holds the durable product facts Impeccable uses (audience, purpose, constraints, evidence).
Update it when services, contact channels, or brand material are confirmed. `.impeccable/live/config.json`
configures `/impeccable live` for the static HTML pages at the project root and under `pages/`.
