// Dummy data
// const imageCount = 10; 
const posts = Array.from({ length:100}, (_, i) => ({
  id: i + 1,
  category: 'Campaign',
  title: `Jangan Asal Pilih Influencer, Kenali Tingkatan Influencers Berdasarkan Jumlah Followers dan Strategi Efektif`,
  image: `https://picsum.photos/seed/${i}/400/300`,
  // image: `imeges/p1${i}/400/300`,
// image: `images/product-${i + 1}.jpg`,
// image: `images/p1-${(i % 10) + 1}.jpg`,
  createdAt: new Date(2024, 0, i + 1)
}));

// let currentPage = 1;
// let perPage = 10;
// let sortBy = 'newest';

let currentPage = parseInt(localStorage.getItem('page')) || 1;
let perPage = parseInt(localStorage.getItem('perPage')) || 10;
let sortBy = localStorage.getItem('sortBy') || 'newest';

const postList = document.getElementById('postList');
const pagination = document.getElementById('pagination');
const showPerPage = document.getElementById('showPerPage');
const sortSelect = document.getElementById('sortBy');
const status = document.getElementById('status');

// Handle header show/hide
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  const currentScroll = window.pageYOffset;
  header.classList.toggle('hide-header', currentScroll > lastScroll && currentScroll > 100);
  lastScroll = currentScroll;
});

// Update UI
function updateList() {
  localStorage.setItem('page', currentPage);
  localStorage.setItem('perPage', perPage);
  localStorage.setItem('sortBy', sortBy);

  let sortedPosts = [...posts];
  sortedPosts.sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt - a.createdAt;
    else return a.createdAt - b.createdAt;
  });

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pagePosts = sortedPosts.slice(start, end);

  status.innerText = `Showing ${start + 1} - ${Math.min(end, sortedPosts.length)} of ${sortedPosts.length}`;

  postList.innerHTML = pagePosts.map(post => `
    <div class="card">
      <img src="${post.image}" loading="lazy" />
      <div class="content">
        <div class="category">${post.category}</div>
        <div class="title">${post.title}</div>
      </div>
    </div>
  `).join('');

  renderPagination(sortedPosts.length);
}

function renderPagination(total) {
  const pages = Math.ceil(total / perPage);
  let buttons = '';
  for (let i = 1; i <= pages; i++) {
    buttons += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }
  pagination.innerHTML = buttons;
}

function goToPage(page) {
  currentPage = page;
  updateList();
}

// Event Listeners
showPerPage.value = perPage;
sortSelect.value = sortBy;

showPerPage.addEventListener('change', (e) => {
  perPage = parseInt(e.target.value);
  currentPage = 1;
  updateList();
});

sortSelect.addEventListener('change', (e) => {
  sortBy = e.target.value;
  currentPage = 1;
  updateList();
});

// Init
updateList();
