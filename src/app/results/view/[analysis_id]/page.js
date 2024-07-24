"use client"
import { useEffect, useState } from "react";

function fixJsonString(jsonString) {
    let fixedJson = jsonString.replace(/\\/g, "\\\\").replace(/,(?=[^,]*$)/, "]");
    return fixedJson;
}

export default function View({ params }) {
    const { analysis_id } = params;
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/download_log/${analysis_id}`);
                let data = await response.text();
                data = fixJsonString(data);
                setJsonData(JSON.parse(data));
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [analysis_id]);

    if (jsonData) {
        return (
            <div>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
        );
    }

    return null;
}
