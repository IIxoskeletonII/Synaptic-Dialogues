# 🌌 Synaptic Dialogues: Mapping the Psychology of AI Obsession

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Academic Target](https://img.shields.io/badge/Grade_Target-30%2F30-blue)
![Tech Stack](https://img.shields.io/badge/Tech-Three.js%20%7C%20WebGL%20%7C%20Vite-black)

🌍 **Experience the Live Interactive Topography [Here](synaptic-dialogues.vercel.app):** 

**Synaptic Dialogues** is an interactive, 3D data humanism project that transforms quantitative data about my personal interactions with Artificial Intelligence into a living, emotional topography. 

Built for the "Data Humanism" university course, this project abandons traditional, sterile charts in favor of a spatial, procedural WebGL environment. It maps the subtle behavioral shifts, emotional friction, and temporal habits of digital psychology.

---

## 📊 The Dataset & Methodology

Following the *Dear Data* philosophy, I meticulously tracked my personal AI interactions over a one week period. 

### The 5 Tracked Variables:
1. **The Catalyst (Categorical):** Why did I initiate the conversation? *(Blank Page Syndrome, Efficiency/Laziness, Urgency/Deadline, Curiosity/Rabbit Hole, Debugging/Stuck)*
2. **Time of Day (Time/Categorical):** *(Morning, Afternoon, Evening, Late Night)*
3. **Interaction Friction (Ordinal):** A scale of 1 to 5 *(1 = Instant/Perfect, 5 = Total Hallucination/Failure)*.
4. **Conversational Tone (Categorical):** How did I speak to the AI? *(Commanding/Robotic, Conversational, Overly Polite, Frustrated/Aggressive)*
5. **Rabbit Hole Depth (Duration):** How long did it last? *(Hit and Run, The Back-and-Forth, Deep Dive, Lost in the Sauce)*

---

## 🎨 Visual Encoding System

The data is translated into a 3D procedural environment using the following encoding dictionary:

* **Node Constellation (Shape) ➔ The Catalyst:** * *Blank Page* = Sparse Mist
  * *Efficiency* = Dense Core
  * *Urgency* = Vibrating Burst
  * *Curiosity* = Spiral Galaxy
  * *Debugging* = Chaotic Cloud
* **Aura Color (Glow) ➔ Conversational Tone:** * Purple = Commanding/Robotic
  * Cyan = Conversational
  * Red = Frustrated/Aggressive
  * Yellow = Overly Polite
* **Y-Axis Height ➔ Time of Day:** Higher elevations represent earlier in the day; lower elevations represent late-night descents.
* **Particle Vibration & Sparks ➔ Interaction Friction:** Higher friction (4-5) causes the node to violently vibrate and emit red procedural sparks.
* **Node Scale ➔ Rabbit Hole Depth:** The longer the interaction, the more massive the constellation.

---

## 🚀 Key Features

- **18-Second Cinematic Drone Flight:** On load, the camera autonomously traverses the "thought trail" of the data timeline.
- **Latent Space Plexus:** A dynamic, procedural background that reacts to the spatial positioning of the data.
- **Glassmorphism UI:** Interactive timeline scrubbing and "Key Behavioral Insights" sidebar built with advanced CSS backdrops.
- **Data-Driven Aurora:** The background atmosphere subtly shifts color based on the conversational tone of the currently active interaction.

---

## 💻 Installation & Local Development

This project uses [Vite](https://vitejs.dev/) and [Three.js](https://threejs.org/).

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/synaptic-dialogues.git](https://github.com/yourusername/synaptic-dialogues.git)
   cd synaptic-dialogues
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the local development server:**
   ```bash
   npm run dev
   ```
4. **View the project:** Open the `localhost` link provided in your terminal.

---
*Designed and engineered by Eliya for Data Humanism.*