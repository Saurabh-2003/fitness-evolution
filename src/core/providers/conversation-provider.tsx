"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import { toast } from "sonner";
import { getConversationDetailsAction } from "../actions/get-conversations-action";
import { db } from "../client/client";

type ConversationContextType = {
  conversations: any[];
  selectedConversation: string | null;
  messages: any[];
  isMessagesFetched: boolean;
  messagesPageNumber: number;
  setConversations: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedConversation: React.Dispatch<React.SetStateAction<string | null>>;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  setIsMessagesFetched: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagesPageNumber: React.Dispatch<React.SetStateAction<number>>;
  fetchConversations: () => void;
};

const ConversationContext = createContext<ConversationContextType>({
  conversations: [],
  selectedConversation: null,
  messages: [],
  isMessagesFetched: false,
  messagesPageNumber: 0,
  setConversations: () => {},
  setSelectedConversation: () => {},
  setMessages: () => {},
  setIsMessagesFetched: () => {},
  setMessagesPageNumber: () => {},
  fetchConversations: () => {},
});

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isMessagesFetched, setIsMessagesFetched] = useState<boolean>(false);
  const [messagesPageNumber, setMessagesPageNumber] = useState<number>(0);

  useEffect(() => {
    // Ensure selectedConversation is not null or undefined before fetching messages
    if (selectedConversation != null) {
      fetchMessages(selectedConversation, messagesPageNumber);
    }
  }, [selectedConversation, messagesPageNumber]);

  useEffect(() => {
    if (isMessagesFetched) {
      toast.success('Messages fetched successfully');
    }
  }, [isMessagesFetched]);

  const fetchConversations = useMemo(() => async () => {
    try {
      const response = await getConversationDetailsAction();
      if (!response) {
        throw new Error('Error fetching conversations');
      }
      setConversations(response);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Error fetching conversations: Please try again");
    }
  }, []);

  const fetchMessages = async (conversationId: string, page: number) => {
    setIsMessagesFetched(false);
    try {
      const response: any = await db.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            include: {
              User: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            skip: page * 20,
            take: 20,
          },
        },
      });

      if (response) {
        setMessages(response.messages);
      } else {
        console.log("No messages found for conversation: ", conversationId);
      }

      setIsMessagesFetched(true);
    } catch (error) {
      toast.error("Error fetching messages: Please try again");
    } finally {
      setIsMessagesFetched(true);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        selectedConversation,
        messages,
        isMessagesFetched,
        messagesPageNumber,
        setConversations,
        setSelectedConversation,
        setMessages,
        setIsMessagesFetched,
        setMessagesPageNumber,
        fetchConversations,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
