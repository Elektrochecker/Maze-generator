saveImageButton = document.getElementById("save-button")
showEndsButton = document.getElementById("ends-button")
extraSlider = document.getElementById("extra-slider")

saveImageButton.onclick = () => {
    saveCanvas("maze.png")
}

showEndsButton.onclick = () => {
    showEnds = !showEnds;
}