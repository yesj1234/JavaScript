const clock = document.querySelector("#clock");

function tick() {
  const date = new Date().toLocaleTimeString();
  clock.innerText = `${date}`;
}

setInterval(tick, 1000);
