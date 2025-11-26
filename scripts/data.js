// --- LÓGICA DE BUSCA ---
            const searchInput = document.getElementById('search-input');
            const searchResults = document.getElementById('search-results');
            const searchData = [
                { title: "Instalar Impressora", category: "Equipamentos", icon: "fa-print" },
                { title: "Erro no Prontuário", category: "Sistemas Clínicos", icon: "fa-notes-medical" },
                { title: "Liberar Acesso VPN", category: "Segurança", icon: "fa-user-shield" },
                { title: "Problema no WiFi", category: "Rede", icon: "fa-wifi" },
                { title: "Solicitar Tablet", category: "Equipamentos", icon: "fa-tablet-alt" }
            ];

            searchInput.addEventListener('input', (e) => {
                const value = e.target.value.toLowerCase();
                if (value.length < 2) {
                    searchResults.classList.add('hidden');
                    return;
                }
                const filtered = searchData.filter(item => item.title.toLowerCase().includes(value));
                if (filtered.length > 0) {
                    searchResults.innerHTML = filtered.map(item => `
                        <div class="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-3 border-b border-slate-100 dark:border-white/5 last:border-0 transition-colors">
                            <div class="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
                                <i class="fas ${item.icon}"></i>
                            </div>
                            <div>
                                <h5 class="text-sm font-bold text-slate-800 dark:text-white">${item.title}</h5>
                                <p class="text-xs text-slate-500 dark:text-slate-400">${item.category}</p>
                            </div>
                        </div>
                    `).join('');
                    searchResults.classList.remove('hidden');
                } else {
                    searchResults.innerHTML = `<div class="p-4 text-center text-sm text-slate-500">Nenhum resultado encontrado.</div>`;
                    searchResults.classList.remove('hidden');
                }
            });

            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.classList.add('hidden');
                }
            });