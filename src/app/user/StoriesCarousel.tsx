"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Dialog, Flex, Select, Text, TextArea, TextField } from "@radix-ui/themes";

type EntryType = "Story" | "Critique";

interface Entry {
  id: string;
  type: EntryType;
  title: string;
  content: string;
  relatedTitle?: string;
}

const initialEntries: Entry[] = [
  {
    id: "seed-1",
    type: "Critique",
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
    title: "Reading Aura on a rainy night",
    content:
      "Started Aura at 11pm thinking I'd read a chapter. Finished it in one sitting with all the lights on. Fuentes knows exactly how long to hold a sentence.",
    relatedTitle: "Aura",
  },
  {
    id: "seed-3",
    type: "Critique",
    title: "A dictator you can't look away from",
    content:
      "The Feast of the Goat shouldn't be as readable as it is given the subject matter. Vargas Llosa makes Trujillo's Dominican Republic suffocating without ever feeling like a history lecture.",
    relatedTitle: "The Feast of the Goat",
  },
  {
    id: "seed-4",
    type: "Story",
    title: "Missed my stop reading Blindness",
    content:
      "Was on the train, three chapters into Blindness, and completely missed my station. Saramago's unpunctuated dialogue does something to your sense of time — I looked up and twenty minutes were just gone.",
    relatedTitle: "Blindness",
  },
  {
    id: "seed-5",
    type: "Critique",
    title: "Still the best courtroom film, period",
    content:
      "Rewatched 12 Angry Men for the tenth time and it still holds up better than almost anything made since. One room, twelve chairs, and somehow it never drags for a second.",
    relatedTitle: "12 Angry Men",
  },
  {
    id: "seed-6",
    type: "Story",
    title: "A Godfather marathon that ruined my weekend plans",
    content:
      "Told myself I'd just watch the first half of The Godfather before dinner. Six hours and both films later, I ordered food at midnight and don't regret it at all.",
    relatedTitle: "The Godfather",
  },
];

const StoriesCarousel = () => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<EntryType>("Story");
  const [title, setTitle] = useState("");
  const [relatedTitle, setRelatedTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const resetForm = () => {
    setType("Story");
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
        title: title.trim(),
        content: content.trim(),
        relatedTitle: relatedTitle.trim() || undefined,
      },
    ]);
    resetForm();
    setOpen(false);
  };

  return (
    <div>
      <Flex justify="between" align="center" mb="4">
        <h2 className="font-serif text-xl font-bold text-[#2f2418]">Stories &amp; Critiques</h2>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <Button size="2" color="brown" style={{ cursor: "pointer" }}>
              + Share
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Share a story or critique</Dialog.Title>
            <Flex direction="column" gap="3" mt="3">
              <label>
                <Text as="div" size="2" weight="medium" mb="1">
                  Type
                </Text>
                <Select.Root value={type} onValueChange={(v) => setType(v as EntryType)}>
                  <Select.Trigger style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="Story">Story</Select.Item>
                    <Select.Item value="Critique">Critique</Select.Item>
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
                  {type === "Story" ? "Your story" : "Your critique"}
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

      {entries.length === 0 ? (
        <Text size="2" color="gray">
          Nothing shared yet.
        </Text>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {entries.map((entry) => (
            <SwiperSlide key={entry.id} className="!h-auto pb-2">
              <button
                type="button"
                onClick={() => setSelectedEntry(entry)}
                className="flex h-full w-full flex-col rounded-xl border border-[#e8dfd0] bg-white p-4 text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
                style={{ cursor: "pointer" }}
              >
                <span
                  className="mb-2 w-fit rounded-full px-2 py-0.5 text-xs font-semibold"
                  style={
                    entry.type === "Story"
                      ? { backgroundColor: "#f3ece0", color: "#7c4a24" }
                      : { backgroundColor: "#efe3d3", color: "#5c3418" }
                  }
                >
                  {entry.type}
                </span>
                <p className="font-serif text-base font-bold text-[#2f2418]">{entry.title}</p>
                {entry.relatedTitle && (
                  <p className="mb-2 text-xs text-[#a08d6e]">on {entry.relatedTitle}</p>
                )}
                <p className="line-clamp-3 text-sm leading-relaxed text-[#2f2418]">{entry.content}</p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Dialog.Root open={selectedEntry !== null} onOpenChange={(v) => !v && setSelectedEntry(null)}>
        <Dialog.Content maxWidth="800px">
          {selectedEntry && (
            <>
              <span
                className="mb-2 w-fit rounded-full px-2 py-0.5 text-xs font-semibold"
                style={
                  selectedEntry.type === "Story"
                    ? { backgroundColor: "#f3ece0", color: "#7c4a24" }
                    : { backgroundColor: "#efe3d3", color: "#5c3418" }
                }
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
