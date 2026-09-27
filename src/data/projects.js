const badges = { 2: "New", 3: "Update", 4: "New", 9: "New", 14: "Update" };

export const projects = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  image: `https://picsum.photos/seed/card${i + 1}/600/900`,
  badge: badges[i + 1] ?? null,
  stack: ["React", "GSAP"],
  link: "#",
}));