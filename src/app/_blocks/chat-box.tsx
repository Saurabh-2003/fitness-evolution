"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, SendIcon } from "lucide-react";
import { IntlFormatFormatOptions, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import { useSocket } from "@/core/providers/socket-provider";
import { getconversation } from "./getconversation";
import { toast } from "sonner";

type Message = {
  id: string;
  message: string;
  createdAt: string;
  from: string;
  User: {
    id: string;
    name: string;
    image: string;
  };
};

type ChatParams = {
  id: string;
};

export default function Chat({ id }: ChatParams) {

  
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sendMessage, setSendMessage] = useState<string>('');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean> (false);
  const { socket } = useSocket();
  const chatRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/mess/${id}`,{ next: { revalidate: 2 } });
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {

        chatRef?.current?.scrollIntoView();
      }
    };

    fetchMessages();
  }, [id]);
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch(`/api/mess/${id}`, { cache: 'no-store' })
  //       .then(res => res.json())
  //       .then(data => setMessages(data));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);


  useEffect(() => {
    if (socket) {
      socket.on(`chat:${id}`, (newMessage: any) => {
        if(id === newMessage.conversationId){
        setMessages((current) => [...current, newMessage]);
      }
      });

      return () => {
        socket.off(`chat:${id}`);
      };
    }
  }, [socket, id]);

  useEffect(() => {
    chatRef?.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  if(id === null || id === undefined){
    return <div>
      Invalid conversation
    </div>
  }

  const handleSendMessage = async () => {
    try {
      setLoading(true);
      const session = await getSession();
      const otherEmail = await getconversation({ id });
      
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: otherEmail,
          text: sendMessage,
          subject: "new message",
          session: session,
          conversationID : id
        }),
      };

      const response = await fetch(`/api/socket/messages`, config);

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      setSendMessage('');
    } catch (error) {
      console.log('Error sending message:', error);
    }finally{
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const options:IntlFormatFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="flex flex-col justify-between  h-full max-h-full">
      <div ref = {chatRef} className="overflow-y-scroll min-h-[80%] h-[80%] p-4 space-y-4">
        { 
        messages.length === 0 ? 

        <div className=" px-6 py-2 bg-gray-100 w-fit mx-auto rounded-xl text-slate-700 shadow-sm text-center"> No Messages yet </div>
        :messages.map((message) => {
          const isSentByCurrentUser = message.from === session?.user?.email;
          const avatarFallback = message?.User?.name.charAt(0) || "?";
          const formattedTime = formatDate(message?.createdAt);

          return (
            <div
              key={message.id}
              className={`flex w-full items-start gap-3 ${isSentByCurrentUser ? "justify-end" : ""}`}
            >
              {!isSentByCurrentUser && (
                <Avatar className="size-10">
                  <AvatarImage src={message?.User?.image || "/placeholder.svg"} alt="User Avatar" />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-[75%] shadow-sm ${
                  isSentByCurrentUser ? "bg-slate-400 text-secondary" : "bg-gray-300 dark:bg-gray-800"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <div
                  className={`text-[9px] ${
                    isSentByCurrentUser ? "text-gray-700" : "text-gray-500 dark:text-gray-400"
                  } mt-1`}
                >
                  {formattedTime}
                </div>
              </div>
              {isSentByCurrentUser && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message?.User?.image || "/placeholder.svg"} alt="User Avatar" />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-gray-100 max-h-[20%] dark:bg-gray-950 p-4 flex items-center gap-2 border-t border-gray-200 dark:border-gray-800">
        <Textarea
          placeholder="Type your message..."
          disabled={loading || !id}
          className="flex-1 rounded-lg disabled:cursor-wait p-2 border border-gray-200 dark:border-gray-800 resize-none"
          rows={1}
          aria-label="Type your message"
          value={sendMessage}
          onChange={(event) => setSendMessage(event.target.value)}
        />
        <Button disabled={loading || !id} onClick={handleSendMessage} variant="ghost" size="icon" className="rounded-full disabled:cursor-wait">
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
