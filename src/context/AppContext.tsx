import React, { createContext, useState, useContext, ReactNode } from 'react';

export type HistoryItem = {
  id: number;
  name: string;
  source: string;
  platform: string;
  status: 'Published' | 'Draft' | 'Scheduled' | 'Completed';
  date: string;
  type: 'video' | 'audio' | 'file';
};

type ToastType = 'success' | 'error' | 'info';

type ToastMessage = {
  id: string;
  message: string;
  type: ToastType;
};

interface AppContextType {
  credits: number;
  deductCredits: (amount: number) => boolean;
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'date'>) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState(850);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 1, name: "Alex Hormozi - $100M Leads", source: "YouTube", platform: "LinkedIn", status: "Published", date: "2 hours ago", type: "video" },
    { id: 2, name: "MKBHD - iPhone 15 Review", source: "YouTube", platform: "Blog", status: "Draft", date: "1 day ago", type: "video" },
    { id: 3, name: "Q4 Marketing Strategy", source: "Upload", platform: "Summary", status: "Completed", date: "3 days ago", type: "file" },
    { id: 4, name: "Lex Fridman #302", source: "Podcast", platform: "Twitter", status: "Scheduled", date: "5 days ago", type: "audio" },
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const deductCredits = (amount: number) => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'date'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now(),
      date: 'Just now',
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ credits, deductCredits, history, addToHistory, toasts, showToast, removeToast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
