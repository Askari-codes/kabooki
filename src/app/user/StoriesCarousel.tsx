"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Dialog, Flex, Select, Text, TextArea, TextField } from "@radix-ui/themes";
import { ChatBubbleIcon, HeartFilledIcon, HeartIcon, Share2Icon } from "@radix-ui/react-icons";
import { useCategory } from "./CategoryContext";

type EntryType = "Story" | "Review" | "Critique";

interface Comment {
  id: string;
  author: string;
  text: string;
}

interface Entry {
  id: string;
  type: EntryType;
  category: string;
  title: string;
  content: string;
  relatedTitle?: string;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
  sharedByMe: boolean;
}

const TYPE_OPTIONS_BY_CATEGORY: Record<string, EntryType[]> = {
  Books: ["Story", "Review", "Critique"],
  Movies: ["Review", "Critique"],
};

const TYPE_BADGE_STYLES: Record<EntryType, { backgroundColor: string; color: string }> = {
  Story: { backgroundColor: "#f3ece0", color: "#7c4a24" },
  Review: { backgroundColor: "#f5e9c8", color: "#8a6d1f" },
  Critique: { backgroundColor: "#efe3d3", color: "#5c3418" },
};

type SeedEntry = Omit<Entry, "likes" | "likedByMe" | "comments" | "sharedByMe">;

const seedEntries: SeedEntry[] = [
  {
    id: "seed-1",
    type: "Critique",
    category: "Books",
    title: "Solitude never gets old",
    content:
      "Every reread of One Hundred Years of Solitude turns up something I missed. The Buendía family feels less like fiction and more like a memory I inherited, and every time I return to Macondo I notice I've become a slightly different reader than the one who left it.\n\n" +
      "The first time through, I read it the way most people probably do: swept along by the sentences, barely pausing to untangle which José Arcadio or Aureliano was doing what to whom. Márquez does something almost cruel to the reader in those early chapters — he hands you a family tree that loops back on itself, names repeating across generations like a curse nobody thought to break, and dares you to keep up. I didn't, not really, not the first time. I just let the prose carry me, the way you let a river carry you, and trusted that understanding would arrive eventually even if it arrived late.\n\n" +
      "What struck me most on that first pass was the tone. Nothing in the book is treated as remarkable — not the flying carpets, not Remedios the Beauty ascending bodily into the sky while folding laundry, not the four years, eleven months, and two days of rain. It's all delivered with the same flat, matter-of-fact cadence you'd use to describe someone paying a bill or fixing a fence. That refusal to distinguish between the miraculous and the mundane is, I think, the entire argument of the book. History and myth aren't different categories for the Buendías; they're the same substance, just experienced at different distances.\n\n" +
      "The second read is where the book actually opened up for me. By then I already knew Colonel Aureliano Buendía survives all those firing squads, so instead of racing toward what happens, I could sit in how it happens — the repetition, the way every generation seems doomed to relive some warped version of the one before it. Someone falls in love too intensely. Someone goes to war for reasons that curdle into abstraction. Someone locks themselves in a room with gold fish or Latin manuscripts or grief, and the house just keeps absorbing it, room by room, the way a body absorbs scar tissue. Macondo isn't a backdrop; it's a kind of organism that remembers everything that's happened inside it, whether or not the people living there choose to.\n\n" +
      "I think that's why the ending destroys me every single time, even knowing exactly what's coming. Aureliano Babilonia finally deciphers Melquíades's parchments in that last blast of wind, and the prophecy turns out to have been the whole book all along — every page I'd just read had already been written down before the family started living it. There's something genuinely vertiginous about that structure. You're not just reading a story about a family that repeats its own history; you're reading a story that already knew, before it began, exactly how it would end, and it told you anyway. Free will gets no vote in Macondo. The wind that erases the town isn't punishment, not really — it's just the last page turning.\n\n" +
      "What I keep coming back to, critique-wise, is how unfashionable the whole enterprise sounds on paper. A hundred years, seven generations, a town materializing out of nothing and dissolving back into nothing, incest as a recurring anxiety, war as background noise, technology arriving like a magic trick and then curdling into ordinary disappointment. It should read like an overstuffed saga, exhausting by chapter ten. Instead it reads like something closer to a spell — dense, yes, demanding, yes, but never bloated, because every digression is doing structural work. The gypsies aren't comic relief; they're the mechanism by which the outside world keeps intruding on Macondo's isolation. The insomnia plague isn't a fun set piece; it's the first time the town loses its memory, which foreshadows everything Melquíades's manuscript is trying to prevent from happening again.\n\n" +
      "I've recommended this book to more people than any other, and I've watched it fail for about half of them, usually somewhere around the third Aureliano. I get it. The names are a genuine barrier, and Márquez isn't interested in making it easy for you. But I've started telling people not to fight the confusion — to let the repetition of names become the point rather than an obstacle to it, because that's exactly what the novel is arguing about time and family and history: that we mistake repetition for progress, that we keep calling our children by the names of the dead and are then surprised when they inherit the same appetites, the same tempers, the same solitary deaths.\n\n" +
      "It's a book about how loneliness gets passed down like a family trait, disguised each generation as something else — ambition, obsession, war, love — until finally someone sits still long enough to read the whole thing plainly, and by then it's already too late to change anything. I don't think I'll ever finish being unsettled by that, and I don't especially want to. Some books you love because they resolve something in you. This one I love because it refuses to.",
    relatedTitle: "One Hundred Years of Solitude",
  },
  {
    id: "seed-2",
    type: "Story",
    category: "Books",
    title: "Reading Aura on a rainy night",
    content:
      "Started Aura at 11pm thinking I'd read a chapter. Finished it in one sitting with all the lights on. Fuentes knows exactly how long to hold a sentence.",
    relatedTitle: "Aura",
  },
  {
    id: "seed-3",
    type: "Critique",
    category: "Books",
    title: "A dictator you can't look away from",
    content:
      "The Feast of the Goat shouldn't be as readable as it is given the subject matter. Vargas Llosa makes Trujillo's Dominican Republic suffocating without ever feeling like a history lecture.",
    relatedTitle: "The Feast of the Goat",
  },
  {
    id: "seed-4",
    type: "Story",
    category: "Books",
    title: "Missed my stop reading Blindness",
    content:
      "Was on the train, three chapters into Blindness, and completely missed my station. Saramago's unpunctuated dialogue does something to your sense of time — I looked up and twenty minutes were just gone.",
    relatedTitle: "Blindness",
  },
  {
    id: "seed-5",
    type: "Critique",
    category: "Movies",
    title: "Still the best courtroom film, period",
    content:
      "Rewatched 12 Angry Men for the tenth time and it still holds up better than almost anything made since. One room, twelve chairs, and somehow it never drags for a second.",
    relatedTitle: "12 Angry Men",
  },
  {
    id: "seed-6",
    type: "Review",
    category: "Movies",
    title: "A Godfather marathon that ruined my weekend plans",
    content:
      "Told myself I'd just watch the first half of The Godfather before dinner. Six hours and both films later, I ordered food at midnight and don't regret it at all.",
    relatedTitle: "The Godfather",
  },
  {
    id: "seed-7",
    type: "Critique",
    category: "Movies",
    title: "The verdict was never really the point",
    content:
      "Pulp Fiction gets called a crime film but it's really just three short stories wearing a trench coat. Tarantino scrambles the timeline and somehow that makes the violence feel more like consequence and less like plot.",
    relatedTitle: "Pulp Fiction",
  },
];

const SAMPLE_LIKES: Record<string, number> = {
  "seed-1": 24,
  "seed-2": 9,
  "seed-3": 15,
  "seed-4": 7,
  "seed-5": 18,
  "seed-6": 11,
  "seed-7": 13,
};

const SAMPLE_COMMENTS: Record<string, Comment[]> = {
  "seed-1": [
    { id: "c1", author: "Elena R.", text: "This is exactly why I recommend it to everyone with a highlighter in hand." },
    { id: "c2", author: "Marcus T.", text: "The ending still wrecks me too, every single time." },
  ],
  "seed-6": [
    { id: "c3", author: "Priya K.", text: "Did the same thing over New Year's. Zero regrets." },
  ],
};

const initialEntries: Entry[] = seedEntries.map((entry) => ({
  ...entry,
  likes: SAMPLE_LIKES[entry.id] ?? 0,
  likedByMe: false,
  comments: SAMPLE_COMMENTS[entry.id] ?? [],
  sharedByMe: false,
}));

const StoriesCarousel = () => {
  const { category } = useCategory();
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<EntryType>("Story");
  const [entryCategory, setEntryCategory] = useState(category);
  const [title, setTitle] = useState("");
  const [relatedTitle, setRelatedTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");

  const visibleEntries = entries.filter((entry) => entry.category === category);
  const typeOptions = TYPE_OPTIONS_BY_CATEGORY[entryCategory] ?? [];
  const selectedEntry = entries.find((entry) => entry.id === selectedEntryId) ?? null;

  const toggleLike = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, likedByMe: !entry.likedByMe, likes: entry.likes + (entry.likedByMe ? -1 : 1) }
          : entry,
      ),
    );
  };

  const toggleShare = (id: string) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, sharedByMe: !entry.sharedByMe } : entry)),
    );
  };

  const openEntry = (id: string) => {
    setCommentDraft("");
    setSelectedEntryId(id);
  };

  const addComment = (id: string) => {
    if (!commentDraft.trim()) return;
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              comments: [...entry.comments, { id: crypto.randomUUID(), author: "You", text: commentDraft.trim() }],
            }
          : entry,
      ),
    );
    setCommentDraft("");
  };

  const selectEntryCategory = (nextCategory: string) => {
    setEntryCategory(nextCategory);
    const allowedTypes = TYPE_OPTIONS_BY_CATEGORY[nextCategory] ?? [];
    if (!allowedTypes.includes(type)) setType(allowedTypes[0]);
  };

  const resetForm = () => {
    setType(TYPE_OPTIONS_BY_CATEGORY[category]?.[0] ?? "Story");
    setTitle("");
    setRelatedTitle("");
    setContent("");
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        category: entryCategory,
        title: title.trim(),
        content: content.trim(),
        relatedTitle: relatedTitle.trim() || undefined,
        likes: 0,
        likedByMe: false,
        comments: [],
        sharedByMe: false,
      },
    ]);
    resetForm();
    setOpen(false);
  };

  return (
    <div>
      <Flex justify="between" align="center" mb="4">
        <h2 className="font-serif text-xl font-bold text-[#2f2418]">
          {category} Stories &amp; Critiques
        </h2>
        <Dialog.Root
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (v) selectEntryCategory(category);
          }}
        >
          {/* <Dialog.Trigger>
            <Button size="2" color="brown" style={{ cursor: "pointer" }}>
              + Share
            </Button>
          </Dialog.Trigger> */}
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Share a story or critique</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <label>
                <Text as="div" size="2" weight="medium" mb="1">
                  Category
                </Text>
                <Select.Root value={entryCategory} onValueChange={selectEntryCategory}>
                  <Select.Trigger style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="Books">Books</Select.Item>
                    <Select.Item value="Movies">Movies</Select.Item>
                  </Select.Content>
                </Select.Root>
              </label>

              <label>
                <Text as="div" size="2" weight="medium" mb="1">
                  Type
                </Text>
                <Select.Root value={type} onValueChange={(v) => setType(v as EntryType)}>
                  <Select.Trigger style={{ width: "100%" }} />
                  <Select.Content>
                    {typeOptions.map((option) => (
                      <Select.Item key={option} value={option}>
                        {option}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </label>

              <label>
                <Text as="div" size="2" weight="medium" mb="1">
                  Title
                </Text>
                <TextField.Root
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give it a title"
                />
              </label>

              <label>
                <Text as="div" size="2" weight="medium" mb="1">
                  Book or movie (optional)
                </Text>
                <TextField.Root
                  value={relatedTitle}
                  onChange={(e) => setRelatedTitle(e.target.value)}
                  placeholder="e.g. One Hundred Years of Solitude"
                />
              </label>

              <label>
                <Text as="div" size="2" weight="medium" mb="1">
                  Your {type.toLowerCase()}
                </Text>
                <TextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write what's on your mind..."
                  rows={5}
                />
              </label>
            </Flex>

            <Flex justify="end" gap="3" mt="4">
              <Dialog.Close>
                <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button color="brown" style={{ cursor: "pointer" }} onClick={handleSubmit}>
                Post
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>

      {visibleEntries.length === 0 ? (
        <Text size="2" color="gray">
          No {category.toLowerCase()} stories or critiques shared yet.
        </Text>
      ) : (
        <Swiper
          key={category}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {visibleEntries.map((entry) => (
            <SwiperSlide key={entry.id} className="!h-auto pb-2">
              <div className="flex h-full w-full flex-col rounded-xl border border-[#e8dfd0] bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openEntry(entry.id)}
                  onKeyDown={(e) => e.key === "Enter" && openEntry(entry.id)}
                  className="flex flex-1 flex-col text-left"
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="mb-2 w-fit rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={TYPE_BADGE_STYLES[entry.type]}
                  >
                    {entry.type}
                  </span>
                  <p className="font-serif text-base font-bold text-[#2f2418]">{entry.title}</p>
                  {entry.relatedTitle && (
                    <p className="mb-2 text-xs text-[#a08d6e]">on {entry.relatedTitle}</p>
                  )}
                  <p className="line-clamp-3 text-sm leading-relaxed text-[#2f2418]">{entry.content}</p>
                </div>

                <Flex align="center" gap="4" mt="3" pt="3" style={{ borderTop: "1px solid #e8dfd0" }}>
                  <button
                    type="button"
                    onClick={() => toggleLike(entry.id)}
                    className="flex items-center gap-1 text-sm"
                    style={{ cursor: "pointer", color: entry.likedByMe ? "#b23b3b" : "#a08d6e" }}
                  >
                    {entry.likedByMe ? <HeartFilledIcon /> : <HeartIcon />}
                    {entry.likes}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEntry(entry.id)}
                    className="flex items-center gap-1 text-sm text-[#a08d6e]"
                    style={{ cursor: "pointer" }}
                  >
                    <ChatBubbleIcon />
                    {entry.comments.length}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleShare(entry.id)}
                    className="ml-auto flex items-center gap-1 text-sm"
                    style={{ cursor: "pointer", color: entry.sharedByMe ? "#7c4a24" : "#a08d6e" }}
                  >
                    <Share2Icon />
                    {entry.sharedByMe ? "Shared" : "Share"}
                  </button>
                </Flex>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Dialog.Root open={selectedEntry !== null} onOpenChange={(v) => !v && setSelectedEntryId(null)}>
        <Dialog.Content maxWidth="800px">
          {selectedEntry && (
            <>
              <span
                className="mb-2 w-fit rounded-full px-2 py-0.5 text-xs font-semibold"
                style={TYPE_BADGE_STYLES[selectedEntry.type]}
              >
                {selectedEntry.type}
              </span>
              <Dialog.Title className="font-serif">{selectedEntry.title}</Dialog.Title>
              {selectedEntry.relatedTitle && (
                <Dialog.Description size="2" color="gray" mb="3">
                  on {selectedEntry.relatedTitle}
                </Dialog.Description>
              )}
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#2f2418]">
                {selectedEntry.content}
              </p>

              <Flex align="center" gap="4" mt="4" pt="3" style={{ borderTop: "1px solid #e8dfd0" }}>
                <button
                  type="button"
                  onClick={() => toggleLike(selectedEntry.id)}
                  className="flex items-center gap-1 text-sm"
                  style={{ cursor: "pointer", color: selectedEntry.likedByMe ? "#b23b3b" : "#a08d6e" }}
                >
                  {selectedEntry.likedByMe ? <HeartFilledIcon /> : <HeartIcon />}
                  {selectedEntry.likes} {selectedEntry.likes === 1 ? "like" : "likes"}
                </button>
                <Flex align="center" gap="1" className="text-sm" style={{ color: "#a08d6e" }}>
                  <ChatBubbleIcon />
                  {selectedEntry.comments.length} {selectedEntry.comments.length === 1 ? "comment" : "comments"}
                </Flex>
                <button
                  type="button"
                  onClick={() => toggleShare(selectedEntry.id)}
                  className="ml-auto flex items-center gap-1 text-sm"
                  style={{ cursor: "pointer", color: selectedEntry.sharedByMe ? "#7c4a24" : "#a08d6e" }}
                >
                  <Share2Icon />
                  {selectedEntry.sharedByMe ? "Shared to your page" : "Share to your page"}
                </button>
              </Flex>

              <Flex direction="column" gap="3" mt="4">
                {selectedEntry.comments.map((comment) => (
                  <Flex key={comment.id} direction="column" className="rounded-lg bg-[#faf6ee] p-3">
                    <Text size="2" weight="bold" className="text-[#2f2418]">
                      {comment.author}
                    </Text>
                    <Text size="2" className="text-[#2f2418]">
                      {comment.text}
                    </Text>
                  </Flex>
                ))}

                <Flex gap="2">
                  <TextField.Root
                    style={{ flex: 1 }}
                    value={commentDraft}
                    onChange={(e) => setCommentDraft(e.target.value)}
                    placeholder="Add a comment..."
                    onKeyDown={(e) => e.key === "Enter" && addComment(selectedEntry.id)}
                  />
                  <Button color="brown" style={{ cursor: "pointer" }} onClick={() => addComment(selectedEntry.id)}>
                    Post
                  </Button>
                </Flex>
              </Flex>

              <Flex justify="end" mt="4">
                <Dialog.Close>
                  <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
                    Close
                  </Button>
                </Dialog.Close>
              </Flex>
            </>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default StoriesCarousel;
