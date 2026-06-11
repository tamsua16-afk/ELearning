/* ═══════════════════════════════════════════════════
   NV LEARN – APPLICATION LOGIC
   Ngọc Việt Group · AI Training Platform
════════════════════════════════════════════════════ */

// --- MOCK DATA ---

// --- USER DATA ---
let usersData = [];

// Invite token for self-registration
let inviteToken = null;
let messagesData = [];


let coursesData = [
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
    description: 'Đào tạo online hàng tuần. Cấu trúc mỗi buổi (90 phút): 15\' AI News & Pro-Tools Update | 60\' Topic chuyên đề (2 chủ đề) | 15\' Q&A.',
    emoji: '💻',
    modules: [
      {
        id: 'm2_A',
        title: 'Buổi 02: AI Prompting Mastery & Giao tiếp doanh nghiệp',
        desc: '- AI Prompting Mastery: Kỹ thuật điều khiển AI đa tầng để giải quyết bài toán nghiệp vụ phức tạp.\n- AI Giao tiếp doanh nghiệp: Tự động hóa soạn thảo Email, Proposal, dịch thuật đa ngôn ngữ.',
        tools: 'Google Gemini, DeepL',
        duration: '90 phút',
        link: '#',
        type: 'embed'
      },
      {
        id: 'm2_B',
        title: 'Buổi 03: AI Quản trị tri thức & Data Analysis',
        desc: '- AI tạo Báo cáo & Tài liệu: Xử lý văn bản dài, tóm tắt hợp đồng và quy định nội bộ (NotebookLM).\n- AI Data Analysis & Investment: Phân tích dữ liệu tài chính, đầu tư năng lượng – Python AI không cần lập trình.',
        tools: 'NotebookLM, Gemini Data Analyst',
        duration: '90 phút',
        link: '#',
        type: 'embed'
      },
      {
        id: 'm2_C',
        title: 'Buổi 04: AI Visual, Presentation & Video Media',
        desc: '- AI Presentation & Visual Strategy: Thiết kế slide thuyết trình đỉnh cao, đồng bộ nhận diện thương hiệu.\n- AI Marketing Content Engine: Sản xuất nội dung đa kênh tự động – Text, Image, Video AI.',
        tools: 'Gamma, Imagen 3, Gemini, VEO 3',
        duration: '90 phút',
        link: '#',
        type: 'embed'
      },
      {
        id: 'm2_D',
        title: 'Buổi 05: AI Automation & Agent + TỔNG KẾT',
        desc: '- AI Automation & Agent: Xây dựng trợ lý ảo (No-code) hỗ trợ tác vụ lặp lại.\n- Tổng kết & Hệ thống hóa: Ôn tập toàn bộ Workflow buổi 2-4; Giải đáp vướng mắc thực tế.',
        tools: 'Google AI Studio, MiraBOT, MiraEDU',
        duration: '90 phút',
        link: '#',
        type: 'embed'
      }
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

let docsData = [
  { id: 'd0', title: 'Thư viện Prompt Thông minh', desc: 'Tra cứu & Copy nhanh 100+ câu lệnh AI cho mọi nghiệp vụ của Ngọc Việt Group.', link: 'prompt-library.html' },
  { id: 'd1', title: 'Sổ tay nhân sự 2026', desc: 'Quy định và chính sách công ty', link: '#' },
  { id: 'd2', title: 'Quy trình vận hành AI', desc: 'Hướng dẫn áp dụng AI Agent nội bộ', link: '#' }
];

let pendingPromptsData = [];
let promptsData = [];

// --- APP STATE ---
let currentUser = null;
let userProgress = {}; 
// format: { userId: { moduleId: true } }
let currentAdminCourse = null;

let db;
let initialState = {
  usersData: [],
  coursesData: [],
  docsData: [],
  pendingPromptsData: [],
  promptsData: [],
  userProgress: {},
  inviteToken: null,
  messagesData: []
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyDLun__8Q8mgYp6JnRsVfrO0TyLcGdI-Wk",
      authDomain: "nv-learn-app.firebaseapp.com",
      projectId: "nv-learn-app",
      storageBucket: "nv-learn-app.firebasestorage.app",
      messagingSenderId: "722508942211",
      appId: "1:722508942211:web:622ec967d4370a583984b6"
    });
  }
  db = firebase.firestore();
}

async function fetchCloudData() {
  console.log('[NV Learn] Đang tải dữ liệu từ Firestore...');
  try {
    const doc = await db.collection('ngocviet_app').doc('data_v1').get();
    console.log('[NV Learn] Kết quả Firestore - doc.exists:', doc.exists);
    if (doc.exists) {
      const data = doc.data();
      console.log('[NV Learn] Số users trong DB:', data.usersData ? data.usersData.length : 0);
      if (data.usersData) usersData = data.usersData;
      if (data.coursesData) coursesData = data.coursesData;
      if (data.docsData) docsData = data.docsData;
      if (data.pendingPromptsData) pendingPromptsData = data.pendingPromptsData;
      if (data.promptsData) promptsData = data.promptsData;
      if (data.userProgress) userProgress = data.userProgress;
      if (data.inviteToken !== undefined) inviteToken = data.inviteToken;
      if (data.messagesData) messagesData = data.messagesData;
    } else {
      console.warn('[NV Learn] Document data_v1 KHÔNG TỒN TẠI trong Firestore!');
    }
    
    // Keep a deep copy of initial state to detect local modifications
    initialState = JSON.parse(JSON.stringify({
      usersData: usersData || [],
      coursesData: coursesData || [],
      docsData: docsData || [],
      pendingPromptsData: pendingPromptsData || [],
      promptsData: promptsData || [],
      userProgress: userProgress || {},
      inviteToken: inviteToken !== undefined ? inviteToken : null,
      messagesData: messagesData || []
    }));
    console.log('[NV Learn] Tải dữ liệu xong. usersData.length =', usersData.length);
  } catch(e) {
    console.error('[NV Learn] LỖI FIRESTORE:', e.code, e.message);
    // Ném lỗi lên để startup handler xử lý hiển thị
    throw e;
  }
}

function mergeArray(localArr, initialArr, remoteArr) {
  if (!remoteArr) remoteArr = [];
  if (!initialArr) initialArr = [];
  if (!localArr) localArr = [];

  // If no local changes, keep remote
  if (JSON.stringify(localArr) === JSON.stringify(initialArr)) {
    return remoteArr;
  }

  const localMap = new Map(localArr.map(item => [item.id, item]));
  const initialMap = new Map(initialArr.map(item => [item.id, item]));
  const remoteMap = new Map(remoteArr.map(item => [item.id, item]));

  // 1. Additions and Updates
  for (const [id, localItem] of localMap.entries()) {
    const initialItem = initialMap.get(id);
    if (!initialItem) {
      // Added locally -> Add to remote
      remoteMap.set(id, localItem);
    } else if (JSON.stringify(localItem) !== JSON.stringify(initialItem)) {
      // Modified locally -> Update remote
      remoteMap.set(id, localItem);
    }
  }

  // 2. Deletions
  for (const id of initialMap.keys()) {
    if (!localMap.has(id)) {
      // Deleted locally -> Remove from remote
      remoteMap.delete(id);
    }
  }

  return Array.from(remoteMap.values());
}

function mergeProgress(localProg, initialProg, remoteProg) {
  if (!remoteProg) remoteProg = {};
  if (!initialProg) initialProg = {};
  if (!localProg) localProg = {};

  const merged = { ...remoteProg };

  for (const userId in localProg) {
    const localUserProg = localProg[userId];
    const initialUserProg = initialProg[userId];
    if (JSON.stringify(localUserProg) !== JSON.stringify(initialUserProg)) {
      merged[userId] = localUserProg;
    }
  }

  return merged;
}

async function saveSystemData() {
  if (!db) return;
  const docRef = db.collection('ngocviet_app').doc('data_v1');
  try {
    // Prune messagesData local array to prevent Firestore document bloat (>1MB limit)
    if (messagesData && messagesData.length > 200) {
      messagesData = messagesData.slice(messagesData.length - 200);
    }

    const nextData = await db.runTransaction(async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      let remoteData = {};
      if (sfDoc.exists) {
        remoteData = sfDoc.data();
      }

      const mergedUsers = mergeArray(usersData, initialState.usersData, remoteData.usersData);
      const mergedCourses = mergeArray(coursesData, initialState.coursesData, remoteData.coursesData);
      const mergedDocs = mergeArray(docsData, initialState.docsData, remoteData.docsData);
      const mergedPendingPrompts = mergeArray(pendingPromptsData, initialState.pendingPromptsData, remoteData.pendingPromptsData);
      const mergedPrompts = mergeArray(promptsData, initialState.promptsData, remoteData.promptsData);
      const mergedProgress = mergeProgress(userProgress, initialState.userProgress, remoteData.userProgress);
      
      // Merge pruned messagesData
      const mergedMessages = mergeArray(messagesData, initialState.messagesData, remoteData.messagesData);

      let mergedInviteToken = remoteData.inviteToken;
      if (inviteToken !== initialState.inviteToken) {
        mergedInviteToken = inviteToken;
      }

      const updated = {
        usersData: mergedUsers,
        coursesData: mergedCourses,
        docsData: mergedDocs,
        pendingPromptsData: mergedPendingPrompts,
        promptsData: mergedPrompts,
        userProgress: mergedProgress,
        inviteToken: mergedInviteToken !== undefined ? mergedInviteToken : null,
        messagesData: mergedMessages
      };

      transaction.set(docRef, updated);
      return updated;
    });

    // Sync local state to match the written database state
    usersData = nextData.usersData;
    coursesData = nextData.coursesData;
    docsData = nextData.docsData;
    pendingPromptsData = nextData.pendingPromptsData;
    promptsData = nextData.promptsData;
    userProgress = nextData.userProgress;
    inviteToken = nextData.inviteToken;
    messagesData = nextData.messagesData;

    // Update initialState snapshot
    initialState = JSON.parse(JSON.stringify(nextData));
    console.log("Đã đồng bộ và lưu dữ liệu lên Firebase.");
  } catch (e) {
    console.error("Lỗi lưu dữ liệu (Transaction) lên Firebase:", e);
    showToast("⚠️ Có lỗi khi lưu dữ liệu lên hệ thống!");
  }
}

// --- DOM ELEMENTS ---
const el = {
  screenSetup: document.getElementById('screen-setup'),
  screenLogin: document.getElementById('screen-login'),
  screenRegister: document.getElementById('screen-register'),
  screenApp: document.getElementById('screen-app'),
  loginEmailForm: document.getElementById('login-email-form'),
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
  // Check for invite link (?invite=TOKEN)
  // NOTE: Token validation via localStorage only works on the same device.
  // For cross-device sharing, we trust the URL token directly.
  const urlParams = new URLSearchParams(window.location.search);
  const inviteParam = urlParams.get('invite');
  const adminParam = urlParams.get('adminsetup');

  // Secret link to force create an admin account anytime: ?adminsetup=ngocviet2026
  if (adminParam === 'ngocviet2026') {
    showScreen('setup');
    return;
  }

  if (inviteParam && inviteParam.trim() !== '') {
    window._activeInviteParam = inviteParam;

    // If system is completely empty, it means no admin exists yet.
    // We shouldn't allow a random user to become admin via an invite link.
    if (usersData.length === 0) {
      alert('Hệ thống chưa được thiết lập bởi Quản trị viên. Không thể đăng ký lúc này.');
      showScreen('login');
      return;
    }
    
    // Otherwise, show the learner registration screen
    showScreen('register');
    return;
  }

  // First-run: no users in the system yet
  if (usersData.length === 0) {
    showScreen('setup');
    return;
  }

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
  el.screenSetup.style.display    = screen === 'setup'    ? 'flex' : 'none';
  el.screenLogin.style.display    = screen === 'login'    ? 'flex' : 'none';
  el.screenRegister.style.display = screen === 'register' ? 'flex' : 'none';
  el.screenApp.style.display      = screen === 'app'      ? 'flex' : 'none';
}

function showToast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  setTimeout(() => el.toast.classList.remove('show'), 3000);
}

// --- AUTHENTICATION ---

// First-run: create the very first admin account
function handleFirstSetup() {
  const name  = document.getElementById('setup-name').value.trim();
  const email = document.getElementById('setup-email').value.trim();
  const pass  = document.getElementById('setup-password').value;
  const pass2 = document.getElementById('setup-password2').value;

  if (!name || !email || !pass || !pass2) {
    return alert('Vui lòng điền đầy đủ tất cả các trường!');
  }
  if (pass.length < 8) {
    return alert('Mật khẩu phải có ít nhất 8 ký tự!');
  }
  if (pass !== pass2) {
    return alert('Mật khẩu xác nhận không khớp!');
  }

  const adminUser = {
    id: 'admin_' + Date.now(),
    name,
    email,
    password: pass,
    role: 'admin',
    avatar: name.charAt(0).toUpperCase()
  };

  usersData.push(adminUser);
  saveSystemData();
  showToast('✅ Tài khoản Admin đã được tạo thành công!');
  login(adminUser);
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  if (!email || !pass) return alert('Vui lòng nhập email và mật khẩu!');
  const user = usersData.find(u => u.email === email && u.password === pass);
  if (user) login(user);
  else alert('Email hoặc mật khẩu không đúng!');
}

function login(user) {
  currentUser = user;
  localStorage.setItem('nv_learn_user', user.id);
  
  if (!userProgress) userProgress = {};
  if (!userProgress[user.id]) userProgress[user.id] = {};
  
  // UI Updates
  document.getElementById('sidebar-username').textContent = user.name;
  document.getElementById('sidebar-role').textContent = user.role === 'admin' ? 'Quản trị viên' : 'Học viên';
  document.getElementById('sidebar-avatar').textContent = user.avatar;
  
  const navMsg = document.getElementById('nav-messages');
  const chatW = document.getElementById('chatWidget');
  const searchBox = document.getElementById('topbar-search-box');
  const notificationBell = document.getElementById('topbar-notification');
  if (user.role === 'admin') {
    if (navMsg) navMsg.style.display = 'flex';
    if (chatW) chatW.style.display = 'none';
    if (searchBox) searchBox.style.display = 'none';
    if (notificationBell) notificationBell.style.display = 'none';
  } else {
    if (navMsg) navMsg.style.display = 'none';
    if (chatW) {
      chatW.style.display = 'block';
      renderLearnerChat();
    }
    if (searchBox) searchBox.style.display = 'flex';
    if (notificationBell) notificationBell.style.display = 'block';
  }
  
  updateUnreadBadges();

  showScreen('app');
  navigate('dashboard');
  showToast(`Chào mừng ${user.name}!`);
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('nv_learn_user');
  showScreen('login');
}

// --- FORGOT PASSWORD (self-service on login screen) ---
function showForgotPanel() {
  document.getElementById('panel-login').style.display = 'none';
  document.getElementById('panel-forgot').style.display = 'block';
  document.getElementById('login-card-title').textContent = '🔐 Quên mật khẩu';
  document.getElementById('login-card-desc').textContent = 'Nhập email để đặt lại mật khẩu';
  // reset state
  document.getElementById('forgot-step-1').style.display = 'block';
  document.getElementById('forgot-step-2').style.display = 'none';
  document.getElementById('forgot-email').value = '';
  document.getElementById('forgot-error-1').style.display = 'none';
  document.getElementById('forgot-newpass').value = '';
  document.getElementById('forgot-newpass2').value = '';
  document.getElementById('forgot-error-2').style.display = 'none';
}

function showLoginPanel() {
  document.getElementById('panel-login').style.display = 'block';
  document.getElementById('panel-forgot').style.display = 'none';
  document.getElementById('login-card-title').textContent = 'Chào mừng trở lại 👋';
  document.getElementById('login-card-desc').textContent = 'Đăng nhập để bắt đầu hành trình học tập AI của bạn';
}

let _forgotUser = null; // temp store found user during 2-step flow

function forgotStep1() {
  const email = document.getElementById('forgot-email').value.trim();
  const errEl = document.getElementById('forgot-error-1');
  errEl.style.display = 'none';

  if (!email) {
    errEl.textContent = 'Vui lòng nhập email!';
    errEl.style.display = 'block';
    return;
  }

  const user = usersData.find(u => u.email === email);
  if (!user) {
    errEl.textContent = '❌ Không tìm thấy tài khoản với email này!';
    errEl.style.display = 'block';
    return;
  }

  _forgotUser = user;
  document.getElementById('forgot-email-confirmed').textContent =
    `✅ Tìm thấy tài khoản: ${user.name}. Hãy đặt mật khẩu mới.`;
  document.getElementById('forgot-step-1').style.display = 'none';
  document.getElementById('forgot-step-2').style.display = 'block';
}

function forgotStep2() {
  const pass  = document.getElementById('forgot-newpass').value;
  const pass2 = document.getElementById('forgot-newpass2').value;
  const errEl = document.getElementById('forgot-error-2');
  errEl.style.display = 'none';

  if (!pass || !pass2) {
    errEl.textContent = 'Vui lòng nhập đầy đủ mật khẩu!';
    errEl.style.display = 'block';
    return;
  }
  if (pass.length < 8) {
    errEl.textContent = 'Mật khẩu phải có ít nhất 8 ký tự!';
    errEl.style.display = 'block';
    return;
  }
  if (pass !== pass2) {
    errEl.textContent = 'Mật khẩu xác nhận không khớp!';
    errEl.style.display = 'block';
    return;
  }

  // update in usersData
  const user = usersData.find(u => u.id === _forgotUser.id);
  user.password = pass;
  saveSystemData();
  _forgotUser = null;

  showToast('✅ Mật khẩu đã được cập nhật! Hãy đăng nhập lại.');
  showLoginPanel();
}

// --- ADMIN: RESET USER PASSWORD ---
function openResetUserPasswordModal(userId) {
  const user = usersData.find(u => u.id === userId);
  if (!user) return;
  document.getElementById('reset-target-user-id').value = userId;
  document.getElementById('reset-target-user-name').textContent = `👤 ${user.name} (${user.email})`;
  document.getElementById('reset-new-pw').value = '';
  document.getElementById('reset-new-pw2').value = '';
  document.getElementById('reset-pw-error').style.display = 'none';
  openModal('modal-reset-user-pw');
}

function saveResetUserPassword() {
  const userId = document.getElementById('reset-target-user-id').value;
  const pass   = document.getElementById('reset-new-pw').value;
  const pass2  = document.getElementById('reset-new-pw2').value;
  const errEl  = document.getElementById('reset-pw-error');
  errEl.style.display = 'none';

  if (!pass || !pass2) {
    errEl.textContent = 'Vui lòng nhập đầy đủ mật khẩu!';
    errEl.style.display = 'block';
    return;
  }
  if (pass.length < 8) {
    errEl.textContent = 'Mật khẩu phải có ít nhất 8 ký tự!';
    errEl.style.display = 'block';
    return;
  }
  if (pass !== pass2) {
    errEl.textContent = 'Mật khẩu xác nhận không khớp!';
    errEl.style.display = 'block';
    return;
  }

  const user = usersData.find(u => u.id === userId);
  if (user) {
    user.password = pass;
    saveSystemData();
    closeModal('modal-reset-user-pw');
    showToast(`✅ Đã đặt lại mật khẩu cho ${user.name}!`);
  }
}

// --- SELF REGISTRATION (via invite link) ---
function handleSelfRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-password').value;
  const pass2 = document.getElementById('reg-password2').value;
  const errEl = document.getElementById('register-error');

  const showErr = (msg) => {
    errEl.textContent = msg;
    errEl.style.display = 'block';
  };
  errEl.style.display = 'none';

  if (!name || !email || !pass || !pass2) return showErr('Vui lòng điền đầy đủ tất cả các trường!');
  if (pass.length < 8)              return showErr('Mật khẩu phải có ít nhất 8 ký tự!');
  if (pass !== pass2)               return showErr('Mật khẩu xác nhận không khớp!');
  if (usersData.find(u => u.email === email)) return showErr('Email này đã được sử dụng!');

  const newUser = {
    id: 'u' + Date.now(),
    name,
    email,
    password: pass,
    role: 'learner',
    avatar: name.charAt(0).toUpperCase()
  };

  usersData.push(newUser);
  saveSystemData();
  showToast('✅ Tài khoản đã được tạo! Chào mừng bạn đến với NV Learn!');
  login(newUser);
}

// --- INVITE LINK MANAGEMENT ---
function saveInviteToken() {
  if (inviteToken) {
    localStorage.setItem('nv_learn_invite_token', inviteToken);
  } else {
    localStorage.removeItem('nv_learn_invite_token');
  }
  saveSystemData(); // Sync to Firebase
}

function openInviteLinkModal() {
  const activeEl = document.getElementById('invite-link-status-active');
  const noneEl   = document.getElementById('invite-link-status-none');
  if (inviteToken) {
    activeEl.style.display = 'block';
    noneEl.style.display   = 'none';
    const baseUrl = window.location.href.split('?')[0];
    document.getElementById('invite-link-display').textContent = `${baseUrl}?invite=${inviteToken}`;
  } else {
    activeEl.style.display = 'none';
    noneEl.style.display   = 'block';
  }
  openModal('modal-invite-link');
}

function generateInviteLink() {
  inviteToken = Math.random().toString(36).substr(2, 12) + Date.now().toString(36);
  saveInviteToken();
  openInviteLinkModal(); // refresh UI
  showToast('✨ Đã tạo link mời mới!');
}

function revokeInviteLink() {
  if (!confirm('Thu hồi link mời hiện tại?\n\nLưu ý: Vì đây là ứng dụng không có server, những ai đã được chia sẻ link cũ vẫn có thể dùng nó. Hãy tạo link mới để thay thế nếu cần.')) return;
  inviteToken = null;
  saveInviteToken();
  openInviteLinkModal(); // refresh UI
  showToast('🗑️ Link mời đã bị xóa khỏi hệ thống này!');
}

function copyInviteLink() {
  const baseUrl = window.location.href.split('?')[0];
  const fullLink = `${baseUrl}?invite=${inviteToken}`;
  navigator.clipboard.writeText(fullLink).then(() => {
    showToast('📋 Đã sao chép link mời!');
  }).catch(() => {
    prompt('Sao chép link bên dưới:', fullLink);
  });
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
  if (pageId === 'prompts') renderIntegratedPrompts();
  if (pageId === 'docs') renderDocs();
  if (pageId === 'history') renderHistory();
  if (pageId === 'admin') renderAdmin();
  if (pageId === 'messages') renderAdminMessages();
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
  
  // Calculate streak for both admin & learner to display in topbar
  const streak = calculateStreak(currentUser.id);
  const topbarStreak = document.getElementById('topbar-streak');
  const topbarStreakVal = document.getElementById('topbar-streak-val');
  if (topbarStreak && topbarStreakVal) {
    if (streak > 0) {
      topbarStreak.style.display = 'inline-flex';
      topbarStreakVal.textContent = streak;
      topbarStreak.classList.add('active');
    } else {
      topbarStreak.style.display = 'none';
      topbarStreak.classList.remove('active');
    }
  }

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
        // Exclude quizAttempts key if exists in userProgress count
        const completedKeys = Object.keys(userProgress[u.id]).filter(k => k !== 'quizAttempts');
        systemCompletedLessons += completedKeys.length;
      }
    });
    
    let maxPossibleCompleted = learners.length * totalLessons;
    let avgProgress = maxPossibleCompleted === 0 ? 0 : Math.round((systemCompletedLessons / maxPossibleCompleted) * 100);
    
    document.getElementById('admin-stat-rate').textContent = `${avgProgress}%`;

    // Render users table
    let html = '';
    learners.forEach(u => {
      const completedKeys = userProgress[u.id] ? Object.keys(userProgress[u.id]).filter(k => k !== 'quizAttempts') : [];
      let uCompleted = completedKeys.length;
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
              <button class="btn-sm" onclick="openResetUserPasswordModal('${u.id}')">🔑 Reset MK</button>
              <button class="btn-sm danger" onclick="deleteUser('${u.id}')">🗑️ Xóa</button>
            </div>
          </td>
        </tr>
      `;
    });
    document.getElementById('admin-users-tbody').innerHTML = html;

    // Draw Admin SVG charts
    setTimeout(() => {
      drawAdminCompletionChart();
      drawAdminDistributionChart();
    }, 100);
    
  } else {
    document.getElementById('dashboard-learner-view').style.display = 'block';
    document.getElementById('dashboard-admin-view').style.display = 'none';
    document.getElementById('dashboard-subtitle').textContent = 'Tiếp tục hành trình học AI của bạn hôm nay';
    document.getElementById('btn-explore-courses').style.display = 'block';

    const courses = getVisibleCourses();
    
    // Stats calc
    let totalCompleted = 0;
    if (userProgress[currentUser.id]) {
      const completedKeys = Object.keys(userProgress[currentUser.id]).filter(k => k !== 'quizAttempts');
      totalCompleted = completedKeys.length;
    }
    
    let totalLessonsInSystem = 0;
    courses.forEach(c => totalLessonsInSystem += c.modules.length);
    let overallProg = totalLessonsInSystem === 0 ? 0 : Math.round((totalCompleted / totalLessonsInSystem) * 100);
    
    document.getElementById('stat-enrolled').textContent = courses.length;
    document.getElementById('stat-completed-lessons').textContent = totalCompleted;
    document.getElementById('stat-overall-progress').textContent = overallProg + '%';
    
    // Streak Dashboard Card rendering
    const streakCard = document.getElementById('learner-streak-card');
    const streakValText = document.getElementById('stat-streak-dashboard');
    if (streakCard && streakValText) {
      if (streak > 0) {
        streakCard.style.display = 'flex';
        streakValText.textContent = streak + ' ngày';
        streakCard.classList.add('active');
      } else {
        streakCard.style.display = 'flex'; // Always display but show 0 days
        streakValText.textContent = '0 ngày';
        streakCard.classList.remove('active');
      }
    }
    
    const cardsHtml = courses.map(c => renderCourseCard(c)).join('');
    document.getElementById('continue-cards').innerHTML = cardsHtml || '<div class="empty-state">Bạn chưa bắt đầu khóa học nào</div>';
    document.getElementById('recommended-cards').innerHTML = cardsHtml;

    // Draw Learner SVG charts
    setTimeout(() => {
      drawLearnerProgressChart();
    }, 100);
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
                ${m.refs ? `<span style="font-size: .75rem; color: var(--text-muted); font-weight:normal; position:relative; z-index:2;">📚 ${(m.refs.includes('http') || (m.refs.includes('.') && !m.refs.includes(' '))) ? `<a href="${m.refs.startsWith('http') ? m.refs : 'https://'+m.refs}" target="_blank" onclick="event.stopPropagation()" style="color:var(--primary);text-decoration:underline;">Tài liệu đính kèm</a>` : m.refs}</span>` : ''}
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
  
  let safeLink = currentLesson.link;
  if (safeLink && safeLink !== '#' && !safeLink.startsWith('http')) {
    safeLink = 'https://' + safeLink;
  }
  
  let contentHtml = '';
  if (currentLesson.type === 'embed' && safeLink && safeLink !== '#') {
    contentHtml = `
      <div class="drive-embed-wrap">
        <iframe src="${safeLink}" allowfullscreen></iframe>
      </div>
    `;
  } else {
    contentHtml = `
      <div class="drive-fallback">
        <h3>Tài liệu này cần mở ở tab mới</h3>
        <br>
        <a href="${!safeLink || safeLink === '#' ? 'javascript:void(0)' : safeLink}" ${safeLink && safeLink !== '#' ? 'target="_blank"' : ''} class="btn-primary">Mở tài liệu ↗</a>
      </div>
    `;
  }
  
  let actionBtnHtml = '';
  if (isDone) {
    actionBtnHtml = `<button class="btn-success" disabled style="margin: 0 10px;">✅ Đã hoàn thành</button>`;
  } else if (currentLesson.quiz && currentLesson.quiz.length > 0) {
    actionBtnHtml = `<button class="btn-primary" onclick="startQuiz('${moduleId}')" style="margin: 0 10px;">📝 Làm bài kiểm tra</button>`;
  } else {
    actionBtnHtml = `<button class="btn-success" onclick="markLessonComplete('${moduleId}')" id="btn-mark-done" style="margin: 0 10px;">Đánh dấu hoàn thành</button>`;
  }

  // Calculate Next and Previous buttons
  const mIndex = currentCourse.modules.findIndex(m => m.id === moduleId);
  const prevModule = mIndex > 0 ? currentCourse.modules[mIndex - 1] : null;
  const nextModule = mIndex < currentCourse.modules.length - 1 ? currentCourse.modules[mIndex + 1] : null;
  
  const prevBtnHtml = prevModule ? `<button class="btn-secondary" onclick="loadModule('${prevModule.id}')" style="font-size: .85rem; padding: 8px 16px;">← Bài trước</button>` : `<div></div>`;
  const nextBtnHtml = nextModule ? `<button class="btn-primary" onclick="loadModule('${nextModule.id}')" style="font-size: .85rem; padding: 8px 16px;">Bài tiếp theo →</button>` : `<div></div>`;
  
  document.getElementById('lesson-player').innerHTML = `
    <div class="lesson-content-header">
      <h2 class="lesson-content-title">${currentLesson.title}</h2>
      ${currentLesson.desc ? `<p class="lesson-content-desc">${currentLesson.desc}</p>` : ''}
    </div>
    
    ${contentHtml}
    
    <div class="lesson-actions" style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-top:20px;">
      ${prevBtnHtml}
      ${actionBtnHtml}
      ${nextBtnHtml}
    </div>
  `;
}

function markLessonComplete(lessonId) {
  if (!userProgress[currentUser.id]) userProgress[currentUser.id] = {};
  // Save completion timestamp for learning streak calculation
  userProgress[currentUser.id][lessonId] = Date.now();
  saveSystemData();
  
  // Update UI
  const btnMarkDone = document.getElementById('btn-mark-done');
  if (btnMarkDone) btnMarkDone.innerHTML = '✅ Đã hoàn thành';
  
  const checkEl = document.querySelector(`#module-item-${lessonId} .lesson-check`);
  if (checkEl) {
    checkEl.classList.add('done');
    checkEl.textContent = '✓';
  }
  
  updateCourseDetailProgress();
  showToast('Đã lưu tiến độ!');
}

function updateCourseDetailProgress() {
  const prog = getCourseProgress(currentCourse.id);
  document.getElementById('detail-progress-bar').style.width = `${prog}%`;
  document.getElementById('detail-progress-label').textContent = `${prog}%`;
}

// --- DOCS LOGIC ---
function renderDocs() {
  if (currentUser && currentUser.role === 'admin') {
    document.getElementById('btn-create-doc').style.display = 'block';
  } else {
    document.getElementById('btn-create-doc').style.display = 'none';
  }
  
  let html = '';
  if (docsData.length === 0) {
    html = '<div class="empty-state" style="grid-column: 1/-1;">Chưa có tài liệu nào được chia sẻ.</div>';
  } else {
    docsData.forEach(d => {
      html += `
        <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:20px; box-shadow:var(--shadow); display:flex; flex-direction:column;">
          <div style="font-size:2.5rem; margin-bottom:12px;">📄</div>
          <h4 style="margin-bottom:8px; font-size:1.1rem; color:var(--text);">${d.title}</h4>
          ${d.desc ? `<p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">${d.desc}</p>` : ''}
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
            <a href="${d.link}" target="_blank" class="btn-primary" style="padding:8px 16px; font-size:.85rem; text-decoration:none;">Mở tài liệu</a>
            ${currentUser.role === 'admin' ? `
              <div style="display:flex; gap: 8px;">
                <button class="btn-sm" onclick="openEditDocModal('${d.id}')" style="padding:6px 12px; font-size:.8rem;">Sửa</button>
                <button class="btn-sm danger" onclick="deleteDoc('${d.id}')" style="padding:6px 12px; font-size:.8rem;">Xóa</button>
              </div>` : ''}
          </div>
        </div>
      `;
    });
  }
  document.getElementById('docs-list').innerHTML = html;
}

function createDoc() {
  const title = document.getElementById('new-doc-title').value;
  const desc = document.getElementById('new-doc-desc').value;
  const link = document.getElementById('new-doc-link').value;
  
  if(!title || !link) return alert('Vui lòng nhập tên và link tài liệu!');
  
  docsData.push({ id: 'd' + Date.now(), title, desc, link });
  saveSystemData();
  closeModal('modal-add-doc');
  
  document.getElementById('new-doc-title').value = '';
  document.getElementById('new-doc-desc').value = '';
  document.getElementById('new-doc-link').value = '';
  
  renderDocs();
  showToast('Đã thêm tài liệu!');
}

function deleteDoc(id) {
  if (confirm('Bạn có chắc muốn xóa tài liệu này?')) {
    docsData = docsData.filter(d => d.id !== id);
    saveSystemData();
    renderDocs();
    showToast('Đã xóa tài liệu!');
  }
}

function openEditDocModal(id) {
  const doc = docsData.find(d => d.id === id);
  if (!doc) return;
  document.getElementById('edit-doc-id').value = doc.id;
  document.getElementById('edit-doc-title').value = doc.title;
  document.getElementById('edit-doc-desc').value = doc.desc || '';
  document.getElementById('edit-doc-link').value = doc.link;
  openModal('modal-edit-doc');
}

function saveEditDoc() {
  const id = document.getElementById('edit-doc-id').value;
  const title = document.getElementById('edit-doc-title').value;
  const desc = document.getElementById('edit-doc-desc').value;
  const link = document.getElementById('edit-doc-link').value;
  
  if(!title || !link) return alert('Vui lòng nhập tên và link tài liệu!');
  
  const doc = docsData.find(d => d.id === id);
  if (doc) {
    doc.title = title;
    doc.desc = desc;
    doc.link = link;
    saveSystemData();
    renderDocs();
    showToast('Đã cập nhật tài liệu!');
  }
  closeModal('modal-edit-doc');
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
              ${m.refs ? `<div style="font-size: .8rem; color: var(--text-muted); position:relative; z-index:2;">📚 ${(m.refs.includes('http') || (m.refs.includes('.') && !m.refs.includes(' '))) ? `<a href="${m.refs.startsWith('http') ? m.refs : 'https://'+m.refs}" target="_blank" onclick="event.stopPropagation()" style="color:var(--primary);text-decoration:underline;">Tài liệu đính kèm</a>` : m.refs}</div>` : ''}
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
    saveQuizAttempt(currentQuizModuleId, score, total);
    markLessonComplete(currentQuizModuleId);
  } else {
    alert(`⚠️ Bạn mới đạt ${score}/${total} điểm (Yêu cầu 80% để qua bài). Hãy xem lại bài giảng và làm lại nhé!`);
    saveQuizAttempt(currentQuizModuleId, score, total);
  }
}

// --- CHAT / MESSAGES ---
let currentAdminChatUserId = null;

function updateUnreadBadges() {
  if (!currentUser) return;
  const adminBadge = document.getElementById('admin-unread-badge');
  const learnerBadge = document.getElementById('learner-unread-badge');
  
  if (currentUser.role === 'admin') {
    const unreadAdminCount = messagesData.filter(m => m.receiverId === 'admin' && !m.read).length;
    if (adminBadge) {
      adminBadge.textContent = unreadAdminCount;
      adminBadge.style.display = unreadAdminCount > 0 ? 'inline-block' : 'none';
    }
  } else if (currentUser.role === 'learner') {
    const unreadLearnerCount = messagesData.filter(m => m.receiverId === currentUser.id && !m.read).length;
    if (learnerBadge) {
      learnerBadge.textContent = unreadLearnerCount;
      learnerBadge.style.display = unreadLearnerCount > 0 ? 'inline-block' : 'none';
    }
  }
}

function toggleChat() {
  const box = document.getElementById('chatBox');
  if (box) {
    box.classList.toggle('open');
    if (box.classList.contains('open')) {
      if (currentUser && currentUser.role === 'learner') {
        let changed = false;
        messagesData.forEach(m => {
          if (m.receiverId === currentUser.id && !m.read) {
            m.read = true;
            changed = true;
          }
        });
        if (changed) {
          saveSystemData();
          updateUnreadBadges();
        }
      }
      renderLearnerChat();
      setTimeout(() => {
        const h = document.getElementById('chatHistory');
        if (h) h.scrollTop = h.scrollHeight;
      }, 100);
    }
  }
}

function renderLearnerChat() {
  if (!currentUser || currentUser.role !== 'learner') return;
  const historyEl = document.getElementById('chatHistory');
  if (!historyEl) return;
  const myMsgs = messagesData.filter(m => m.senderId === currentUser.id || m.receiverId === currentUser.id);
  
  let html = '';
  myMsgs.forEach(m => {
    const isMine = m.senderId === currentUser.id;
    html += `<div class="msg-bubble ${isMine ? 'sent' : 'received'}">${m.content}</div>`;
  });
  
  if (myMsgs.length === 0) {
    html = `<div style="text-align:center; color:var(--text-muted); font-size:13px; margin-top:20px;">Chưa có tin nhắn nào.<br>Hãy gửi thắc mắc của bạn!</div>`;
  }
  historyEl.innerHTML = html;
}

function sendLearnerMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const content = input.value.trim();
  if (!content) return;
  
  messagesData.push({
    id: 'msg_' + Date.now(),
    senderId: currentUser.id,
    receiverId: 'admin',
    content: content,
    timestamp: Date.now(),
    read: false
  });
  
  input.value = '';
  saveSystemData();
  renderLearnerChat();
  setTimeout(() => {
    const h = document.getElementById('chatHistory');
    if (h) h.scrollTop = h.scrollHeight;
  }, 50);
}

function renderAdminMessages() {
  const listEl = document.getElementById('admin-chat-list');
  if (!listEl) return;
  const learners = usersData.filter(u => u.role === 'learner');
  
  let html = '';
  learners.forEach(learner => {
    const learnerMsgs = messagesData.filter(m => m.senderId === learner.id || m.receiverId === learner.id);
    const unreadCount = learnerMsgs.filter(m => m.senderId === learner.id && m.receiverId === 'admin' && !m.read).length;
    const lastMsg = learnerMsgs.length > 0 ? learnerMsgs[learnerMsgs.length - 1].content : 'Chưa có tin nhắn';
    
    html += `
      <div class="chat-user-item ${currentAdminChatUserId === learner.id ? 'active' : ''}" onclick="selectAdminChat('${learner.id}')">
        <div style="font-weight:600; display:flex; justify-content:space-between; margin-bottom:4px; font-size:14px;">
          ${learner.name}
          ${unreadCount > 0 ? `<span style="background:var(--danger, #ef4444); color:white; border-radius:10px; padding:2px 6px; font-size:11px;">${unreadCount}</span>` : ''}
        </div>
        <div style="font-size:12px; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${lastMsg}</div>
      </div>
    `;
  });
  listEl.innerHTML = html;
  
  if (currentAdminChatUserId) {
    renderAdminChatHistory();
  }
}

function selectAdminChat(learnerId) {
  currentAdminChatUserId = learnerId;
  
  // Mark as read
  let changed = false;
  messagesData.forEach(m => {
    if (m.senderId === learnerId && m.receiverId === 'admin' && !m.read) {
      m.read = true;
      changed = true;
    }
  });
  if (changed) saveSystemData();
  updateUnreadBadges();
  
  const learner = usersData.find(u => u.id === learnerId);
  const headerEl = document.getElementById('admin-chat-header');
  if (headerEl) headerEl.innerHTML = `Tin nhắn với: <strong>${learner ? learner.name : ''}</strong>`;
  
  const inputArea = document.getElementById('admin-chat-input-area');
  if (inputArea) inputArea.style.display = 'flex';
  
  renderAdminMessages(); // re-render list to remove unread badge and update active state
  renderAdminChatHistory();
}

function renderAdminChatHistory() {
  if (!currentAdminChatUserId) return;
  const historyEl = document.getElementById('admin-chat-history');
  if (!historyEl) return;
  const myMsgs = messagesData.filter(m => m.senderId === currentAdminChatUserId || m.receiverId === currentAdminChatUserId);
  
  let html = '';
  myMsgs.forEach(m => {
    const isAdmin = m.senderId === 'admin' || m.senderId === currentUser.id;
    html += `<div class="msg-bubble ${isAdmin ? 'sent' : 'received'}">${m.content}</div>`;
  });
  
  if (myMsgs.length === 0) {
    html = `<div style="text-align:center; color:var(--text-muted); font-size:13px; margin-top:20px;">Chưa có tin nhắn.</div>`;
  }
  historyEl.innerHTML = html;
  setTimeout(() => {
    historyEl.scrollTop = historyEl.scrollHeight;
  }, 50);
}

function sendAdminMessage() {
  if (!currentAdminChatUserId) return;
  const input = document.getElementById('adminChatInput');
  if (!input) return;
  const content = input.value.trim();
  if (!content) return;
  
  messagesData.push({
    id: 'msg_' + Date.now(),
    senderId: 'admin',
    receiverId: currentAdminChatUserId,
    content: content,
    timestamp: Date.now(),
    read: false
  });
  
  input.value = '';
  saveSystemData();
  renderAdminChatHistory();
}

function sendBulkAdminMessage() {
  const input = document.getElementById('bulk-message-content');
  if (!input) return;
  const content = input.value.trim();
  if (!content) return alert('Vui lòng nhập nội dung tin nhắn!');
  
  const learners = usersData.filter(u => u.role === 'learner');
  if (learners.length === 0) return alert('Hệ thống chưa có học viên nào!');
  
  const now = Date.now();
  let count = 0;
  
  learners.forEach((learner, index) => {
    messagesData.push({
      id: 'msg_bulk_' + now + '_' + index,
      senderId: 'admin',
      receiverId: learner.id,
      content: content,
      timestamp: now,
      read: false
    });
    count++;
  });
  
  input.value = '';
  saveSystemData();
  closeModal('modal-bulk-message');
  showToast(`✅ Đã gửi tin nhắn đến ${count} học viên!`);
  renderAdminMessages();
}

// INIT
window.onload = async () => {
  // Hiển thị hiệu ứng tải mờ khi đang lấy dữ liệu từ server
  const overlay = document.createElement('div');
  overlay.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:99999;display:flex;align-items:center;justify-content:center;font-weight:bold;color:var(--primary);">Đang tải dữ liệu hệ thống...</div>';
  document.body.appendChild(overlay);

  initFirebase();
  await fetchCloudData();
  
  // Initialize dark/light mode
  initTheme();

  // Pre-load prompt library if possible
  await loadIntegratedPrompts();

  overlay.remove();
  init();
};

/* ════════════════════════════════════════════════════
   ADDITIONAL LOGIC: THEME, STREAK, QUIZ HISTORY, SVG CHARTS & PROMPTS
════════════════════════════════════════════════════ */

// --- THEME MANAGEMENT ---
function initTheme() {
  const savedTheme = localStorage.getItem('nv_theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = '🌙';
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('nv_theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
  
  // Re-draw charts to fit current theme text colors
  if (currentUser) {
    if (currentUser.role === 'admin') {
      drawAdminCompletionChart();
      drawAdminDistributionChart();
    } else {
      drawLearnerProgressChart();
    }
  }
  showToast(isDark ? '🌙 Đã chuyển sang chế độ tối!' : '☀️ Đã chuyển sang chế độ sáng!');
}

// --- CALC STREAK DAYS ---
function calculateStreak(userId) {
  if (!userProgress || !userProgress[userId]) return 0;
  
  const completions = userProgress[userId];
  const dates = new Set();
  
  // Extract simple lesson completions timestamps
  for (const key in completions) {
    if (key === 'quizAttempts') continue;
    const val = completions[key];
    if (typeof val === 'number') {
      const d = new Date(val);
      const dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      dates.add(dateStr);
    }
  }
  
  // Extract quiz completion timestamps
  if (completions.quizAttempts && Array.isArray(completions.quizAttempts)) {
    completions.quizAttempts.forEach(attempt => {
      if (attempt.timestamp) {
        const d = new Date(attempt.timestamp);
        const dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        dates.add(dateStr);
      }
    });
  }

  if (dates.size === 0) return 0;

  // Sort dates descending
  const sortedDates = Array.from(dates).sort((a, b) => new Date(b) - new Date(a));
  
  const today = new Date();
  const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + String(yesterday.getDate()).padStart(2, '0');

  // Verify if streak is broken
  if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 1;
  let currentDate = new Date(sortedDates[0]);

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i]);
    const diffTime = Math.abs(currentDate - prevDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else if (diffDays > 1) {
      break;
    }
  }
  return streak;
}

// --- QUIZ HISTORY SAVING ---
function saveQuizAttempt(moduleId, score, total) {
  if (!currentUser) return;
  if (!userProgress[currentUser.id]) userProgress[currentUser.id] = {};
  if (!userProgress[currentUser.id].quizAttempts) {
    userProgress[currentUser.id].quizAttempts = [];
  }
  
  userProgress[currentUser.id].quizAttempts.push({
    moduleId: moduleId,
    score: score,
    total: total,
    timestamp: Date.now()
  });
  saveSystemData();
}

// --- DYNAMIC SVG CHARTS (NATIVE, STYLISH & ADAPTIVE) ---
function drawLearnerProgressChart() {
  const container = document.getElementById('learner-progress-chart');
  if (!container) return;
  
  const courses = getVisibleCourses();
  if (courses.length === 0) {
    container.innerHTML = '<p class="empty-state">Chưa đăng ký khóa học nào.</p>';
    return;
  }
  
  let svg = `<svg viewBox="0 0 500 ${courses.length * 60 + 40}" class="svg-chart" width="100%">`;
  
  // Draw grid lines
  for (let pct = 0; pct <= 100; pct += 25) {
    const x = 160 + (pct / 100) * 300;
    svg += `<line x1="${x}" y1="10" x2="${x}" y2="${courses.length * 60 + 10}" class="chart-grid-line" stroke="var(--border)" stroke-dasharray="4,4" />`;
    svg += `<text x="${x}" y="${courses.length * 60 + 25}" class="chart-text" text-anchor="middle" fill="var(--text-muted)">${pct}%</text>`;
  }
  
  courses.forEach((c, idx) => {
    const progress = getCourseProgress(c.id);
    const y = idx * 60 + 20;
    const barWidth = Math.max(8, (progress / 100) * 300);
    
    // Shorten title for label
    const shortTitle = c.title.length > 18 ? c.title.substring(0, 16) + '...' : c.title;
    
    svg += `<text x="10" y="${y + 14}" class="chart-text" style="font-weight:600;" fill="var(--text)" title="${c.title}">${shortTitle}</text>`;
    svg += `<rect x="160" y="${y}" width="300" height="20" rx="10" fill="var(--surface2)" />`;
    svg += `<rect x="160" y="${y}" width="${barWidth}" height="20" rx="10" fill="url(#learnerGrad)" class="chart-bar" />`;
    svg += `<text x="${160 + barWidth + 8}" y="${y + 14}" class="chart-text" style="font-weight:bold;" fill="var(--text)">${progress}%</text>`;
  });
  
  svg += `<defs>
    <linearGradient id="learnerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4285F4" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
  </defs></svg>`;
  
  container.innerHTML = svg;
}

function drawAdminCompletionChart() {
  const container = document.getElementById('admin-completion-chart');
  if (!container) return;
  
  const learners = usersData.filter(u => u.role === 'learner');
  if (learners.length === 0 || coursesData.length === 0) {
    container.innerHTML = '<p class="empty-state">Chưa có dữ liệu bài học.</p>';
    return;
  }
  
  let svg = `<svg viewBox="0 0 500 ${coursesData.length * 60 + 40}" class="svg-chart" width="100%">`;
  
  // Draw grid
  for (let pct = 0; pct <= 100; pct += 25) {
    const x = 160 + (pct / 100) * 300;
    svg += `<line x1="${x}" y1="10" x2="${x}" y2="${coursesData.length * 60 + 10}" class="chart-grid-line" stroke="var(--border)" stroke-dasharray="4,4" />`;
    svg += `<text x="${x}" y="${coursesData.length * 60 + 25}" class="chart-text" text-anchor="middle" fill="var(--text-muted)">${pct}%</text>`;
  }
  
  coursesData.forEach((c, idx) => {
    let totalProgress = 0;
    learners.forEach(u => {
      let uCompleted = 0;
      c.modules.forEach(m => {
        if (userProgress[u.id] && userProgress[u.id][m.id]) uCompleted++;
      });
      const cProg = c.modules.length === 0 ? 0 : (uCompleted / c.modules.length) * 100;
      totalProgress += cProg;
    });
    
    const avgProgress = Math.round(totalProgress / learners.length);
    const y = idx * 60 + 20;
    const barWidth = Math.max(8, (avgProgress / 100) * 300);
    const shortTitle = c.title.length > 18 ? c.title.substring(0, 16) + '...' : c.title;
    
    svg += `<text x="10" y="${y + 14}" class="chart-text" style="font-weight:600;" fill="var(--text)" title="${c.title}">${shortTitle}</text>`;
    svg += `<rect x="160" y="${y}" width="300" height="20" rx="10" fill="var(--surface2)" />`;
    svg += `<rect x="160" y="${y}" width="${barWidth}" height="20" rx="10" fill="url(#adminGrad)" class="chart-bar" />`;
    svg += `<text x="${160 + barWidth + 8}" y="${y + 14}" class="chart-text" style="font-weight:bold;" fill="var(--text)">${avgProgress}%</text>`;
  });
  
  svg += `<defs>
    <linearGradient id="adminGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#34A853" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
  </defs></svg>`;
  
  container.innerHTML = svg;
}

function drawAdminDistributionChart() {
  const container = document.getElementById('admin-distribution-chart');
  if (!container) return;
  
  const learners = usersData.filter(u => u.role === 'learner');
  if (learners.length === 0) {
    container.innerHTML = '<p class="empty-state">Chưa có học viên.</p>';
    return;
  }
  
  // Categorize based on email domain or name keywords
  let counts = { 'Khối BĐS': 0, 'Khối Năng lượng': 0, 'Khối Giáo dục': 0, 'Khối Nông nghiệp': 0, 'Khác': 0 };
  learners.forEach(u => {
    const email = u.email.toLowerCase();
    const name = u.name.toLowerCase();
    
    if (email.includes('bds') || email.includes('land') || name.includes('bất động sản') || name.includes('bđs')) {
      counts['Khối BĐS']++;
    } else if (email.includes('power') || email.includes('nlx') || email.includes('energy') || name.includes('năng lượng')) {
      counts['Khối Năng lượng']++;
    } else if (email.includes('edu') || email.includes('school') || email.includes('edison') || name.includes('giáo dục')) {
      counts['Khối Giáo dục']++;
    } else if (email.includes('agri') || email.includes('farm') || name.includes('nông nghiệp')) {
      counts['Khối Nông nghiệp']++;
    } else {
      counts['Khác']++;
    }
  });
  
  const data = Object.keys(counts).map(key => ({ name: key, value: counts[key] })).filter(item => item.value > 0);
  if (data.length === 0) {
    container.innerHTML = '<p class="empty-state">Chưa phân lớp học viên.</p>';
    return;
  }
  
  const colors = ['#4285F4', '#34A853', '#9333EA', '#F97316', '#5F6368'];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let svg = `<svg viewBox="0 0 400 200" class="svg-chart" width="100%">`;
  let cumulativeAngle = 0;
  const cx = 100, cy = 100, r = 70;
  
  data.forEach((item, idx) => {
    const percent = item.value / total;
    const angle = percent * 360;
    
    const x1 = cx + r * Math.cos((cumulativeAngle - 90) * Math.PI / 180);
    const y1 = cy + r * Math.sin((cumulativeAngle - 90) * Math.PI / 180);
    
    cumulativeAngle += angle;
    
    const x2 = cx + r * Math.cos((cumulativeAngle - 90) * Math.PI / 180);
    const y2 = cy + r * Math.sin((cumulativeAngle - 90) * Math.PI / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Draw slice path
    svg += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z" fill="${colors[idx % colors.length]}" stroke="var(--surface)" stroke-width="2" />`;
    
    // Draw legend text and colored boxes
    svg += `<rect x="220" y="${idx * 30 + 30}" width="12" height="12" rx="3" fill="${colors[idx % colors.length]}" />`;
    svg += `<text x="240" y="${idx * 30 + 41}" class="chart-text" fill="var(--text)" style="font-weight: 500;">${item.name}: ${item.value} (${Math.round(percent * 100)}%)</text>`;
  });
  
  // Draw center hole to make it a donut chart
  svg += `<circle cx="${cx}" cy="${cy}" r="42" fill="var(--surface)" />`;
  svg += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" class="chart-text" style="font-weight:bold; font-size:14px;" fill="var(--text)">${total}</text>`;
  svg += `</svg>`;
  
  container.innerHTML = svg;
}

// --- INTEGRATED PROMPTS LIBRARY LOGIC ---
let currentPromptView = 'table';

async function loadIntegratedPrompts() {
  // First priority: read prompts already stored in Firebase Cloud promptsData
  if (promptsData && promptsData.length > 0) {
    populatePromptFilters();
    return;
  }
  
  // Second priority: read from localStorage
  const savedPrompts = localStorage.getItem('nv_learn_prompts_v1');
  if (savedPrompts) {
    promptsData = JSON.parse(savedPrompts);
    populatePromptFilters();
    return;
  }
  
  // Third priority: Fetch from local repository "Prompt" file
  try {
    const response = await fetch('Prompt');
    if (response.ok) {
      const text = await response.text();
      parsePromptsText(text);
      saveSystemData(); // Sync up to Firestore
    }
  } catch (error) {
    console.warn("Offline or CORS issue: prompt uploader will be fallback option.", error);
  }
}

function parsePromptsText(text) {
  promptsData = [];
  const lines = text.split('\n').map(l => l.trim()).filter(l => l !== '');
  let currentCategory = '';
  let i = 0;

  while (i < lines.length) {
    if (lines[i].match(/^\d+\.\s+KHỐI/)) {
      currentCategory = lines[i].replace(/^\d+\.\s+/, '').replace(/\s+\(\d+\s+Prompt\)/i, '').trim();
      i++;
      while (i < lines.length && !lines[i].match(/^\d+$/)) {
        i++;
      }
    } else if (lines[i].match(/^\d+$/)) {
      let stt = lines[i++];
      let group = lines[i++] || '';
      let title = lines[i++] || '';
      
      let content = '';
      while (i < lines.length && !['Content', 'Hình ảnh', 'Video'].includes(lines[i])) {
        content += lines[i] + '\n';
        i++;
      }
      let format = lines[i++] || 'Content';

      if (title && content) {
        promptsData.push({
          id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          category: currentCategory,
          stt: stt,
          group: group,
          title: title,
          content: content.trim(),
          format: format
        });
      }
    } else {
      i++;
    }
  }

  populatePromptFilters();
  localStorage.setItem('nv_learn_prompts_v1', JSON.stringify(promptsData));
}

function handlePromptUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    parsePromptsText(e.target.result);
    saveSystemData();
    renderIntegratedPrompts();
    showToast('✨ Đã nạp thành công ' + promptsData.length + ' prompts!');
  };
  reader.readAsText(file);
}

function populatePromptFilters() {
  const categories = [...new Set(promptsData.map(p => p.category))];
  const formats = [...new Set(promptsData.map(p => p.format))];

  const catSelect = document.getElementById('promptCategoryFilter');
  if (catSelect) {
    // Reset options
    catSelect.innerHTML = '<option value="all">Tất cả Khối/Phòng ban</option>';
    categories.forEach(c => {
      let opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      catSelect.appendChild(opt);
    });
  }

  const formatSelect = document.getElementById('promptFormatFilter');
  if (formatSelect) {
    formatSelect.innerHTML = '<option value="all">Tất cả định dạng</option>';
    formats.forEach(f => {
      let opt = document.createElement('option');
      opt.value = f; opt.textContent = f;
      formatSelect.appendChild(opt);
    });
  }
}

function renderIntegratedPrompts(data = null) {
  const container = document.getElementById('promptViewContainer');
  if (!container) return;
  
  // Show file uploader fallback if no prompts exist
  if (promptsData.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="max-width: 500px; margin: 40px auto; border: 2px dashed var(--border); border-radius: var(--radius); padding: 40px 20px;">
        <div class="empty-icon" style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
        <h3 style="margin-bottom: 8px;">Không thể tải dữ liệu Prompt tự động</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          Do chạy offline (file://) hoặc chưa có dữ liệu đồng bộ đám mây. Vui lòng chọn file <strong>Prompt</strong> trong thư mục dự án:
        </p>
        <input type="file" id="integratedPromptFileInput" style="font-size: 0.9rem;" onchange="handlePromptUpload(event)">
      </div>
    `;
    return;
  }

  const renderData = data || promptsData;
  
  // Show header add button if admin
  const addBtn = document.getElementById('btn-create-prompt-header');
  if (addBtn) addBtn.style.display = currentUser.role === 'admin' ? 'block' : 'none';

  if (renderData.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>Không tìm thấy kết quả phù hợp.</p></div>';
    return;
  }

  if (currentPromptView === 'grid') {
    let html = '<div class="prompts-grid-container">';
    renderData.forEach(p => {
      const idx = promptsData.findIndex(item => item.id === p.id);
      
      const adminActions = currentUser.role === 'admin' ? `
        <button class="btn-sm" onclick="openPromptModal(${idx})" style="padding: 6px; flex: 1;">✏️ Sửa</button>
        <button class="btn-sm danger" onclick="deletePrompt(${idx})" style="padding: 6px; flex: 1;">🗑️ Xóa</button>
      ` : '';

      html += `
        <div class="prompt-custom-card" onclick="viewPromptDetails(${idx})">
          <div class="prompt-card-header">
            <span class="tag-format">${p.format}</span>
          </div>
          <h3 class="prompt-card-title">${p.title}</h3>
          <div class="prompt-card-tags">
            <span class="tag-category">${p.category}</span>
            <span class="tag-group">${p.group}</span>
          </div>
          <div class="prompt-card-content" id="prompt-content-${idx}">${p.content}</div>
          <div style="display:flex; gap:8px; margin-top: auto;" onclick="event.stopPropagation()">
            <button class="btn-primary" onclick="copyPromptToClipboard(${idx}, this)" style="flex: 2;">📋 Copy</button>
            ${adminActions}
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  } else {
    let html = `
      <div class="table-wrapper" style="max-height: 600px;">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 25%">Bộ phận / Nghiệp vụ</th>
              <th style="width: 25%">Tên Prompt</th>
              <th style="width: 35%">Nội dung (Xem trước)</th>
              <th style="width: 15%">Hành động</th>
            </tr>
          </thead>
          <tbody>
    `;
    renderData.forEach(p => {
      const idx = promptsData.findIndex(item => item.id === p.id);
      
      const adminActions = currentUser.role === 'admin' ? `
        <button class="btn-sm" onclick="openPromptModal(${idx})" style="padding: 6px; width:auto;">✏️</button>
        <button class="btn-sm danger" onclick="deletePrompt(${idx})" style="padding: 6px; width:auto;">🗑️</button>
      ` : '';

      html += `
        <tr onclick="viewPromptDetails(${idx})" style="cursor:pointer">
          <td>
            <div style="font-weight: 700; font-size: 0.85rem; color: var(--primary-dark);">${p.category}</div>
            <div style="display:flex; gap:6px; margin-top: 4px;">
              <span class="tag-group" style="font-size:0.7rem; padding: 2px 6px;">${p.group}</span>
              <span class="tag-format" style="font-size:0.7rem; padding: 2px 6px;">${p.format}</span>
            </div>
          </td>
          <td style="font-weight: 600;">${p.title}</td>
          <td>
            <div class="prompt-card-content" id="prompt-content-${idx}" style="max-height: 80px; margin-bottom:0; background:none; padding:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">${p.content}</div>
          </td>
          <td onclick="event.stopPropagation()">
            <div style="display:flex; gap:6px;">
              <button class="btn-primary" onclick="copyPromptToClipboard(${idx}, this)" style="padding: 6px 12px; font-size: 0.82rem; flex:1;">Copy</button>
              ${adminActions}
            </div>
          </td>
        </tr>
      `;
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;
  }
}

function handlePromptFilter() {
  const search = document.getElementById('promptSearchInput').value.toLowerCase();
  const cat = document.getElementById('promptCategoryFilter').value;
  const format = document.getElementById('promptFormatFilter').value;

  const filtered = promptsData.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search) || p.content.toLowerCase().includes(search) || p.group.toLowerCase().includes(search);
    const matchCat = cat === 'all' || p.category === cat;
    const matchFormat = format === 'all' || p.format === format;
    return matchSearch && matchCat && matchFormat;
  });

  renderIntegratedPrompts(filtered);
}

function setPromptView(view) {
  currentPromptView = view;
  const gridBtn = document.getElementById('promptBtnGrid');
  const tableBtn = document.getElementById('promptBtnTable');
  if (gridBtn && tableBtn) {
    gridBtn.classList.toggle('active', view === 'grid');
    tableBtn.classList.toggle('active', view === 'table');
  }
  handlePromptFilter();
}

function copyPromptToClipboard(idx, btn) {
  const text = document.getElementById(`prompt-content-${idx}`).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Đã Copy!';
    btn.classList.add('btn-success');
    btn.classList.remove('btn-primary');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-success');
    }, 2000);
  });
}

function openPromptModal(idx = -1) {
  openModal('promptModal');
  const indexEl = document.getElementById('editPromptIndex');
  const titleEl = document.getElementById('promptModalTitle');
  const catEl = document.getElementById('pCategory');
  const grpEl = document.getElementById('pGroup');
  const titleInput = document.getElementById('pTitle');
  const contentEl = document.getElementById('pContent');
  const formatEl = document.getElementById('pFormat');

  if (idx > -1) {
    titleEl.textContent = 'Chỉnh sửa Prompt';
    indexEl.value = idx;
    const p = promptsData[idx];
    catEl.value = p.category;
    grpEl.value = p.group;
    titleInput.value = p.title;
    contentEl.value = p.content;
    formatEl.value = p.format;
  } else {
    titleEl.textContent = 'Thêm Prompt Mới';
    indexEl.value = -1;
    catEl.value = '';
    grpEl.value = '';
    titleInput.value = '';
    contentEl.value = '';
    formatEl.value = 'Content';
  }
}

// Handler for Add button in Integrated view header
function openPromptModalEmpty() {
  openPromptModal(-1);
}

function savePrompt() {
  const idx = parseInt(document.getElementById('editPromptIndex').value);
  const category = document.getElementById('pCategory').value.trim() || 'Chung';
  const group = document.getElementById('pGroup').value.trim() || 'Nghiệp vụ';
  const title = document.getElementById('pTitle').value.trim();
  const content = document.getElementById('pContent').value.trim();
  const format = document.getElementById('pFormat').value;

  if (!title || !content) return alert('Vui lòng nhập Tên và Nội dung!');

  if (idx > -1) {
    promptsData[idx] = { ...promptsData[idx], category, group, title, content, format };
    showToast('✅ Đã cập nhật Prompt!');
  } else {
    const stt = promptsData.length > 0 ? String(promptsData.length + 1) : '1';
    promptsData.push({
      id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      stt, category, group, title, content, format
    });
    showToast('✅ Đã tạo Prompt mới thành công!');
  }
  
  saveSystemData();
  localStorage.setItem('nv_learn_prompts_v1', JSON.stringify(promptsData));
  closeModal('promptModal');
  renderIntegratedPrompts();
}

function deletePrompt(idx) {
  if (confirm('Bạn có chắc muốn xóa prompt này?')) {
    promptsData.splice(idx, 1);
    saveSystemData();
    localStorage.setItem('nv_learn_prompts_v1', JSON.stringify(promptsData));
    renderIntegratedPrompts();
    showToast('🗑️ Đã xóa prompt!');
  }
}

function viewPromptDetails(idx) {
  const p = promptsData[idx];
  document.getElementById('vPromptTitle').textContent = p.title;
  document.getElementById('vPromptMeta').innerHTML = `
    <span class="tag-category">${p.category}</span>
    <span class="tag-group">${p.group}</span>
    <span class="tag-format">${p.format}</span>
  `;
  document.getElementById('vPromptContent').textContent = p.content;
  document.getElementById('vPromptCopyBtn').onclick = function() {
    copyPromptToClipboard(idx, this);
  };
  openModal('viewPromptModal');
}

// --- RESULTS & HISTORY RENDERING ---
function renderHistory() {
  const learnerView = document.getElementById('history-learner-view');
  const adminView = document.getElementById('history-admin-view');
  
  if (currentUser.role === 'admin') {
    learnerView.style.display = 'none';
    adminView.style.display = 'block';
    
    // Render Admin full user scores list
    let html = '';
    const learners = usersData.filter(u => u.role === 'learner');
    let count = 0;
    
    learners.forEach(user => {
      if (userProgress[user.id] && userProgress[user.id].quizAttempts) {
        userProgress[user.id].quizAttempts.forEach(attempt => {
          // Find course & lesson titles
          let lessonTitle = attempt.moduleId;
          let courseTitle = 'Khóa học';
          
          coursesData.forEach(c => {
            const m = c.modules.find(mod => mod.id === attempt.moduleId);
            if (m) {
              lessonTitle = m.title;
              courseTitle = c.title.split(':')[0] || c.title;
            }
          });
          
          const dt = new Date(attempt.timestamp).toLocaleString();
          const scorePercent = Math.round((attempt.score / attempt.total) * 100);
          const isPassed = scorePercent >= 80;
          
          html += `
            <tr>
              <td><strong>${user.name}</strong></td>
              <td>${user.email}</td>
              <td>
                <div style="font-size:0.75rem; color:var(--text-muted);">${courseTitle}</div>
                <div style="font-weight:600;">${lessonTitle}</div>
              </td>
              <td>
                <span class="score-badge ${isPassed ? 'pass' : 'fail'}">${attempt.score}/${attempt.total} (${scorePercent}%)</span>
              </td>
              <td style="font-size:0.85rem; color:var(--text-muted);">${dt}</td>
            </tr>
          `;
          count++;
        });
      }
    });
    
    document.getElementById('history-admin-tbody').innerHTML = html || `<tr><td colspan="5" class="empty-state">Chưa có bài làm trắc nghiệm nào trong hệ thống.</td></tr>`;
  } else {
    learnerView.style.display = 'block';
    adminView.style.display = 'none';
    
    // Streak days
    const streak = calculateStreak(currentUser.id);
    document.getElementById('history-streak-val').textContent = streak + ' ngày';
    
    // Quiz list for this learner
    let html = '';
    let quizCount = 0;
    let totalScorePercent = 0;
    
    if (userProgress[currentUser.id] && userProgress[currentUser.id].quizAttempts) {
      const attempts = userProgress[currentUser.id].quizAttempts;
      attempts.forEach(attempt => {
        let lessonTitle = attempt.moduleId;
        let courseTitle = 'Khóa học';
        
        coursesData.forEach(c => {
          const m = c.modules.find(mod => mod.id === attempt.moduleId);
          if (m) {
            lessonTitle = m.title;
            courseTitle = c.title.split(':')[0] || c.title;
          }
        });
        
        const dt = new Date(attempt.timestamp).toLocaleString();
        const scorePercent = Math.round((attempt.score / attempt.total) * 100);
        const isPassed = scorePercent >= 80;
        
        totalScorePercent += scorePercent;
        quizCount++;
        
        html += `
          <tr>
            <td><span style="font-size:0.78rem; color:var(--text-muted);">${courseTitle}</span></td>
            <td><strong>${lessonTitle}</strong></td>
            <td>
              <span class="score-badge ${isPassed ? 'pass' : 'fail'}">${attempt.score}/${attempt.total} (${scorePercent}%)</span>
            </td>
            <td style="font-size:0.85rem; color:var(--text-muted);">${dt}</td>
            <td><strong>${isPassed ? '✅ Đạt' : '❌ Chưa Đạt'}</strong></td>
          </tr>
        `;
      });
    }
    
    document.getElementById('history-quiz-count').textContent = quizCount;
    const avg = quizCount === 0 ? 0 : Math.round(totalScorePercent / quizCount);
    document.getElementById('history-quiz-avg').textContent = avg + '%';
    
    document.getElementById('history-learner-tbody').innerHTML = html || `<tr><td colspan="5" class="empty-state">Bạn chưa hoàn thành bài thi trắc nghiệm nào.</td></tr>`;
  }
}

// --- APP STARTUP ---
// Khởi động Firebase, tải dữ liệu từ cloud, rồi mới chạy init()
document.addEventListener('DOMContentLoaded', async () => {
  // Tạo màn hình loading
  const loadingEl = document.createElement('div');
  loadingEl.id = 'app-loading-screen';
  loadingEl.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:9999',
    'background:#0f172a',
    'display:flex', 'flex-direction:column',
    'align-items:center', 'justify-content:center', 'gap:16px',
    'font-family:Inter,sans-serif'
  ].join(';');
  loadingEl.innerHTML = [
    '<svg width="48" height="48" viewBox="0 0 36 36" fill="none">',
    '<rect width="36" height="36" rx="10" fill="#4285F4"/>',
    '<path d="M10 24 L18 10 L26 24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    '<path d="M13 20 L23 20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>',
    '</svg>',
    '<div id="loading-msg" style="color:#94a3b8;font-size:0.9rem;">Đang kết nối Firebase...</div>',
    '<div style="width:220px;height:3px;background:#1e293b;border-radius:2px;overflow:hidden;">',
    '<div style="height:100%;width:30%;background:#4285F4;border-radius:2px;animation:nvLoadSlide 1.2s ease-in-out infinite;"></div>',
    '</div>',
    '<div id="loading-error" style="display:none;max-width:380px;background:#1e293b;border:1px solid #ef4444;border-radius:10px;padding:16px;text-align:center;">',
    '<div style="color:#ef4444;font-weight:700;font-size:1rem;margin-bottom:8px;">⚠️ Không thể kết nối Firebase</div>',
    '<div id="loading-error-msg" style="color:#94a3b8;font-size:0.8rem;margin-bottom:12px;word-break:break-all;"></div>',
    '<button onclick="location.reload()" style="background:#4285F4;color:white;border:none;border-radius:6px;padding:8px 20px;cursor:pointer;font-size:0.85rem;">🔄 Thử lại</button>',
    '</div>',
    '<style>@keyframes nvLoadSlide{0%{width:10%;margin-left:0}50%{width:60%;margin-left:20%}100%{width:10%;margin-left:90%}}</style>'
  ].join('');
  document.body.appendChild(loadingEl);

  try {
    // Bước 1: Khởi động Firebase SDK
    console.log('[NV Learn] Bắt đầu khởi động...');
    initFirebase();
    console.log('[NV Learn] Firebase SDK đã khởi động, projectId:', firebase.app().options.projectId);

    // Bước 2: Tải dữ liệu từ Firestore
    await fetchCloudData();

  } catch (e) {
    // Hiển thị lỗi ngay trên màn hình - không cần mở console
    console.error('[NV Learn] LỖI KHỞI ĐỘNG:', e);
    const errBox = document.getElementById('loading-error');
    const errMsg = document.getElementById('loading-error-msg');
    if (errBox && errMsg) {
      const code = e.code || '';
      let hint = '';
      if (code === 'permission-denied') hint = '❌ Lỗi quyền truy cập (permission-denied). Cần cập nhật Firestore Rules.';
      else if (code === 'unavailable') hint = '🌐 Không có kết nối mạng hoặc Firebase tạm thời không khả dụng.';
      else if (code === 'resource-exhausted') hint = '📊 Đã hết quota miễn phí hôm nay. Thử lại sau 00:00 giờ (UTC).';
      else hint = e.message || 'Lỗi không xác định';
      errMsg.textContent = (code ? '[' + code + '] ' : '') + hint;
      errBox.style.display = 'block';
      document.getElementById('loading-msg').textContent = 'Kết nối thất bại';
    }
    // Vẫn tiếp tục chạy app sau 3 giây (với data rỗng)
    await new Promise(r => setTimeout(r, 3000));
  } finally {
    // Bước 3: Xóa màn hình loading và chạy app
    const el = document.getElementById('app-loading-screen');
    if (el) el.remove();
    init();
  }
});
