/* if authlocked...
const id = "" <= OAuthID
const secret = "" <= OAuthSecret
const params = `?client_id=${id}&client_secret=${secret}` */

//Remember, we need to import more babel libraries for async/await so keep to Promise.then() syntax for now

function getErrorMessage(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }

  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }
      return profile;
    });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]).then((results) => sortPlayers(results));
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
