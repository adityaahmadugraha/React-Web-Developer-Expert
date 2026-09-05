const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

async function _fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

function _handleError(responseJson) {
  const { status, message } = responseJson;
  if (status !== 'success') {
    throw new Error(message);
  }
  return responseJson.data;
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();
  const { user } = _handleError(responseJson);
  return user;
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();
  const { token } = _handleError(responseJson);
  return token;
}

async function getOwnProfile() {
  const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
  const responseJson = await response.json();
  const { user } = _handleError(responseJson);
  return user;
}

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const responseJson = await response.json();
  const { users } = _handleError(responseJson);
  return users;
}

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`);
  const responseJson = await response.json();
  const { threads } = _handleError(responseJson);
  return threads;
}

async function getThreadDetail(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);
  const responseJson = await response.json();
  const { detailThread } = _handleError(responseJson);
  return detailThread;
}

async function createThread({ title, body, category = '' }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, category }),
  });

  const responseJson = await response.json();
  const { thread } = _handleError(responseJson);
  return thread;
}

async function createComment({ threadId, content }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  const responseJson = await response.json();
  const { comment } = _handleError(responseJson);
  return comment;
}

async function upVoteThread(threadId) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, { method: 'POST' });
  const responseJson = await response.json();
  return _handleError(responseJson).vote;
}

async function downVoteThread(threadId) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, { method: 'POST' });
  const responseJson = await response.json();
  return _handleError(responseJson).vote;
}

async function neutralizeVoteThread(threadId) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, { method: 'POST' });
  const responseJson = await response.json();
  return _handleError(responseJson).vote;
}

async function upVoteComment(threadId, commentId) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, { method: 'POST' });
  const responseJson = await response.json();
  return _handleError(responseJson).vote;
}

async function downVoteComment(threadId, commentId) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, { method: 'POST' });
  const responseJson = await response.json();
  return _handleError(responseJson).vote;
}

async function neutralizeVoteComment(threadId, commentId) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, { method: 'POST' });
  const responseJson = await response.json();
  return _handleError(responseJson).vote;
}

async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const responseJson = await response.json();
  const { leaderboards } = _handleError(responseJson);
  return leaderboards;
}

const api = {
  putAccessToken,
  getAccessToken,
  removeAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
  getLeaderboards,
};

export default api;
