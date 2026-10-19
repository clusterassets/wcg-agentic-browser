'use strict';
const tabsEl = document.getElementById('tabs');
const address = document.getElementById('address');
const status = document.getElementById('status');
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
window.wcg.onTabs(render);
window.wcg.call('tabs:list').then(render);
for (const [id, command] of [['new','tabs:new'],['back','tabs:back'],['forward','tabs:forward'],['reload','tabs:reload']]) document.getElementById(id).addEventListener('click', () => window.wcg.call(command));
document.getElementById('nav').addEventListener('submit', async event => { event.preventDefault(); const result = await window.wcg.call('tabs:navigate',address.value); status.textContent = result.ok ? '' : result.error; });
