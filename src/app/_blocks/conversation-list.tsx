'use client'

import { useConversation } from "@/core/providers/conversation-provider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'sonner';

const Conversations = () => {
  const { conversations, fetchConversations } = useConversation(); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await fetchConversations();
      } catch (err) {
        toast.error('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchConversations]);

  if (loading) {
    return <div className="dark:text-white text-slate-600 mt-10 h-max w-full p-4 border">Loading conversations...</div>;
  }
  if (conversations.length === 0) {
    return <div className="dark:text-white text-slate-700 mt-10 h-max w-full p-4 border"> No Conversations</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleDeleteClick = (conversationId: string) => {
    toast(<div className=" backdrop-blur-sm">
      <p>Are you sure you want to delete this conversation?</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => {
            deleteConversation(conversationId);
            toast.dismiss();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>, {
      duration: Infinity, // Keeps the toast open until manually closed
      position: 'top-center',
    });
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/mess/close?conversationId=${conversationId}`, {
        method: 'DELETE',
      });
  
      const responseBody = await response.json();
  
      if (responseBody.error) {
        return toast.error(responseBody.error);
      }
  
      if (!response.ok) {
        throw new Error('Failed to delete conversation');
      }
  
      toast.success('Conversation deleted successfully');
      fetchConversations(); // Refresh the conversations list
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Error deleting conversation');
    }
  };
  

  return (
    <div className="p-4 border-2 rounded-xl mx-2 flex my-8 min-h-full flex-col">
      <h1 className="py-2 w-full text-center font-bold text-xl bg-gray-200 border border-gray-300 dark:bg-slate-900 rounded-xl mb-4 ">Your Conversations</h1>
      
      <div>
        {conversations.map((convo) => (
          <Link href={`/messages/${convo.id}`} prefetch={false} key={convo.id} className="flex hover:cursor-pointer odd:bg-gray-100 even:border dark:odd:bg-gray-800 rounded-xl p-4 gap-2 w-full items-start">
            <Image 
              src={convo?.participant?.image}
              alt="User Image"
              className="size-10 rounded-full bg-cover"
              height={100}
              width={100}
            />
            <div className="flex flex-col w-full text-sm text-slate-500">
              <div className="flex justify-between max-sm:justify-start gap-4">
                <h2 className="font-semibold text-slate-600 dark:text-slate-300">{convo.participant.name}</h2>
                {/* <button
                  onClick={(event) => { event.preventDefault(); handleDeleteClick(convo.id); }}
                  className="bg-white hover:bg-white/20 hover:border hover:text-white px-2 text-xs rounded-sm"
                >
                  Close
                </button> */}
              </div>
              <p>{convo?.participant?.email}</p>
              <div className="mt-2 text-xs text-slate-400 flex justify-between w-full">
                <span className="text-wrap text-ellipsis">{convo?.lastMessage}</span>
                <span>{formatDate(convo?.lastMessageAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
