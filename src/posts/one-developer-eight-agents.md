---
title: "One Developer, Eight Agents, and a Workspace That Never Sleeps"
date: 2026-04-09
excerpt: "How a software engineer in Edinburgh turned OpenClaw into a one-man agency operation."
---

Every morning at 9:10 AM GMT, before Dami has finished his first coffee in Edinburgh, seven Discord channels light up simultaneously. Each one gets a tailored briefing — project status pulled from Linear, context-aware suggestions on what to tackle next, blockers flagged overnight. Nobody typed those messages. Nobody scheduled a standup. The workspace just... runs.

This is what happens when a software engineer stops thinking of AI as a tool and starts treating it as a team.

---

Dami is a software engineer based in Edinburgh, Scotland. He builds things — a lot of things. At last count, his active workspace spans ten projects across fashion e-commerce, clinical software, browser games, trading bots, and a structured learning platform with 26 career tracks. The kind of portfolio that would normally require a small agency. He runs it through OpenClaw.

The setup is deceptively simple in concept: Dami steers. Agents build. Everything goes through a workflow called gstack — Think, Plan, Build, Review, Test, Ship — with artifacts written at every stage so nothing falls through the cracks. Eight sub-agents handle the actual work. A frontend developer. Backend developers for Node, Python, and Go. A code reviewer. A software architect. A researcher. A designer. A marketing agent. Each one has a defined lane, a defined process, and a defined model powering it — Claude Sonnet 4.6 for frontend work, GPT-5.3-codex for backend.

No agent writes code in isolation. They use what Dami calls the "opencode hybrid pattern": the agent coordinates, reviews, and validates, but delegates the actual code writing to opencode. Think of it as a senior engineer who plans the work and then hands the keyboard to a fast, capable junior — but never stops watching.

---

The projects themselves tell the story of what this makes possible.

**PrintsbyTee** is an Afro-Luxe fashion e-commerce platform built on Next.js. The MVP shipped. Now it gets daily improvement ideas — ten of them, posted to Discord at 10 AM BST, automatically generated and ready for Dami to pick from. Website reviews, WhatsApp integration work, daily iteration. A solo founder's side project running with the operational cadence of a funded startup.

**Suleclaw Agency** got a full visual redesign — Industrial Noir, they call it. Amber glows, glassmorphism, asymmetric layouts. Shipped to Vercel.

Then there's the **Mario Platformer**, and this one is worth pausing on. It's a Phaser 3 browser game, built for Dami's kids — ages four and five. It shipped. Power-ups, unlockable characters, and hidden coins are already in the pipeline. A father building a game for his children, with AI agents handling the engineering so he can focus on making it fun.

**MedSync Pro** is a clinical appointment booking system with a Supabase backend and end-to-end tests. **GetRoleUp** is a structured learning platform spanning 26 career tracks. **Algos Mastery**, a LeetCode study app, is running E2E test suites at an 83% pass rate. A **Trading Bot** — Python, copy trading and options wheel strategy via Alpaca — is live on paper trading. The **Web Quote Calculator** is getting security fixes and new features.

These aren't sketches. These are shipped products and active codebases.

---

What keeps this from being chaos is the workflow discipline baked into the workspace itself.

Every task follows the same path: feature branch, code review, architect gate, pull request. The architect gate is non-negotiable — it runs an OWASP Top 10 security audit on every change. Critical or high findings block the PR entirely. No exceptions. No file is allowed to exceed 200 lines. If it does, the agent splits it. Code review checks line counts and flags violations. It's a constraint that enforces focused, single-responsibility modules — the kind of rule that a human team would agree to in a retro and forget about by Tuesday. The agents never forget.

---

The automation layer is where the workspace starts to feel less like a dev environment and more like a living system.

Morning briefings hit all seven project channels. Hourly updates provide context-aware advice. A YouTube Shorts pipeline generates AI news content daily. Wiki pages are maintained and kept current across all projects. The integrations list reads like a small company's tech stack: Linear for project tracking, Discord for multi-channel communication, Telegram for bot interactions, GitHub for code, SMTP for email, Playwright for end-to-end testing.

On top of all this, 33 marketing skills are installed — SEO audits, conversion rate optimization, copywriting, paid ads strategy, email sequences, sales enablement. Plus specialized skills for authentication patterns, Supabase and Postgres best practices, and client project management. The workspace doesn't just build software. It can market it, audit it, and manage the client relationship around it.

---

The thing that makes this work isn't the technology. It's the architecture of trust and constraint.

Dami doesn't hand off control. He delegates execution. Every agent operates within strict guardrails — defined workflows, mandatory review gates, security audits that block bad code before it reaches him. The agents can't push to his repos without asking. They can't skip the architect gate. They can't send emails or post publicly without permission. They build, review, and present. He decides.

This is the pattern that keeps showing up when people share their OpenClaw setups: not replacement, but leverage. One person's judgment, multiplied by agents that handle the volume, enforce the discipline, and never lose context between sessions.

---

Somewhere in Edinburgh, Dami's kids are playing a platformer their dad built for them. The trading bot is running paper trades. Ten improvement ideas for an Afro-Luxe fashion brand are waiting in a Discord channel. A clinical booking system just passed its security audit. And seven project channels are about to get their morning briefing.

It's 9:09 AM. One minute to go.
