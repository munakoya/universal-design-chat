// ここにroomデータあります
// → クイズもここで指定すればいいのかも → クイズ、入室処理、membersにtrueでおk
const chatRooms = [
  {
    id: "dogs",
    title: "🐶 Dogs 🐶",
    question: [
      {
        q1: [
          {
            q: "問題1",
            answers: ["a", "b", "c", "d"],
            indexAnswer: 3,
          },
        ],
        q2: [
          {
            q: "問題2",
            answers: ["e", "f", "g", "h"],
            indexAnswer: 2,
          },
        ],
        q3: [
          {
            q: "問題3",
            answers: ["i", "j", "k", "l"],
            indexAnswer: 1,
          },
        ],
      },
    ],
    member: [
      {
        name: "muna",
      },
    ],
  },
  { id: "food", title: "🍔 Food 🍔" },
  { id: "general", title: "💬 General 💬" },
  { id: "news", title: "🗞 News 🗞" },
  { id: "music", title: "🎹 Music 🎹" },
  { id: "sports", title: "🏈 Sports 🏈" },
];

export { chatRooms };
