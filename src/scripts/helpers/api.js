const Url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameId = '2uxnCb3QMbmkeb6NKsmo';

export const getID = async () => {
  const response = await fetch(`${Url}/games/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Dark-Corners'}),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Getting ID was unsuccessful!');
};

export const postScore = async (name, score) => {
  const response = await fetch(`${Url}/games/${gameId}/scores`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score: Number(score) }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Posting score was unsuccessful!');
};

export const getScores = async () => {
  const response = await fetch(`${Url}/games/${gameId}/scores`, {
    method: 'Get',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Getting leaderboard data was unsuccessfful');
};
