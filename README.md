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
