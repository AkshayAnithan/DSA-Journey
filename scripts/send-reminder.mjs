import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const workspaceRoot = fileURLToPath(new URL('..', import.meta.url));
const statePath = join(workspaceRoot, 'DSA-Mastery', '20-Revision', 'revision-state.json');
const topic = process.env.NTFY_TOPIC;
const token = process.env.NTFY_TOKEN;
const dashboardUrl = process.env.REVISION_DASHBOARD_URL || 'https://github.com/AkshayAnithan/DSA-Journey/tree/master/DSA-Mastery/20-Revision';

if (!topic || !token) {
  throw new Error('NTFY_TOPIC and NTFY_TOKEN must be configured as GitHub Actions secrets.');
}

const state = JSON.parse(await readFile(statePath, 'utf8'));
const today = new Date().toLocaleDateString('en-CA', { timeZone: state.settings.timezone });
const due = state.reviews
  .filter((review) => review.status === 'due' && review.dueDate <= today)
  .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
  .slice(0, state.settings.dailyLimit);

if (!due.length) {
  console.log('No revision reviews are due.');
  process.exit(0);
}

const overdueCount = due.filter((review) => review.dueDate < today).length;
const lines = due.map((review, index) => `${index + 1}. ${review.title}\n${review.stage.replaceAll('-', ' ')} - ${review.prompt}`).join('\n\n');
const overduePrefix = overdueCount ? `${overdueCount} overdue. ` : '';
const message = `${overduePrefix}Attempt before notes.\n\n${lines}`;
const response = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    Title: `DSA revision: ${due.length} due`,
    Priority: overdueCount ? 'high' : 'default',
    Tags: 'brain,books',
    Click: dashboardUrl
  },
  body: message
});

if (!response.ok) {
  throw new Error(`ntfy request failed: ${response.status} ${await response.text()}`);
}

console.log(`Sent ntfy reminder for ${due.length} review(s).`);