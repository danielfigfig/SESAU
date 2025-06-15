// Classe principal da aplicação
class AutomationApp {
    constructor() {
        this.data = {
            groups: [],
            actions: [],
            nextId: 1
        };
        this.selectedItem = null;
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.render();
        this.log('Sistema iniciado com sucesso');
    }

    // Gerenciamento de dados
    loadData() {
        const saved = localStorage.getItem('automationAppData');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    }

    saveData() {
        localStorage.setItem('automationAppData', JSON.stringify(this.data));
        this.log('Dados salvos automaticamente');
    }

    // Geração de IDs únicos
    generateId() {
        return this.data.nextId++;
    }

    // Sistema de log
    log(message, type = 'info') {
        const logContent = document.getElementById('logContent');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        
        const time = new Date().toLocaleTimeString();
        entry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-message">${message}</span>
        `;
        
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
    }

    // Vinculação de eventos
    bindEvents() {
        // Botão principal de adicionar grupo
        document.getElementById('addRootGroup').addEventListener('click', () => {
            this.showCreateModal('group');
        });

        // Fechar editor
        document.getElementById('closeEditor').addEventListener('click', () => {
            this.closeEditor();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('confirmModal').addEventListener('click', () => {
            this.handleModalConfirm();
        });

        // Limpar log
        document.getElementById('clearLog').addEventListener('click', () => {
            document.getElementById('logContent').innerHTML = '';
            this.log('Log limpo');
        });

        // Fechar modal clicando fora
        document.getElementById('createModal').addEventListener('click', (e) => {
            if (e.target.id === 'createModal') {
                this.closeModal();
            }
        });
    }

    // Criação de itens
    createGroup(name, description, parentId = null) {
        const group = {
            id: this.generateId(),
            type: 'group',
            name: name,
            description: description,
            parentId: parentId,
            children: [],
            expanded: true,
            createdAt: new Date().toISOString()
        };

        this.data.groups.push(group);
        
        if (parentId) {
            const parent = this.findItemById(parentId);
            if (parent) {
                parent.children.push(group.id);
            }
        }

        this.saveData();
        this.render();
        this.log(`Grupo "${name}" criado`);
        return group;
    }

    createAction(name, description, parentId = null) {
        const action = {
            id: this.generateId(),
            type: 'action',
            name: name,
            description: description,
            parentId: parentId,
            triggers: [],
            enabled: true,
            createdAt: new Date().toISOString()
        };

        this.data.actions.push(action);
        
        if (parentId) {
            const parent = this.findItemById(parentId);
            if (parent) {
                parent.children.push(action.id);
            }
        }

        this.saveData();
        this.render();
        this.log(`Ação "${name}" criada`);
        return action;
    }

    // Busca de itens
    findItemById(id) {
        let item = this.data.groups.find(g => g.id === id);
        if (!item) {
            item = this.data.actions.find(a => a.id === id);
        }
        return item;
    }

    // Exclusão de itens
    deleteItem(id) {
        const item = this.findItemById(id);
        if (!item) return;

        // Remover das listas principais
        this.data.groups = this.data.groups.filter(g => g.id !== id);
        this.data.actions = this.data.actions.filter(a => a.id !== id);

        // Remover referências dos pais
        if (item.parentId) {
            const parent = this.findItemById(item.parentId);
            if (parent) {
                parent.children = parent.children.filter(childId => childId !== id);
            }
        }

        // Remover filhos recursivamente
        if (item.children) {
            item.children.forEach(childId => {
                this.deleteItem(childId);
            });
        }

        this.saveData();
        this.render();
        this.log(`Item "${item.name}" excluído`);
    }

    // Interface do modal
    showCreateModal(type, parentId = null) {
        const modal = document.getElementById('createModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = type === 'group' ? 'Criar Grupo' : 'Criar Ação';
        
        modalBody.innerHTML = `
            <div class="form-group">
                <label for="itemName">Nome:</label>
                <input type="text" id="itemName" placeholder="Digite o nome do ${type === 'group' ? 'grupo' : 'ação'}" required>
            </div>
            <div class="form-group">
                <label for="itemDescription">Descrição:</label>
                <textarea id="itemDescription" placeholder="Descreva o ${type === 'group' ? 'grupo' : 'ação'}"></textarea>
            </div>
        `;

        modal.dataset.type = type;
        modal.dataset.parentId = parentId || '';
        modal.classList.add('show');

        // Focar no campo nome
        setTimeout(() => {
            document.getElementById('itemName').focus();
        }, 100);
    }

    handleModalConfirm() {
        const modal = document.getElementById('createModal');
        const type = modal.dataset.type;
        const parentId = modal.dataset.parentId ? parseInt(modal.dataset.parentId) : null;
        
        const name = document.getElementById('itemName').value.trim();
        const description = document.getElementById('itemDescription').value.trim();

        if (!name) {
            alert('Por favor, digite um nome');
            return;
        }

        if (type === 'group') {
            this.createGroup(name, description, parentId);
        } else {
            this.createAction(name, description, parentId);
        }

        this.closeModal();
    }

    closeModal() {
        document.getElementById('createModal').classList.remove('show');
    }

    // Editor de itens
    showEditor(item) {
        this.selectedItem = item;
        const welcomeScreen = document.getElementById('welcomeScreen');
        const editorPanel = document.getElementById('editorPanel');
        const editorTitle = document.getElementById('editorTitle');
        const editorContent = document.getElementById('editorContent');

        welcomeScreen.style.display = 'none';
        editorPanel.style.display = 'block';

        editorTitle.innerHTML = `<i class="fas fa-${item.type === 'group' ? 'folder' : 'bolt'}"></i> ${item.name}`;

        if (item.type === 'group') {
            this.renderGroupEditor(item, editorContent);
        } else {
            this.renderActionEditor(item, editorContent);
        }
    }

    renderGroupEditor(group, container) {
        container.innerHTML = `
            <div class="editor-section">
                <h4><i class="fas fa-info-circle"></i> Informações do Grupo</h4>
                <div class="form-group">
                    <label>Nome:</label>
                    <input type="text" id="editName" value="${group.name}">
                </div>
                <div class="form-group">
                    <label>Descrição:</label>
                    <textarea id="editDescription">${group.description || ''}</textarea>
                </div>
                <button class="btn-primary" onclick="app.updateItem()">
                    <i class="fas fa-save"></i> Salvar Alterações
                </button>
            </div>

            <div class="editor-section">
                <h4><i class="fas fa-plus"></i> Adicionar Itens</h4>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-primary" onclick="app.showCreateModal('group', ${group.id})">
                        <i class="fas fa-folder-plus"></i> Novo Grupo
                    </button>
                    <button class="btn-primary" onclick="app.showCreateModal('action', ${group.id})">
                        <i class="fas fa-bolt"></i> Nova Ação
                    </button>
                </div>
            </div>

            <div class="editor-section">
                <h4><i class="fas fa-list"></i> Itens Filhos (${group.children ? group.children.length : 0})</h4>
                <div id="childrenList">
                    ${this.renderChildrenList(group)}
                </div>
            </div>
        `;
    }

    renderActionEditor(action, container) {
        container.innerHTML = `
            <div class="editor-section">
                <h4><i class="fas fa-info-circle"></i> Informações da Ação</h4>
                <div class="form-group">
                    <label>Nome:</label>
                    <input type="text" id="editName" value="${action.name}">
                </div>
                <div class="form-group">
                    <label>Descrição:</label>
                    <textarea id="editDescription">${action.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Status:</label>
                    <select id="editEnabled">
                        <option value="true" ${action.enabled ? 'selected' : ''}>Ativada</option>
                        <option value="false" ${!action.enabled ? 'selected' : ''}>Desativada</option>
                    </select>
                </div>
                <button class="btn-primary" onclick="app.updateItem()">
                    <i class="fas fa-save"></i> Salvar Alterações
                </button>
            </div>

            <div class="editor-section">
                <h4><i class="fas fa-clock"></i> Gatilhos (${action.triggers ? action.triggers.length : 0})</h4>
                <button class="btn-primary" onclick="app.addTrigger()">
                    <i class="fas fa-plus"></i> Adicionar Gatilho
                </button>
                <div id="triggersList">
                    ${this.renderTriggersList(action)}
                </div>
            </div>

            <div class="editor-section">
                <h4><i class="fas fa-play"></i> Teste</h4>
                <button class="btn-secondary" onclick="app.executeAction(${action.id})">
                    <i class="fas fa-play"></i> Executar Ação
                </button>
            </div>
        `;
    }

    renderChildrenList(group) {
        if (!group.children || group.children.length === 0) {
            return '<p style="color: #6c757d; font-style: italic;">Nenhum item filho</p>';
        }

        return group.children.map(childId => {
            const child = this.findItemById(childId);
            if (!child) return '';

            return `
                <div class="child-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #f8f9fa; border-radius: 5px; margin: 5px 0;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-${child.type === 'group' ? 'folder' : 'bolt'}"></i>
                        <span>${child.name}</span>
                    </div>
                    <button class="btn-secondary" onclick="app.showEditor(app.findItemById(${child.id}))" style="padding: 5px 10px; font-size: 0.8rem;">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </div>
            `;
        }).join('');
    }

    renderTriggersList(action) {
        if (!action.triggers || action.triggers.length === 0) {
            return '<p style="color: #6c757d; font-style: italic;">Nenhum gatilho configurado</p>';
        }

        return action.triggers.map((trigger, index) => `
            <div class="trigger-item" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${trigger.type}</strong>
                        <p style="margin: 5px 0; color: #6c757d;">${trigger.description}</p>
                    </div>
                    <button class="btn-close" onclick="app.removeTrigger(${index})" style="width: 30px; height: 30px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateItem() {
        if (!this.selectedItem) return;

        const name = document.getElementById('editName').value.trim();
        const description = document.getElementById('editDescription').value.trim();

        if (!name) {
            alert('Por favor, digite um nome');
            return;
        }

        this.selectedItem.name = name;
        this.selectedItem.description = description;

        if (this.selectedItem.type === 'action') {
            this.selectedItem.enabled = document.getElementById('editEnabled').value === 'true';
        }

        this.saveData();
        this.render();
        this.log(`Item "${name}" atualizado`);
    }

    closeEditor() {
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('editorPanel').style.display = 'none';
        this.selectedItem = null;
    }

    // Renderização da árvore
    render() {
        const container = document.getElementById('treeContainer');
        const rootGroups = this.data.groups.filter(g => !g.parentId);
        const rootActions = this.data.actions.filter(a => !a.parentId);

        if (rootGroups.length === 0 && rootActions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">Nenhum item criado ainda</p>';
            return;
        }

        const html = [
            ...rootGroups.map(group => this.renderTreeItem(group)),
            ...rootActions.map(action => this.renderTreeItem(action))
        ].join('');

        container.innerHTML = html;
    }

    renderTreeItem(item) {
        const isGroup = item.type === 'group';
        const icon = isGroup ? 'folder' : 'bolt';
        const hasChildren = item.children && item.children.length > 0;

        let childrenHtml = '';
        if (hasChildren && item.expanded) {
            childrenHtml = `
                <div class="tree-children">
                    ${item.children.map(childId => {
                        const child = this.findItemById(childId);
                        return child ? this.renderTreeItem(child) : '';
                    }).join('')}
                </div>
            `;
        }

        return `
            <div class="tree-item ${item.type} ${item.expanded ? 'expanded' : ''}" data-id="${item.id}">
                <div class="tree-item-header" onclick="app.selectItem(${item.id})">
                    <div class="tree-item-info">
                        ${hasChildren ? `<i class="fas fa-chevron-${item.expanded ? 'down' : 'right'}" onclick="app.toggleExpand(${item.id}); event.stopPropagation();"></i>` : ''}
                        <i class="fas fa-${icon}"></i>
                        <span>${item.name}</span>
                        ${item.type === 'action' && !item.enabled ? '<i class="fas fa-pause" style="color: #dc3545;" title="Desativada"></i>' : ''}
                    </div>
                    <div class="tree-item-actions">
                        ${isGroup ? `
                            <button onclick="app.showCreateModal('group', ${item.id}); event.stopPropagation();" title="Adicionar Grupo">
                                <i class="fas fa-folder-plus"></i>
                            </button>
                            <button onclick="app.showCreateModal('action', ${item.id}); event.stopPropagation();" title="Adicionar Ação">
                                <i class="fas fa-bolt"></i>
                            </button>
                        ` : ''}
                        <button onclick="app.showEditor(app.findItemById(${item.id})); event.stopPropagation();" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.deleteItem(${item.id}); event.stopPropagation();" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${childrenHtml}
            </div>
        `;
    }

    selectItem(id) {
        const item = this.findItemById(id);
        if (item) {
            this.showEditor(item);
        }
    }

    toggleExpand(id) {
        const item = this.findItemById(id);
        if (item) {
            item.expanded = !item.expanded;
            this.saveData();
            this.render();
        }
    }

    // Placeholder para próxima fase - sistema de gatilhos
    addTrigger() {
        this.log('Funcionalidade de gatilhos será implementada na próxima fase');
    }

    removeTrigger(index) {
        if (this.selectedItem && this.selectedItem.triggers) {
            this.selectedItem.triggers.splice(index, 1);
            this.saveData();
            this.showEditor(this.selectedItem);
            this.log('Gatilho removido');
        }
    }

    executeAction(actionId) {
        const action = this.findItemById(actionId);
        if (action) {
            this.log(`Executando ação: ${action.name}`);
            // Simulação de execução
            setTimeout(() => {
                this.log(`Ação "${action.name}" executada com sucesso`);
            }, 1000);
        }
    }
}

// Inicializar aplicação quando a página carregar
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AutomationApp();
});



// Sistema de Gatilhos e Automação
class TriggerSystem {
    constructor(app) {
        this.app = app;
        this.activeTimers = new Map();
        this.eventListeners = new Map();
        this.init();
    }

    init() {
        // Inicializar gatilhos existentes
        this.app.data.actions.forEach(action => {
            if (action.triggers && action.enabled) {
                action.triggers.forEach(trigger => {
                    this.activateTrigger(action, trigger);
                });
            }
        });
    }

    // Tipos de gatilhos disponíveis
    getTriggerTypes() {
        return [
            {
                id: 'time',
                name: 'Tempo',
                description: 'Executar em horário específico ou intervalo',
                icon: 'clock'
            },
            {
                id: 'event',
                name: 'Evento',
                description: 'Executar quando um evento ocorrer',
                icon: 'mouse-pointer'
            },
            {
                id: 'condition',
                name: 'Condição',
                description: 'Executar quando uma condição for atendida',
                icon: 'check-circle'
            },
            {
                id: 'manual',
                name: 'Manual',
                description: 'Executar apenas quando solicitado',
                icon: 'hand-paper'
            }
        ];
    }

    // Criar novo gatilho
    createTrigger(type, config) {
        const trigger = {
            id: this.app.generateId(),
            type: type,
            config: config,
            enabled: true,
            createdAt: new Date().toISOString(),
            lastExecuted: null,
            executionCount: 0
        };

        switch (type) {
            case 'time':
                trigger.description = this.getTimeDescription(config);
                break;
            case 'event':
                trigger.description = this.getEventDescription(config);
                break;
            case 'condition':
                trigger.description = this.getConditionDescription(config);
                break;
            case 'manual':
                trigger.description = 'Execução manual';
                break;
        }

        return trigger;
    }

    // Descrições dos gatilhos
    getTimeDescription(config) {
        if (config.type === 'interval') {
            return `A cada ${config.interval} ${config.unit}`;
        } else if (config.type === 'schedule') {
            return `Às ${config.time} ${config.days ? `nos dias: ${config.days.join(', ')}` : 'todos os dias'}`;
        } else if (config.type === 'delay') {
            return `Após ${config.delay} ${config.unit}`;
        }
        return 'Gatilho de tempo';
    }

    getEventDescription(config) {
        const eventNames = {
            'click': 'clique',
            'hover': 'passar o mouse',
            'keypress': 'pressionar tecla',
            'scroll': 'rolar página',
            'resize': 'redimensionar janela'
        };
        return `Quando ${eventNames[config.event] || config.event} ${config.target ? `em ${config.target}` : ''}`;
    }

    getConditionDescription(config) {
        return `Quando ${config.variable} ${config.operator} ${config.value}`;
    }

    // Ativar gatilho
    activateTrigger(action, trigger) {
        if (!trigger.enabled) return;

        switch (trigger.type) {
            case 'time':
                this.activateTimeTrigger(action, trigger);
                break;
            case 'event':
                this.activateEventTrigger(action, trigger);
                break;
            case 'condition':
                this.activateConditionTrigger(action, trigger);
                break;
        }
    }

    // Gatilhos de tempo
    activateTimeTrigger(action, trigger) {
        const config = trigger.config;
        let timeoutId;

        if (config.type === 'interval') {
            const intervalMs = this.convertToMilliseconds(config.interval, config.unit);
            timeoutId = setInterval(() => {
                this.executeTrigger(action, trigger);
            }, intervalMs);
        } else if (config.type === 'schedule') {
            this.scheduleExecution(action, trigger);
        } else if (config.type === 'delay') {
            const delayMs = this.convertToMilliseconds(config.delay, config.unit);
            timeoutId = setTimeout(() => {
                this.executeTrigger(action, trigger);
            }, delayMs);
        }

        if (timeoutId) {
            this.activeTimers.set(`${action.id}-${trigger.id}`, timeoutId);
        }
    }

    // Gatilhos de evento
    activateEventTrigger(action, trigger) {
        const config = trigger.config;
        const handler = (event) => {
            if (this.checkEventConditions(event, config)) {
                this.executeTrigger(action, trigger);
            }
        };

        const target = config.target ? document.querySelector(config.target) : document;
        if (target) {
            target.addEventListener(config.event, handler);
            this.eventListeners.set(`${action.id}-${trigger.id}`, {
                target: target,
                event: config.event,
                handler: handler
            });
        }
    }

    // Gatilhos de condição
    activateConditionTrigger(action, trigger) {
        const config = trigger.config;
        const checkCondition = () => {
            if (this.evaluateCondition(config)) {
                this.executeTrigger(action, trigger);
            }
        };

        // Verificar condição a cada 5 segundos
        const intervalId = setInterval(checkCondition, 5000);
        this.activeTimers.set(`${action.id}-${trigger.id}`, intervalId);
    }

    // Executar gatilho
    executeTrigger(action, trigger) {
        if (!action.enabled) return;

        trigger.lastExecuted = new Date().toISOString();
        trigger.executionCount++;

        this.app.log(`Gatilho ativado: ${action.name} - ${trigger.description}`);
        this.executeAction(action);
        this.app.saveData();
    }

    // Executar ação
    executeAction(action) {
        this.app.log(`Executando ação: ${action.name}`);
        
        // Simulação de execução da ação
        // Aqui você pode implementar diferentes tipos de ações
        const executionTime = Math.random() * 2000 + 500; // 0.5 a 2.5 segundos
        
        setTimeout(() => {
            this.app.log(`Ação "${action.name}" executada com sucesso`);
            
            // Simular diferentes resultados
            const outcomes = [
                'Operação concluída',
                'Dados processados',
                'Notificação enviada',
                'Arquivo criado',
                'Backup realizado'
            ];
            
            const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
            this.app.log(`Resultado: ${outcome}`);
        }, executionTime);
    }

    // Utilitários
    convertToMilliseconds(value, unit) {
        const conversions = {
            'segundos': 1000,
            'minutos': 60000,
            'horas': 3600000,
            'dias': 86400000
        };
        return value * (conversions[unit] || 1000);
    }

    checkEventConditions(event, config) {
        // Implementar verificações específicas do evento
        return true;
    }

    evaluateCondition(config) {
        // Implementar avaliação de condições
        // Por exemplo, verificar valores de variáveis, status do sistema, etc.
        return Math.random() > 0.8; // Simulação: 20% de chance de condição ser verdadeira
    }

    scheduleExecution(action, trigger) {
        // Implementar agendamento para horários específicos
        const now = new Date();
        const config = trigger.config;
        const [hours, minutes] = config.time.split(':').map(Number);
        
        const nextExecution = new Date();
        nextExecution.setHours(hours, minutes, 0, 0);
        
        if (nextExecution <= now) {
            nextExecution.setDate(nextExecution.getDate() + 1);
        }
        
        const timeUntilExecution = nextExecution.getTime() - now.getTime();
        
        const timeoutId = setTimeout(() => {
            this.executeTrigger(action, trigger);
            // Reagendar para o próximo dia
            this.scheduleExecution(action, trigger);
        }, timeUntilExecution);
        
        this.activeTimers.set(`${action.id}-${trigger.id}`, timeoutId);
    }

    // Desativar gatilho
    deactivateTrigger(action, trigger) {
        const key = `${action.id}-${trigger.id}`;
        
        // Remover timers
        if (this.activeTimers.has(key)) {
            clearTimeout(this.activeTimers.get(key));
            clearInterval(this.activeTimers.get(key));
            this.activeTimers.delete(key);
        }
        
        // Remover event listeners
        if (this.eventListeners.has(key)) {
            const listener = this.eventListeners.get(key);
            listener.target.removeEventListener(listener.event, listener.handler);
            this.eventListeners.delete(key);
        }
    }

    // Reativar todos os gatilhos
    reactivateAllTriggers() {
        this.deactivateAllTriggers();
        this.init();
    }

    // Desativar todos os gatilhos
    deactivateAllTriggers() {
        this.activeTimers.forEach((timerId) => {
            clearTimeout(timerId);
            clearInterval(timerId);
        });
        this.activeTimers.clear();
        
        this.eventListeners.forEach((listener) => {
            listener.target.removeEventListener(listener.event, listener.handler);
        });
        this.eventListeners.clear();
    }
}

// Expandir a classe AutomationApp com funcionalidades de gatilhos
AutomationApp.prototype.initTriggerSystem = function() {
    this.triggerSystem = new TriggerSystem(this);
};

// Sobrescrever o método init para incluir o sistema de gatilhos
const originalInit = AutomationApp.prototype.init;
AutomationApp.prototype.init = function() {
    originalInit.call(this);
    this.initTriggerSystem();
};

// Implementar método addTrigger
AutomationApp.prototype.addTrigger = function() {
    if (!this.selectedItem || this.selectedItem.type !== 'action') {
        alert('Selecione uma ação para adicionar gatilhos');
        return;
    }

    this.showTriggerModal();
};

AutomationApp.prototype.showTriggerModal = function() {
    const modal = document.getElementById('createModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Adicionar Gatilho';
    
    const triggerTypes = this.triggerSystem.getTriggerTypes();
    
    modalBody.innerHTML = `
        <div class="form-group">
            <label for="triggerType">Tipo de Gatilho:</label>
            <select id="triggerType" onchange="app.updateTriggerForm()">
                <option value="">Selecione um tipo</option>
                ${triggerTypes.map(type => `
                    <option value="${type.id}">${type.name} - ${type.description}</option>
                `).join('')}
            </select>
        </div>
        <div id="triggerConfig">
            <!-- Configurações específicas do gatilho aparecerão aqui -->
        </div>
    `;

    modal.dataset.type = 'trigger';
    modal.classList.add('show');
    
    // Atualizar botão de confirmação
    document.getElementById('confirmModal').textContent = 'Adicionar Gatilho';
};

AutomationApp.prototype.updateTriggerForm = function() {
    const triggerType = document.getElementById('triggerType').value;
    const configContainer = document.getElementById('triggerConfig');
    
    if (!triggerType) {
        configContainer.innerHTML = '';
        return;
    }
    
    let configHtml = '';
    
    switch (triggerType) {
        case 'time':
            configHtml = `
                <div class="form-group">
                    <label for="timeType">Tipo de Tempo:</label>
                    <select id="timeType" onchange="app.updateTimeConfig()">
                        <option value="interval">Intervalo</option>
                        <option value="schedule">Agendamento</option>
                        <option value="delay">Atraso</option>
                    </select>
                </div>
                <div id="timeConfig">
                    <div class="form-group">
                        <label for="intervalValue">Intervalo:</label>
                        <input type="number" id="intervalValue" min="1" value="1">
                    </div>
                    <div class="form-group">
                        <label for="intervalUnit">Unidade:</label>
                        <select id="intervalUnit">
                            <option value="segundos">Segundos</option>
                            <option value="minutos">Minutos</option>
                            <option value="horas">Horas</option>
                            <option value="dias">Dias</option>
                        </select>
                    </div>
                </div>
            `;
            break;
            
        case 'event':
            configHtml = `
                <div class="form-group">
                    <label for="eventType">Tipo de Evento:</label>
                    <select id="eventType">
                        <option value="click">Clique</option>
                        <option value="hover">Hover</option>
                        <option value="keypress">Tecla Pressionada</option>
                        <option value="scroll">Scroll</option>
                        <option value="resize">Redimensionar</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="eventTarget">Seletor do Elemento (opcional):</label>
                    <input type="text" id="eventTarget" placeholder="Ex: #botao, .classe, button">
                </div>
            `;
            break;
            
        case 'condition':
            configHtml = `
                <div class="form-group">
                    <label for="conditionVariable">Variável:</label>
                    <input type="text" id="conditionVariable" placeholder="Ex: temperatura, status">
                </div>
                <div class="form-group">
                    <label for="conditionOperator">Operador:</label>
                    <select id="conditionOperator">
                        <option value="==">=</option>
                        <option value="!=">&ne;</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value=">=">&ge;</option>
                        <option value="<=">&le;</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="conditionValue">Valor:</label>
                    <input type="text" id="conditionValue" placeholder="Valor para comparação">
                </div>
            `;
            break;
            
        case 'manual':
            configHtml = `
                <p style="color: #6c757d; font-style: italic;">
                    Gatilho manual não requer configuração adicional. 
                    A ação será executada apenas quando solicitado manualmente.
                </p>
            `;
            break;
    }
    
    configContainer.innerHTML = configHtml;
};

AutomationApp.prototype.updateTimeConfig = function() {
    const timeType = document.getElementById('timeType').value;
    const configContainer = document.getElementById('timeConfig');
    
    let configHtml = '';
    
    switch (timeType) {
        case 'interval':
            configHtml = `
                <div class="form-group">
                    <label for="intervalValue">Intervalo:</label>
                    <input type="number" id="intervalValue" min="1" value="1">
                </div>
                <div class="form-group">
                    <label for="intervalUnit">Unidade:</label>
                    <select id="intervalUnit">
                        <option value="segundos">Segundos</option>
                        <option value="minutos">Minutos</option>
                        <option value="horas">Horas</option>
                        <option value="dias">Dias</option>
                    </select>
                </div>
            `;
            break;
            
        case 'schedule':
            configHtml = `
                <div class="form-group">
                    <label for="scheduleTime">Horário:</label>
                    <input type="time" id="scheduleTime" value="09:00">
                </div>
                <div class="form-group">
                    <label for="scheduleDays">Dias da Semana:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        <label><input type="checkbox" value="domingo"> Domingo</label>
                        <label><input type="checkbox" value="segunda"> Segunda</label>
                        <label><input type="checkbox" value="terça"> Terça</label>
                        <label><input type="checkbox" value="quarta"> Quarta</label>
                        <label><input type="checkbox" value="quinta"> Quinta</label>
                        <label><input type="checkbox" value="sexta"> Sexta</label>
                        <label><input type="checkbox" value="sábado"> Sábado</label>
                    </div>
                </div>
            `;
            break;
            
        case 'delay':
            configHtml = `
                <div class="form-group">
                    <label for="delayValue">Atraso:</label>
                    <input type="number" id="delayValue" min="1" value="1">
                </div>
                <div class="form-group">
                    <label for="delayUnit">Unidade:</label>
                    <select id="delayUnit">
                        <option value="segundos">Segundos</option>
                        <option value="minutos">Minutos</option>
                        <option value="horas">Horas</option>
                    </select>
                </div>
            `;
            break;
    }
    
    configContainer.innerHTML = configHtml;
};

// Sobrescrever handleModalConfirm para lidar com gatilhos
const originalHandleModalConfirm = AutomationApp.prototype.handleModalConfirm;
AutomationApp.prototype.handleModalConfirm = function() {
    const modal = document.getElementById('createModal');
    const type = modal.dataset.type;
    
    if (type === 'trigger') {
        this.handleTriggerConfirm();
    } else {
        originalHandleModalConfirm.call(this);
    }
};

AutomationApp.prototype.handleTriggerConfirm = function() {
    const triggerType = document.getElementById('triggerType').value;
    
    if (!triggerType) {
        alert('Por favor, selecione um tipo de gatilho');
        return;
    }
    
    let config = {};
    
    switch (triggerType) {
        case 'time':
            config = this.getTimeConfig();
            break;
        case 'event':
            config = this.getEventConfig();
            break;
        case 'condition':
            config = this.getConditionConfig();
            break;
        case 'manual':
            config = {};
            break;
    }
    
    if (!config) return;
    
    const trigger = this.triggerSystem.createTrigger(triggerType, config);
    
    if (!this.selectedItem.triggers) {
        this.selectedItem.triggers = [];
    }
    
    this.selectedItem.triggers.push(trigger);
    this.triggerSystem.activateTrigger(this.selectedItem, trigger);
    
    this.saveData();
    this.showEditor(this.selectedItem);
    this.closeModal();
    
    this.log(`Gatilho "${trigger.description}" adicionado à ação "${this.selectedItem.name}"`);
};

AutomationApp.prototype.getTimeConfig = function() {
    const timeType = document.getElementById('timeType').value;
    
    switch (timeType) {
        case 'interval':
            return {
                type: 'interval',
                interval: parseInt(document.getElementById('intervalValue').value),
                unit: document.getElementById('intervalUnit').value
            };
        case 'schedule':
            const selectedDays = Array.from(document.querySelectorAll('#scheduleDays input:checked'))
                .map(cb => cb.value);
            return {
                type: 'schedule',
                time: document.getElementById('scheduleTime').value,
                days: selectedDays.length > 0 ? selectedDays : null
            };
        case 'delay':
            return {
                type: 'delay',
                delay: parseInt(document.getElementById('delayValue').value),
                unit: document.getElementById('delayUnit').value
            };
    }
    return null;
};

AutomationApp.prototype.getEventConfig = function() {
    return {
        event: document.getElementById('eventType').value,
        target: document.getElementById('eventTarget').value || null
    };
};

AutomationApp.prototype.getConditionConfig = function() {
    const variable = document.getElementById('conditionVariable').value.trim();
    const value = document.getElementById('conditionValue').value.trim();
    
    if (!variable || !value) {
        alert('Por favor, preencha a variável e o valor');
        return null;
    }
    
    return {
        variable: variable,
        operator: document.getElementById('conditionOperator').value,
        value: value
    };
};

// Implementar remoção de gatilhos
AutomationApp.prototype.removeTrigger = function(index) {
    if (this.selectedItem && this.selectedItem.triggers) {
        const trigger = this.selectedItem.triggers[index];
        this.triggerSystem.deactivateTrigger(this.selectedItem, trigger);
        this.selectedItem.triggers.splice(index, 1);
        this.saveData();
        this.showEditor(this.selectedItem);
        this.log('Gatilho removido');
    }
};

// Sobrescrever executeAction para usar o sistema de gatilhos
AutomationApp.prototype.executeAction = function(actionId) {
    const action = this.findItemById(actionId);
    if (action) {
        this.triggerSystem.executeAction(action);
    }
};

