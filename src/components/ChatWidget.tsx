'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './ChatWidget.module.css';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  imagePreview?: string;
}

const GREETING: ChatMessage = {
  role: 'model',
  text:
    "Oi! I'm Bia, CopaJewelry's stylist assistant. Ask me about a piece, sizing, shipping, or share a photo for custom styling ideas — for a real custom order, I'll point you to our team.",
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? '');
      resolve(result.split(',')[1] ?? '');
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [pendingImage, setPendingImage] = useState<{ base64: string; preview: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const base64 = await fileToBase64(file);
    setPendingImage({ base64, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed && !pendingImage) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: trimmed || 'What do you think of this piece?',
      imagePreview: pendingImage?.preview,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    const imageToSend = pendingImage?.base64;
    setPendingImage(null);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, text }) => ({ role, text })),
          image: imageToSend,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.text) {
        throw new Error(data.error || 'Something went wrong.');
      }
      setMessages((current) => [...current, { role: 'model', text: data.text }]);
    } catch {
      setError("Bia's offline for a moment — try again, or reach us at /contact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Chat with Bia">
          <div className={styles.header}>
            <img src="/images/bia-avatar.png" alt="" aria-hidden="true" className={styles.headerAvatar} />
            <div>
              <p className={styles.headerName}>Bia</p>
              <p className={styles.headerSubtitle}>CopaJewelry stylist</p>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className={styles.list} ref={listRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={index}
                className={[
                  styles.bubbleRow,
                  message.role === 'user' ? styles.bubbleRowUser : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {message.role === 'model' && (
                  <img
                    src="/images/bia-avatar.png"
                    alt=""
                    aria-hidden="true"
                    className={styles.bubbleAvatar}
                  />
                )}
                <div
                  className={[styles.bubble, message.role === 'user' ? styles.bubbleUser : '']
                    .filter(Boolean)
                    .join(' ')}
                >
                  {message.imagePreview && (
                    <img src={message.imagePreview} alt="" className={styles.bubbleImage} />
                  )}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className={styles.bubbleRow}>
                <img
                  src="/images/bia-avatar.png"
                  alt=""
                  aria-hidden="true"
                  className={styles.bubbleAvatar}
                />
                <div className={styles.bubble}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}
            {error && <p className={styles.errorText}>{error}</p>}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {pendingImage && (
              <div className={styles.attachmentPreview}>
                <img src={pendingImage.preview} alt="Attached" />
                <button
                  type="button"
                  onClick={() => setPendingImage(null)}
                  aria-label="Remove attached photo"
                >
                  ×
                </button>
              </div>
            )}
            <div className={styles.formRow}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className={styles.attachButton}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach a photo"
                title="Attach a photo for styling ideas"
              >
                📷
              </button>
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Bia anything…"
                className={styles.textInput}
                aria-label="Message"
              />
              <button type="submit" className={styles.sendButton} disabled={loading}>
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close chat with Bia' : 'Chat with Bia, CopaJewelry stylist'}
      >
        <img src="/images/bia-avatar.png" alt="" aria-hidden="true" className={styles.launcherAvatar} />
      </button>
    </div>
  );
}
