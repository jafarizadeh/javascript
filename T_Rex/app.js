let my_point = document.querySelector("#my_point");
let game = document.querySelector("#game");
let dinosaur = document.querySelector("#dinosaur");
let cactus = document.querySelector("#cactus");

let point = 0;
let cactus_flag = false;

function jump_dinosaur() {
  if (!dinosaur.classList.contains("jump")) {
    dinosaur.classList.add("jump");
    setTimeout((e) => {
      dinosaur.classList.remove("jump");
    }, 600);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    cactus_flag = true;
    jump_dinosaur();
  }
});

let check_live_game = setInterval((e) => {
  let dinosaur_top = parseInt(
    window.getComputedStyle(dinosaur).getPropertyValue("top")
  );
  let cactus_left = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

  if (cactus_left > 50 && cactus_left < 100 && dinosaur_top > 160) {
    dinosaur.style.animationPlayState = "pause";
    cactus.style.animationPlayState = "pause";
    game.style.animationPlayState = "pause";
    clearInterval(check_live_game);
    alert("Game Over - Your Point : " + point + " - Try Again");
    window.location.reload();
  }

  if (cactus_left < 10 && cactus_flag) {
    point += 100;
    my_point.innerHTML = point;
    cactus_flag = false;
  }
  cactus_left = 10;
}, 10);
