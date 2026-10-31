"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Wrench,
  Leaf,
  ChevronDown,
  RefreshCw,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface ToolUsage {
  toolName: string;
  args: any;
  output: any;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolsUsed?: ToolUsage[];
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Can I recycle a greasy pizza box?",
  "How do I safely dispose of swollen phone batteries?",
  "Calculate CO2 savings for 15 plastic bottles",
  "What does plastic resin code #5 mean?",
];

export default function EcoSortAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Hello! I am **WasteIQ AI**, your autonomous environmental assistant built with the **Vercel AI SDK**.\n\nI can query our real-time waste database, calculate carbon & water savings, check contamination risks, and guide hazardous drop-offs. Ask me anything!",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const assistantMsg: Message = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.text,
          toolsUsed: data.toolsUsed,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: `⚠️ ${data.error || "Sorry, I encountered an issue. Please try again."}`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "⚠️ Failed to reach the AI agent service. Please check your connection.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Chat cleared! What item or material would you like help sorting?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105"
          aria-label="Open EcoSort AI Agent"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 animate-pulse text-emerald-200" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300"></span>
            </span>
          </div>
          <span className="text-sm font-semibold tracking-wide">WasteIQ Agent</span>
          <span className="text-xs bg-black/30 border border-white/20 px-2 py-0.5 rounded-full text-emerald-200 font-mono">
            Vercel AI SDK
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[440px] h-[600px] max-h-[85vh] bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-950/60 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-slate-950/80 border-b border-white/10 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-white">WasteIQ AI Agent</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded-md font-mono">
                    ToolLoopAgent
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Powered by Gemini 3.8 &amp; Vercel AI SDK</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[90%] ${
                    msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-cyan-600 text-white"
                        : "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Leaf className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-tr-none shadow"
                        : "bg-slate-800/90 text-slate-200 border border-white/10 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed space-y-1">
                      {msg.content}
                    </div>

                    {/* Tool executions summary badge */}
                    {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                          <Wrench className="w-3 h-3" />
                          <span>Tools Executed by Agent:</span>
                        </span>
                        <div className="space-y-1">
                          {msg.toolsUsed.map((tool, idx) => (
                            <div
                              key={idx}
                              className="text-[11px] bg-slate-900/90 border border-emerald-500/30 rounded-lg p-2 font-mono text-slate-300"
                            >
                              <div className="flex items-center justify-between text-emerald-400 font-bold mb-0.5">
                                <span>⚙️ {tool.toolName}</span>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              </div>
                              {tool.output?.itemName && (
                                <div className="text-[10px] text-slate-300">
                                  Item: <span className="text-white font-medium">{tool.output.itemName}</span> | Bin:{" "}
                                  <span className="text-amber-300 uppercase">{tool.output.binColor}</span>
                                </div>
                              )}
                              {tool.output?.totalCo2SavedKg !== undefined && (
                                <div className="text-[10px] text-slate-300">
                                  Saved: <span className="text-emerald-300 font-bold">{tool.output.totalCo2SavedKg} kg CO₂</span> |{" "}
                                  {tool.output.totalWaterSavedLiters} L Water
                                </div>
                              )}
                              {tool.output?.facilityType && (
                                <div className="text-[10px] text-slate-300">
                                  Facility: <span className="text-cyan-300">{tool.output.facilityType}</span>
                                </div>
                              )}
                              {tool.output?.isContaminated && (
                                <div className="text-[10px] text-amber-400 flex items-center space-x-1">
                                  <AlertTriangle className="w-3 h-3 shrink-0" />
                                  <span>Contamination risk identified</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <span className="block text-[9px] text-slate-400 mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs pl-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                </div>
                <div className="flex items-center space-x-1.5 bg-slate-800/80 border border-white/10 px-3 py-2 rounded-xl">
                  <span className="animate-pulse">Agent reasoning &amp; checking tools...</span>
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="shrink-0 text-[10px] bg-slate-800 hover:bg-slate-700/80 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white px-2.5 py-1 rounded-full transition truncate max-w-[220px]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask agent: 'Can I recycle pizza boxes?'..."
              disabled={isLoading}
              className="flex-1 bg-slate-800/80 border border-white/10 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 text-slate-100 placeholder:text-slate-500 text-xs rounded-xl px-3.5 py-2.5 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow transition"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

