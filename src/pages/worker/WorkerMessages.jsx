import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import HireMeIcon from "../../components/HireMeIcon";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import { useEffect, useRef, useState } from "react";
import "./WorkerMessages.css";

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    name: "Aruna Perera",
    service: "AC Repair",
    snippet: "Hi, can you come 10 mins early tomorrow?",
    timestamp: "10:24 AM",
    unread: 2,
    avatarClass: "avatar-ap",
    initials: "AP",
  },
  {
    id: 2,
    name: "Sanduni Fernando",
    service: "Plumbing Service",
    snippet: "Thank you for the service! 👍",
    timestamp: "Yesterday",
    unread: 1,
    avatarClass: "avatar-sf",
    initials: "SF",
  },
  {
    id: 3,
    name: "Nadeesha Kumar",
    service: "Home Cleaning",
    snippet: "Great work! Can we book again next month?",
    timestamp: "Yesterday",
    unread: 0,
    avatarClass: "avatar-nk",
    initials: "NK",
  },
  {
    id: 4,
    name: "Tharindu Silva",
    service: "Electrical Repair",
    snippet: "Is the issue fixed now?",
    timestamp: "2 Sep 2026",
    unread: 0,
    avatarClass: "avatar-ts",
    initials: "TS",
  },
  {
    id: 5,
    name: "Dilani Perera",
    service: "TV Mounting",
    snippet: "Okay, see you then. Thank you.",
    timestamp: "1 Sep 2026",
    unread: 0,
    avatarClass: "avatar-dp",
    initials: "DP",
  },
  {
    id: 6,
    name: "Kasun Fernando",
    service: "Lighting Installation",
    snippet: "Can you give me a quotation?",
    timestamp: "30 Aug 2026",
    unread: 0,
    avatarClass: "avatar-kf",
    initials: "KF",
  },
  {
    id: 7,
    name: "Ishara Madushani",
    service: "Painting Service",
    snippet: "What is the estimated cost?",
    timestamp: "28 Aug 2026",
    unread: 0,
    avatarClass: "avatar-im",
    initials: "IM",
  },
];

const INITIAL_CHAT_MESSAGES = [
  {
    id: 1,
    type: "incoming",
    text: "Hi, can you come 10 mins\nearly tomorrow?",
    time: "10:24 AM",
  },
  {
    id: 2,
    type: "outgoing",
    text: "Sure! I can come at 11:50 AM\ninstead of 12:00 PM.",
    time: "10:26 AM",
    receipt: "✓✓",
  },
  {
    id: 3,
    type: "incoming",
    text: "Great! Thank you. 🙏",
    time: "10:27 AM",
  },
  {
    id: 4,
    type: "outgoing",
    text: "You’re welcome!\nSee you tomorrow. 👍",
    time: "10:28 AM",
    receipt: "✓✓",
  },
  {
    id: 5,
    type: "incoming",
    text: "Okay. Please bring the\nrequired tools.",
    time: "10:29 AM",
  },
  {
    id: 6,
    type: "outgoing",
    text: "Sure, I will. Let me know\nif there’s anything else.",
    time: "10:30 AM",
    receipt: "✓✓",
  },
  {
    id: 7,
    type: "incoming",
    text: "That’s all. Thank you!",
    time: "10:31 AM",
    isLast: true,
  },
];

// Markup and SVG artwork preserved from pages/worker-messages.html and pages/worker-chat.html.
export default function WorkerMessages() {
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("all");

  const toastTimer = useRef(null);
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const closeRef = useRef(null);
  const chatThreadRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = activeChat ? "HireMe — Chat" : "HireMe — Messages";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");
    return () => {
      clearTimeout(toastTimer.current);
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
    };
  }, [activeChat]);

  useEffect(() => {
    if (activeChat && chatThreadRef.current) {
      chatThreadRef.current.scrollTop = chatThreadRef.current.scrollHeight;
    }
  }, [activeChat]);

  useEffect(() => {
    if (!drawerOpen) return;
    const oldOverflow = document.body.style.overflow;
    const menuButton = menuRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKey(event) {
      if (event.key === "Escape") setDrawerOpen(false);
      if (event.key === "Tab") {
        const controls = drawerRef.current.querySelectorAll("button, a[href]");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleKey);
      menuButton?.focus();
    };
  }, [drawerOpen]);

  function showToast(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }

  function scrollToTop(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFilterClick(mode) {
    setFilterMode(mode);
    if (mode === "all") {
      showToast("Showing all conversations");
    } else if (mode === "unread") {
      showToast("Showing unread conversations");
    } else if (mode === "customers") {
      showToast("Showing customer conversations");
    } else if (mode === "archived") {
      showToast("Archived: 0 conversations archived");
    }
  }

  function handleSearchChange(e) {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim()) {
      const lower = term.toLowerCase().trim();
      const match = conversations.some(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.service.toLowerCase().includes(lower) ||
          c.snippet.toLowerCase().includes(lower)
      );
      if (!match) {
        showToast(`No conversations found for "${term}"`);
      }
    }
  }

  function handleConversationClick(conv) {
    if (conv.name === "Aruna Perera") {
      setActiveChat("Aruna Perera");
      return;
    }

    if (conv.unread > 0) {
      setConversations((prev) =>
        prev.map((item) => (item.id === conv.id ? { ...item, unread: 0 } : item))
      );
    }
    showToast(`💬 Opening chat with ${conv.name}...`);
  }

  function handleSendChatMessage(e) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      id: Date.now(),
      type: "outgoing",
      text,
      time: timeString,
      receipt: "✓✓",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
    setTimeout(() => {
      if (chatThreadRef.current) {
        chatThreadRef.current.scrollTo({
          top: chatThreadRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);
  }

  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread || 0), 0);

  const displayedConversations = conversations.filter((c) => {
    if (filterMode === "archived") return false;
    if (filterMode === "unread" && c.unread === 0) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const match =
        c.name.toLowerCase().includes(term) ||
        c.service.toLowerCase().includes(term) ||
        c.snippet.toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  // Render Worker Chat View
  if (activeChat) {
    return (
      <div className="worker-chat">
        <Toast message={toast} />
        <AppShell>
          <AppHeader
            role="worker"
            onBackClick={() => setActiveChat(null)}
            onLogoClick={scrollToTop}
            onNotificationClick={() => showToast("3 unread notifications")}
          />

          <main className="chat-main">
            <section className="chat-customer-header">
              <div className="chat-avatar">
                AP<span></span>
              </div>
              <div className="customer-name">
                <h1>Aruna Perera</h1>
                <p>Online</p>
              </div>
              <div className="call-actions">
                <button
                  type="button"
                  aria-label="Phone call"
                  onClick={() => showToast("Phone call will be available soon.")}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1-.3 1.1.4 2.2.6 3.4.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.7 22 2 13.3 2 2.8c0-.6.4-1 1-1h4.3c.6 0 1 .4 1 1 0 1.2.2 2.3.6 3.4.1.3 0 .7-.3 1z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Video call"
                  onClick={() => showToast("Video call will be available soon.")}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 8v8H5V8h10m1-2H4c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-3.5l4 3V7.5l-4 3V7c0-.6-.4-1-1-1z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="More options"
                  onClick={() => showToast("More options will be available soon.")}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </div>
            </section>

            <section className="chat-job-card">
              <div className="job-service-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="m14.7 6.3 3-3a4.2 4.2 0 0 1 3 5.9l-2.5 2.5-3.5-3.5zM13.3 7.7 3.8 17.2a2.1 2.1 0 1 0 3 3l9.5-9.5M5 5l3 3M4 11l2-2M13 19l2 2" />
                </svg>
              </div>
              <div className="job-copy">
                <h2>AC Repair</h2>
                <p>
                  Sat, 6 Sep 2026 <b>•</b> 12:00 PM - 1:00 PM
                </p>
                <p className="job-address">⌖ No. 123, Lake Road, Colombo 06</p>
              </div>
              <div className="job-side">
                <span>Confirmed</span>
                <i>›</i>
              </div>
            </section>

            <section className="chat-thread" id="chatThread" ref={chatThreadRef} aria-live="polite">
              <div className="date-divider">
                <span>Today</span>
              </div>
              {chatMessages.map((msg) => (
                <article
                  key={msg.id}
                  className={`message ${msg.type}${msg.isLast ? " last-message" : ""}`}
                >
                  {msg.type === "incoming" && <div className="message-avatar">AP</div>}
                  <div className="bubble">
                    <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                    <time>
                      {msg.time} {msg.receipt && <b>{msg.receipt}</b>}
                    </time>
                  </div>
                </article>
              ))}
            </section>
          </main>

          <form className="chat-composer" id="chatComposer" onSubmit={handleSendChatMessage}>
            <button
              type="button"
              id="attachmentBtn"
              className="composer-icon"
              aria-label="Add attachment"
              onClick={() => showToast("Attachments will be available soon.")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m21.4 11.6-9.6 9.6a6 6 0 0 1-8.5-8.5l9.6-9.6a4 4 0 1 1 5.7 5.7L8.9 18.5a2 2 0 0 1-2.8-2.8l8.9-8.9" />
              </svg>
            </button>
            <div className="input-wrap">
              <input
                id="chatInput"
                ref={chatInputRef}
                maxLength={500}
                autoComplete="off"
                placeholder="Type a message..."
                aria-label="Message Aruna"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                type="button"
                id="emojiBtn"
                aria-label="Add emoji"
                onClick={() => {
                  setChatInput((prev) => prev + " 😊");
                  chatInputRef.current?.focus();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
              </button>
            </div>
            <button className="send-btn" type="submit" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="m3 11 18-8-7.5 18-2.4-7.6L3 11zm9.3 1.2 4.8-5.6-7 4 2.2 1.6z" />
              </svg>
            </button>
          </form>

          <BottomNavigation role="worker" onActiveTabClick={scrollToTop} />
        </AppShell>
      </div>
    );
  }

  // Render Worker Messages List View
  return (
    <div className="worker-messages">
      <WorkerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerRef={drawerRef}
        closeRef={closeRef}
        onShowToast={showToast}
      />
      <Toast message={toast} />
      <AppShell inert={drawerOpen}>
        <AppHeader
          role="worker"
          onMenuClick={() => setDrawerOpen(true)}
          menuRef={menuRef}
          drawerOpen={drawerOpen}
          onNotificationClick={() =>
            showToast("🔔 3 unread messages waiting for your reply")
          }
          onLogoClick={scrollToTop}
        />

        {/* MAIN SCROLLABLE VIEWPORT */}
        <main className="main-content" ref={mainRef}>
          {/* PAGE TITLE SECTION */}
          <section className="page-title-section" aria-label="Messages Screen Title">
            <h1 className="page-main-title">Messages</h1>
            <p className="page-subtitle">Chat with customers and manage your conversations</p>
          </section>

          {/* SEARCH MESSAGES INPUT */}
          <div className="search-bar-wrapper">
            <span className="search-icon-svg" aria-hidden="true">
              <HireMeIcon name="search" />
            </span>
            <input
              type="text"
              id="searchMessagesInput"
              className="search-input"
              placeholder="Search messages..."
              aria-label="Search messages"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* FILTER TABS PILLS */}
          <nav className="filter-tabs-container" aria-label="Filter Messages">
            <ul className="filter-tabs-list">
              <li>
                <button
                  className={`filter-tab-btn${filterMode === "all" ? " active" : ""}`}
                  data-msg-filter="all"
                  onClick={() => handleFilterClick("all")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={`filter-tab-btn${filterMode === "customers" ? " active" : ""}`}
                  data-msg-filter="customers"
                  onClick={() => handleFilterClick("customers")}
                >
                  Customers
                </button>
              </li>
              <li>
                <button
                  className={`filter-tab-btn${filterMode === "unread" ? " active" : ""}`}
                  data-msg-filter="unread"
                  id="unreadFilterTab"
                  onClick={() => handleFilterClick("unread")}
                >
                  Unread &nbsp;{totalUnread}
                </button>
              </li>
              <li>
                <button
                  className={`filter-tab-btn${filterMode === "archived" ? " active" : ""}`}
                  data-msg-filter="archived"
                  onClick={() => handleFilterClick("archived")}
                >
                  Archived
                </button>
              </li>
            </ul>
          </nav>

          {/* CONVERSATIONS LIST */}
          <section className="conversations-section" aria-label="Conversations List">
            <ul className="conversation-list" id="conversationListContainer">
              {displayedConversations.map((conv) => (
                <li
                  key={conv.id}
                  className="conversation-item"
                  data-name={conv.name}
                  data-service={conv.service}
                  data-unread={conv.unread}
                  onClick={() => handleConversationClick(conv)}
                >
                  <div
                    className={`conversation-avatar-circle ${conv.avatarClass}`}
                    aria-hidden="true"
                  >
                    {conv.initials}
                  </div>
                  <div className="conversation-details">
                    <h3 className="conversation-name">{conv.name}</h3>
                    <span className="conversation-service">{conv.service}</span>
                    <p className="conversation-snippet">{conv.snippet}</p>
                  </div>
                  <div className="conversation-meta-col">
                    <time className="conversation-timestamp">{conv.timestamp}</time>
                    {conv.unread > 0 ? (
                      <span className="unread-badge">{conv.unread}</span>
                    ) : (
                      <svg
                        className="read-receipt-svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="Read receipt"
                      >
                        <polyline points="18 6 9 17 4 12"></polyline>
                        <polyline points="22 10 13 21 11 19"></polyline>
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>

        {/* BOTTOM FIXED NAVIGATION BAR */}
        <BottomNavigation role="worker" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
