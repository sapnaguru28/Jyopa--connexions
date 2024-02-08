const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

let userMessage;
const API_KEY = "";

const createChatLi = (message, className) => {
    // create  chat <li> element with passed mesage and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` :
        `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            message: [{ role: "user", content: userMessage }]

        })
    }
    // send post request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textcontent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textcontent = "Oops! something went wrong. Please try again";
    }).finally(() => chatbox.scrollTo(0, chatbox, scrollHeight));

}
const handlechat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox, scrollHeight);

    setTimeout(() => {
        // display "thinking..." mesage while waiting for the response
        const incomingChatLi = createChatLi("Thining...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox, scrollHeight);

        generateResponse(incomingChatLi);
    }, 600);
}

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click", handlechat);