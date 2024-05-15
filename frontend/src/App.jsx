import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import UserInput from "./components/UserInput"
import NotesDisplay from "./components/NotesDisplay"
import CardTitle from "./components/CardTitle"

export default function App() {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8420/conversations`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setConversations(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function to cancel any pending requests or timers
    return () => {
      // You can perform cleanup tasks here if needed
    };
  }, []); // Empty dependency array means this effect only runs once after the initial render

  const submitPrompt = async (input) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text: input})
    })

    const aiAnswer = await response.json()
   
    setConversations([...conversations, aiAnswer])

}


  const delConversation = async (id) => {
    console.log("it's deleting")
    let url = `http://localhost:8420/conversations/${id}`
    console.log("URL",url)
    
    try {
        const response = await fetch(url,{
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        let index = conversations.findIndex(obj => obj._id === id);
        console.log("FOUND INDEX from ",id, index)

        conversations.splice(index,1)
        setConversations([...conversations])
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



  return (
    //TODO Chatbox, Chat hx
    <div>
      <Header />
      <UserInput submitPrompt={submitPrompt}/>


      <NotesDisplay display={conversations} />


      <div className="flex flex-wrap justify-evenly">
        {conversations.map(conversation =>
          <CardTitle display={conversation} delConversation={delConversation}/>
        )}
      </div>

    </div>
  )
}