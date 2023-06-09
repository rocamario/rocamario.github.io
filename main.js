/*-----------
    VARIABILI 
------------*/
const API_URL = "https://37.163.128.37:3000";
const MODEL = "gpt-3.5-turbo";
API_KEY = process.env.OPENAI_API_KEY

const loader = document.querySelector('.loading');
const modal = document.querySelector(".modal");
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
/*-----------
    FUNCTIONS 
------------*/
async function tellStory(location, action) {
    // 1. Loading page
    loader.classList.remove("loading-hidden")
    // 2. Post request to OpenAI
    const temperature = 0.7;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Write a message to attach to a pic that I took together with my boyfriend in ${location} while ${action} with a maximum of 300 characters. Express my love for him. Always talk using the past mode. Always add some emoticons based on the content but no hashtags.`
                }
            ],
            temperature: temperature
        })
    })
    // 3. Read the result
    const data = await response.json();
    const message = data.choices[0].message.content;
    // 4. Put the result in the modal
    modalContent.innerHTML = `
            <h2>${location}</h2>
            <p>${message}</p>
        `;
    // 5. Hide the loading and show the modal
    loader.classList.add("loading-hidden");
    modal.classList.remove("modal-hidden");
}
/*-----------
    INIT & EVENTS
------------*/
const adventures = document.querySelectorAll(".adventure");

adventures.forEach(function(element) {
    element.addEventListener("click", function() {
        tellStory(element.dataset.location, element.dataset.action);
    })
})
modalClose.addEventListener("click", function() {
    modal.classList.add("modal-hidden");
});