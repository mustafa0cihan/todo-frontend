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
import { useEffect, useState } from 'react';

export default function Home() {
  const fullMessages = [
    "Our website is undergoing exciting updates.",
    "Get ready for something amazing!",
    "Stay tuned and visit us again soon."
  ];

  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]); // Gösterilen mesajları burada tutuyoruz
  const [currentIndex, setCurrentIndex] = useState(0); // Şu an yazılan cümlenin indexi
  const [fullTextIndex, setFullTextIndex] = useState(0); // Hangi kelimenin/harfin yazıldığını izler
  const [isTyping, setIsTyping] = useState(true); // Şu an yazılıyor mu kontrolü

  useEffect(() => {
    if (currentIndex < fullMessages.length && isTyping) {
      const currentMessage = fullMessages[currentIndex]; // Şu anki cümleyi al
      let typingTimeout: NodeJS.Timeout;

      if (fullTextIndex < currentMessage.length) {
        typingTimeout = setTimeout(() => {
          setDisplayedMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (!updatedMessages[currentIndex]) updatedMessages[currentIndex] = ''; // Şu anki satır yoksa başlat
            updatedMessages[currentIndex] += currentMessage[fullTextIndex]; // Harf harf ekle
            return updatedMessages;
          });
          setFullTextIndex(fullTextIndex + 1);
        }, 50); // Harf ekleme süresi
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true); // Sonraki cümle için yazmaya başla
          setCurrentIndex(currentIndex + 1); // Sonraki cümleye geç
          setFullTextIndex(0); // Harf indexini sıfırla
        }, 1000); // Cümle tamamlandıktan sonra 1 saniye bekle
      }

      return () => clearTimeout(typingTimeout);
    } else if (currentIndex >= fullMessages.length) {
      // Tüm cümleler yazıldıktan sonra bekle ve sonra yeniden başla
      setTimeout(() => {
        setDisplayedMessages([]); // Gösterilen mesajları sıfırla
        setCurrentIndex(0); // İlk cümleye dön
        setFullTextIndex(0); // Harf indexini sıfırla
        setIsTyping(true); // Yazmaya başla
      }, 2000); // Tüm mesajlar yazıldıktan sonra 2 saniye bekle
    }
  }, [fullTextIndex, currentIndex, isTyping, fullMessages]);

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Üst Kısım - Coming Soon Resmi */}
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

      {/* Alt Kısım - Beyaz Arka Plan ve Mesaj */}
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
