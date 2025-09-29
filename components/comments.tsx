"use client"

import { useEffect, useState } from "react"

interface CommentItem {
  id: number
  anonUsername: string
  content: string
  createdAt: string
  parentId: number | null
  isCreator?: boolean
}

export function Comments({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [content, setContent] = useState("")
  const [replyToId, setReplyToId] = useState<number | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set())

  async function fetchComments() {
    try {
      const res = await fetch(`/api/comments?articleSlug=${encodeURIComponent(articleSlug)}`, {
        credentials: "include",
      })
      const data = await res.json()
      setComments(data.comments ?? [])
      if (data.currentUsername) setUsername(data.currentUsername)
      setIsAdmin(!!data.isAdminUser)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    }
  }

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleSlug])

  async function submit(e: React.FormEvent, parentIdOverride: number | null) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ articleSlug, content, parentId: parentIdOverride }),
      })
      const data = await res.json()
      if (res.ok) {
        setUsername(data.username ?? null)
        setContent("")
        setReplyToId(null)
        setComments((prev) => [data.comment, ...prev])
      } else {
        console.error(data.error || "Failed to post comment")
      }
    } finally {
      setLoading(false)
    }
  }

  function formatTime(ts: string) {
    try {
      const d = new Date(ts)
      return d.toLocaleString()
    } catch {
      return ts
    }
  }

  function renderThread(items: CommentItem[], parentId: number | null = null, depth = 0): JSX.Element[] {
    const children = items.filter((i) => i.parentId === parentId)

    return children.flatMap((c) => {
      const isCreatorComment = c.isCreator || false
      const childReplies = items.filter((item) => item.parentId === c.id)
      const nonCreatorReplies = childReplies.filter((r) => !r.isCreator)
      
      // For replies: show if expanded OR if this is a Creator comment
      // For top-level comments: show if expanded OR if this is a Creator comment
      const shouldShowReplies = expandedReplies.has(c.id) || isCreatorComment

      const node = (
        <div key={c.id} className="rounded-md border p-3" style={{ marginLeft: depth * 16 }}>
          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
            <span>
              {c.anonUsername}
              {isCreatorComment && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary align-middle">Creator</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <span>{formatTime(c.createdAt)}</span>
              <ReactionsBar commentId={c.id} compact />
            </div>
          </div>
          <div className="text-sm whitespace-pre-wrap">{c.content}</div>
          <ReactionsBar commentId={c.id} />
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setReplyToId(c.id)}
              className="text-xs text-primary hover:underline"
            >
              Reply
            </button>
            {childReplies.length > 0 && (
              <button
                type="button"
                onClick={() => setExpandedReplies((prev) => {
                  const next = new Set(prev)
                  if (next.has(c.id)) next.delete(c.id)
                  else next.add(c.id)
                  return next
                })}
                className="text-xs text-muted-foreground hover:underline"
              >
                {expandedReplies.has(c.id) ? `Hide (${childReplies.length}) replies` : `View (${childReplies.length}) replies`}
              </button>
            )}
          </div>
          {replyToId === c.id && (
            <form onSubmit={(e) => submit(e, c.id)} className="space-y-2 mt-3">
              {username && (
                <p className="text-xs text-muted-foreground">Replying as <span className="font-medium">{username}</span></p>
              )}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a reply…"
                className="w-full min-h-[60px] rounded-md border bg-background p-2 text-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs disabled:opacity-50"
                >
                  {loading ? "Posting…" : "Post Reply"}
                </button>
                <button
                  type="button"
                  onClick={() => setReplyToId(null)}
                  className="px-2 py-1 rounded-md border text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )

      // Show replies based on the logic above
      const replies = shouldShowReplies ? renderThread(items, c.id, depth + 1) : []
      return [node, ...replies]
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Comments <span className="text-sm text-muted-foreground">({comments.length})</span></h2>
      </div>
      {replyToId === null && (
        <form onSubmit={(e) => submit(e, null)} className="space-y-2">
          {username && (
            <p className="text-xs text-muted-foreground">Commenting as <span className="font-medium">{username}</span></p>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts…"
            className="w-full min-h-[80px] rounded-md border bg-background p-2 text-sm"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm disabled:opacity-50"
            >
              {loading ? "Posting…" : "Post Comment"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>
        ) : (
          renderThread(comments)
        )}
      </div>
    </div>
  )
}

function ReactionsBar({ commentId, compact = false }: { commentId: number; compact?: boolean }) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [open, setOpen] = useState(false)
  const allEmojis = [
    "👍","❤️","😂","👏","🤔","🎉","🔥","💯","😮","😢","😡","🙏","👌","🙌","👀","😎","😅","😴","🤯","✨",
    "🍀","🌟","🐱","🐶","🦄","🧠","📚","🎯","🚀","🧡","💙","💚","💜","🖤","🤍","🤎"
  ]

  useEffect(() => {
    const params = new URLSearchParams()
    params.append("commentId", String(commentId))
    fetch(`/api/reactions?${params.toString()}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, number> = {}
        for (const row of data.reactions ?? []) {
          if (row.commentId === commentId) map[row.emoji] = row.count
        }
        setCounts(map)
      })
      .catch(() => {})
  }, [commentId])

  async function toggle(emoji: string) {
    try {
      // optimistic update
      setCounts((prev) => {
        const next = { ...prev }
        next[emoji] = (next[emoji] ?? 0) + 1
        return next
      })
      
      const res = await fetch(`/api/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ commentId, emoji }),
      })
      
      if (res.ok) {
        const params = new URLSearchParams()
        params.append("commentId", String(commentId))
        const r = await fetch(`/api/reactions?${params.toString()}`, { credentials: "include" })
        const data = await r.json()
        const map: Record<string, number> = {}
        for (const row of data.reactions ?? []) {
          if (row.commentId === commentId) map[row.emoji] = row.count
        }
        setCounts(map)
      } else {
        // Revert optimistic update on failure
        setCounts((prev) => {
          const next = { ...prev }
          next[emoji] = Math.max(0, (next[emoji] ?? 0) - 1)
          if (next[emoji] === 0) delete next[emoji]
          return next
        })
      }
    } catch (error) {
      console.error("Failed to toggle reaction:", error)
    } finally {
      setOpen(false)
    }
  }

  // Compact trigger under timestamp: small smiley
  if (compact) {
    return (
      <div className="relative">
        <button
          type="button"
          title="Reactions"
          aria-label="Reactions"
          onClick={() => setOpen((v) => !v)}
          className="text-xs px-1.5 py-0.5 rounded hover:bg-muted"
        >
          🙂
        </button>
        {open && (
          <div className="absolute right-0 z-10 mt-1 rounded-md border bg-background p-2 shadow-sm w-56">
            <div className="grid grid-cols-8 gap-1">
              {allEmojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => toggle(e)}
                  className="text-base hover:bg-muted rounded"
                  title={e}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full bar under content: show only emojis with count > 0
  const active = Object.entries(counts).filter(([_, c]) => (c ?? 0) > 0)
  if (active.length === 0) return null
  return (
    <div className="flex gap-2 mt-2 flex-wrap">
      {active.map(([emoji, count]) => (
        <button
          key={emoji}
          type="button"
          onClick={() => toggle(emoji)}
          className="text-xs px-2 py-1 rounded border hover:bg-muted"
        >
          <span className="mr-1">{emoji}</span>
          <span>{count}</span>
        </button>
      ))}
    </div>
  )
}


