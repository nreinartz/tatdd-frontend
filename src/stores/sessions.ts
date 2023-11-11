import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
    const sessions = ref<string[]>([])

    function addSession(id: string) {
        if (sessions.value.includes(id)) {
            return;
        }

        sessions.value.push(id);
        saveSessions();
    }

    function removeSession(id: string) {
        sessions.value = sessions.value.filter(s => s !== id);
        saveSessions();
    }

    function saveSessions() {
        localStorage.setItem('sessions', JSON.stringify(sessions.value));
    }

    function loadSessions() {
        const data = localStorage.getItem('sessions');
        if (data) {
            sessions.value = JSON.parse(data);
        }
    }

    loadSessions();

    return { sessions, addSession, removeSession }
})
