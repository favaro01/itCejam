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
            // Dados de Navegação do Portal
            const portalData = {
                menuItems: [
                {label: "Início", link: "index.html"},
                {label: "Quem Somos", link: "equipe.html"}
            ],

            // ESTRUTURA DO TIME
            orgChart: {
                manager: {
                    name: "Rodrigo Miranda", // Nome fictício ou real se souber
                    role: "Gerente de Inovação e Tecnologia",
                    photo: "https://ui-avatars.com/api/?name=Rodrigo+Miranda&background=004A8D&color=fff&size=128",
                    quote: "A Transformação Digital é essencial para aprimorar a experiência do paciente e melhorar resultados clínicos na área da saúde. A adoção de tecnologias e soluções inovadoras podem transformar a maneira como o atendimento médico é prestado. É uma jornada contínua que exige compromisso da liderança e da equipe para oferecer um cuidado de qualidade aos pacientes."
                },
                branches: [
                    {
                        leader: { name: "Rodrigo Silva", role: "Coord. Inovação e Tecnologia - Sustentação", photo: "https://ui-avatars.com/api/?name=Rodrigo+Silva&background=0284c7&color=fff" },
                        team: ["Infraestrutura TI", "Segurança da Informação", "Suporte Técnico", "Central de Atendimento", "Regionais"]
                    },
                    {
                        leader: { name: "Marcel Leme", role: "Coord. Inovação e Tecnologia - Sistemas", photo: "https://ui-avatars.com/api/?name=Marcel+Leme&background=0d9488&color=fff" },
                        team: ["Assistenciais", "Suporte Sistemas Legados", "Desenvolvimento"]
                    },
                    {
                        leader: { name: "Jefferson Nascimento", role: "Coord. Inovação e Tecnologia - Soluções Corporativas", photo: "https://ui-avatars.com/api/?name=Jefferson+Nascimento&background=7c3aed&color=fff" },
                        team: ["Recursos Empresariais"]
                    },
                    {
                        leader: {name: "Projetos IT", role: "Equipe de Projetos", photo: "https://ui-avatars.com/api/?name=Equipe+de+Projetos&background=9333ea&color=fff"},
                        team: ["Product Owner", "Analista de Projeto", "Analista Administrativo"]
                    }
                ]
            }
            
            };

            

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