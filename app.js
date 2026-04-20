/* ═══════════════════════════════════════════════════
   NV LEARN – APPLICATION LOGIC
   Ngọc Việt Group · AI Training Platform
════════════════════════════════════════════════════ */

// --- MOCK DATA ---
let usersData = JSON.parse(localStorage.getItem('nv_learn_users_v2')) || [
  { id: 'u1', name: 'Nguyễn Văn A', email: 'a@ngocviet.com.vn', password: '123', role: 'learner', avatar: 'A' },
  { id: 'u3', name: 'Quản trị viên', email: 'admin@ngocviet.com.vn', password: 'admin', role: 'admin', avatar: '🛡️' }
];

let coursesData = JSON.parse(localStorage.getItem('nv_learn_courses_v3')) || [
  {
    id: 'c1',
    title: 'GIAI ĐOẠN 1: AI STRATEGY & MINDSET',
    description: 'Khai mở tư duy "AI-First" và thiết lập mục tiêu chuyển đổi cá nhân cho toàn bộ nhân sự.',
    emoji: '🚀',
    modules: [
      { 
        id: 'm1_1', 
        title: 'Buổi 01: Khai mở tư duy AI & Chiến lược bứt phá', 
        desc: '- Làn sóng AI 2026 và tương lai Ngọc Việt.\n- 10 Use-case AI thực chiến cho tập đoàn đa ngành.\n- Demo Workflow: Từ dữ liệu thô -> Slide -> Báo cáo -> Email trong 5 phút.', 
        tools: 'Google Gemini, Gamma', 
        link: '#', 
        type: 'embed' 
      }
    ]
  },
  {
    id: 'c2',
    title: 'GIAI ĐOẠN 2: AI PRODUCTIVITY TRAINING',
    description: 'Đào tạo online hàng tuần. Cấu trúc mỗi buổi (60 phút): 15\' AI News & Pro-Tools Update | 35\' Topic chuyên đề | 10\' Q&A.',
    emoji: '💻',
    modules: [
      { id: 'm2_2', title: 'Buổi 02: AI Prompting Mastery', desc: 'Kỹ thuật điều khiển AI đa tầng để giải quyết bài toán nghiệp vụ phức tạp.', tools: 'Google Gemini', link: '#', type: 'embed' },
      { id: 'm2_3', title: 'Buổi 03: AI cho Giao tiếp doanh nghiệp', desc: 'Tự động hóa soạn thảo Email, Proposal, dịch thuật đa ngôn ngữ.', tools: 'Gemini, DeepL', link: '#', type: 'embed' },
      { id: 'm2_4', title: 'Buổi 04: AI Quản trị tri thức (Phần 1)', desc: 'Biến kho tài liệu nội bộ thành "trợ lý thông minh".', tools: 'NotebookLM', link: '#', type: 'embed' },
      { id: 'm2_5', title: 'Buổi 05: AI Presentation & Visual', desc: 'Thiết kế Slide thuyết trình chuyên nghiệp và hình ảnh thương hiệu.', tools: 'Gamma, Imagen 3', link: '#', type: 'embed' },
      { id: 'm2_6', title: 'Buổi 06: AI Video & Media', desc: 'Khởi tạo Video kể chuyện, giới thiệu dự án và đào tạo nội bộ.', tools: 'Google Vids', link: '#', type: 'embed' },
      { id: 'm2_7', title: 'Buổi 07: AI Data Analysis', desc: 'Phân tích báo cáo tài chính, thị trường và dự báo đầu tư không dùng hàm.', tools: 'Gemini (Analysis)', link: '#', type: 'embed' },
      { id: 'm2_8', title: 'Buổi 08: AI Automation & Agent', desc: 'Xây dựng trợ lý ảo (No-code) hỗ trợ tác vụ lặp lại.', tools: 'Google AI Studio', link: '#', type: 'embed' },
      { id: 'm2_9', title: 'Buổi 09: TỔNG KẾT & HỆ THỐNG HÓA', desc: 'Ôn tập toàn bộ Workflow buổi 2-8; Giải đáp vướng mắc thực tế.', tools: 'MiraBOT, MiraEDU', link: '#', type: 'embed' }
    ]
  },
  {
    id: 'c3',
    title: 'GIAI ĐOẠN 3: AI APPLICATION WORKSHOP',
    description: 'Đào tạo chuyên sâu theo khối, tạo ra các Deliverables và công cụ thực tế.',
    emoji: '🏢',
    modules: [
      { id: 'm3_1', title: 'Tài chính/ Kế toán', desc: 'Soát xét hợp đồng, phân tích đầu tư năng lượng/BĐS.', tools: 'Gemini Advanced, NotebookLM', link: '#', type: 'embed' },
      { id: 'm3_2', title: 'Sales/ MKT', desc: 'Content Engine đa kênh, Video giới thiệu dự án, Chatbot tư vấn.', tools: 'Google Vids, Gemini, MiraBOT', link: '#', type: 'embed' },
      { id: 'm3_3', title: 'HR/ Hành chính', desc: 'Tuyển dụng tự động, Sổ tay nhân viên tương tác, Đào tạo Onboarding.', tools: 'NotebookLM, MiraEDU', link: '#', type: 'embed' },
      { id: 'm3_4', title: 'Sản xuất/ Kỹ thuật', desc: 'Soạn SOP thông minh, chẩn đoán lỗi kỹ thuật hiện trường qua hình ảnh.', tools: 'Gemini Vision, AI Studio', link: '#', type: 'embed' }
    ]
  }
];

// --- APP STATE ---
let currentUser = null;
let userProgress = JSON.parse(localStorage.getItem('nv_learn_progress_v3')) || {}; 
// format: { userId: { moduleId: true } }
let currentAdminCourse = null;

function saveSystemData() {
  localStorage.setItem('nv_learn_users_v2', JSON.stringify(usersData));
  localStorage.setItem('nv_learn_courses_v3', JSON.stringify(coursesData));
}

// --- DOM ELEMENTS ---
const el = {
  screenLogin: document.getElementById('screen-login'),
  screenApp: document.getElementById('screen-app'),
  loginEmailForm: document.getElementById('login-email-form'),
  loginMasterForm: document.getElementById('login-master-form'),
  sidebar: document.getElementById('sidebar'),
  overlay: document.getElementById('sidebar-overlay'),
  topbarTitle: document.getElementById('topbar-title'),
  toast: document.getElementById('toast'),
  navMyLearning: document.getElementById('nav-my-learning'),
  
  // Stats
  statEnrolled: document.getElementById('stat-enrolled'),
  statCompleted: document.getElementById('stat-completed-lessons'),
  statProgress: document.getElementById('stat-overall-progress'),
  statStreak: document.getElementById('stat-streak')
};

// --- INITIALIZATION ---
function init() {
  const savedUserId = localStorage.getItem('nv_learn_user');
  if (savedUserId) {
    const user = usersData.find(u => u.id === savedUserId);
    if (user) {
      login(user);
    } else {
      showScreen('login');
    }
  } else {
    showScreen('login');
  }
}

// --- UTILS ---
function showScreen(screen) {
  el.screenLogin.style.display = screen === 'login' ? 'flex' : 'none';
  el.screenApp.style.display = screen === 'app' ? 'flex' : 'none';
}

function showToast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  setTimeout(() => el.toast.classList.remove('show'), 3000);
}

// --- AUTHENTICATION ---
function switchLoginTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  
  if (tab === 'email') {
    el.loginEmailForm.style.display = 'block';
    el.loginMasterForm.style.display = 'none';
  } else {
    el.loginEmailForm.style.display = 'none';
    el.loginMasterForm.style.display = 'block';
  }
}

function quickLogin(type) {
  if (type === 'learner') login(usersData[0]);
  if (type === 'admin') login(usersData[1]);
}

function handleLogin() {
  const activeTab = document.querySelector('.tab-btn.active').id;
  if (activeTab === 'tab-master') {
    const pw = document.getElementById('master-password').value;
    if (pw === 'ngocviet2024') quickLogin('learner');
    else if (pw === 'admin2024') quickLogin('admin');
    else alert('Mật khẩu không đúng!');
  } else {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const user = usersData.find(u => u.email === email && (!u.password || u.password === pass));
    if (user) login(user);
    else alert('Email hoặc mật khẩu không đúng!');
  }
}

function login(user) {
  currentUser = user;
  localStorage.setItem('nv_learn_user', user.id);
  
  if (!userProgress[user.id]) userProgress[user.id] = {};
  
  // UI Updates
  document.getElementById('sidebar-username').textContent = user.name;
  document.getElementById('sidebar-role').textContent = user.role === 'admin' ? 'Quản trị viên' : 'Học viên';
  document.getElementById('sidebar-avatar').textContent = user.avatar;
  


  showScreen('app');
  navigate('dashboard');
  showToast(`Chào mừng ${user.name}!`);
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('nv_learn_user');
  showScreen('login');
}

// --- NAVIGATION ---
function navigate(pageId) {
  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navBtn = document.getElementById(`nav-${pageId}`);
  if (navBtn) navBtn.classList.add('active');

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show target page
  if (pageId.startsWith('course-detail-')) {
    document.getElementById('page-course-detail').classList.add('active');
    renderCourseDetail(pageId.replace('course-detail-', ''));
  } else if (pageId.startsWith('admin-course-detail-')) {
    const p = document.getElementById('page-admin-course-detail');
    p.classList.add('active');
    p.style.display = 'block';
    renderAdminCourseDetail(pageId.replace('admin-course-detail-', ''));
  } else {
    const p = document.getElementById('page-admin-course-detail');
    if(p) p.style.display = 'none';
    const pageEl = document.getElementById(`page-${pageId}`);
    if (pageEl) pageEl.classList.add('active');
  }

  // Close sidebar on mobile
  if (window.innerWidth <= 900) toggleSidebar();

  // Route logic
  if (pageId === 'dashboard') renderDashboard();
  if (pageId === 'courses') renderCourses();
  if (pageId === 'admin') renderAdmin();
}

function toggleSidebar() {
  el.sidebar.classList.toggle('open');
  el.overlay.classList.toggle('open');
}

// --- RENDERING ---

function getVisibleCourses() {
  return coursesData;
}

function getCourseProgress(courseId) {
  if (!currentUser) return 0;
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return 0;
  
  let totalLessons = 0;
  let completedLessons = 0;
  
  course.modules.forEach(m => {
    totalLessons++;
    if (userProgress[currentUser.id] && userProgress[currentUser.id][m.id]) {
      completedLessons++;
    }
  });
  
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}

function renderCourseCard(course) {
  const progress = getCourseProgress(course.id);
  
  return `
    <div class="course-card" onclick="navigate('course-detail-${course.id}')">
      <div class="course-thumb">
        <span class="course-thumb-emoji">${course.emoji}</span>
      </div>
      <div class="course-body">
        <h4 class="course-title">${course.title}</h4>
        <p class="course-desc">${course.description}</p>
        
        <div class="course-progress-wrap">
          <div class="progress-bar-full">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <span class="progress-label">${progress}% Hoàn thành</span>
        </div>
      </div>
    </div>
  `;
}

function renderDashboard() {
  document.getElementById('welcome-msg').textContent = `Xin chào ${currentUser.name}! 👋`;
  
  if (currentUser.role === 'admin') {
    document.getElementById('dashboard-learner-view').style.display = 'none';
    document.getElementById('dashboard-admin-view').style.display = 'block';
    document.getElementById('dashboard-subtitle').textContent = 'Tổng quan hệ thống đào tạo';
    document.getElementById('btn-explore-courses').style.display = 'none';

    const learners = usersData.filter(u => u.role === 'learner');
    
    // Calculate system stats
    document.getElementById('admin-stat-users').textContent = learners.length;
    document.getElementById('admin-stat-courses').textContent = coursesData.length;
    
    let totalLessons = 0;
    coursesData.forEach(c => {
      totalLessons += c.modules.length;
    });
    document.getElementById('admin-stat-lessons').textContent = totalLessons;
    
    let systemCompletedLessons = 0;
    learners.forEach(u => {
      if (userProgress[u.id]) {
        systemCompletedLessons += Object.keys(userProgress[u.id]).length;
      }
    });
    
    let maxPossibleCompleted = learners.length * totalLessons;
    let avgProgress = maxPossibleCompleted === 0 ? 0 : Math.round((systemCompletedLessons / maxPossibleCompleted) * 100);
    
    document.getElementById('admin-stat-rate').textContent = `${avgProgress}%`;

    // Render users table
    let html = '';
    learners.forEach(u => {
      let uCompleted = userProgress[u.id] ? Object.keys(userProgress[u.id]).length : 0;
      let uProgress = totalLessons === 0 ? 0 : Math.round((uCompleted / totalLessons) * 100);
      
      html += `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td>${u.email}</td>
          <td>Học viên</td>
          <td>
            <div class="progress-bar-full" style="width: 100px; display:inline-block; vertical-align:middle; margin-right: 8px;">
              <div class="progress-fill" style="width: ${uProgress}%"></div>
            </div>
            <span style="font-size:.85rem;">${uProgress}%</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-sm danger" onclick="deleteUser('${u.id}')">🗑️ Xóa</button>
            </div>
          </td>
        </tr>
      `;
    });
    document.getElementById('admin-users-tbody').innerHTML = html;
  } else {
    document.getElementById('dashboard-learner-view').style.display = 'block';
    document.getElementById('dashboard-admin-view').style.display = 'none';
    document.getElementById('dashboard-subtitle').textContent = 'Tiếp tục hành trình học AI của bạn hôm nay';
    document.getElementById('btn-explore-courses').style.display = 'block';

    const courses = getVisibleCourses();
    
    // Stats calc
    let totalCompleted = 0;
    if (userProgress[currentUser.id]) {
      totalCompleted = Object.keys(userProgress[currentUser.id]).length;
    }
    
    let totalLessonsInSystem = 0;
    courses.forEach(c => totalLessonsInSystem += c.modules.length);
    let overallProg = totalLessonsInSystem === 0 ? 0 : Math.round((totalCompleted / totalLessonsInSystem) * 100);
    
    document.getElementById('stat-enrolled').textContent = courses.length;
    document.getElementById('stat-completed-lessons').textContent = totalCompleted;
    if(document.getElementById('stat-streak')) document.getElementById('stat-streak').textContent = '0';
    document.getElementById('stat-overall-progress').textContent = overallProg + '%';
    
    const cardsHtml = courses.map(c => renderCourseCard(c)).join('');
    document.getElementById('continue-cards').innerHTML = cardsHtml || '<div class="empty-state">Bạn chưa bắt đầu khóa học nào</div>';
    document.getElementById('recommended-cards').innerHTML = cardsHtml;
  }
}

function renderCourses() {
  if (currentUser && currentUser.role === 'admin') {
    document.getElementById('admin-courses-management').style.display = 'block';
    document.getElementById('learner-courses-view').style.display = 'none';
    document.getElementById('btn-create-course-header').style.display = 'block';
    document.getElementById('page-courses-title').textContent = 'Quản lý khóa học';
    document.getElementById('page-courses-subtitle').textContent = 'Tạo, sửa, xóa các khóa học trong hệ thống';
    
    let html = '';
    coursesData.forEach(c => {
      html += `
        <tr>
          <td><strong>${c.title}</strong></td>
          <td>${c.modules.length}</td>
          <td>
            <div class="table-actions">
              <button class="btn-sm" onclick="navigate('admin-course-detail-${c.id}')">⚙️ Quản lý chi tiết</button>
              <button class="btn-sm" onclick="openEditCourseModal('${c.id}')">✏️ Sửa</button>
              <button class="btn-sm danger" onclick="deleteCourse('${c.id}')">🗑️ Xóa</button>
            </div>
          </td>
        </tr>
      `;
    });
    document.getElementById('admin-courses-tbody').innerHTML = html;
  } else {
    document.getElementById('admin-courses-management').style.display = 'none';
    document.getElementById('btn-create-course-header').style.display = 'none';
    document.getElementById('learner-courses-view').style.display = 'block';
    document.getElementById('page-courses-title').textContent = 'Tất cả khóa học';
    document.getElementById('page-courses-subtitle').textContent = 'Chọn chương trình phù hợp với bạn';
    
    const courses = getVisibleCourses();
    document.getElementById('all-courses-grid').innerHTML = courses.map(c => renderCourseCard(c)).join('') || '<div class="empty-state">Không có khóa học nào</div>';
  }
}

// --- COURSE DETAIL ---
let currentCourse = null;
let currentLesson = null;

function renderCourseDetail(courseId) {
  currentCourse = coursesData.find(c => c.id === courseId);
  if (!currentCourse) return;
  
  document.getElementById('detail-course-title').textContent = currentCourse.title;
  updateCourseDetailProgress();
  
  let modulesHtml = '';
  currentCourse.modules.forEach((m, mIndex) => {
    const isDone = userProgress[currentUser.id] && userProgress[currentUser.id][m.id];
    modulesHtml += `
      <div class="module-item lesson-item" onclick="loadModule('${m.id}')" id="module-item-${m.id}" style="padding:0; margin-bottom: 8px;">
        <div class="module-header" style="border-bottom:none; cursor:pointer;">
          <div style="display:flex; gap:12px;">
            <div class="lesson-check ${isDone ? 'done' : ''}" style="margin-top:2px;">${isDone ? '✓' : ''}</div>
            <div>
              <div style="font-weight:600">${mIndex + 1}. ${m.title}</div>
              ${m.desc ? `<div style="font-size: .85rem; margin-top: 4px; font-weight:normal;">${m.desc}</div>` : ''}
              <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top: 6px;">
                ${m.duration ? `<span style="font-size: .75rem; color: var(--text-muted); font-weight:normal;">⏱️ ${m.duration}</span>` : ''}
                ${m.tools ? `<span style="font-size: .75rem; color: var(--text-muted); font-weight:normal;">🛠️ ${m.tools}</span>` : ''}
                ${m.refs ? `<span style="font-size: .75rem; color: var(--text-muted); font-weight:normal;">📚 ${m.refs.startsWith('http') ? `<a href="${m.refs}" target="_blank" style="color:var(--primary);text-decoration:underline;">Tài liệu đính kèm</a>` : m.refs}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  document.getElementById('module-list').innerHTML = modulesHtml;
  document.getElementById('lesson-player').innerHTML = `
    <div class="lesson-placeholder">
      <div class="placeholder-icon">📖</div>
      <p>Chọn một bài học ở menu bên trái để bắt đầu</p>
    </div>
  `;
}

function loadModule(moduleId) {
  document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`module-item-${moduleId}`).classList.add('active');
  
  currentLesson = currentCourse.modules.find(m => m.id === moduleId);
  
  const isDone = userProgress[currentUser.id] && userProgress[currentUser.id][moduleId];
  
  let contentHtml = '';
  if (currentLesson.type === 'embed' && currentLesson.link && currentLesson.link !== '#') {
    contentHtml = `
      <div class="drive-embed-wrap">
        <iframe src="${currentLesson.link}" allowfullscreen></iframe>
      </div>
    `;
  } else {
    contentHtml = `
      <div class="drive-fallback">
        <h3>Tài liệu này cần mở ở tab mới</h3>
        <br>
        <a href="${currentLesson.link === '#' ? 'javascript:void(0)' : currentLesson.link}" ${currentLesson.link !== '#' ? 'target="_blank"' : ''} class="btn-primary">Mở tài liệu ↗</a>
      </div>
    `;
  }
  
  let actionBtnHtml = '';
  if (isDone) {
    actionBtnHtml = `<button class="btn-success" disabled>✅ Đã hoàn thành</button>`;
  } else if (currentLesson.quiz && currentLesson.quiz.length > 0) {
    actionBtnHtml = `<button class="btn-primary" onclick="startQuiz('${moduleId}')">📝 Làm bài kiểm tra</button>`;
  } else {
    actionBtnHtml = `<button class="btn-success" onclick="markLessonComplete('${moduleId}')" id="btn-mark-done">Đánh dấu hoàn thành</button>`;
  }
  
  document.getElementById('lesson-player').innerHTML = `
    <div class="lesson-content-header">
      <h2 class="lesson-content-title">${currentLesson.title}</h2>
      ${currentLesson.desc ? `<p class="lesson-content-desc">${currentLesson.desc}</p>` : ''}
    </div>
    
    ${contentHtml}
    
    <div class="lesson-actions">
      ${actionBtnHtml}
    </div>
  `;
}

function markLessonComplete(lessonId) {
  if (!userProgress[currentUser.id]) userProgress[currentUser.id] = {};
  userProgress[currentUser.id][lessonId] = true;
  localStorage.setItem('nv_learn_progress_v3', JSON.stringify(userProgress));
  
  // Update UI
  document.getElementById('btn-mark-done').innerHTML = '✅ Đã hoàn thành';
  document.querySelector(`#module-item-${lessonId} .lesson-check`).classList.add('done');
  document.querySelector(`#module-item-${lessonId} .lesson-check`).textContent = '✓';
  
  updateCourseDetailProgress();
  showToast('Đã lưu tiến độ!');
}

function updateCourseDetailProgress() {
  const prog = getCourseProgress(currentCourse.id);
  document.getElementById('detail-progress-bar').style.width = `${prog}%`;
  document.getElementById('detail-progress-label').textContent = `${prog}%`;
}






function renderAdminCourseDetail(courseId) {
  currentAdminCourse = coursesData.find(c => c.id === courseId);
  if (!currentAdminCourse) return;
  
  document.getElementById('admin-detail-course-title').textContent = currentAdminCourse.title;
  
  // Render content
  let contentHtml = '';
  currentAdminCourse.modules.forEach((m, mIdx) => {
    contentHtml += `
      <div style="margin-bottom: 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); overflow:hidden;">
        <div style="background: var(--surface2); padding: 12px 16px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight: 700;">${mIdx + 1}. ${m.title}</div>
            ${m.desc ? `<div style="font-size: .85rem; margin-top: 4px; color: var(--text);">${m.desc}</div>` : ''}
            <div style="display:flex; gap:16px; flex-wrap:wrap; margin-top: 8px;">
              ${m.duration ? `<div style="font-size: .8rem; color: var(--text-muted);">⏱️ ${m.duration}</div>` : ''}
              ${m.tools ? `<div style="font-size: .8rem; color: var(--text-muted);">🛠️ ${m.tools}</div>` : ''}
              ${m.refs ? `<div style="font-size: .8rem; color: var(--text-muted);">📚 ${m.refs.startsWith('http') ? `<a href="${m.refs}" target="_blank" style="color:var(--primary);text-decoration:underline;">Tài liệu đính kèm</a>` : m.refs}</div>` : ''}
            </div>
            <div style="margin-top: 8px; font-size: .8rem; color: var(--text-muted);">
              🔗 <a href="${m.link && m.link !== '#' ? m.link : 'javascript:void(0)'}" target="_blank" style="color:var(--primary)">${m.link || 'Chưa có nội dung'}</a> 
              (${m.type === 'embed' ? 'Nhúng' : 'Tab mới'})
            </div>
          </div>
          <div>
            <button class="btn-sm" onclick="openQuizManager('${m.id}')" style="padding: 4px 10px; font-size:.8rem; margin-right: 4px; background:var(--primary); color:white; border:none;">📝 Bài thi (${m.quiz ? m.quiz.length : 0})</button>
            <button class="btn-sm" onclick="openEditModuleModal('${m.id}')" style="padding: 4px 10px; font-size:.8rem; margin-right: 4px;">Sửa bài học</button>
            <button class="btn-sm danger" onclick="deleteModule('${m.id}')" style="padding: 4px 10px; font-size:.8rem;">Xóa</button>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById('admin-course-content').innerHTML = contentHtml || '<div class="empty-state" style="padding: 20px;">Chưa có bài học nào.</div>';
  
  // Render students progress
  let studentsHtml = '';
  let learners = usersData.filter(u => u.role === 'learner');
  
  let totalLessons = currentAdminCourse.modules.length;
  
  if (learners.length === 0) {
    studentsHtml = '<div style="font-size:.85rem; color:var(--text-muted)">Chưa có học viên nào trong hệ thống.</div>';
  } else {
    learners.forEach(user => {
      let completedLessons = 0;
      currentAdminCourse.modules.forEach(m => {
        if (userProgress[user.id] && userProgress[user.id][m.id]) {
          completedLessons++;
        }
      });
      
      let prog = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
      
      studentsHtml += `
        <div style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; font-size:.88rem; margin-bottom:8px;">
            <strong>${user.name}</strong>
            <span style="font-weight: 600; color: ${prog === 100 ? 'var(--success)' : 'var(--text)'}">${prog}%</span>
          </div>
          <div class="progress-bar-full">
            <div class="progress-fill" style="width: ${prog}%; ${prog === 100 ? 'background: var(--success);' : ''}"></div>
          </div>
        </div>
      `;
    });
  }
  
  document.getElementById('admin-course-students').innerHTML = studentsHtml;
}


// --- MODALS & ADMIN ACTIONS ---
function switchUserTab(tab) {
  document.getElementById('tab-add-single').classList.remove('active');
  document.getElementById('tab-add-bulk').classList.remove('active');
  document.getElementById(`tab-add-${tab}`).classList.add('active');

  if (tab === 'single') {
    document.getElementById('form-user-single').style.display = 'block';
    document.getElementById('form-user-bulk').style.display = 'none';
  } else {
    document.getElementById('form-user-single').style.display = 'none';
    document.getElementById('form-user-bulk').style.display = 'block';
  }
}

function saveAddUser() {
  const isBulk = document.getElementById('tab-add-bulk').classList.contains('active');
  
  if (isBulk) {
    const data = document.getElementById('bulk-user-data').value;
    if (!data.trim()) return alert('Vui lòng nhập danh sách!');
    
    const lines = data.split('\n');
    let added = 0;
    lines.forEach(line => {
      const parts = line.split(',').map(s => s.trim());
      if (parts.length >= 2 && parts[0] !== '') {
        const email = parts[0];
        const pass = parts[1];
        const name = parts[2] || email.split('@')[0];
        
        if (!usersData.find(u => u.email === email)) {
          usersData.push({
            id: 'u' + Date.now() + Math.random().toString(36).substr(2, 5),
            name: name,
            email: email,
            password: pass,
            role: 'learner',
            avatar: name.charAt(0).toUpperCase()
          });
          added++;
        }
      }
    });
    showToast('Đã import ' + added + ' học viên!');
  } else {
    const name = document.getElementById('new-user-name').value;
    const email = document.getElementById('new-user-email').value;
    const pass = document.getElementById('new-user-pass').value;
    
    if (!name || !email || !pass) return alert('Vui lòng nhập đủ thông tin!');
    if (usersData.find(u => u.email === email)) return alert('Email đã tồn tại!');
    
    usersData.push({
      id: 'u' + Date.now(),
      name, email, password: pass, role: 'learner', avatar: name.charAt(0).toUpperCase()
    });
    showToast('Đã thêm học viên!');
  }
  
  saveSystemData();
  closeModal('modal-add-user');
  renderDashboard();
}

function deleteUser(id) {
  if (id === currentUser.id) return alert('Không thể xóa chính bạn!');
  if (confirm('Bạn có chắc chắn muốn xóa học viên này?')) {
    usersData = usersData.filter(u => u.id !== id);
    saveSystemData();
    showToast('Đã xóa học viên!');
    renderDashboard();
  }
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function closeModalOutside(e, id) { if(e.target.id === id) closeModal(id); }

function createCourse() {
  const title = document.getElementById('new-course-name').value;
  const desc = document.getElementById('new-course-desc').value;
  
  if(!title) return alert('Nhập tên khóa học!');
  
  coursesData.push({
    id: 'c' + Date.now(),
    title, description: desc, emoji: '📘', modules: []
  });
  saveSystemData();
  closeModal('modal-add-course');
  renderCourses();
  showToast('Tạo khóa học thành công!');
}

function openEditCourseModal(id) {
  const course = coursesData.find(c => c.id === id);
  if (!course) return;
  
  document.getElementById('edit-course-id').value = course.id;
  document.getElementById('edit-course-name').value = course.title;
  document.getElementById('edit-course-desc').value = course.description;
  
  openModal('modal-edit-course');
}

function saveEditCourse() {
  const id = document.getElementById('edit-course-id').value;
  const title = document.getElementById('edit-course-name').value;
  const desc = document.getElementById('edit-course-desc').value;
  
  if (!title) return alert('Nhập tên khóa học!');
  
  const course = coursesData.find(c => c.id === id);
  if (course) {
    course.title = title;
    course.description = desc;
    saveSystemData();
    showToast('Cập nhật khóa học thành công!');
    renderCourses();
    if(currentAdminCourse && currentAdminCourse.id === id) renderAdminCourseDetail(id);
  }
  
  closeModal('modal-edit-course');
}

function deleteCourse(id) {
  if (confirm('Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác.')) {
    coursesData = coursesData.filter(c => c.id !== id);
    saveSystemData();
    showToast('Đã xóa khóa học!');
    renderCourses();
  }
}

function openAdminAddModule() {
  document.getElementById('new-module-name').value = '';
  document.getElementById('new-module-desc').value = '';
  document.getElementById('new-module-tools').value = '';
  document.getElementById('new-module-duration').value = '';
  document.getElementById('new-module-link').value = '';
  document.getElementById('new-module-display').value = 'embed';
  document.getElementById('new-module-refs').value = '';
  openModal('modal-add-module');
}

function createModule() {
  const name = document.getElementById('new-module-name').value;
  const desc = document.getElementById('new-module-desc').value;
  const tools = document.getElementById('new-module-tools').value;
  const duration = document.getElementById('new-module-duration').value;
  const link = document.getElementById('new-module-link').value;
  const display = document.getElementById('new-module-display').value;
  const refs = document.getElementById('new-module-refs').value;
  
  if(!name || !link) return alert('Vui lòng nhập tên bài học và link nội dung!');
  
  if(currentAdminCourse) {
    currentAdminCourse.modules.push({ 
      id: 'm' + Date.now(), 
      title: name, 
      desc, 
      tools, 
      duration, 
      link,
      type: display,
      refs 
    });
    saveSystemData();
    showToast('Thêm bài học thành công!');
    renderAdminCourseDetail(currentAdminCourse.id);
  }
  closeModal('modal-add-module');
}

function deleteModule(moduleId) {
  if (confirm('Bạn có chắc muốn xóa bài học này?')) {
    currentAdminCourse.modules = currentAdminCourse.modules.filter(m => m.id !== moduleId);
    saveSystemData();
    showToast('Đã xóa bài học!');
    renderAdminCourseDetail(currentAdminCourse.id);
  }
}

function openEditModuleModal(moduleId) {
  let m = currentAdminCourse.modules.find(m => m.id === moduleId);
  if(!m) return;
  document.getElementById('edit-module-id').value = m.id;
  document.getElementById('edit-module-name').value = m.title;
  document.getElementById('edit-module-desc').value = m.desc || '';
  document.getElementById('edit-module-tools').value = m.tools || '';
  document.getElementById('edit-module-duration').value = m.duration || '';
  document.getElementById('edit-module-link').value = m.link || '';
  document.getElementById('edit-module-display').value = m.type || 'embed';
  document.getElementById('edit-module-refs').value = m.refs || '';
  openModal('modal-edit-module');
}

function saveEditModule() {
  const id = document.getElementById('edit-module-id').value;
  const name = document.getElementById('edit-module-name').value;
  const desc = document.getElementById('edit-module-desc').value;
  const tools = document.getElementById('edit-module-tools').value;
  const duration = document.getElementById('edit-module-duration').value;
  const link = document.getElementById('edit-module-link').value;
  const display = document.getElementById('edit-module-display').value;
  const refs = document.getElementById('edit-module-refs').value;
  
  if(!name || !link) return alert('Vui lòng nhập tên bài học và link nội dung!');
  
  let m = currentAdminCourse.modules.find(m => m.id === id);
  if(m) {
    m.title = name;
    m.desc = desc;
    m.tools = tools;
    m.duration = duration;
    m.link = link;
    m.type = display;
    m.refs = refs;
    saveSystemData();
    showToast('Đã cập nhật bài học!');
    renderAdminCourseDetail(currentAdminCourse.id);
  }
  closeModal('modal-edit-module');
}



// SEARCH
function handleSearch() {
  const q = document.getElementById('global-search').value.toLowerCase();
  if(!q) return renderCourses();
  
  const courses = getVisibleCourses().filter(c => c.title.toLowerCase().includes(q));
  document.getElementById('all-courses-grid').innerHTML = courses.map(c => renderCourseCard(c)).join('');
}

// --- QUIZ LOGIC ---
function openQuizManager(moduleId) {
  const m = currentAdminCourse.modules.find(m => m.id === moduleId);
  if(!m) return;
  document.getElementById('quiz-manager-module-id').value = moduleId;
  
  if (m.quiz && m.quiz.length > 0) {
    document.getElementById('quiz-import-data').value = m.quizRaw || '';
    document.getElementById('quiz-preview').textContent = `Bài học này đang có ${m.quiz.length} câu hỏi hợp lệ.`;
    document.getElementById('quiz-preview').style.color = 'var(--success)';
  } else {
    document.getElementById('quiz-import-data').value = '';
    document.getElementById('quiz-preview').textContent = 'Chưa có câu hỏi nào.';
    document.getElementById('quiz-preview').style.color = 'var(--text-muted)';
  }
  
  openModal('modal-quiz-manager');
}

function previewQuiz() {
  const text = document.getElementById('quiz-import-data').value;
  let questions = parseQuizData(text);
  if(questions.length > 0) {
    document.getElementById('quiz-preview').textContent = `Phát hiện: ${questions.length} câu hỏi hợp lệ.`;
    document.getElementById('quiz-preview').style.color = 'var(--success)';
  } else {
    document.getElementById('quiz-preview').textContent = 'Chưa tìm thấy câu hỏi hợp lệ. Hãy kiểm tra lại định dạng.';
    document.getElementById('quiz-preview').style.color = 'var(--text-muted)';
  }
}

function parseQuizData(text) {
  let questions = [];
  let blocks = text.split(/\n\s*\n/);
  blocks.forEach(block => {
    let lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if(lines.length >= 3) {
      let qLine = lines[0].replace(/^(Câu hỏi|Câu \d+)\s*:\s*/i, '');
      let options = [];
      let answerIndex = -1;
      let optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
      
      for(let i = 1; i < lines.length; i++) {
        let line = lines[i];
        if(line.toLowerCase().startsWith('đáp án')) {
          let parts = line.split(':');
          if(parts.length >= 2) {
            let ansLetter = parts[1].trim().toUpperCase();
            answerIndex = optionLetters.indexOf(ansLetter);
          }
        } else {
          let match = line.match(/^[A-F][\.\-\:]\s*(.*)/i);
          if (match) {
            options.push(match[1].trim());
          }
        }
      }
      
      if(options.length >= 2 && answerIndex !== -1) {
        questions.push({
          q: qLine,
          options: options,
          answer: answerIndex
        });
      }
    }
  });
  return questions;
}

function saveQuizManager() {
  const mId = document.getElementById('quiz-manager-module-id').value;
  const rawText = document.getElementById('quiz-import-data').value;
  let questions = parseQuizData(rawText);
  
  let m = currentAdminCourse.modules.find(m => m.id === mId);
  if(m) {
    m.quiz = questions;
    m.quizRaw = rawText;
    saveSystemData();
    showToast(`Đã lưu bài thi (${questions.length} câu hỏi)!`);
    renderAdminCourseDetail(currentAdminCourse.id);
  }
  closeModal('modal-quiz-manager');
}

let currentQuizData = [];
let currentQuizModuleId = null;

function startQuiz(moduleId) {
  let m = currentCourse.modules.find(m => m.id === moduleId);
  if(!m || !m.quiz || m.quiz.length === 0) return;
  
  currentQuizModuleId = moduleId;
  currentQuizData = m.quiz;
  
  let html = '';
  m.quiz.forEach((q, qIdx) => {
    html += `<div style="margin-bottom: 24px;">
      <div style="font-weight: 600; margin-bottom: 12px; font-size:1.05rem;">Câu ${qIdx + 1}: ${q.q}</div>
    `;
    q.options.forEach((opt, oIdx) => {
      let optionLetter = String.fromCharCode(65 + oIdx);
      html += `
        <label style="display:block; margin-bottom: 8px; cursor:pointer; padding: 10px; border: 1px solid var(--border); border-radius: var(--radius-sm); transition: 0.2s;">
          <input type="radio" name="quiz_q_${qIdx}" value="${oIdx}"> <strong>${optionLetter}.</strong> ${opt}
        </label>
      `;
    });
    html += `</div>`;
  });
  
  document.getElementById('quiz-player-body').innerHTML = html;
  openModal('modal-do-quiz');
}

function submitQuiz() {
  let score = 0;
  let total = currentQuizData.length;
  
  for(let i=0; i<total; i++) {
    let selected = document.querySelector(`input[name="quiz_q_${i}"]:checked`);
    if(!selected) {
      return alert('Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!');
    }
    if(parseInt(selected.value) === currentQuizData[i].answer) {
      score++;
    }
  }
  
  let ratio = score / total;
  if (ratio >= 0.8) { 
    alert(`🎉 Chúc mừng! Bạn đã đạt ${score}/${total} điểm và hoàn thành bài thi!`);
    closeModal('modal-do-quiz');
    markLessonComplete(currentQuizModuleId);
  } else {
    alert(`⚠️ Bạn mới đạt ${score}/${total} điểm (Yêu cầu 80% để qua bài). Hãy xem lại bài giảng và làm lại nhé!`);
  }
}

// INIT
window.onload = init;
