function analyze() {

  const income = Number(document.getElementById("income").value);
  const expenses = Number(document.getElementById("expenses").value);
  const savings = Number(document.getElementById("savings").value);
  const emi = Number(document.getElementById("emi").value);

  // 🧠 Basic calculations (fake AI logic)
  let savings_ratio = savings / income;
  let expense_ratio = expenses / income;
  let emi_ratio = emi / income;

  let score = 0;

  // Score calculation
  if (savings_ratio > 0.3) score += 30;
  else if (savings_ratio > 0.2) score += 20;
  else score += 10;

  if (expense_ratio < 0.5) score += 30;
  else score += 15;

  if (emi_ratio < 0.2) score += 40;
  else score += 20;

  // Risk prediction
  let risk = "LOW";
  if (expense_ratio > 0.6) risk = "HIGH";
  else if (expense_ratio > 0.4) risk = "MEDIUM";

  // Advice logic
  let advice = "";
  if (score > 75)
    advice = "Excellent! Invest in SIP and diversify.";
  else if (score > 50)
    advice = "Good, but improve savings.";
  else
    advice = "High risk! Reduce expenses immediately.";

  // FIRE calculation
  let fire_target = expenses * 12 * 25;

  // 🔥 Display result
  document.getElementById("result").innerHTML = `
    <h2>Score: ${score}</h2>
    <h3>Risk: ${risk}</h3>
    <p>${advice}</p>
    <p>🔥 FIRE Target: ₹${fire_target.toLocaleString()}</p>
  `;
}