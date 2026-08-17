"use client";

import { useState, useEffect } from "react";
import {
  Users,
  MessageSquare,
  Send,
  Sparkles,
  HelpCircle,
  ThumbsUp,
  CornerDownRight,
  Loader2,
  Filter,
} from "lucide-react";

interface Reply {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

interface Post {
  id: string;
  user_id: string;
  user_name: string;
  day_number: number;
  category: string;
  content: string;
  likes_count: number;
  created_at: string;
  replies: Reply[];
}

interface CohortCommunityViewProps {
  currentUserName: string;
  currentDayNumber: number;
}

export default function CohortCommunityView({
  currentUserName,
  currentDayNumber,
}: CohortCommunityViewProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // New post form state
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Question");
  const [posting, setPosting] = useState(false);

  // Reply form state
  const [replyingToPostId, setReplyingToPostId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/community");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    try {
      setPosting(true);
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newContent.trim(),
          category: newCategory,
          dayNumber: currentDayNumber,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPosts((prev) => [data.post, ...prev]);
        setNewContent("");
      }
    } catch (err) {
      console.error("Error creating post", err);
    } finally {
      setPosting(false);
    }
  };

  const handleCreateReply = async (postId: string) => {
    if (!replyContent.trim()) return;

    try {
      setSubmittingReply(true);
      const res = await fetch(`/api/community/${postId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyContent.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, replies: [...(p.replies || []), data.reply] }
              : p
          )
        );
        setReplyContent("");
        setReplyingToPostId(null);
      }
    } catch (err) {
      console.error("Error replying to post", err);
    } finally {
      setSubmittingReply(false);
    }
  };

  const categories = [
    "Question",
    "Feedback Offre",
    "Pitch LinkedIn",
    "Tarification",
    "Célébration",
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EB] border border-[#FF6B35] text-[#D63900] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Promotion & Entraide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
              Espace d'Échange de la Promotion
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Partagez vos propositions, faites relire votre pitch et débloquez vos questions avec vos pairs.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#1E293B]">
            👥 Cohorte Active • 25 créateurs
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#64748B] mr-1">Filtrer :</span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#1E293B] text-white"
                : "bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            Tous les messages ({posts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#FF6B35] text-white"
                  : "bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* New Post Form */}
      <div className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[5px_5px_0px_0px_#1E293B] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E293B]">
          <MessageSquare className="w-4 h-4 text-[#FF6B35]" />
          <span>Poser une question ou demander un retour à la promo</span>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3.5 py-2 rounded-xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0F172A] focus:border-[#FF6B35] focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <textarea
            rows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Ex : Pouvez-vous me donner votre avis sur ma promesse : 'J'aide les artisans à automatiser leurs devis...' ?"
            className="w-full p-4 rounded-2xl border-2 border-[#1E293B] bg-[#F8FAFC] focus:bg-white focus:border-[#FF6B35] focus:outline-none text-sm text-[#0F172A] font-medium"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={posting || !newContent.trim()}
              className="px-6 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E55A25] text-white font-bold text-xs sm:text-sm border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {posting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publication...</span>
                </>
              ) : (
                <>
                  <span>Publier dans la promo</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-[#64748B] flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#FF6B35]" />
            <span>Chargement des échanges de la promo...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-8 bg-white rounded-3xl border-2 border-[#E2E8F0] text-center text-[#64748B] space-y-2">
            <p className="font-bold text-sm text-[#0F172A]">Aucun message dans cette catégorie pour l'instant.</p>
            <p className="text-xs">Soyez le premier à poser une question ou partager une étape !</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] p-6 space-y-4"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1E293B] text-white text-xs font-bold flex items-center justify-center">
                    {post.user_name ? post.user_name.slice(0, 2).toUpperCase() : "CM"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0F172A]">{post.user_name}</span>
                      <span className="text-xs text-[#64748B]">•</span>
                      <span className="text-xs text-[#64748B]">Jour {post.day_number || 1}</span>
                    </div>
                    <span className="text-[11px] text-[#94A3B8]">
                      {new Date(post.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#FFF2EB] text-[#D63900] border border-[#FF6B35] text-xs font-bold">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Replies Section */}
              {post.replies && post.replies.length > 0 && (
                <div className="pl-4 sm:pl-6 border-l-2 border-[#FF6B35] space-y-3 pt-2">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0F172A]">{reply.user_name}</span>
                        <span className="text-[10px] text-[#94A3B8]">
                          {new Date(reply.created_at).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#334155]">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Trigger & Inline Input */}
              <div className="pt-3 border-t border-[#F1F5F9]">
                {replyingToPostId === post.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Votre réponse ou conseil bienveillant..."
                      className="w-full p-3 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] focus:bg-white focus:outline-none text-xs text-[#0F172A]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingToPostId(null)}
                        className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs text-[#64748B] hover:text-[#0F172A]"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => handleCreateReply(post.id)}
                        disabled={submittingReply || !replyContent.trim()}
                        className="px-4 py-1.5 rounded-lg bg-[#1E293B] text-white text-xs font-bold hover:bg-[#334155] disabled:opacity-50"
                      >
                        {submittingReply ? "Envoi..." : "Répondre"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingToPostId(post.id)}
                    className="text-xs font-bold text-[#FF6B35] hover:text-[#D63900] flex items-center gap-1.5 cursor-pointer"
                  >
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Répondre ({post.replies?.length || 0})</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
