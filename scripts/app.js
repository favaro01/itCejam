document.addEventListener('DOMContentLoaded', () => {
            const themeToggleBtn = document.getElementById('theme-toggle');
            const htmlElement = document.documentElement;

            const menuContainer = document.getElementById('main-menu-container');

            // --- LÓGICA DA NAVBAR ---
            if (menuContainer && typeof portalData !== 'undefined') {
                menuContainer.innerHTML = '';
                portalData.menuItems.forEach(item => {
                    const isActive = window.location.pathname.includes(item.link);

                    const activeClasses = 'text-blue-900 dark:text-sky-400 font-bold border-b-2 border-blue-900 dark:border-sky-400';
                    const inactiveClasses = 'text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-white';

                    const colorClass = isActive ? activeClasses : inactiveClasses;

                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${item.link}" class="${colorClass} transition-colors py-1 block">${item.label}</a>`;
                    menuContainer.appendChild(li);
                });
            }

            // --- RENDERIZAÇÃO DO ORGANOGRAMA ---
            const orgContainer = document.getElementById('org-chart-container');
            
            if (orgContainer && portalData.orgChart) {
                const mgr = portalData.orgChart.manager;
                const branches = portalData.orgChart.branches;

                // HTML da Árvore
                let treeHTML = `
                    <div class="tree">
                        <ul>
                            <li>
                                <div class="tree-card border-l-4 border-blue-600 !p-6 max-w-md mx-auto relative">
                                    <i class="fas fa-quote-left text-4xl text-blue-100 absolute -top-4 -left-4"></i>
                                    
                                    <div class="flex flex-col items-center">
                                        <img src="${mgr.photo}" class="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3">
                                        <h3 class="text-xl font-bold text-blue-900 dark:text-white">${mgr.name}</h3>
                                        <p class="text-sm text-blue-500 font-bold uppercase tracking-widest mb-4">${mgr.role}</p>
                                        <p class="text-slate-500 dark:text-slate-300 italic font-serif text-sm">"${mgr.quote}"</p>
                                    </div>
                                </div>

                                <ul>
                                    ${branches.map(branch => `
                                        <li>
                                            <div class="tree-card min-w-[180px]">
                                                <img src="${branch.leader.photo}" class="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-slate-100">
                                                <h4 class="font-bold text-slate-800 dark:text-white">${branch.leader.name}</h4>
                                                <p class="text-xs text-blue-500 font-bold mb-2">${branch.leader.role}</p>
                                            </div>
                                            
                                            <ul>
                                                ${branch.team.map(member => `
                                                    <li>
                                                        <div class="tree-card !p-2 !text-xs bg-slate-50 dark:bg-slate-900">
                                                            ${member}
                                                        </div>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </li>
                                    `).join('')}
                                </ul>
                            </li>
                        </ul>
                    </div>
                `;

                orgContainer.innerHTML = treeHTML;
            }

            // --- LÓGICA DARK MODE ---
            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                htmlElement.classList.add('dark');
            } else {
                htmlElement.classList.remove('dark');
            }

            themeToggleBtn.addEventListener('click', () => {
                htmlElement.classList.toggle('dark');
                if (htmlElement.classList.contains('dark')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });

            // --- LÓGICA DO CHAT (Agora com EventListeners) ---
            const chatWindow = document.getElementById('chat-window');
            const chatCloseBtn = document.getElementById('chat-close-btn');
            const chatFabBtn = document.getElementById('chat-fab-btn');

            function toggleChat() {
                if (chatWindow.classList.contains('hidden')) {
                    chatWindow.classList.remove('hidden');
                } else {
                    chatWindow.classList.add('hidden');
                }
            }

            // Adiciona eventos apenas se os elementos existirem
            if(chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChat);
            if(chatFabBtn) chatFabBtn.addEventListener('click', toggleChat);

            // --- ANIMAÇÃO DNA (Variável 't' renomeada para 'dnaTime') ---
            const canvas = document.getElementById('hero-canvas');
            const ctx = canvas.getContext('2d');
            let width, height;
            let dnaTime = 0; // Nome alterado para evitar conflito

            // Mouse tracking para interação
            let mouse = { x: null, y: null };

            window.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            window.addEventListener('mouseout', () => {
                mouse.x = undefined;
                mouse.y = undefined;
            });

            function resize() {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            }

            function animateDNA() {
                ctx.clearRect(0, 0, width, height);
                const isDark = htmlElement.classList.contains('dark');
                
                const amplitude = 50;
                const frequency = 0.1;
                const speed = 0.01;
                const strandSpacing = 15;
                const numPoints = Math.ceil(width / strandSpacing);
                const centerY = height / 2;

                ctx.lineWidth = 2;
                dnaTime += speed;

                for (let i = 0; i < numPoints; i++) {
                    const x = i * strandSpacing;
                    
                    // Posições base do DNA (seno e cosseno)
                    let y1 = centerY + Math.sin(i * frequency + dnaTime) * amplitude;
                    let y2 = centerY + Math.sin(i * frequency + dnaTime + Math.PI) * amplitude;

                    // --- INTERAÇÃO COM MOUSE (DISTORÇÃO) ---
                    // Se o mouse estiver perto, empurrar os pontos
                    if (mouse.x != undefined && mouse.y != undefined) {
                        const mouseRadius = 150;
                        const forceStrength = 50;

                        // Cálculo para Fita 1
                        let dx1 = x - mouse.x;
                        let dy1 = y1 - mouse.y;
                        let dist1 = Math.sqrt(dx1*dx1 + dy1*dy1);

                        if (dist1 < mouseRadius) {
                            const force = (mouseRadius - dist1) / mouseRadius; // 0 a 1
                            const angle = Math.atan2(dy1, dx1);
                            // Deslocar y1 (poderíamos deslocar x também, mas em ondas Y fica melhor visualmente)
                            y1 += Math.sin(angle) * force * forceStrength;
                        }

                        // Cálculo para Fita 2
                        let dx2 = x - mouse.x;
                        let dy2 = y2 - mouse.y;
                        let dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);

                        if (dist2 < mouseRadius) {
                            const force = (mouseRadius - dist2) / mouseRadius;
                            const angle = Math.atan2(dy2, dx2);
                            y2 += Math.sin(angle) * force * forceStrength;
                        }
                    }
                    // --- FIM INTERAÇÃO ---

                    const colorStrand1 = isDark ? 'rgba(45, 212, 191, 0.6)' : 'rgba(13, 148, 136, 0.6)';
                    const colorStrand2 = isDark ? 'rgba(59, 130, 246, 0.6)' : 'rgba(37, 99, 235, 0.6)';

                    ctx.fillStyle = colorStrand1;
                    ctx.beginPath();
                    ctx.arc(x, y1, 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = colorStrand2;
                    ctx.beginPath();
                    ctx.arc(x, y2, 3, 0, Math.PI * 2);
                    ctx.fill();

                    if (i % 3 === 0) {
                        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                        ctx.beginPath();
                        ctx.moveTo(x, y1);
                        ctx.lineTo(x, y2);
                        ctx.stroke();
                    }
                }

                requestAnimationFrame(animateDNA);
            }

            window.addEventListener('resize', resize);
            resize();
            animateDNA();
        });