const stages = {
  'same-day-recall': { label: 'Same-day recall', passDelay: 1, next: 'reconstruction' },
  reconstruction: { label: 'Reconstruction', passDelay: 3, next: 'transfer' },
  'boundary-reconstruction': { label: 'Boundary reconstruction', passDelay: 2, next: 'full-reconstruction' },
  'full-reconstruction': { label: 'Full reconstruction', passDelay: 4, next: 'contrast' },
  transfer: { label: 'Transfer', passDelay: 4, next: 'contrast' },
  contrast: { label: 'Contrast', passDelay: 7, next: 'blind-derivation' },
  'blind-derivation': { label: 'Blind derivation', passDelay: 14, next: 'mastered' }
};

let state;

const dateKey = (date = new Date()) => date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
const addDays = (days) => {
  const date = new Date(`${dateKey()}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};
const formatDate = (date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(`${date}T12:00:00Z`));

async function loadState() {
  const response = await fetch('/api/revisions');
  if (!response.ok) throw new Error('Could not load revision state.');
  state = await response.json();
  render();
}

async function saveState() {
  const response = await fetch('/api/revisions', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
  if (!response.ok) throw new Error('Could not save your review outcome.');
}

function activeReviews() {
  return state.reviews.filter((review) => review.status === 'due');
}

function render() {
  const today = dateKey();
  const reviews = activeReviews().sort((first, second) => first.dueDate.localeCompare(second.dueDate));
  const queue = reviews.filter((review) => review.dueDate <= today).slice(0, state.settings.dailyLimit);
  const upcoming = reviews.filter((review) => review.dueDate > today).slice(0, 4);
  const overdue = reviews.filter((review) => review.dueDate < today).length;

  document.querySelector('#today-label').textContent = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' }).format(new Date());
  document.querySelector('#queue-count').textContent = queue.length;
  document.querySelector('#completed-count').textContent = 0;
  document.querySelector('#queue-limit').textContent = `Up to ${state.settings.dailyLimit} reviews`;
  document.querySelector('#overdue-count').textContent = overdue ? `${overdue} overdue` : 'On schedule';
  document.querySelector('#overdue-count').classList.toggle('clear', overdue === 0);
  document.querySelector('#summary-message').textContent = queue.length ? 'One clean attempt is enough to make today count.' : 'No reviews due. Let the spacing do its work.';

  const queueElement = document.querySelector('#queue');
  queueElement.replaceChildren(...queue.map((review, index) => buildReview(review, index + 1, today)));
  if (!queue.length) queueElement.innerHTML = '<p class="empty-state">Nothing due right now.</p>';

  const upcomingElement = document.querySelector('#up-next');
  upcomingElement.replaceChildren(...upcoming.map(buildUpcoming));
  if (!upcoming.length) upcomingElement.innerHTML = '<p class="empty-state">Your next review will appear here.</p>';
}

function buildReview(review, position, today) {
  const card = document.querySelector('#review-template').content.firstElementChild.cloneNode(true);
  card.querySelector('.review-order').textContent = String(position).padStart(2, '0');
  card.querySelector('.review-topic').textContent = review.topic;
  card.querySelector('.review-title').textContent = review.title;
  card.querySelector('.stage-label').textContent = stages[review.stage]?.label ?? review.stage;
  card.querySelector('.review-prompt').textContent = review.prompt;
  card.querySelector('.due-label').textContent = review.dueDate < today ? `Overdue since ${formatDate(review.dueDate)}` : 'Due today';
  card.querySelector('.note-link').href = `/${review.notePath.split('/').map(encodeURIComponent).join('/')}`;
  card.querySelectorAll('.outcome').forEach((button) => button.addEventListener('click', () => recordOutcome(review.id, button.classList[1])));
  return card;
}

function buildUpcoming(review) {
  const item = document.createElement('article');
  item.className = 'up-next-item';
  item.innerHTML = `<div><p>${review.topic}</p><h3>${review.title}</h3></div><span>${formatDate(review.dueDate)}</span>`;
  return item;
}

async function recordOutcome(reviewId, outcome) {
  const review = state.reviews.find((entry) => entry.id === reviewId);
  const today = dateKey();
  review.history.push({ date: today, outcome, stage: review.stage });

  if (outcome === 'pass') {
    const next = stages[review.stage]?.next;
    if (next === 'mastered') {
      review.status = 'mastered';
    } else {
      review.stage = next || review.stage;
      review.dueDate = addDays(stages[review.history.at(-1).stage]?.passDelay ?? 1);
    }
  } else if (outcome === 'partial') {
    review.dueDate = addDays(1);
  } else {
    review.stage = review.stage.includes('reconstruction') ? 'same-day-recall' : 'reconstruction';
    review.dueDate = addDays(1);
  }

  await saveState();
  render();
}

document.querySelector('#refresh-button').addEventListener('click', loadState);
loadState().catch((error) => {
  document.querySelector('#queue').innerHTML = `<p class="empty-state">${error.message}</p>`;
});