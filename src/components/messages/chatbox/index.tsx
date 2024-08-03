"use client";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircleIcon,
  MoveHorizontalIcon,
  SendHorizontalIcon,
  SendIcon,
} from "lucide-react";

interface Message {
  text: string;
  time: string;
  sender: "me" | "other";
}

export default function Message() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hey there! How can I help you ?",
      time: "10:30 AM",
      sender: "other",
    },
    {
      text: "I am fine thanks",
      time: "10:30 AM",
      sender: "me",
    },
    {
      text: "So whats going on?",
      time: "10:30 AM",
      sender: "other",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage: Message = {
        text: inputValue,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
      };
      setMessages([newMessage, ...messages]);
      setInputValue("");
    }
  };

  return (
    <div className="flex p-4 w-full flex-col justify-end items-center gap-4 h-full">
      <div className="p-4 flex flex-col-reverse w-full rounded-2xl space-y-4 border overflow-y-auto h-[65vh]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.sender === "me" ? "justify-end" : ""
            }`}
          >
            {message.sender === "other" && (
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg p-3 max-w-[70%] ${
                message.sender === "me"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="text-xs mt-1 text-muted-foreground">
                {message.time}
              </div>
            </div>
            {message.sender === "me" && (
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex items-center gap-4">
        <Input
          placeholder="Type your message..."
          className="flex-1 h-12"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button variant="secondary" className="h-12 w-12" size="icon" onClick={handleSendMessage}>
          <SendHorizontalIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
