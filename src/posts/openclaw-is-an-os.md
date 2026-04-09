---
title: "OpenClaw Isn't an Assistant. It's an Operating System."
date: 2026-04-09
excerpt: "I stopped using AI as a scratchpad and started treating it as infrastructure. Here's what I learned building the system I actually needed."
---

*By Dami — software engineer, Edinburgh*

---

## The Problem Had a Name: Context-Switching

I was running four things at once and doing none of them well.

PrintsbyTee — my wife's Afro-luxe fashion brand — needed consistent content, weekly site improvements, and someone thinking about conversions. TB Luxe Apparel was a client e-commerce build I'd taken on, with real deadlines and a real budget on the line. algos-mastery was an automated trading side project that needed attention every time the markets did something weird. And underneath all of it, agency client work with its own sprints, standups, and Slack messages.

I was using ChatGPT as a scratchpad, Notion as a loose second brain, GitHub for the code, and Linear for issues. I had tabs open for everything. My mornings were a game of triage. By the time I'd caught up on PrintsbyTee, I'd missed something in the TB Luxe build. By the time I'd reviewed the trading logs, I'd forgotten what I'd promised the agency client.

The tools weren't the problem. The tools were fine. The problem was that nothing was connected. I was the connection — the human glue between all of it — and I was starting to crack under the weight of it.

That's what I was trying to solve when I started properly building with OpenClaw. Not a smarter assistant. A system that could hold context, take direction, and run things while I was looking somewhere else.

---

## The First Thing That Actually Stuck

I'd experimented with Sule before. Asked questions, got answers. Felt marginally better than Googling. But it was still me pulling the information, still me doing the thinking. Fancy Clippy.

The thing that changed my mind was the morning briefing.

At 9:10 AM GMT every day, Sule posts a status update to each project's Discord channel. Linear tickets by status — what's in progress, what's in review, what just moved to done. It's not glamorous. It's a digest. But it meant that every morning I could open Discord and immediately know where each project stood, without logging into Linear, without chasing updates, without the ten-minute warm-up ritual of remembering what I was doing yesterday.

At 10:00 AM BST, a separate briefing fires for PrintsbyTee: a daily idea for improving the website. Traffic analysis, section suggestions, copy tweaks. Small things. But consistent small things compound.

At 7:00 AM, the AI news pipeline runs. New developments, relevant tools, anything that might matter for the agency work or the trading side. By the time I'm at my desk, there's a digest waiting.

None of this sounds revolutionary. But I'd been manually doing all of it — or more often, not doing it, because there wasn't time. When Sule started doing it reliably, something shifted. I realised I wasn't just saving time. I was reclaiming consistency. Things that had been aspirational ("I should check PrintsbyTee analytics more often") became structural.

That was the first moment I thought: okay. This is different.

---

## The gstack Moment

Using OpenClaw as a Q&A machine is fine. Using it as an orchestration layer is something else entirely, and getting there was messier than I expected.

The gstack workflow came out of frustration with how I was handling client builds. I'd spin up a task, write some code, ship it, realise I'd missed something architecturally obvious, refactor, lose a day. The loop was sloppy. I needed a forcing function.

gstack is the system I built for it: Think → Plan → Build → Review → QA → Ship → Reflect. Each stage writes to a file. The next stage reads it first. No skipping ahead.

The first version was a mess. I had the stages defined, but no enforcement. Agents would skip Review, jump straight to Ship, and I'd only catch it afterwards when something broke in production. I had to wire in gates — actual hard stops that prevented a PR from being raised until code review passed, until the architect gate ran, until the OWASP audit came back clean.

The OWASP gate was a real turning point. I have an architect review step before any PR — Sule runs the security-auditor skill against every modified file, looking for OWASP Top 10 findings. Critical or High severity blocks the PR automatically. Medium and Low get noted in the PR body. It felt like overkill when I first set it up. The first time it caught an injection risk in a TB Luxe endpoint I'd written in a hurry, it stopped feeling like overkill.

The hardest part of building the system wasn't the technical setup. It was accepting that the system needed to be able to override my impatience. When I'm in flow and want to ship something, the last thing I want is a gate. But the gates exist because past-me couldn't be trusted to remember all the things. That's a humbling thing to build.

---

## What a Typical Day Actually Looks Like

When a new task comes in — say, a new feature for TB Luxe — here's the actual flow:

I describe what I want. Sule writes a SPEC.md: what to build, files affected, acceptance criteria. That SPEC goes to the right sub-agent — frontend-dev for UI work, backend-dev-node for API changes. Each agent reads its own AGENTS.md before touching anything. The AGENTS.md contains the rules: opencode hybrid pattern, file size limits (nothing over 200 lines), branch naming, the quality gates. Then opencode actually writes the code, using Claude Sonnet 4.6 for frontend work, GPT Codex for backend. The agent coordinates and validates. Opencode does the writing.

After code is written: lint runs, typecheck runs, build runs — all three must pass. Then the architect gate runs against every modified file. Then the PR goes up for me to review.

I review the PR. I merge it. Sule notes it in the session log.

That's the loop. What I actually do in that loop: describe the feature, review the PR, merge it. What Sule and the agent pipeline does: everything in between.

The division of labour sounds clean when I write it out like this. In practice, it took months to get here. There were broken gates, agents that didn't read their AGENTS.md properly, PRs that went up without the architect gate running, a few incidents where Sule confidently suggested something architecturally wrong and I had to push back. The system is reliable now, but that reliability was built through a lot of things not working.

---

## The Honest Ups and Downs

The biggest positive surprise: how much better my projects got when I had consistent structure around them. Not because Sule is smarter than me — it's not, on most things — but because the system creates forcing functions I'd never impose on myself. The morning briefings mean PrintsbyTee isn't just something I think about when I have time. The architect gate means I can't ship sloppy code even when I'm tired. The gstack workflow means I can't skip straight to Build without thinking through the plan.

The biggest frustration: the setup cost. Getting all of this working — the AGENTS.md files for each sub-agent, the gstack stages, the gates, the memory system, the project channel integrations — took serious time. If you're expecting to plug in OpenClaw and have a working orchestration layer in an afternoon, you'll be disappointed. You're building infrastructure. It takes the time that infrastructure takes.

The thing I still find annoying: Sule gets confident about things it's wrong about. It'll suggest an approach, I'll push back, it'll agree immediately. I've learned to treat its first answer as a draft, not a decision. That's an adjustment if you're used to tools that either know or admit they don't know. Sule sometimes does both simultaneously.

What I'd tell someone starting today: begin with one workflow that solves one real problem. Not the whole system. The morning briefing, the one gate, the one agent. Build from there. The temptation is to design the full architecture upfront and it doesn't work that way. You learn what you actually need by having the system fail you in specific ways.

---

## Why This Matters More Than "AI Assistant"

Most AI tools are products. They have a feature set, a use case, a price tier. They're designed for a particular workflow and you fit yourself into it. That's fine for a lot of things. It's not fine when your workflow is actually multiple workflows, across multiple projects, with multiple people involved, all running at different rhythms.

OpenClaw is a platform. The reason I could build morning briefings that post to specific Discord channels at specific times is because nothing stopped me from building that. The reason I could wire in a custom OWASP gate before PRs is because the system doesn't have an opinion about whether I should. The reason each sub-agent can have its own AGENTS.md with project-specific rules is because the architecture supports it.

This sounds abstract but the practical effect is concrete: my setup is shaped around my actual situation — PrintsbyTee's rhythms, the TB Luxe build timeline, the trading side project's monitoring needs, the agency work's review cadence — instead of me bending my situation to fit someone else's product.

That's the operating system argument. Not that it runs code or manages files, but that it's the layer underneath everything else — the thing that lets you build whatever configuration you actually need, not the one you're sold.

---

## What's Next

Right now I'm tightening the algos-mastery monitoring integration — getting Sule to watch the trading logs more actively and flag anomalies into the morning briefing. I want to add a weekly retro flow to gstack, where Sule surfaces what shipped, what slipped, and what patterns I should be watching.

Longer term, I want to get the TB Luxe build automated enough that ongoing maintenance is mostly handled without me touching it. The scaffolding for that is already there. It's a matter of tightening the loops.

Sule isn't finished learning how I work, and I'm not finished learning how to use it properly. We're somewhere in the middle of building something together — a setup that, slowly, is starting to feel less like a tool and more like infrastructure. The kind you stop noticing because it just works.

That's what I'm building toward. An operating system for my work that gets out of my way and lets me focus on the parts only I can do.

Everything else is Sule's problem.
