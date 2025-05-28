export const useMoodEntriesStore = defineStore("mood-entries", {
  state: () => {
    return {
      moodEntries: [
        {
          createdAt: "2025-05-14T09:00:00Z",
          mood: 2,
          feelings: ["Joyful", "Motivated", "Hopeful"],
          journalEntry: "Had an amazing morning run and feel full of energy!",
          sleepHours: 7.5,
        },
        {
          createdAt: "2025-05-15T10:30:00Z",
          mood: 1,
          feelings: ["Grateful", "Calm"],
          journalEntry: "Spent time with family, feeling relaxed and thankful.",
          sleepHours: 7.5,
        },
        {
          createdAt: "2025-05-16T08:15:00Z",
          mood: 0,
          feelings: ["Peaceful"],
          journalEntry:
            "Routine day at work, nothing too exciting or stressful.",
          sleepHours: 5.5,
        },
        {
          createdAt: "2025-05-17T07:50:00Z",
          mood: -1,
          feelings: ["Down", "Tired"],
          journalEntry:
            "Tough day. Didn't sleep well and felt drained at work.",
          sleepHours: 3.5,
        },
        {
          createdAt: "2025-05-18T11:00:00Z",
          mood: -1,
          feelings: ["Disappointed", "Frustrated"],
          journalEntry: "Got some bad news. Trying to process my emotions.",
          sleepHours: 5.5,
        },
        {
          createdAt: "2025-05-19T12:05:00Z",
          mood: 1,
          feelings: ["Excited", "Content"],
          journalEntry: "A good friend visited, which lifted my spirits a lot.",
          sleepHours: 7.5,
        },
        {
          createdAt: "2025-05-20T09:15:00Z",
          mood: -2,
          feelings: ["Overwhelmed", "Lonely"],
          journalEntry: "Feeling isolated. Need to talk to someone soon.",
          sleepHours: 3.5,
        },
        {
          createdAt: "2025-05-21T10:55:00Z",
          mood: 0,
          feelings: ["Irritable"],
          journalEntry:
            "Woke up in a grouchy mood but it got better by evening.",
          sleepHours: 5.5,
        },
        {
          createdAt: "2025-05-22T10:55:00Z",
          mood: 1,
          feelings: ["Optimistic", "Confident"],
          journalEntry: "Good progress on personal goals today, feeling proud.",
          sleepHours: 7.5,
        },
        {
          createdAt: "2025-05-23T07:30:00Z",
          mood: 2,
          feelings: ["Joyful", "Excited", "Grateful"],
          journalEntry:
            "Slept well and woke up ready to tackle new challenges.",
          sleepHours: 9,
        },
        {
          createdAt: "2025-05-24T08:30:00Z",
          mood: -1,
          feelings: ["Lonely", "Anxious"],
          journalEntry: "Feeling a bit off. Hoping tomorrow is better.",
          sleepHours: 3.5,
        },
        {
          createdAt: "2025-05-25T08:00:00Z",
          mood: 0,
          feelings: ["Calm"],
          journalEntry: "Quiet day at home, reading and resting.",
          sleepHours: 7.5,
        },
        {
          createdAt: "2025-05-26T09:00:00Z",
          mood: 1,
          feelings: ["Optimistic", "Confident"],
          journalEntry: "Had a productive morning cleaning and organizing.",
          sleepHours: 7.5,
        },
        {
          createdAt: "2025-05-27T10:00:00Z",
          mood: -2,
          feelings: ["Down", "Tired"],
          journalEntry: "Rough night of sleep. Need support and rest.",
          sleepHours: 3.5,
        },
        {
          createdAt: "2025-05-28T11:00:00Z",
          mood: 2,
          feelings: ["Grateful", "Optimistic"],
          journalEntry: "Woke up early and finally tackled a big project!",
          sleepHours: 9,
        },
      ],
    };
  },
});
