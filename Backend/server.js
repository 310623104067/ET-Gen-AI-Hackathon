const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- LOAD DATASET ----------------
let dataset = [];
try {
  dataset = JSON.parse(fs.readFileSync("dataset.json", "utf-8"));
} catch (e) {
  console.log("Dataset missing, using default");
}

// ---------------- ROOT ----------------
app.get("/", (req, res) => {
  res.send("🚀 AI Money Mentor Backend Running");
});

// ---------------- SCORE ENGINE ----------------
function calculateScore(data) {
  let score = 0;

  let savings_ratio = data.savings / data.income;
  let expense_ratio = data.expenses / data.income;
  let emi_ratio = data.emi / data.income;

  if (savings_ratio > 0.4) score += 40;
  else if (savings_ratio > 0.25) score += 30;
  else score += 15;

  if (expense_ratio < 0.5) score += 30;
  else score += 15;

  if (emi_ratio < 0.2) score += 30;
  else score += 10;

  return Math.min(score, 100);
}

// ---------------- RISK MODEL ----------------
function predictRisk(data) {
  let ratio = data.expenses / data.income;

  if (ratio > 0.7) return "HIGH";
  if (ratio > 0.5) return "MEDIUM";
  return "LOW";
}

// ---------------- FIRE CALCULATOR ----------------
function calculateFIRE(data) {
  let yearly = data.expenses * 12;
  return yearly * 25;
}

// ---------------- GROWTH SIMULATION ----------------
function generateGrowth(data) {
  let total = data.savings;
  let monthly = data.income - data.expenses - data.emi;
  if (monthly < 0) monthly = 0;

  let arr = [];

  for (let i = 0; i < 120; i++) {
    total += monthly;
    total *= 1.01;
    arr.push(Math.round(total));
  }

  return arr;
}

// ---------------- AI ADVICE ENGINE ----------------
function generateAdvice(score, risk) {
  if (score > 80)
    return "Excellent financial health. Focus on equity SIP + diversification.";

  if (score > 60)
    return "Good position. Improve savings rate and reduce unnecessary expenses.";

  if (score > 40)
    return "Moderate risk. Build emergency fund & reduce EMI burden.";

  return "High risk ⚠️. Cut expenses immediately and increase savings.";
}

// ---------------- SIMPLE ML (KNN STYLE) ----------------
function findClosest(data) {
  let best = dataset[0];
  let minDiff = Infinity;

  dataset.forEach(d => {
    let diff =
      Math.abs(d.income - data.income) +
      Math.abs(d.expenses - data.expenses) +
      Math.abs(d.savings - data.savings);

    if (diff < minDiff) {
      minDiff = diff;
      best = d;
    }
  });

  return best;
}

// ---------------- MAIN API ----------------
app.post("/analyze", (req, res) => {
  const data = req.body;

  const score = calculateScore(data);
  const risk = predictRisk(data);
  const fire = calculateFIRE(data);
  const growth = generateGrowth(data);
  const advice = generateAdvice(score, risk);
  const similar = findClosest(data);

  res.json({
    score,
    risk,
    fire_target: fire,
    advice,
    growth,
    similar_profile: similar
  });
});

// ---------------- START SERVER ----------------
app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});