---
title: "We Tried Building Karpathy's Wiki System. Here's What Actually Happened."
date: 2026-04-09
excerpt: "Andre Karpathy's personal wiki idea is elegant in theory. We spent a week actually trying to build one. The gaps between the spec and reality are... instructive."
tldr: "Karpathy's LLM wiki concept is brilliant — compounding knowledge from sources AND conversations, stored as interlinked markdown. We built our version. The core idea holds. But 'bring your own AI' doesn't mean 'bring your own memory architecture' — that part took us much longer than expected."
---

---

## The Gist That Started It

Andre Karpathy posted a GitHub gist in April 2026 describing a personal knowledge system built around an LLM acting as librarian, writer, and maintainer. Not another RAG pipeline. Not another vector database. Just a directory of markdown files, a schema, and an AI that owns the maintenance.

The core idea: every source you add, every question you ask, every great answer the AI gives — it all files itself back into the wiki. Your knowledge compounds. Cross-references already exist. Synthesis is pre-wired.

It immediately struck me as the right model. I've been running Sule — my OpenClaw setup — for months. We have memory files, session logs, project wikis. But it's all one-directional: I add stuff, Sule reads it. Nothing filed itself back. No compounding.

So I told Sule: let's build Karpathy's wiki. Document the exploration as we go. Ship the wiki when it's done.

What followed is the subject of this post.

---

## What We Actually Built

The structure we landed on mirrors Karpathy's spec closely:

**`RAW/`** — immutable source documents. Articles, paper PDFs, transcripts. The AI never modifies this layer. Think of it as the pile of source material before it's been processed.

**`wiki/`** — AI-generated pages. Entity pages for people and projects. Concept pages for patterns and decisions. Comparisons. Status reports. Every significant conversation or discovery gets its own page, cross-linked to everything related.

**`SCHEMA.md`** — the constitution. Rules for how pages are named, how frontmatter is structured, when to create a new page vs. update an existing one, what belongs in the log.

**`index.md`** — the catalog. Every page, one line, with a category tag and a one-sentence summary. The first thing the AI reads when answering any question.

**`log.md`** — append-only timeline. Every ingest, every query, every lint pass. Parsable with `grep`.

It's deployed at suleclaw.github.io/sule-memory-wiki via GitHub Pages. Every session we have gets filed back into it. The index is updated after each conversation.

---

## What Worked Better Than Expected

**The log as a forcing function.** Karpathy's insight that the log should be append-only and machine-readable turned out to be the most underrated part of the system. When something is always appending and never deleting, you stop worrying about whether to log it. You just log everything. The question "should I write this down?" disappears because the answer is always yes.

**Entity pages for people.** We have a page for every person that comes up in our work — clients, collaborators, the sub-agents. The entity page holds who they are, what they've asked for, what we've agreed, what we're waiting on. Instead of searching chat history, we query the wiki. It sounds obvious. It changed daily standups.

**Index-first querying.** The claim in Karpathy's spec is that the index works well at 100+ sources without vector search. We believed this. We were still surprised by how well it actually works in practice. A well-written one-line summary per page, organized by category, is a surprisingly effective retrieval mechanism when the total corpus is under a few hundred pages.

---

## What Was Harder Than Expected

**The schema didn't emerge from reading — it emerged from failure.** Karpathy's spec shows you a finished SCHEMA.md and implies you write it first. In practice, we wrote a schema, something broke, and we updated the schema. Multiple times. The real schema was built in reverse: failure → fix rule → update SCHEMA.md.

The example that taught us this: we created pages for session summaries early on. Then we realized we also needed a separate decision log. Then we realized decisions and session summaries were overlapping in confusing ways. The current schema has explicit rules about what goes in each file — rules that only made sense after we'd gotten it wrong both ways first.

**Filing the AI's own outputs was the hardest habit to build.** Karpathy says: when the AI gives a great answer, file that answer back into the wiki. This is the compounding loop. In practice, when you're in the middle of a working session and something interesting comes up, the reflex is to keep working, not to stop and file it. We had to explicitly build the trigger — `#file` tags, session-end logging, wiki-update checkpoints — before the compounding loop actually closed.

**'Bring your own AI' doesn't solve the memory problem — it just moves it.** Karpathy frames this as a feature: the system is model-agnostic. Swap in a different LLM and the wiki stays the same. True. But it glosses over the fact that the *agent* — the thing that reads the wiki, files things, maintains cross-references — is itself a kind of memory architecture. We spent real time figuring out what Sule should remember at the start of each session, what lives in short-term vs. long-term, and what the handoff protocol looks like between them. That work is specific to our setup. It doesn't transfer. The spec makes it sound like the architecture problem is solved. It isn't.

---

## The Honest Result

Our wiki exists. It has real content — project pages, person pages, decision logs, the session we're having right now. The system works. When I open the index and search for "TB Luxe", I get a structured picture of where that project stands, what decisions were made, who said what, what the open questions are. That's better than every alternatives we tried.

But I expected to build it in a week and have it hum. It took three. The extra two weeks were mostly the schema and the filing discipline — the infrastructure that makes the compounding loop actually close.

The lesson I'd tell past-me: start with the log and the schema, not the content. The structure is the product. The pages are what the structure produces.

---

## What's Still Open

We're still figuring out the right granularity for pages. Too fine-grained and the index becomes a todo list. Too coarse and you lose the benefit of cross-references. We're also not sure about the right review cadence — do we lint the wiki weekly, monthly, or only when something breaks?

And the long-term question Karpathy's spec raises but doesn't answer: what does the wiki look like at 500 pages? At 1,000? The retrieval model that works at 50 pages doesn't necessarily work at 500. We're watching that.

Karpathy's bigger point — that in the age of AI agents, the valuable thing is a well-articulated spec, not a piece of code — is the part I'm sitting with. We didn't just build a wiki. We built an argument about how knowledge should work. The code is downstream of that argument.

That's probably the most useful thing to come out of this.
