'use client';
import axios from "axios";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { remark } from 'remark';
import html from 'remark-html';

function GeminiChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  async function generateAnswer() {
    
    setAnswer("loading...")
    const response = await axios({
      url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI}`,
      method:"post",  
      data: {"contents":[{"parts":[{"text": question}]}]}
    })
    const markdownText = response['data']['candidates'][0]['content']['parts'][0]['text'];
    const htmlText = remark().use(html).processSync(markdownText).toString();
    setAnswer(htmlText);
  }

  return (
    <>
      <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="no-focus border border-dark-4 bg-dark-3 text-light-1" />
      <Button onClick={generateAnswer} className="text-light-1 mt-4">Generate Response</Button>
      <div className="p-4">
      <div className="text-light-1" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
      
    </>
  );
}

export default GeminiChat;
