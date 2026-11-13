const trails = [
  {id:'lake', name:'Mirror Lake Loop', level:'Easy', info:'4.2 km · 1–2 hours · 90 m gain', note:'Follow the shoreline clockwise for the best early-morning reflections. The west bank has a quiet picnic spot.', photo:'1500530855697-b586d89ba3ee'},
  {id:'ridge', name:'Juniper Ridge', level:'Moderate', info:'8.6 km · 3–4 hours · 420 m gain', note:'The trail climbs steadily through woodland before opening onto a broad ridge. Pack water for the exposed final stretch.', photo:'1472396961693-142e6e269027'},
  {id:'pass', name:'Granite Pass', level:'Challenging', info:'13.4 km · 5–7 hours · 870 m gain', note:'Expect steep switchbacks and a rocky saddle. Leave early to give yourself time for the descent.', photo:'1464822759023-fed622ff2c3b'}
];
const get = id => document.getElementById(id);
let saved = [];
try {
  const value = JSON.parse(localStorage.getItem('field-atlas-saved') || '[]');
  if (Array.isArray(value)) saved = value.filter(id => trails.some(trail => trail.id === id));
} catch {}
let level = 'All';
let savedOnly = false;

function render() {
  const query = get('search').value.trim().toLowerCase();
  const visible = trails.filter(trail =>
    (!savedOnly || saved.includes(trail.id)) &&
    (level === 'All' || trail.level === level) &&
    [trail.name, trail.level, trail.note].join(' ').toLowerCase().includes(query));
  get('count').textContent = saved.length;
  get('heading').textContent = savedOnly ? 'Your saved trails' : 'Find your next trail';
  get('status').textContent = visible.length ? visible.length + (visible.length === 1 ? ' trail' : ' trails') : 'No trails match this view.';
  get('cards').innerHTML = visible.map(trail => `
    <article class="card">
      <div class="photo"><img alt="" loading="lazy" src="https://images.unsplash.com/photo-${trail.photo}?auto=format&amp;fit=crop&amp;w=750&amp;q=80"></div>
      <div class="body"><span class="label">${trail.level}</span><h3>${trail.name}</h3><p class="meta">${trail.info}</p>
      <div class="actions"><button data-open="${trail.id}">Trail details ↗</button>
      <button data-save="${trail.id}" aria-label="Save ${trail.name}" aria-pressed="${saved.includes(trail.id)}">${saved.includes(trail.id) ? 'Saved ✓' : 'Save'}</button></div></div>
    </article>`).join('');
}
get('search').addEventListener('input', render);
get('saved').addEventListener('click', event => {
  savedOnly = !savedOnly;
  event.currentTarget.setAttribute('aria-pressed', savedOnly);
  get('trails').scrollIntoView();
  render();
});
document.querySelector('.filters').addEventListener('click', event => {
  const button = event.target.closest('[data-level]');
  if (!button) return;
  level = button.dataset.level;
  document.querySelectorAll('[data-level]').forEach(item => item.setAttribute('aria-pressed', item === button));
  render();
});
get('cards').addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) event.target.hidden = true;
}, true);
get('cards').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.save) {
    const id = button.dataset.save;
    saved = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    try { localStorage.setItem('field-atlas-saved', JSON.stringify(saved)); } catch {}
    render();
    (get('cards').querySelector('[data-save="' + id + '"]') || get('saved')).focus();
    return;
  }
  const trail = trails.find(item => item.id === button.dataset.open);
  get('trail-name').textContent = trail.name;
  get('trail-level').textContent = trail.level;
  get('trail-info').textContent = trail.info;
  get('trail-note').textContent = trail.note;
  get('details').showModal();
});
render();
