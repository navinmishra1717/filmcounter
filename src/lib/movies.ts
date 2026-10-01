export type Movie = {
  title: string;
  meta: string;
  badge: string;
  superhit: boolean;
  fill: string;
};

// Placeholder poster fills until real artwork is wired in.
const FILLS = ["#d7d3d3", "#bab6b6", "#eae7e7", "#9b9797", "#c8c4c4", "#e0dcdc"];

export const HERO_POSTER_FILLS = [0, 3, 0, 3, 0, 3].map((i) => FILLS[i]);

export const FEATURED_FILM = "Spider-Man: No Way Home";

export const BOOKING_FIELDS = ["Select Movie", "Select Date", "Select Time"];

export const NOW_SHOWING: Movie[] = [
  { title: "No Way Home", meta: "English | Adventure, Thriller", badge: "PG", superhit: true, fill: FILLS[0] },
  { title: "Chasing Static", meta: "English | Drama", badge: "U", superhit: false, fill: FILLS[1] },
  { title: "Rear View", meta: "English | Mystery", badge: "U", superhit: false, fill: FILLS[2] },
  { title: "Long Weekend", meta: "English | Drama", badge: "U", superhit: true, fill: FILLS[3] },
  { title: "Neon Harbor", meta: "English | Action, Crime", badge: "Adult", superhit: false, fill: FILLS[4] },
  { title: "Paper Moons", meta: "English | Romance", badge: "PG", superhit: true, fill: FILLS[5] },
];

export const COMING_SOON: Movie[] = [
  { title: "Glass Horizon", meta: "English | Sci-Fi", badge: "PG", superhit: false, fill: FILLS[1] },
  { title: "The Understudy", meta: "English | Drama", badge: "U", superhit: false, fill: FILLS[3] },
  { title: "Midnight Reel", meta: "English | Thriller", badge: "Adult", superhit: true, fill: FILLS[4] },
  { title: "Salt & Static", meta: "English | Romance", badge: "U", superhit: false, fill: FILLS[0] },
  { title: "Foxglove", meta: "English | Mystery", badge: "PG", superhit: false, fill: FILLS[5] },
  { title: "Last Reel Diner", meta: "English | Comedy", badge: "U", superhit: true, fill: FILLS[2] },
];
