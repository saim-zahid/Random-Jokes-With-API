// Array to store favorite jokes
let favoriteJokes = [];

// Function to generate a random gradient
function getRandomGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to fetch a random joke
function fetchJoke() {
  const xhr = new XMLHttpRequest();
  const url = "https://v2.jokeapi.dev/joke/Any?type=single";

  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      if (!response.error) {
        // Display the joke
        document.getElementById("joke-text").textContent = response.joke;

        // Change the background to a random gradient
        document.body.style.background = getRandomGradient();
      } else {
        document.getElementById("joke-text").textContent = "Oops! Couldn't fetch a joke. Try again!";
      }
    } else {
      document.getElementById("joke-text").textContent = "Failed to fetch a joke. Please try again.";
    }
  };

  xhr.onerror = function () {
    document.getElementById("joke-text").textContent = "Network error. Please check your connection.";
  };

  xhr.send();
}

// Function to add joke to favorites
function addToFavorites() {
  const jokeText = document.getElementById("joke-text").textContent;

  if (jokeText && !favoriteJokes.includes(jokeText)) {
    favoriteJokes.push(jokeText);
    updateFavoritesList();
  }
}

// Function to update the favorites list
function updateFavoritesList() {
  const favoritesUl = document.getElementById("favorites-ul");
  favoritesUl.innerHTML = "";

  favoriteJokes.forEach((joke) => {
    const li = document.createElement("li");
    li.textContent = joke;
    favoritesUl.appendChild(li);
  });
}

// Function to copy joke to clipboard
function copyJoke() {
  const jokeText = document.getElementById("joke-text").textContent;
  navigator.clipboard.writeText(jokeText).then(() => {
    alert("Joke copied to clipboard!");
  });
}

// Event listeners
document.getElementById("joke-button").addEventListener("click", fetchJoke);
document.getElementById("favorites-button").addEventListener("click", addToFavorites);
document.getElementById("copy-button").addEventListener("click", copyJoke);