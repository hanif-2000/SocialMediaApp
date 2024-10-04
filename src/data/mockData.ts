export const mockFeedData = Array.from({length: 200}, (_, index) => ({
  id: (index + 1).toString(),
  username: `user${index + 1}`,
  avatar: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`, // user profile
  images: [
    `https://picsum.photos/id/${index % 100}/300/200`,
    `https://picsum.photos/id/${(index + 1) % 100}/300/200`,
  ],
  description: `This is a description for post ${index + 1}.`,
  liked: Math.random() > 0.5,
  date: `${Math.floor(Math.random() * 24)} hours ago`,
}));

export const mockProfileData = {
  username: 'user1',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  bio: 'Hello I am back!.',
  followers: 100,
  posts: 20,
  postsImages: [
    'https://picsum.photos/id/1/300/200',
    'https://picsum.photos/id/2/300/200',
  ],
};
