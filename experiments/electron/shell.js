'use strict';
const agentPanel = document.createElement('aside');
agentPanel.id = 'agent';
agentPanel.setAttribute('aria-label', 'Agent planning workspace');
const agentTitle = document.createElement('h2');
agentTitle.textContent = 'Agent workspace — preview';
const agentHint = document.createElement('p');
agentHint.textContent = 'Local draft planning only. No AI or browser automation is connected.';
const agentForm = document.createElement('form');
agentForm.id = 'task-form';
const intentLabel = document.createElement('label');
intentLabel.htmlFor = 'intent';
intentLabel.textContent = 'Task';
const intentField = document.createElement('textarea');
intentField.id = 'intent';
intentField.maxLength = 2000;
intentField.rows = 4;
const draftButton = document.createElement('button');
draftButton.type = 'submit';
draftButton.textContent = 'Draft plan';
agentForm.append(intentLabel, intentField, draftButton);
const taskList = document.createElement('div');
taskList.id = 'tasks';
taskList.setAttribute('aria-live', 'polite');
agentPanel.append(agentTitle, agentHint, agentForm, taskList);
document.body.appendChild(agentPanel);
const tabsEl = document.getElementById('tabs');
const address = document.getElementById('address');
const status = document.getElementById('status');
const tasksEl = document.getElementById('tasks');
function render(tabs) {
  tabsEl.replaceChildren();
  for (const tab of tabs) {
    const button = document.createElement('button');
    button.type = 'button'; button.setAttribute('role','tab'); button.setAttribute('aria-selected',String(tab.active));
    button.textContent = (tab.title || 'New tab').slice(0,50); button.title = tab.url;
    button.addEventListener('click', () => window.wcg.call('tabs:activate',tab.id));
    tabsEl.appendChild(button);
    if (tab.active) address.value = tab.url;
  }
}
function renderTasks(tasks) {
  tasksEl.replaceChildren();
  for (const task of tasks) {
    const card = document.createElement('section'); card.className='task';
    const title = document.createElement('h3'); title.textContent = task.intent; card.appendChild(title);
    const state = document.createElement('p'); state.textContent = 'State: ' + task.state; card.appendChild(state);
    const list = document.createElement('ol');
    for (const step of task.steps) { const li=document.createElement('li'); li.textContent=step; list.appendChild(li); }
    card.appendChild(list);
    const note=document.createElement('p'); note.className='hint'; note.textContent=task.note; card.appendChild(note);
    const dismiss=document.createElement('button'); dismiss.type='button'; dismiss.textContent='Dismiss draft';
    dismiss.addEventListener('click',async()=>{ await window.wcg.call('agent:dismiss',task.id); renderTasks(await window.wcg.call('agent:list')); });
    card.appendChild(dismiss); tasksEl.appendChild(card);
  }
}
window.wcg.onTabs(render);
window.wcg.call('tabs:list').then(render);
window.wcg.call('agent:list').then(renderTasks);
for (const [id, command] of [['new','tabs:new'],['back','tabs:back'],['forward','tabs:forward'],['reload','tabs:reload']]) document.getElementById(id).addEventListener('click', () => window.wcg.call(command));
document.getElementById('nav').addEventListener('submit', async event => { event.preventDefault(); const result = await window.wcg.call('tabs:navigate',address.value); status.textContent = result.ok ? '' : result.error; });
document.getElementById('task-form').addEventListener('submit',async event=>{
  event.preventDefault();
  const intent=document.getElementById('intent').value;
  try { await window.wcg.call('agent:draft',intent); document.getElementById('intent').value=''; renderTasks(await window.wcg.call('agent:list')); status.textContent='Draft created. No actions executed.'; }
  catch(err) { status.textContent=err.message; }
});
