'use client'
import { useEffect, useState } from 'react';

export default function Results({ params }) {
    const { analysis_id } = params;
    const [log, setLog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!analysis_id) {
            return;
        }
    
        const fetchLog = async () => {
            try {
                const response = await fetch(`/api/get_log/${analysis_id}`, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.status === 'error') {
                    setIsLoading(true);
                } else {
                    setLog(data);
                    setIsLoading(false);
                    // Stop polling if the log is obtained
                    return true;
                }
            } catch (error) {
                console.error('Failed to fetch log:', error);
            }
            return false;
        };
    
        // Start polling
        const intervalId = setInterval(async () => {
            const isReady = await fetchLog();
            if (isReady) {
                clearInterval(intervalId);
            }
        }, 20000); // Poll every 20 seconds
    
        // Initial fetch
        fetchLog();
    
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [analysis_id]); // Re-run effect if analysis_id changes

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {log ? <pre>{log}</pre> : <p>Log is not ready yet.</p>}
        </div>
    );
}