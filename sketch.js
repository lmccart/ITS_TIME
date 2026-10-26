const emotions = [
  "FINE", "HAPPY", "SAD", "TIRED", "ANXIOUS",
  "EXCITED", "BORED", "CONFUSED", "SUSPICIOUS", "HAUNTED",
  "OVERQUALIFIED", "UNDERAPPRECIATED", "FRAUDULENT", "GENIUS",
  "UNSUPERVISED", "READY", "DELICATE", "INCONVENIENT",
  "PREHISTORIC", "EXPENSIVE", "DRAMATIC", "DELUSIONAL",
  "UNHINGED", "OPTIMISTIC", "PETTY", "TRANSCENDENT",
  "OBSOLETE", "INVISIBLE", "FERMENTED", "COMPETENT"
];

const fontScales = [0.03, 0.05, 0.08, 0.11, 0.14];

let message;
let backgroundColor;
let textColor;
let strokeColor;
let fontScale;
let isRotating;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Choose everything once when the page loads
  const timeText = timeToWords(new Date());
  const emotion = random(emotions);

  message = `IT IS ${timeText} AND I'M FEELING ${emotion}`;

  backgroundColor = color(random(255), random(255), random(255));
  textColor = color(random(255), random(255), random(255));
  strokeColor = color(random(255), random(255), random(255));

  fontScale = random(fontScales);
  isRotating = random() < 0.1; // 10% chance

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
}

function draw() {
  background(backgroundColor);

  push();

  // Move origin to center of canvas
  translate(width / 2, height / 2);

  // Rotate around center, if selected
  if (isRotating) {
    rotate(frameCount * 0.01);
  }

  // Text appearance
  console.log(fontScale)
  let breathing = 1 + sin(frameCount * 0.03) * 0.05;
textSize(fontScale * min(width, height) * breathing);
  fill(textColor);
  stroke(strokeColor);
  strokeWeight(2);

  // Centered text box
  text(
    message,
    -width * 0.45,
    -height * 0.45,
    width * 0.9,
    height * 0.9
  );

  pop();
}

// Convert the current time into words
function timeToWords(date) {
  let h = date.getHours() % 12 || 12;
  let m = date.getMinutes();
  let p = date.getHours() < 12 ? "AM" : "PM";

  const ones = [
    "ZERO", "ONE", "TWO", "THREE", "FOUR",
    "FIVE", "SIX", "SEVEN", "EIGHT", "NINE",
    "TEN", "ELEVEN", "TWELVE", "THIRTEEN",
    "FOURTEEN", "FIFTEEN", "SIXTEEN",
    "SEVENTEEN", "EIGHTEEN", "NINETEEN"
  ];

  const tens = [
    "", "", "TWENTY", "THIRTY", "FORTY", "FIFTY"
  ];

  const spell = n =>
    n < 20
      ? ones[n]
      : tens[Math.floor(n / 10)] +
        (n % 10 ? " " + ones[n % 10] : "");

  const minuteText =
    m === 0
      ? "O'CLOCK"
      : m < 10
        ? "OH " + spell(m)
        : spell(m);

  return `${spell(h)} ${minuteText} ${p}`;
}

// Resize without changing the random selections
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function mousePressed() {
  backgroundColor = color(random(255), random(255), random(255));
  textColor = color(random(255), random(255), random(255));
  strokeColor = color(random(255), random(255), random(255));
}function keyPressed() {
  if (key === ' ') {
    const timeText = timeToWords(new Date());
    const emotion = random(emotions);

    message = `IT IS ${timeText} AND I'M FEELING ${emotion}`;

    return false;
  }
}