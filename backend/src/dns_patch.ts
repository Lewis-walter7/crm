
import { setServers } from 'dns';

export function applyDnsPatch() {
    try {
        setServers(['8.8.8.8', '8.8.4.4']);
        console.log('DNS servers patched to Google DNS (8.8.8.8, 8.8.4.4)');
    } catch (err) {
        console.error('Failed to patch DNS servers:', err);
    }
}

// Auto-apply if imported
applyDnsPatch();
