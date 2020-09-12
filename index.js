// 
    // On pageload run this function
    (() => {
        const container = document.querySelector('#container');
        const sendButton = document.querySelector('#send-button');
        const messages = document.querySelector('#messages');
        const messageInput = document.querySelector('#message-input');
        const darkButton = document.querySelector('#dark-mode-button');

        let darkMode = false;
        let ws;

        // Adjust HTML to display submitted data
        const showMessage = (message) => {
            messages.textContent += `\n\n${message}`;
            messages.scrollTop = messages.scrollHeight;
            messageInput.value = '';
        }

        // Open a new WS connection
        const init = () => {
            if (ws) {
                ws.onerror = ws.onopen = ws.onclose = null;
                ws.close();
            }
            // Sends a message to the server
            ws = new WebSocket('ws://localhost:4000');
            ws.onopen = () => {
                console.log('connection opened!');
            }
            ws.onmessage = ({ data }) => showMessage(data);
            ws.onclose = () => {
                ws = null;
            }
        }

        // Function to allow "Enter" key to submit input
        messageInput.addEventListener("keyup", e => {
            if (e.key !== "Enter") return;   
            if (!ws) {
                showMessage("No Connection 😱");
                return;
            }
            ws.send(messageInput.value);
            showMessage(messageInput.value);
        });

        // Send the input text
        sendButton.onclick = () => {
            if (!ws) {
                showMessage("No Connection 😱");
                return;
            }
            ws.send(messageInput.value);
            showMessage(messageInput.value);
        }

        // Toggle on and off dark boolean and adjust CSS
        darkButton.onclick = () => {
            darkMode = !darkMode
            if (darkMode) {
                document.body.classList.add('body-dark-active');
                container.classList.add('container-dark-active');
                sendButton.classList.add('send-button-dark-active');
                messages.classList.add('messages-dark-active');
                darkButton.classList.add('dark-mode-button-active');
            }
            else {
                document.body.classList.remove('body-dark-active');
                container.classList.remove('container-dark-active');
                sendButton.classList.remove('send-button-dark-active');
                messages.classList.remove('messages-dark-active');
                darkButton.classList.remove('dark-mode-button-active');
            }
        }
        // Invoke socket connection
        init();
    })();
