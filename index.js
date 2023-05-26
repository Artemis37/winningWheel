"use strict";

let theWheel;

const initWheel = () => {
  theWheel = new Winwheel({
    outerRadius: 146, // Use these three properties to
    centerX: 350, // correctly position the wheel
    centerY: 450, // over the background.
    lineWidth: 2,
    outerRadius: 350,
    numSegments: 1,
    pointerAngle: 90,
    rotationAngle: 90,
    textAlignment: "outer",
    segments: [{ fillStyle: "aqua", text: "" }],
    //   pointerGuide: {
    //     display: true,
    //     strokeStyle: "red",
    //     lineWidth: 3,
    //   },
    animation: {
      type: "spinToStop",
      duration: 8,
      spins: 8,
      callbackFinished: "alertPrize()",
    },
  });
};

initWheel();

const colorArr = ["#eae56f", "#89f26e", "#7de6ef", "#e7706f", "#8e44ad"];

function alertPrize() {
  let winningSegment = theWheel.getIndicatedSegment();
  theWheel.segments.forEach((item, index) => {
    if (winningSegment.text === item?.text) {
      Swal.fire({
        title: "You have won " + winningSegment.text,
        text: "Xóa người quay trúng",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#fd79a8",
        cancelButtonColor: "#7f8c8d",
        confirmButtonText: "Xóa",
      }).then((result) => {
        if (result.isConfirmed) {
          theWheel.deleteSegment(index);
          theWheel.draw();
        }
      });
    }
  });
}

function calculatePrize(start, end) {
  // This formula always makes the wheel stop somewhere inside prize 3 at least
  // 1 degree away from the start and end edges of the segment.
  let stopAt = start + 1 + Math.floor(Math.random() * (end - start - 2));

  // Important thing is to set the stopAngle of the animation before stating the spin.
  theWheel.animation.stopAngle = stopAt;

  theWheel.stopAnimation(false);

  // Reset the rotation angle to less than or equal to 360 so spinning again works as expected.
  // Setting to modulus (%) 360 keeps the current position.
  theWheel.rotationAngle = theWheel.rotationAngle % 360;

  // Start animation.
  theWheel.startAnimation();
}

let i = 0;
function startSpin() {
  // if (i === 0) {
    const whitelist = JSON.parse(localStorage.getItem("whitelist"));
    theWheel.segments.forEach((item, index) => {
      if (whitelist.includes(item?.text)) {
        const startAngle = item.startAngle;
        const endAngle = item.endAngle;
        calculatePrize(startAngle, endAngle);
      }
    });
    // i++;
  // } else {
  //   calculatePrize(0, 360);
  // }
}

function add_segment() {
  let name = document.getElementById("name").value;
  //replace multiple \n with one \n
  if (name.length > 0) {
    const regex = /\n{2,}/g;
    name = name.replaceAll(regex, "\n");
    const nameArr = name.split("\n");
    nameArr.forEach((item, index) => {
      addSegment(item);
    });
  }
}

let index = 0;

function addSegment(name) {
  if (theWheel.segments.length === 2 && theWheel.segments[1].text === "") {
    theWheel.segments[1].text = name;
    theWheel.segments[1].fillStyle = colorArr[index];
    index++;
  } else {
    theWheel.addSegment(
      {
        text: name,
        fillStyle: colorArr[index],
      },
      1
    );
  }
  index++;
  if (index > 4) {
    index = 0;
  }
  theWheel.draw();
}

document.getElementById("name").addEventListener("keypress", (event) => {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();

    initWheel();
    add_segment();
    theWheel.draw();
  }
});


// document.getElementById("name").onchange = () => {
//   initWheel();
//   add_segment();

//   theWheel.draw();
// };
