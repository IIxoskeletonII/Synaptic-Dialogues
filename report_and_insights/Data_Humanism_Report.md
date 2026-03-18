# Synaptic Dialogues: Mapping the Psychology of AI Obsession
**Student Name:** Eliya Allam
**Matricola:** 807871
**Course:** Data Visualisation (Data Humanism)

Live WebGL Visualization: [Explore Synaptic Dialogues](https://synaptic-dialogues.vercel.app/)

(If the link above does not click, please visit: https://synaptic-dialogues.vercel.app/)

---

## 1. Project Originality & Introduction

This all honestly started with me thinking to myself "What is my current fixation?", and it was at that moment that I realised there was one answer that fit perfectly -  Artificial Intelligence. AI has transitioned from a novel utility to a constant cognitive companion. For this Data Humanism project, I chose to explore my personal relationship with AI, mapping the invisible emotional and behavioral loops of my daily interactions. I titled this project **"Synaptic Dialogues."**

The objective was to abandon traditional, sterile analytics in favor of the *Dear Data* philosophy—transforming qualitative, highly personal digital habits into a living, visual topography. I wanted to understand not just *how much* I use AI, but *why* I use it, and how my emotional state fluctuates during these digital conversations. I kept thinking to myself throughout this project: "How can i make this truly unique?" 

To capture this, I locked in **five specific variables** that are deeply relevant to my personal experience, highly correlated, and systematically measurable:

1. **The Catalyst (Categorical):** The psychological trigger that initiated the conversation. *(Categories: Blank Page Syndrome, Efficiency/Laziness, Urgency/Deadline, Curiosity/Rabbit Hole, Debugging/Stuck)*
2. **Time of Day (Time/Categorical):** When the interaction occurred. *(Categories: Morning, Afternoon, Evening, Late Night)*
3. **Interaction Friction (Ordinal):** The level of frustration or ease during the prompt engineering process. *(Scale of 1 to 5, where 1 = Instant/Perfect generation, and 5 = Total Hallucination/Failure)*
4. **Conversational Tone (Categorical):** How I naturally chose to speak to the machine. *(Categories: Commanding/Robotic, Conversational, Overly Polite, Frustrated/Aggressive)*
5. **Rabbit Hole Depth (Duration/Ordinal):** The temporal length and depth of the interaction. *(Categories: Hit and Run [<2 mins], The Back-and-Forth [2-10 mins], Deep Dive [10-30 mins], Lost in the Sauce [>30 mins])*

**Initial Assumptions:** Going into this data collection phase, my primary assumption was that most of my AI usage stemmed from "Efficiency/Laziness" during the Afternoon. I also hypothesized that "Late Night" interactions would naturally yield a higher "Interaction Friction" and a more "Frustrated" tone due to cognitive fatigue.

---

## 2. Data Collection Methodology

To ensure emotional and contextual accuracy, the data was not logged retroactively at the end of the day. I knew that the only way I could consistently log this data would be under the circumstance that it would be incredibly simple to do so.

 I dreaded the thought of recording my interactions on pen and paper and so instead, I established a strict real-time tracking protocol. I used the variables I created and established a form of multiple choice questions. I then encapsulated the form by means of an interactive digital tracker that sat right on the home screen of my phone. The idea was: **"Use AI, log it straight away!"** 
 
 I also did this to make my life easier in the future. One of the most tedious parts of data collection can be data processing and cleaning. By using a mulitple choice digital form, everytime i filled in my interaction, I automatically routed my answers to a CSV file. I now had the exact second i submitted the interaction, perfectly recorded in real time, ensuring that the data was always accurate. I now did not have to worry about spelling errors, missing values, etc.

This immediate manual recording ensured that subjective variables—such as my *Conversational Tone* and the true *Catalyst* of the interaction—were captured accurately before my memory of the micro-interaction faded. 

**Data Volume & Rubric Compliance:**
The project guidelines mandate that the final dataset must include at least 50 data points. Over the tracking period, I logged 21 distinct, chronological AI interaction events. Because each individual interaction event was rigorously measured across 5 distinct variables, the tracker yielded a rich, consistent dataset of 105 individual data points (21 events × 5 variables). 

## 3. Visualization Strategy & Medium

When it came time to visualize this data, I was thinking to myself "how can I continue striving for uniqueness." I looked at my perfectly clean CSV file and thought, *"How do I make this feel like me?"* Traditional charts—bar graphs, pie charts, scatter plots—felt entirely too sterile for something as complex as a conversation with a machine, they belong in a report, not in a demonstration, especially under the context of Data Humanism. My interactions with AI don't feel like a flat spreadsheet; they feel like a messy, sprawling network of thoughts, dead-ends, and sudden bursts of clarity. Because of this, I decided to take a massive leap and build a fully interactive, 3D procedural environment using WebGL and Three.js. I wanted to build a literal "topography of thought."

I designed the space to feel like a digital galaxy or neural network. To ensure readability amidst the complexity, I created a highly deliberate, emotionally resonant visual encoding system:

* **Node Constellation (The Catalyst):** I mapped my initial triggers to shapes. A simple *Blank Page* became a sparse mist, while intense *Debugging* became a chaotic, dense cloud. My *Curiosity* naturally took the form of a sprawling spiral galaxy.
* **Aura Color (Conversational Tone):** I wanted the overall "mood" of the interaction to be immediately visible. If I was *Overly Polite*, the node glowed a warm yellow - which i find humorous now after the week of data collection because I would have at least expected to be overlypolite on one occasion. I realised I am much more systematical with my approach, either being conversational or being robotic. If I was *Commanding/Robotic*, it glowed a sterile purple. Most tellingly, when I was *Frustrated*, the node bled a harsh, aggressive red.
* **Y-Axis Elevation (Time of Day):** I mapped time spatially. *Morning* interactions float high up in the digital atmosphere, while *Late Night* descents sink to the bottom of the environment, mirroring my sinking energy levels.
* **Particle Vibration (Interaction Friction):** This was my favorite personal touch. I wanted the viewer to *feel* my frustration. If an interaction had a friction level of 4 or 5 (Total Hallucination/Failure), the digital node physically vibrates and spits out red sparks.
* **Node Scale (Rabbit Hole Depth):** The physical size of the constellation grows depending on how long I was trapped in the conversation. A quick *Hit and Run* is a tiny speck, while a *Lost in the Sauce* interaction dominates the screen.

---

## 4. Data Analysis & Key Insights

Once the visualization was alive, I spent time just "flying" through my own data. Seeing it mapped out spatially revealed patterns that I completely missed when looking at the raw numbers.

Going into this, my main assumption was that I primarily used AI out of sheer "Efficiency/Laziness" during the afternoon. The data, however, painted a significantly different picture. While the afternoon was my most active period (15 of the 21 logged interactions), the most massive, friction-heavy nodes in my galaxy were actually clustered around *Debugging*, not laziness. 

Three major, data-backed behavioral loops emerged from the topography:

**1. The Debugging Paradox (High Friction, High Depth):** I often go to AI to fix a quick coding error, assuming it will be a "Hit and Run." However, the data showed a massive correlation between the *Debugging* catalyst and the *Lost in the Sauce* (>30 mins) depth. Out of 5 debugging sessions, not a single one was a quick <2 minute fix. Ironically, trying to save time debugging caused me to spend the most time in the AI ecosystem. It also triggered my **most** intense frustration, accounting for three of the four highest friction scores (solid 4s) recorded in the entire dataset.

**2. The Collaborative Shift (Tone vs. Complexity):**
I noticed a fascinating trend regarding my *Conversational Tone*. When dealing with quick, low-depth tasks (triggered by *Urgency* or *Efficiency*), I almost exclusively default to a *Commanding/Robotic* tone. I treat the AI strictly as a subordinate tool. However, when the catalyst shifts to *Debugging* or facing a *Blank Page*, my tone softens. In 4 out of those 7 complex instances, I shifted to a *Conversational* tone. The data suggests that when a problem requires deeper cognitive effort, I subconsciously start treating the AI as a colleague rather than a calculator.

**3. The Late Night Myth (Disproving Assumptions):**
My initial assumption was that late-night interactions would yield the highest "Interaction Friction" and a "Frustrated" tone due to cognitive fatigue. The data actively disproved this. I only logged one *Late Night* interaction, and my tone was completely *Conversational* with a moderate friction of 3. My actual highest volume of friction and my singular *Frustrated/Aggressive* outburst (10/03 21:02) occurred during the Afternoon and Evening. My fatigue doesn't happen at night; it happens at the end of the standard workday.

---

## 5. Representing Insights & Conclusion

To fulfill the requirement of a secondary insight representation—and to ensure the viewer didn't get entirely lost in the 3D galaxy—I integrated a "Key Behavioral Insights" UI sidebar directly into the WebGL environment. 

Using a sleek, glassmorphism design, this sidebar grounds the abstract 3D art by providing the viewer with hard data and plain-text summaries of the insights mentioned above. I wanted the user to be able to read the "diary" of my findings while simultaneously watching the automated cinematic drone flight navigate through the exact data points I was referencing.

**Conclusion:**
This project fundamentally changed how I view my digital footprint. Before *Synaptic Dialogues*, I viewed AI as just a tool, like a search engine. But by forcing myself to manually track my tone, my friction, and my emotional triggers across 105 rigorous data points, I realized that my interactions with AI are a direct mirror of my own mental state. Through Data Humanism, I learned that tracking my relationship with Artificial Intelligence was actually just a new way of tracking my own psychological bandwidth.

---
---

## Appendix: Insight Data Representations

To support the qualitative reflections above, I extracted the raw data from my interactions to create quantitative visual proofs of my behavioral loops.

### 1. The Debugging Paradox: Catalyst vs. Rabbit Hole Depth
*This correlation matrix highlights how the "Debugging" catalyst disproportionately leads to high-duration interactions, perfectly countering my assumption that it would result in a quick fix. Alternatively, "Urgency" always results in a strict Hit and Run.*

<div style="overflow-x:auto; margin-bottom: 30px;">
<table style="width: 100%; text-align: center; border-collapse: collapse; font-family: sans-serif; min-width: 500px;">
<thead>
<tr style="background-color: #1e1e2e; color: #a6accd;">
<th style="padding: 12px; border: 1px solid #333;">Catalyst / Depth</th>
<th style="padding: 12px; border: 1px solid #333;">Hit & Run (<2m)</th>
<th style="padding: 12px; border: 1px solid #333;">Back-and-Forth (2-10m)</th>
<th style="padding: 12px; border: 1px solid #333;">Deep Dive (10-30m)</th>
<th style="padding: 12px; border: 1px solid #333;">Lost in the Sauce (>30m)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="font-weight: bold; background-color: #1e1e2e; color: #a6accd; border: 1px solid #333;">Efficiency/Laziness</td>
<td style="background-color: rgba(97, 175, 239, 0.8); color: #fff; border: 1px solid #333;">High (2)</td>
<td style="background-color: rgba(97, 175, 239, 0.4); color: #fff; border: 1px solid #333;">Low (1)</td>
<td style="background-color: transparent; border: 1px solid #333;">None</td>
<td style="background-color: transparent; border: 1px solid #333;">None</td>
</tr>
<tr>
<td style="font-weight: bold; background-color: #1e1e2e; color: #a6accd; border: 1px solid #333;">Curiosity</td>
<td style="background-color: rgba(152, 195, 121, 0.9); color: #fff; border: 1px solid #333;">Highest (5)</td>
<td style="background-color: rgba(152, 195, 121, 0.5); color: #fff; border: 1px solid #333;">Med (2)</td>
<td style="background-color: transparent; border: 1px solid #333;">None</td>
<td style="background-color: rgba(152, 195, 121, 0.3); color: #fff; border: 1px solid #333;">Low (1)</td>
</tr>
<tr>
<td style="font-weight: bold; background-color: #1e1e2e; color: #a6accd; border: 1px solid #333;">Urgency/Deadline</td>
<td style="background-color: rgba(229, 192, 123, 0.8); color: #fff; border: 1px solid #333;">High (3)</td>
<td style="background-color: transparent; border: 1px solid #333;">None</td>
<td style="background-color: transparent; border: 1px solid #333;">None</td>
<td style="background-color: transparent; border: 1px solid #333;">None</td>
</tr>
<tr>
<td style="font-weight: bold; background-color: #1e1e2e; color: #a6accd; border: 1px solid #333;">Debugging/Stuck</td>
<td style="background-color: transparent; border: 1px solid #333;">None</td>
<td style="background-color: rgba(224, 108, 117, 0.5); color: #fff; border: 1px solid #333;">Med (2)</td>
<td style="background-color: rgba(224, 108, 117, 0.3); color: #fff; border: 1px solid #333;">Low (1)</td>
<td style="background-color: rgba(224, 108, 117, 0.9); color: #fff; border: 1px solid #333; font-weight: bold; box-shadow: inset 0 0 10px rgba(0,0,0,0.5);">High (2)</td>
</tr>
</tbody>
</table>
</div>

### 2. Disproving the Late-Night Myth: High-Friction Events by Time of Day
*This visual actively disproves my pre-project hypothesis. I assumed cognitive fatigue would cause my most frustrating interactions to happen late at night. Instead, the data reveals that my highest friction interactions (scores of 3 and 4) overwhelmingly cluster in the busy Afternoon.*

<div style="font-family: sans-serif; background-color: #1e1e2e; padding: 20px; border-radius: 8px; border: 1px solid #333; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: flex-end; height: 200px; gap: 15px; padding-bottom: 10px; border-bottom: 1px solid #555;">
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="color: #a6accd; font-size: 0.85em; margin-bottom: 5px;">0</span><div style="width: 100%; min-height: 2%; background: #444; border-radius: 4px 4px 0 0;"></div></div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="color: #e06c75; font-size: 0.95em; font-weight: bold; margin-bottom: 5px;">5</span><div style="width: 100%; min-height: 96%; background: #e06c75; border-radius: 4px 4px 0 0; box-shadow: 0 0 10px rgba(224, 108, 117, 0.5);"></div></div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="color: #a6accd; font-size: 0.85em; margin-bottom: 5px;">2</span><div style="width: 100%; min-height: 40%; background: #e5c07b; border-radius: 4px 4px 0 0;"></div></div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;"><span style="color: #a6accd; font-size: 0.85em; margin-bottom: 5px;">1</span><div style="width: 100%; min-height: 20%; background: #61afef; border-radius: 4px 4px 0 0;"></div></div>
</div>
<div style="display: flex; justify-content: space-between; margin-top: 10px; color: #a6accd; font-size: 0.85em; font-weight: bold; text-align: center;">
<div style="flex: 1;">Morning</div>
<div style="flex: 1;">Afternoon</div>
<div style="flex: 1;">Evening</div>
<div style="flex: 1;">Late Night</div>
</div>
<div style="text-align: center; color: #888; font-size: 0.75em; margin-top: 15px; font-style: italic;">Graph showing the count of high-friction interactions (Friction Scores 3 & 4)</div>
</div>