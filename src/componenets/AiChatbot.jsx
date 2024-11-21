import { useEffect } from 'react';
import { useState } from 'react';
const [abc,setAbc] = useState(0);
const AiChatbot = () => {
    useEffect(() => {
        window.embeddedChatbotConfig = {
            chatbotId: "SiX5OMRAbSuoa7OrpiZ0b",
            domain: "www.chatbase.co"
        };

        const script = document.createElement('script');
        script.src = "https://www.chatbase.co/embed.min.js";
        script.chatbotId = "SiX5OMRAbSuoa7OrpiZ0b";
        script.domain = "www.chatbase.co";
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default AiChatbot;
