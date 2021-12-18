"use strict";

let theWheel = new Winwheel({
  outerRadius: 146, // Use these three properties to
  centerX: 200, // correctly position the wheel
  centerY: 201, // over the background.
  lineWidth: 2,
  outerRadius: 200,
  numSegments: 5,
  pointerAngle: 90,
  rotationAngle: 90,
  segments: [
    { fillStyle: "#eae56f", text: "Prize One" },
    { fillStyle: "#89f26e", text: "Prize Two" },
    { fillStyle: "#7de6ef", text: "Prize Three" },
    { fillStyle: "#e7706f", text: "Prize Four" },
    { fillStyle: "#8e44ad", text: "Prize Five" },
  ],
  //   pointerGuide: {
  //     display: true,
  //     strokeStyle: "red",
  //     lineWidth: 3,
  //   },
  animation: {
    type: "spinToStop",
    duration: 1,
    spins: 8,
    callbackFinished: "alertPrize()",
  },
});

function alertPrize() {
  let winningSegment = theWheel.getIndicatedSegment();
  theWheel.segments.forEach((item, index) => {
    if (winningSegment.text === item?.text) {
      theWheel.deleteSegment(index);
      theWheel.draw();
    }
  });
  alert("You have won " + winningSegment.text + "!");
}

function startSpin() {
  // Stop any current animation.
  theWheel.stopAnimation(false);

  // Reset the rotation angle to less than or equal to 360 so spinning again works as expected.
  // Setting to modulus (%) 360 keeps the current position.
  theWheel.rotationAngle = theWheel.rotationAngle % 360;

  // Start animation.
  theWheel.startAnimation();
}
