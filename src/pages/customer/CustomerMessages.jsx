import { HireMeIconArtwork } from "../../components/HireMeIcon";
import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import HireMeIcon from "../../components/HireMeIcon";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import useNavigationDrawer from "../../components/useNavigationDrawer";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./CustomerMessages.css";

// Local demo inbox; no backend or new routes are introduced.
const CONVERSATIONS = [
  { id: "suneth", name: "Suneth Electrical", service: "Electrical Repair", icon: "electrical", preview: "You're welcome! Feel free to message me.", time: "10:34 AM", unread: 2, online: true },
  { id: "sanduni", name: "Sanduni Fernando", service: "Plumbing Service", icon: "plumbing", preview: "Thank you! See you then.", time: "Yesterday", unread: 0, online: false },
  { id: "nadeesha", name: "Nadeesha Kumar", service: "Home Cleaning", icon: "cleaning", preview: "What time would work best for you?", time: "Yesterday", unread: 1, online: false },
  { id: "ruwan", name: "Ruwan Plumbing", service: "Plumbing Service", icon: "plumbing", preview: "The job is completed. Thanks!", time: "12 Sep 2026", unread: 0, online: false },
  { id: "dilani", name: "Dilani Perera", service: "Painting Service", icon: "painting", preview: "When would you like me to visit?", time: "10 Sep 2026", unread: 0, online: false },
];

// Demo conversation matching the reference screenshot (customer chatting with Suneth Electrical).
const INITIAL_MESSAGES = [
  {
    id: 1,
    type: "incoming",
    text: "Hi! Thank you for booking an electrical repair service. How can I help you?",
    time: "10:24 AM",
  },
  {
    id: 2,
    type: "outgoing",
    text: "Hi, I have an issue with a power outlet in my living room. It\u2019s not working.\nCan you check and fix it?",
    time: "10:26 AM",
    receipt: "\u2713\u2713",
  },
  {
    id: 3,
    type: "incoming",
    text: "Sure! I can fix that. Is it just one outlet or multiple outlets?",
    time: "10:28 AM",
  },
  {
    id: 4,
    type: "outgoing",
    text: "Just one outlet. Also, can you bring a new outlet if needed?",
    time: "10:30 AM",
    receipt: "\u2713\u2713",
  },
  {
    id: 5,
    type: "incoming",
    text: "Yes, I will bring the required materials.\nSee you at 12:00 PM tomorrow.",
    time: "10:32 AM",
  },
  {
    id: 6,
    type: "outgoing",
    text: "Great! Thank you! \uD83E\uDD29",
    time: "10:33 AM",
    receipt: "\u2713\u2713",
  },
  {
    id: 7,
    type: "incoming",
    text: "You\u2019re welcome! If you have any other questions, feel free to message me.",
    time: "10:34 AM",
  },
];

// Markup and SVG artwork follow the original project design and match the reference screenshot.
export default function CustomerMessages() {
  const drawer = useNavigationDrawer();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeConversation = CONVERSATIONS.find(c => c.id === searchParams.get("conversation"));
  const [threads, setThreads] = useState({ suneth: INITIAL_MESSAGES });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [readIds, setReadIds] = useState([]);
  const mainRef = useRef(null);
  const messages = activeConversation ? (threads[activeConversation.id] ?? [{ id: 1, type: "incoming", text: activeConversation.preview, time: activeConversation.time }]) : [];
  const unreadCount = CONVERSATIONS.filter(c => c.unread > 0 && !readIds.includes(c.id)).length;
  const visibleConversations = CONVERSATIONS.filter(c => filter !== "archived" && (filter !== "unread" || (c.unread > 0 && !readIds.includes(c.id))) && (c.name + " " + c.service + " " + (threads[c.id]?.at(-1)?.text ?? c.preview)).toLowerCase().includes(query.trim().toLowerCase()));

  function openConversation(id) {
    setReadIds(ids => ids.includes(id) ? ids : [...ids, id]);
    setChatInput("");
    setSearchParams({ conversation: id });
  }
  function returnToInbox() { setSearchParams({}); setChatInput(""); }
  const [chatInput, setChatInput] = useState("");
  const [toast, setToast] = useState("");

  const toastTimer = useRef(null);
  const chatThreadRef = useRef(null);
  const chatInputRef = useRef(null);
  const nextMessageId = useRef(INITIAL_MESSAGES.length + 1);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe \u2014 Messages";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");
    return () => {
      clearTimeout(toastTimer.current);
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
    };
  }, []);

  // Scroll the selected conversation after opening or sending.
  useEffect(() => {
    if (chatThreadRef.current) {
      chatThreadRef.current.scrollTop = chatThreadRef.current.scrollHeight;
    }
  }, [activeConversation?.id, messages.length]);

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

  function handleSendMessage(e) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      id: nextMessageId.current++,
      type: "outgoing",
      text,
      time: timeString,
      receipt: "\u2713\u2713",
    };
    setThreads(prev => ({ ...prev, [activeConversation.id]: [...messages, newMsg] }));
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

  return (
    <div className="customer-messages">
      <Toast message={toast} />
      <WorkerDrawer
        role="customer"
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        drawerRef={drawer.drawerRef}
        closeRef={drawer.closeRef}
        onShowToast={showToast}
      />
      <AppShell inert={drawer.isOpen}>
        <AppHeader
          role="customer"
          onMenuClick={drawer.open}
          menuRef={drawer.menuRef}
          drawerOpen={drawer.isOpen}
          onLogoClick={scrollToTop}
          onNotificationClick={() => showToast("You have 1 new notification.")}
        />

        {!activeConversation ? (
          <main className="messages-inbox" ref={mainRef}>
            <section className="inbox-heading">
              <h1>Messages</h1>
              <p>Chat with workers about your bookings</p>
            </section>
            <div className="inbox-search-row">
              <label className="inbox-search">
                <HireMeIcon name="search" size="medium" color="inherit" />
                <input type="search" aria-label="Search conversations" placeholder="Search conversations..." value={query} onChange={e => setQuery(e.target.value)} />
              </label>
              <button className="inbox-filter" type="button" aria-label="Show unread conversations" aria-pressed={filter === "unread"} onClick={() => setFilter(filter === "unread" ? "all" : "unread")}><HireMeIcon name="settings" size="medium" color="inherit" /></button>
            </div>
            <div className="inbox-tabs" role="group" aria-label="Filter conversations">
              <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}><HireMeIcon name="messages" size="small" color="inherit" />All ({CONVERSATIONS.length})</button>
              <button type="button" aria-pressed={filter === "unread"} onClick={() => setFilter("unread")}><span className="inbox-unread-dot" aria-hidden="true" />Unread ({unreadCount})</button>
              <button type="button" aria-pressed={filter === "archived"} onClick={() => setFilter("archived")}>Archived (0)</button>
            </div>
            <ul className="inbox-conversations" aria-label="Conversations">
              {visibleConversations.map(conversation => (
                <li key={conversation.id}>
                  <button type="button" className="inbox-card" onClick={() => openConversation(conversation.id)}>
                    <span className="inbox-avatar" aria-hidden="true"><HireMeIcon name="profile" size="large" color="inherit" /><span className={conversation.online ? "presence online" : "presence"} /></span>
                    <span className="inbox-person"><strong>{conversation.name}</strong><span className="inbox-preview">{threads[conversation.id]?.at(-1)?.text ?? conversation.preview}</span><span className="inbox-service">{conversation.service}</span></span>
                    <span className="inbox-meta"><time>{threads[conversation.id]?.at(-1)?.time ?? conversation.time}</time><span className="inbox-card-trailing">{conversation.unread > 0 && !readIds.includes(conversation.id) && <span className="inbox-unread" aria-label={conversation.unread + " unread messages"}>{conversation.unread}</span>}<HireMeIcon name="chevron" size="medium" color="inherit" /></span></span>
                  </button>
                </li>
              ))}
            </ul>
            {visibleConversations.length === 0 && <p className="inbox-empty" role="status">{filter === "archived" ? "No archived conversations." : query ? "No conversations match your search." : "You're all caught up. No unread conversations."}</p>}
          </main>
        ) : <>
        <main className="chat-main">
          <button type="button" className="inbox-return" onClick={returnToInbox}><HireMeIcon name="back" size="medium" color="inherit" />All conversations</button>
          {/* Worker / Service Provider Header */}
          <section className="chat-worker-header">
            <div className="chat-worker-avatar">
              <HireMeIcon name={activeConversation.icon} />
              {activeConversation.online && <span className="online-indicator" />}
            </div>
            <div className="worker-info">
              <h1>{activeConversation.name}</h1>
              <p className={activeConversation.online ? "online-status" : "offline-status"}>{activeConversation.online ? "Online now" : "Offline"}</p>
              <p className="worker-service">{activeConversation.service}</p>
            </div>
            <div className="chat-header-actions">
              <button
                type="button"
                aria-label="Phone call"
                onClick={() => showToast("Phone call will be available soon.")}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="call" /></svg>
              </button>
              <button
                type="button"
                aria-label="More options"
                onClick={() => showToast("More options will be available soon.")}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="more" /></svg>
              </button>
            </div>
          </section>

          {/* Booking Information Card */}
          {activeConversation.id === "suneth" && <section className="booking-info-card">
            <div className="booking-icon-box">
              <HireMeIcon name="calendar" />
            </div>
            <div className="booking-details">
              <p className="booking-label">Upcoming Booking</p>
              <p className="booking-datetime">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><HireMeIconArtwork name="calendar" /></svg>
                Sat, 6 Sep 2026 &bull; 12:00 PM - 1:00 PM
              </p>
              <p className="booking-location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><HireMeIconArtwork name="address" /></svg>
                No. 123, Lake Road, Colombo 06
              </p>
            </div>
            <div className="booking-side">
              <span className="booking-status">Confirmed</span>
              <button
                type="button"
                className="view-details-link"
                onClick={() => showToast("Booking details will be available soon.")}
              >
                View Details <span>&rsaquo;</span>
              </button>
            </div>
          </section>

          }
          {/* Chat Messages Thread */}
          <section className="chat-thread" ref={chatThreadRef} aria-live="polite">
            <div className="date-divider">
              <span>Today</span>
            </div>
            {messages.map((msg) => (
              <article
                key={msg.id}
                className={`message ${msg.type}`}
              >
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

        {/* Message Composer */}
        <form className="chat-composer" onSubmit={handleSendMessage}>
          <button
            type="button"
            className="composer-icon"
            aria-label="Add attachment"
            onClick={() => showToast("Attachments will be available soon.")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <div className="input-wrap">
            <input
              ref={chatInputRef}
              maxLength={500}
              autoComplete="off"
              placeholder="Type a message..."
              aria-label={"Message " + activeConversation.name}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              type="button"
              aria-label="Add emoji"
              onClick={() => {
                setChatInput((prev) => prev + " \uD83D\uDE0A");
                chatInputRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><HireMeIconArtwork name="smile" /></svg>
            </button>
          </div>
          <button className="send-btn" type="submit" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="send" /></svg>
          </button>
        </form>

        </>}
        <BottomNavigation role="customer" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
