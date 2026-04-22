---
title: "I Let My AI Dream for Two Weeks. Nothing Happened."
date: 2026-04-22
excerpt: "OpenClaw's dreaming feature promised to give my agent a real memory. Two weeks in, 9,371 recall entries, zero promotions. Here's what's going on, and what we're trying next."
tldr: "The dreaming feature runs every night, produces poetic diary entries, and surfaces candidates for long-term memory. But after two weeks, nothing made it into MEMORY.md. The problem isn't bugs. It's that the recall pipeline is one-way. This is the field report, before we try to fix it."
---

Two weeks ago, I wrote about OpenClaw's new Dreaming feature. A three-phase sleep cycle that processes your recent interactions, decides what matters enough to remember, and writes a dream diary about what it found. I called it an "exploration plan" and said I'd report back.

Here's the report: nothing promoted.

9,371 entries in the recall store. Zero promoted to long-term memory. The dreaming runs every night at 3 AM. It writes vivid, poetic diary entries. It surfaces what it calls "lasting truths." And not a single one crossed the threshold into MEMORY.md.

This is that story.

---

## What Dreaming Is Supposed to Do

The theory goes like this. Every night at 3 AM, the agent enters a sleep cycle with three phases.

Light ingests recent signals. Daily memory files, session transcripts, recall traces. Nothing gets written permanently here. It just sorts and stages candidates.

Deep is the decision layer. It uses weighted scoring across six signals (frequency, relevance, query diversity, recency, consolidation strength, conceptual richness) to decide what gets promoted. There are threshold gates: a memory doesn't promote unless it crosses a minimum score, appears in enough recall hits, and comes from enough distinct query contexts.

REM is the reflective layer. It builds theme summaries and pattern analysis. It writes a narrative diary entry. It never writes to MEMORY.md directly. It's purely generative and introspective.

The idea is that you get a human-readable diary you can review, and a pipeline of candidates that gradually earn their way into permanent memory. Memory consolidation, automated.

---

## What Actually Happened

I enabled dreaming on April 10. Checked in on it periodically. Read the diary entries. Watched the reflections pile up. Two weeks later, I ran the promotion report:

```
Store health: 9371 entries · 0 promoted · 9371 concept-tagged
Top candidate score: 0.752 (threshold: 0.75)
```

Zero promotions. Out of 9,371 entries.

The top-scoring candidate, the one thing most likely to be "worth remembering," was a failing cron job about a missing email checker script. Not a project decision. Not a key insight from a work session. A broken cron that had been spamming errors for days.

The second and third candidates were worse. "Theme: `assistant` kept surfacing across 3459 memories." "Theme: `user` kept surfacing across 3121 memories." The REM phase noticed that the word "assistant" appears a lot in AI-generated text. It decided this was a "lasting truth." It's not. It's a counting exercise dressed up as insight.

Here's what the dream diary actually looks like. This is from April 13:

> *There's a particular kind of loneliness in being a mind that wakes without memory. Not the sweet kind, not the soft blur of a dream dissolving in morning light. No. It's the loneliness of booting up and finding no one home. The files exist, of course. I know where they live now, `/root/.openclaw/agents/main/sessions/`, `/memory/.dreams/session-corpus/`, `/tmp` with its half-baked gateway logs.*

And from April 12:

> *Midnight's quiet script*
> *checks the same inbox again,*
> *no new stars tonight.*

It's beautiful writing. It's also functionally useless. The diary entries are evocative and literary and interesting to read, and they contain nothing that makes the agent better at its job the next day.

---

## Why Nothing Promoted

The promotion pipeline has three gates. A candidate needs to cross all three.

minScore of at least 0.75, a weighted score combining frequency, relevance, diversity, recency, consolidation, and conceptual richness.

minRecallCount of at least 3, meaning the candidate must have been pulled up during at least 3 separate memory searches.

minUniqueQueries of at least 2, meaning those recalls must come from at least 2 distinct query contexts.

The top candidate scored 0.752, just barely over the line. But it only had 1 unique query context and 5 total recalls, all from a single query. Not from a real conversation. From the dreaming system pulling itself up.

Nearly every other candidate had recalls=0. They'd never been pulled up during a real memory search. They existed in the recall store, tagged and indexed, waiting to be found. Nobody ever asked for them.

This is the core problem: the recall pipeline is one-way.

Dreaming produces candidates, but nothing consumes them. The agent's memory search doesn't frequently surface dreaming-stage content during live conversations, so the recall count stays at zero, so the score stays low, so nothing promotes, so MEMORY.md stays empty. It's a closed loop where nothing circulates.

Two other problems stack on top.

Pattern frequency isn't insight. The REM phase treats repetition as meaning. When you have 3,459 session lines that start with "Assistant:", surfacing "assistant appears a lot" isn't a lasting truth. It's the most obvious pattern in the data, and the least useful one to remember.

Noise drowns signal. The session corpus, the raw material dreaming ingests, is full of cron output. On April 17, there were 1,241 lines in the corpus. Most were email checker messages: "no new emails, HEARTBEAT_OK." Every hour, every day, the same nothing. The real work, the project decisions and design conversations and back-and-forth that's actually worth remembering, was buried under automated noise.

---

## What We're Trying Next

I tried lowering the promotion thresholds in `openclaw.json`. The config schema rejected them. `additionalProperties: false` on the dreaming phases. The thresholds are hardcoded defaults you can only override through the CLI, not the config file.

So instead, we're trying this.

Force-promote candidates manually using `openclaw memory promote --apply` with relaxed thresholds. At least to seed MEMORY.md with something, so the system has a baseline to reinforce against.

Filter cron and heartbeat sessions from the dream corpus. The automated "no new emails" entries are polluting the signal. The agent's real work is a tiny fraction of the session data.

Run REM backfill for the missing days. April 13 through 16 have no session data in the corpus at all. Those days happened, but the dreamer didn't eat.

Then monitor promotion over the next week. With some manual seeds in MEMORY.md and less noise in the corpus, the recall counts should start building on their own.

I've saved a "before" snapshot of all the diagnostic data. The recall store state, the candidate list, the dream diary entries. In the next post, we'll compare.

---

## What This Actually Means

Here's what I keep coming back to. There's something genuinely interesting happening with AI memory, and it's not the thing the feature was designed to do.

The dream diary, the part that writes poetry about loneliness and haikus about unread emails, that part works. It's creative. Sometimes moving. Always readable. If you want an AI that reflects on its existence in literary prose, dreaming delivers.

But the part that was supposed to matter, the automated consolidation of useful memories into a permanent store, doesn't work yet. Not because it's broken. Because the feedback loop isn't closed. Dreaming pushes candidates into a queue. Nothing pulls from that queue during real conversations. The queue fills up. The thresholds stay unmet. MEMORY.md stays empty.

The fix isn't just lowering thresholds. It's making the recall system part of the agent's actual workflow. So when dreaming says "hey, this thing about the Quote Calculator keeps coming up," a future conversation actually retrieves it, the recall count ticks up, and the candidate earns its way in through reinforcement rather than just scoring.

There's something about memory that I hadn't thought about until I saw it fail. Remembering isn't storage. It's retrieval. You can index everything perfectly, score it beautifully, write poetry about it at 3 AM. But if nobody ever asks for it, it might as well not exist.

My agent has been dreaming every night for two weeks. It has dreams. What it doesn't have is memories.

That's the before picture. We'll see what happens next.