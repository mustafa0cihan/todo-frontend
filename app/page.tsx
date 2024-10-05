// 'use client';

// import { useState, useEffect } from 'react';

// export default function Home() {
//   const [todos, setTodos] = useState<string[]>([]);
//   const [newTodo, setNewTodo] = useState<string>('');

//   useEffect(() => {
//     // Get todos from backend
//     fetch('http://localhost:3001/todos')
//       .then((res) => res.json())
//       .then((data) => setTodos(data.map((todo: { task: string }) => todo.task)));
//   }, []);

//   const addTodo = async () => {
//     if (newTodo.trim() === '') return;

//     // Post new todo to backend
//     await fetch('http://localhost:3001/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ task: newTodo }),
//     });

//     // Update local state
//     setTodos([...todos, newTodo]);
//     setNewTodo('');
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold mb-4">Martech Todo App</h1>
//       <div className="mb-4">
//         <input
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="Add new task"
//           className="border px-4 py-2 rounded"
//         />
//         <button
//           onClick={addTodo}
//           className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>
//       <ul>
//         {todos.map((todo, index) => (
//           <li key={index} className="text-xl">
//             {todo}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



'use client';

import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';

export default function Home() {
  const fullMessages = useMemo(() => [
    "Our website is undergoing exciting updates.",
    "Get ready for something amazing!",
    "Stay tuned and visit us again soon."
  ], []);

  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullTextIndex, setFullTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < fullMessages.length && isTyping) {
      const currentMessage = fullMessages[currentIndex];
      let typingTimeout: NodeJS.Timeout;

      if (fullTextIndex < currentMessage.length) {
        typingTimeout = setTimeout(() => {
          setDisplayedMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (!updatedMessages[currentIndex]) updatedMessages[currentIndex] = '';
            updatedMessages[currentIndex] += currentMessage[fullTextIndex];
            return updatedMessages;
          });
          setFullTextIndex(fullTextIndex + 1);
        }, 50);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setCurrentIndex(currentIndex + 1);
          setFullTextIndex(0);
        }, 1000);
      }

      return () => clearTimeout(typingTimeout);
    } else if (currentIndex >= fullMessages.length) {
      setTimeout(() => {
        setDisplayedMessages([]);
        setCurrentIndex(0);
        setFullTextIndex(0);
        setIsTyping(true);
      }, 3000);
    }
  }, [fullTextIndex, currentIndex, isTyping, fullMessages]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="relative h-[50vh] w-full bg-white">
        <Image
          src="/coming-soon.png"
          alt="Coming Soon Background"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          quality={100}
          className="z-0"
        />
      </div>

      <div className="flex flex-col items-center justify-center h-[50vh] bg-white">
        <div className="mt-10 text-center">
          {displayedMessages.map((msg, index) => (
            <h1 key={index} className="text-4xl font-extrabold text-gray-800 mb-4">
              {msg}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}