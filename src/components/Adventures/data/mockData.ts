// Типы данных для блога Adventures

export interface Author {
  id: number;
  name: string;
  avatar: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

// Мок-авторы
export const mockAuthors: Author[] = [
  {
    id: 1,
    name: 'Alim Alimov',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

// Мок-категории
export const mockCategories: Category[] = [
  { id: 1, name: 'The Goods', slug: 'the-goods' },
  { id: 2, name: 'Good Stories', slug: 'good-stories' },
  { id: 3, name: 'Good Trips', slug: 'good-trips' },
  { id: 4, name: 'Good Life', slug: 'good-life' },
  { id: 5, name: 'Good Ideas', slug: 'good-ideas' },
  { id: 6, name: 'Good News', slug: 'good-news' },
  { id: 7, name: 'Features', slug: 'features' },
  { id: 8, name: 'Guides', slug: 'guides' },
  { id: 9, name: 'News', slug: 'news' },
  { id: 10, name: 'Stories', slug: 'stories' },
  { id: 11, name: 'Food', slug: 'food' },
  { id: 12, name: 'Responsible Travel', slug: 'responsible-travel' },
];

// Мок-статьи
export const mockArticles: Article[] = [
  {
    id: 1,
    slug: 'the-art-of-slow-travel-camel-treks-and-desert-ecology',
    title: 'The Art of Slow Travel: Camel Treks and Desert Ecology',
    excerpt:
      "Discover the ancient art of camel trekking through the vast deserts of Uzbekistan, where time moves at nature's pace and every dune tells a story.",
    content: `
This article demonstrates the various components available for use in our articles. Each section below highlights a specific component, its purpose, and how it renders.

## Standard Typography

We support a full range of heading levels and standard text formatting to ensure content is readable and hierarchically structured.

### Headings
Below are examples of standard HTML headings, styled to match our design system.

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Lists
Unordered and ordered lists for breaking down information.

*   **Unordered List Item 1**: A simple bullet point.
*   **Unordered List Item 2**: Another point with *italic* text.
*   **Unordered List Item 3**: A point with a [link](#).

1.  **Ordered List Item 1**: A numbered step.
2.  **Ordered List Item 2**: The second step in the process.
3.  **Ordered List Item 3**: The final conclusion.

---

## Custom Components

### 1. Image Component
Used for displaying high-quality images with an optional caption. It supports optimization and responsive sizing.

<Image 
  src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop" 
  alt="Camel trekking in the desert"
  caption="Traditional camel trek through the Kyzylkum Desert at sunset"
/>

### 2. Quote Component
Highlights key takeaways or memorable quotes from the article.

<Quote author="Travel Philosopher">
  A well-designed article is one where the reader feels the main point before they get there.
</Quote>

### 3. Info Block Component
A prominent block for important information, warnings, or tips that need to stand out from the regular text.

<InfoBlock title="Important">
  If your H1 is 56 px, be sure to reduce it to 32–36 px on mobile devices, otherwise the first screen will turn into a "poster" rather than a reader's entry point into the material.
</InfoBlock>

### 4. Slider Component
A slideshow component for displaying a collection of related images with a fade transition. Useful for storytelling through multiple visuals in a single space.

<Slider 
  caption="Visual journey through the Silk Road: Architecture and Landscapes."
  images={[
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop"
]} />

### 5. Grid Gallery Component
Displays multiple images in a responsive grid layout. Perfect for photo essays or showcasing a collection of shots.

<Gallery images={[
  "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop"
]} />

### 6. Embedded Tours Component
Allows promoting specific tours directly within the article content.

<Tours 
  title="Experience the Desert Firsthand"
  items={[
    {
      title: "Kyzylkum Desert Safari Exploration",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
      duration: "3 Days",
      price: "$450",
      link: "/prototype/tours/kyzylkum-safari"
    },
    {
      title: "Nomadic Life & Yurt Camp Stay",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
      duration: "2 Days",
      price: "$280",
      link: "/prototype/tours/yurt-camp"
    },
    {
      title: "Silk Road Caravan Route",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      duration: "7 Days",
      price: "$1200",
      link: "/prototype/tours/silk-road-caravan"
    }
  ]}
/>
    `,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[0],
    author: mockAuthors[0],
    publishedAt: '2024-01-15',
    readTime: '8 min',
  },
  {
    id: 2,
    slug: 'travel-like-a-local-3-day-digital-tour-in-experience-bukhara',
    title: 'Travel Like a Local: 3-day Digital Tour in Experience Bukhara',
    excerpt:
      "Step into the shoes of a local as we guide you through Bukhara's hidden gems, ancient bazaars, and traditional tea houses.",
    content: 'Content for this article...',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[1], // Culture
    author: mockAuthors[1],
    publishedAt: '2024-01-12',
    readTime: '6 min',
  },
  {
    id: 3,
    slug: 'photography-guide-to-uzbekistan-scenic-spots-and-hidden-gems',
    title: 'Photography Guide to Uzbekistan: Scenic Spots and Hidden Gems',
    excerpt:
      'Capture the essence of Central Asia with our comprehensive guide to the most photogenic locations in Uzbekistan.',
    content: 'Content for this article...',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[0], // Travel
    author: mockAuthors[2],
    publishedAt: '2024-01-10',
    readTime: '10 min',
  },
  {
    id: 4,
    slug: 'adventure-awaits-trekking-the-mountains-of-uzbekistan',
    title: 'Adventure Awaits: Trekking the Mountains of Uzbekistan',
    excerpt:
      'Explore the breathtaking Chimgan Mountains and discover trails that will challenge and inspire you.',
    content: 'Content for this article...',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[4], // Adventure
    author: mockAuthors[0],
    publishedAt: '2024-01-08',
    readTime: '7 min',
  },
  {
    id: 5,
    slug: 'the-silk-road-revealed-a-travelers-diary',
    title: "The Silk Road Revealed: A Traveler's Diary",
    excerpt:
      'Join us on a journey through the ancient trade routes that connected East and West for centuries.',
    content: 'Content for this article...',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[3], // History
    author: mockAuthors[1],
    publishedAt: '2024-01-05',
    readTime: '12 min',
  },
  {
    id: 6,
    slug: 'samarkand-the-jewel-of-central-asia',
    title: 'Samarkand: The Jewel of Central Asia',
    excerpt:
      'Discover why Samarkand has captivated travelers for over two millennia with its stunning architecture and rich history.',
    content: 'Content for this article...',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[1], // Culture
    author: mockAuthors[2],
    publishedAt: '2024-01-03',
    readTime: '9 min',
  },
  {
    id: 7,
    slug: 'traditional-uzbek-cuisine-a-culinary-journey',
    title: 'Traditional Uzbek Cuisine: A Culinary Journey',
    excerpt: 'From plov to samsa, explore the rich flavors and traditions of Uzbek cooking.',
    content: '<p>Content for this article...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[2], // Food
    author: mockAuthors[0],
    publishedAt: '2024-01-01',
    readTime: '5 min',
  },
  {
    id: 8,
    slug: 'khiva-walking-through-a-living-museum',
    title: 'Khiva: Walking Through a Living Museum',
    excerpt:
      "Step back in time as you wander through the perfectly preserved streets of Khiva's old town.",
    content: '<p>Content for this article...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[3], // History
    author: mockAuthors[1],
    publishedAt: '2023-12-28',
    readTime: '8 min',
  },
  {
    id: 9,
    slug: 'sustainable-travel-in-uzbekistan',
    title: 'Sustainable Travel in Uzbekistan: Tips and Insights',
    excerpt:
      'Learn how to minimize your environmental impact while maximizing your travel experience.',
    content: '<p>Content for this article...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[0], // Travel
    author: mockAuthors[2],
    publishedAt: '2023-12-25',
    readTime: '6 min',
  },
  {
    id: 10,
    slug: 'uzbekistan-nightlife-tashkent-after-dark',
    title: 'Uzbekistan Nightlife: Tashkent After Dark',
    excerpt:
      'Explore the modern side of the capital with its vibrant bars, cultural performances, and night markets.',
    content: '<p>Content for this article...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: mockCategories[0], // Travel
    author: mockAuthors[0],
    publishedAt: '2023-12-20',
    readTime: '7 min',
  },
  {
    id: 11,
    slug: 'trekking-nuratau-mountains-ecotourism',
    title: 'Trekking Nuratau Mountains: A Hub for Ecotourism',
    excerpt:
      'Stay with local families and hike through the pristine landscapes of the Nuratau-Kyzylkum Biosphere Reserve.',
    content: '<p>Content for this article...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[4], // Adventure
    author: mockAuthors[1],
    publishedAt: '2023-12-15',
    readTime: '9 min',
  },
  {
    id: 12,
    slug: 'the-flavor-of-samarkand-nan-bread',
    title: 'The Flavor of Samarkand: Famous Nan Bread',
    excerpt:
      'Learn why Samarkand bread is legendary and how it is baked in traditional clay ovens.',
    content: '<p>Content for this article...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[2], // Food
    author: mockAuthors[2],
    publishedAt: '2023-12-10',
    readTime: '5 min',
  },

  {
    id: 13,
    slug: 'architectural-marvels-13',
    title: 'Architectural Marvels',
    excerpt:
      'Auto-generated excerpt for article 13. This covers Architectural Marvels and more features of The Goods.',
    content: '<p>Full content for article 13...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-14',
    readTime: '6 min',
  },
  {
    id: 14,
    slug: 'sacred-spaces-14',
    title: 'Sacred Spaces',
    excerpt:
      'Auto-generated excerpt for article 14. This covers Sacred Spaces and more features of Good Stories.',
    content: '<p>Full content for article 14...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-15',
    readTime: '7 min',
  },
  {
    id: 15,
    slug: 'rhythms-of-the-road-15',
    title: 'Rhythms of the Road',
    excerpt:
      'Auto-generated excerpt for article 15. This covers Rhythms of the Road and more features of Good Trips.',
    content: '<p>Full content for article 15...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-16',
    readTime: '8 min',
  },
  {
    id: 16,
    slug: 'colors-of-uzbekistan-16',
    title: 'Colors of Uzbekistan',
    excerpt:
      'Auto-generated excerpt for article 16. This covers Colors of Uzbekistan and more features of Good Life.',
    content: '<p>Full content for article 16...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-17',
    readTime: '9 min',
  },
  {
    id: 17,
    slug: 'winter-in-the-pamirs-17',
    title: 'Winter in the Pamirs',
    excerpt:
      'Auto-generated excerpt for article 17. This covers Winter in the Pamirs and more features of Good Ideas.',
    content: '<p>Full content for article 17...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-06-18',
    readTime: '10 min',
  },
  {
    id: 18,
    slug: 'spring-festivals-18',
    title: 'Spring Festivals',
    excerpt:
      'Auto-generated excerpt for article 18. This covers Spring Festivals and more features of Good News.',
    content: '<p>Full content for article 18...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-07-19',
    readTime: '11 min',
  },
  {
    id: 19,
    slug: 'harvest-season-19',
    title: 'Harvest Season',
    excerpt:
      'Auto-generated excerpt for article 19. This covers Harvest Season and more features of The Goods.',
    content: '<p>Full content for article 19...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-08-20',
    readTime: '12 min',
  },
  {
    id: 20,
    slug: 'nomadic-yurt-experience-20',
    title: 'Nomadic Yurt Experience',
    excerpt:
      'Auto-generated excerpt for article 20. This covers Nomadic Yurt Experience and more features of Good Stories.',
    content: '<p>Full content for article 20...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-09-21',
    readTime: '3 min',
  },
  {
    id: 21,
    slug: 'the-great-steppe-21',
    title: 'The Great Steppe',
    excerpt:
      'Auto-generated excerpt for article 21. This covers The Great Steppe and more features of Good Trips.',
    content: '<p>Full content for article 21...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-10-22',
    readTime: '4 min',
  },
  {
    id: 22,
    slug: 'blue-domes-of-samarkand-22',
    title: 'Blue Domes of Samarkand',
    excerpt:
      'Auto-generated excerpt for article 22. This covers Blue Domes of Samarkand and more features of Good Life.',
    content: '<p>Full content for article 22...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-11-23',
    readTime: '5 min',
  },
  {
    id: 23,
    slug: 'golden-history-of-bukhara-23',
    title: 'Golden History of Bukhara',
    excerpt:
      'Auto-generated excerpt for article 23. This covers Golden History of Bukhara and more features of Good Ideas.',
    content: '<p>Full content for article 23...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-12-24',
    readTime: '6 min',
  },
  {
    id: 24,
    slug: 'defending-the-walls-of-khiva-24',
    title: 'Defending the Walls of Khiva',
    excerpt:
      'Auto-generated excerpt for article 24. This covers Defending the Walls of Khiva and more features of Good News.',
    content: '<p>Full content for article 24...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-01-25',
    readTime: '7 min',
  },
  {
    id: 25,
    slug: 'fergana-valley-fruits-25',
    title: 'Fergana Valley Fruits',
    excerpt:
      'Auto-generated excerpt for article 25. This covers Fergana Valley Fruits and more features of The Goods.',
    content: '<p>Full content for article 25...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-26',
    readTime: '8 min',
  },
  {
    id: 26,
    slug: 'aral-sea-memories-26',
    title: 'Aral Sea Memories',
    excerpt:
      'Auto-generated excerpt for article 26. This covers Aral Sea Memories and more features of Good Stories.',
    content: '<p>Full content for article 26...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-27',
    readTime: '9 min',
  },
  {
    id: 27,
    slug: 'tashkent-metro-tour-27',
    title: 'Tashkent Metro Tour',
    excerpt:
      'Auto-generated excerpt for article 27. This covers Tashkent Metro Tour and more features of Good Trips.',
    content: '<p>Full content for article 27...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-28',
    readTime: '10 min',
  },
  {
    id: 28,
    slug: 'sufi-pilgrimage-28',
    title: 'Sufi Pilgrimage',
    excerpt:
      'Auto-generated excerpt for article 28. This covers Sufi Pilgrimage and more features of Good Life.',
    content: '<p>Full content for article 28...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-01',
    readTime: '11 min',
  },
  {
    id: 29,
    slug: 'handmade-carpets-29',
    title: 'Handmade Carpets',
    excerpt:
      'Auto-generated excerpt for article 29. This covers Handmade Carpets and more features of Good Ideas.',
    content: '<p>Full content for article 29...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-06-02',
    readTime: '12 min',
  },
  {
    id: 30,
    slug: 'spices-of-the-east-30',
    title: 'Spices of the East',
    excerpt:
      'Auto-generated excerpt for article 30. This covers Spices of the East and more features of Good News.',
    content: '<p>Full content for article 30...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-07-03',
    readTime: '3 min',
  },
  {
    id: 31,
    slug: 'melons-and-myths-31',
    title: 'Melons and Myths',
    excerpt:
      'Auto-generated excerpt for article 31. This covers Melons and Myths and more features of The Goods.',
    content: '<p>Full content for article 31...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-08-04',
    readTime: '4 min',
  },
  {
    id: 32,
    slug: 'the-art-of-suzani-32',
    title: 'The Art of Suzani',
    excerpt:
      'Auto-generated excerpt for article 32. This covers The Art of Suzani and more features of Good Stories.',
    content: '<p>Full content for article 32...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-09-05',
    readTime: '5 min',
  },
  {
    id: 33,
    slug: 'choyhona-conversations-33',
    title: 'Choyhona Conversations',
    excerpt:
      'Auto-generated excerpt for article 33. This covers Choyhona Conversations and more features of Good Trips.',
    content: '<p>Full content for article 33...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-10-06',
    readTime: '6 min',
  },
  {
    id: 34,
    slug: 'underground-mosques-34',
    title: 'Underground Mosques',
    excerpt:
      'Auto-generated excerpt for article 34. This covers Underground Mosques and more features of Good Life.',
    content: '<p>Full content for article 34...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-11-07',
    readTime: '7 min',
  },
  {
    id: 35,
    slug: 'petroglyphs-of-sarmishsay-35',
    title: 'Petroglyphs of Sarmishsay',
    excerpt:
      'Auto-generated excerpt for article 35. This covers Petroglyphs of Sarmishsay and more features of Good Ideas.',
    content: '<p>Full content for article 35...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-12-08',
    readTime: '8 min',
  },
  {
    id: 36,
    slug: 'hiking-chimgan-36',
    title: 'Hiking Chimgan',
    excerpt:
      'Auto-generated excerpt for article 36. This covers Hiking Chimgan and more features of Good News.',
    content: '<p>Full content for article 36...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-01-09',
    readTime: '9 min',
  },
  {
    id: 37,
    slug: 'skiing-amirsoy-37',
    title: 'Skiing Amirsoy',
    excerpt:
      'Auto-generated excerpt for article 37. This covers Skiing Amirsoy and more features of The Goods.',
    content: '<p>Full content for article 37...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-10',
    readTime: '10 min',
  },
  {
    id: 38,
    slug: 'charvak-lake-retreat-38',
    title: 'Charvak Lake Retreat',
    excerpt:
      'Auto-generated excerpt for article 38. This covers Charvak Lake Retreat and more features of Good Stories.',
    content: '<p>Full content for article 38...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-11',
    readTime: '11 min',
  },
  {
    id: 39,
    slug: 'navois-poetry-39',
    title: 'Navoi`s Poetry',
    excerpt:
      'Auto-generated excerpt for article 39. This covers Navoi`s Poetry and more features of Good Trips.',
    content: '<p>Full content for article 39...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-12',
    readTime: '12 min',
  },
  {
    id: 40,
    slug: 'amir-timurs-legacy-40',
    title: 'Amir Timur`s Legacy',
    excerpt:
      'Auto-generated excerpt for article 40. This covers Amir Timur`s Legacy and more features of Good Life.',
    content: '<p>Full content for article 40...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-13',
    readTime: '3 min',
  },
  {
    id: 41,
    slug: 'ulugbeks-astronomy-41',
    title: 'Ulugbek`s Astronomy',
    excerpt:
      'Auto-generated excerpt for article 41. This covers Ulugbek`s Astronomy and more features of Good Ideas.',
    content: '<p>Full content for article 41...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-06-14',
    readTime: '4 min',
  },
  {
    id: 42,
    slug: 'avicennas-wisdom-42',
    title: 'Avicenna`s Wisdom',
    excerpt:
      'Auto-generated excerpt for article 42. This covers Avicenna`s Wisdom and more features of Good News.',
    content: '<p>Full content for article 42...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-07-15',
    readTime: '5 min',
  },
  {
    id: 43,
    slug: 'the-dance-of-lazgi-43',
    title: 'The Dance of Lazgi',
    excerpt:
      'Auto-generated excerpt for article 43. This covers The Dance of Lazgi and more features of The Goods.',
    content: '<p>Full content for article 43...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-08-16',
    readTime: '6 min',
  },
  {
    id: 44,
    slug: 'doira-rhythms-44',
    title: 'Doira Rhythms',
    excerpt:
      'Auto-generated excerpt for article 44. This covers Doira Rhythms and more features of Good Stories.',
    content: '<p>Full content for article 44...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-09-17',
    readTime: '7 min',
  },
  {
    id: 45,
    slug: 'puppet-theatre-traditions-45',
    title: 'Puppet Theatre Traditions',
    excerpt:
      'Auto-generated excerpt for article 45. This covers Puppet Theatre Traditions and more features of Good Trips.',
    content: '<p>Full content for article 45...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-10-18',
    readTime: '8 min',
  },
  {
    id: 46,
    slug: 'miniature-painting-46',
    title: 'Miniature Painting',
    excerpt:
      'Auto-generated excerpt for article 46. This covers Miniature Painting and more features of Good Life.',
    content: '<p>Full content for article 46...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-11-19',
    readTime: '9 min',
  },
  {
    id: 47,
    slug: 'wood-carving-masters-47',
    title: 'Wood Carving Masters',
    excerpt:
      'Auto-generated excerpt for article 47. This covers Wood Carving Masters and more features of Good Ideas.',
    content: '<p>Full content for article 47...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-12-20',
    readTime: '10 min',
  },
  {
    id: 48,
    slug: 'gold-embroidery-48',
    title: 'Gold Embroidery',
    excerpt:
      'Auto-generated excerpt for article 48. This covers Gold Embroidery and more features of Good News.',
    content: '<p>Full content for article 48...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-01-21',
    readTime: '11 min',
  },
  {
    id: 49,
    slug: 'ikat-weaving-49',
    title: 'Ikat Weaving',
    excerpt:
      'Auto-generated excerpt for article 49. This covers Ikat Weaving and more features of The Goods.',
    content: '<p>Full content for article 49...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-22',
    readTime: '12 min',
  },
  {
    id: 50,
    slug: 'paper-making-in-samarkand-50',
    title: 'Paper Making in Samarkand',
    excerpt:
      'Auto-generated excerpt for article 50. This covers Paper Making in Samarkand and more features of Good Stories.',
    content: '<p>Full content for article 50...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-23',
    readTime: '3 min',
  },
  {
    id: 51,
    slug: 'wine-tasting-in-uzbekistan-51',
    title: 'Wine Tasting in Uzbekistan',
    excerpt:
      'Auto-generated excerpt for article 51. This covers Wine Tasting in Uzbekistan and more features of Good Trips.',
    content: '<p>Full content for article 51...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-24',
    readTime: '4 min',
  },
  {
    id: 52,
    slug: 'plov-varieties-52',
    title: 'Plov Varieties',
    excerpt:
      'Auto-generated excerpt for article 52. This covers Plov Varieties and more features of Good Life.',
    content: '<p>Full content for article 52...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-25',
    readTime: '5 min',
  },
  {
    id: 53,
    slug: 'somsa-snacking-53',
    title: 'Somsa Snacking',
    excerpt:
      'Auto-generated excerpt for article 53. This covers Somsa Snacking and more features of Good Ideas.',
    content: '<p>Full content for article 53...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-06-26',
    readTime: '6 min',
  },
  {
    id: 54,
    slug: 'laghman-lovers-54',
    title: 'Laghman Lovers',
    excerpt:
      'Auto-generated excerpt for article 54. This covers Laghman Lovers and more features of Good News.',
    content: '<p>Full content for article 54...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-07-27',
    readTime: '7 min',
  },
  {
    id: 55,
    slug: 'shashlik-secrets-55',
    title: 'Shashlik Secrets',
    excerpt:
      'Auto-generated excerpt for article 55. This covers Shashlik Secrets and more features of The Goods.',
    content: '<p>Full content for article 55...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-08-28',
    readTime: '8 min',
  },
  {
    id: 56,
    slug: 'dried-fruits-delights-56',
    title: 'Dried Fruits Delights',
    excerpt:
      'Auto-generated excerpt for article 56. This covers Dried Fruits Delights and more features of Good Stories.',
    content: '<p>Full content for article 56...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-09-01',
    readTime: '9 min',
  },
  {
    id: 57,
    slug: 'navruz-celebrations-57',
    title: 'Navruz Celebrations',
    excerpt:
      'Auto-generated excerpt for article 57. This covers Navruz Celebrations and more features of Good Trips.',
    content: '<p>Full content for article 57...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-10-02',
    readTime: '10 min',
  },
  {
    id: 58,
    slug: 'independence-day-sparkles-58',
    title: 'Independence Day Sparkles',
    excerpt:
      'Auto-generated excerpt for article 58. This covers Independence Day Sparkles and more features of Good Life.',
    content: '<p>Full content for article 58...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-11-03',
    readTime: '11 min',
  },
  {
    id: 59,
    slug: 'eid-festivities-59',
    title: 'Eid Festivities',
    excerpt:
      'Auto-generated excerpt for article 59. This covers Eid Festivities and more features of Good Ideas.',
    content: '<p>Full content for article 59...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-12-04',
    readTime: '12 min',
  },
  {
    id: 60,
    slug: 'kupkari-games-60',
    title: 'Kupkari Games',
    excerpt:
      'Auto-generated excerpt for article 60. This covers Kupkari Games and more features of Good News.',
    content: '<p>Full content for article 60...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-01-05',
    readTime: '3 min',
  },
  {
    id: 61,
    slug: 'kurash-wrestling-61',
    title: 'Kurash Wrestling',
    excerpt:
      'Auto-generated excerpt for article 61. This covers Kurash Wrestling and more features of The Goods.',
    content: '<p>Full content for article 61...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-06',
    readTime: '4 min',
  },
  {
    id: 62,
    slug: 'falconry-traditions-62',
    title: 'Falconry Traditions',
    excerpt:
      'Auto-generated excerpt for article 62. This covers Falconry Traditions and more features of Good Stories.',
    content: '<p>Full content for article 62...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-07',
    readTime: '5 min',
  },
  {
    id: 63,
    slug: 'camel-milk-benefits-63',
    title: 'Camel Milk Benefits',
    excerpt:
      'Auto-generated excerpt for article 63. This covers Camel Milk Benefits and more features of Good Trips.',
    content: '<p>Full content for article 63...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-08',
    readTime: '6 min',
  },
  {
    id: 64,
    slug: 'yurt-construction-64',
    title: 'Yurt Construction',
    excerpt:
      'Auto-generated excerpt for article 64. This covers Yurt Construction and more features of Good Life.',
    content: '<p>Full content for article 64...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-09',
    readTime: '7 min',
  },
  {
    id: 65,
    slug: 'felt-art-65',
    title: 'Felt Art',
    excerpt:
      'Auto-generated excerpt for article 65. This covers Felt Art and more features of Good Ideas.',
    content: '<p>Full content for article 65...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-06-10',
    readTime: '8 min',
  },
  {
    id: 66,
    slug: 'musical-instruments-66',
    title: 'Musical Instruments',
    excerpt:
      'Auto-generated excerpt for article 66. This covers Musical Instruments and more features of Good News.',
    content: '<p>Full content for article 66...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-07-11',
    readTime: '9 min',
  },
  {
    id: 67,
    slug: 'history-of-mathematics-67',
    title: 'History of Mathematics',
    excerpt:
      'Auto-generated excerpt for article 67. This covers History of Mathematics and more features of The Goods.',
    content: '<p>Full content for article 67...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-08-12',
    readTime: '10 min',
  },
  {
    id: 68,
    slug: 'silk-production-68',
    title: 'Silk Production',
    excerpt:
      'Auto-generated excerpt for article 68. This covers Silk Production and more features of Good Stories.',
    content: '<p>Full content for article 68...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-09-13',
    readTime: '11 min',
  },
  {
    id: 69,
    slug: 'cotton-fields-69',
    title: 'Cotton Fields',
    excerpt:
      'Auto-generated excerpt for article 69. This covers Cotton Fields and more features of Good Trips.',
    content: '<p>Full content for article 69...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-10-14',
    readTime: '12 min',
  },
  {
    id: 70,
    slug: 'water-conservation-70',
    title: 'Water Conservation',
    excerpt:
      'Auto-generated excerpt for article 70. This covers Water Conservation and more features of Good Life.',
    content: '<p>Full content for article 70...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-11-15',
    readTime: '3 min',
  },
  {
    id: 71,
    slug: 'endangered-species-71',
    title: 'Endangered Species',
    excerpt:
      'Auto-generated excerpt for article 71. This covers Endangered Species and more features of Good Ideas.',
    content: '<p>Full content for article 71...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-12-16',
    readTime: '4 min',
  },
  {
    id: 72,
    slug: 'bird-watching-72',
    title: 'Bird Watching',
    excerpt:
      'Auto-generated excerpt for article 72. This covers Bird Watching and more features of Good News.',
    content: '<p>Full content for article 72...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-01-17',
    readTime: '5 min',
  },
  {
    id: 73,
    slug: 'flower-blooming-73',
    title: 'Flower Blooming',
    excerpt:
      'Auto-generated excerpt for article 73. This covers Flower Blooming and more features of The Goods.',
    content: '<p>Full content for article 73...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-18',
    readTime: '6 min',
  },
  {
    id: 74,
    slug: 'caves-and-canyons-74',
    title: 'Caves and Canyons',
    excerpt:
      'Auto-generated excerpt for article 74. This covers Caves and Canyons and more features of Good Stories.',
    content: '<p>Full content for article 74...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-19',
    readTime: '7 min',
  },
  {
    id: 75,
    slug: 'petroglyph-hunting-75',
    title: 'Petroglyph Hunting',
    excerpt:
      'Auto-generated excerpt for article 75. This covers Petroglyph Hunting and more features of Good Trips.',
    content: '<p>Full content for article 75...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-20',
    readTime: '8 min',
  },
  {
    id: 76,
    slug: 'stargazing-camps-76',
    title: 'Stargazing Camps',
    excerpt:
      'Auto-generated excerpt for article 76. This covers Stargazing Camps and more features of Good Life.',
    content: '<p>Full content for article 76...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-21',
    readTime: '9 min',
  },
  {
    id: 77,
    slug: 'off-road-adventures-77',
    title: 'Off-road Adventures',
    excerpt:
      'Auto-generated excerpt for article 77. This covers Off-road Adventures and more features of Good Ideas.',
    content: '<p>Full content for article 77...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-06-22',
    readTime: '10 min',
  },
  {
    id: 78,
    slug: 'train-journeys-78',
    title: 'Train Journeys',
    excerpt:
      'Auto-generated excerpt for article 78. This covers Train Journeys and more features of Good News.',
    content: '<p>Full content for article 78...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-07-23',
    readTime: '11 min',
  },
  {
    id: 79,
    slug: 'flying-over-tashkent-79',
    title: 'Flying over Tashkent',
    excerpt:
      'Auto-generated excerpt for article 79. This covers Flying over Tashkent and more features of The Goods.',
    content: '<p>Full content for article 79...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-08-24',
    readTime: '12 min',
  },
  {
    id: 80,
    slug: 'hospitality-101-80',
    title: 'Hospitality 101',
    excerpt:
      'Auto-generated excerpt for article 80. This covers Hospitality 101 and more features of Good Stories.',
    content: '<p>Full content for article 80...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-09-25',
    readTime: '3 min',
  },
  {
    id: 81,
    slug: 'learning-uzbek-phrases-81',
    title: 'Learning Uzbek Phrases',
    excerpt:
      'Auto-generated excerpt for article 81. This covers Learning Uzbek Phrases and more features of Good Trips.',
    content: '<p>Full content for article 81...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-10-26',
    readTime: '4 min',
  },
  {
    id: 82,
    slug: 'bargaining-tips-82',
    title: 'Bargaining Tips',
    excerpt:
      'Auto-generated excerpt for article 82. This covers Bargaining Tips and more features of Good Life.',
    content: '<p>Full content for article 82...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-11-27',
    readTime: '5 min',
  },
  {
    id: 83,
    slug: 'packing-lists-83',
    title: 'Packing Lists',
    excerpt:
      'Auto-generated excerpt for article 83. This covers Packing Lists and more features of Good Ideas.',
    content: '<p>Full content for article 83...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-12-28',
    readTime: '6 min',
  },
  {
    id: 84,
    slug: 'safety-guide-84',
    title: 'Safety Guide',
    excerpt:
      'Auto-generated excerpt for article 84. This covers Safety Guide and more features of Good News.',
    content: '<p>Full content for article 84...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-01-01',
    readTime: '7 min',
  },
  {
    id: 85,
    slug: 'best-time-to-visit-85',
    title: 'Best Time to Visit',
    excerpt:
      'Auto-generated excerpt for article 85. This covers Best Time to Visit and more features of The Goods.',
    content: '<p>Full content for article 85...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-02',
    readTime: '8 min',
  },
  {
    id: 86,
    slug: 'visa-information-86',
    title: 'Visa Information',
    excerpt:
      'Auto-generated excerpt for article 86. This covers Visa Information and more features of Good Stories.',
    content: '<p>Full content for article 86...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-03',
    readTime: '9 min',
  },
  {
    id: 87,
    slug: 'transportation-guide-87',
    title: 'Transportation Guide',
    excerpt:
      'Auto-generated excerpt for article 87. This covers Transportation Guide and more features of Good Trips.',
    content: '<p>Full content for article 87...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-04',
    readTime: '10 min',
  },
  {
    id: 88,
    slug: 'accommodation-reviews-88',
    title: 'Accommodation Reviews',
    excerpt:
      'Auto-generated excerpt for article 88. This covers Accommodation Reviews and more features of Good Life.',
    content: '<p>Full content for article 88...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-05',
    readTime: '11 min',
  },
  {
    id: 89,
    slug: 'budget-travel-tips-89',
    title: 'Budget Travel Tips',
    excerpt:
      'Auto-generated excerpt for article 89. This covers Budget Travel Tips and more features of Good Ideas.',
    content: '<p>Full content for article 89...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-06-06',
    readTime: '12 min',
  },
  {
    id: 90,
    slug: 'luxury-escapes-90',
    title: 'Luxury Escapes',
    excerpt:
      'Auto-generated excerpt for article 90. This covers Luxury Escapes and more features of Good News.',
    content: '<p>Full content for article 90...</p>',
    image:
      'https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?q=80&w=1632&auto=format&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-07-07',
    readTime: '3 min',
  },
  {
    id: 91,
    slug: 'family-friendly-spots-91',
    title: 'Family Friendly Spots',
    excerpt:
      'Auto-generated excerpt for article 91. This covers Family Friendly Spots and more features of The Goods.',
    content: '<p>Full content for article 91...</p>',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-08-08',
    readTime: '4 min',
  },
  {
    id: 92,
    slug: 'romance-on-the-road-92',
    title: 'Romance on the Road',
    excerpt:
      'Auto-generated excerpt for article 92. This covers Romance on the Road and more features of Good Stories.',
    content: '<p>Full content for article 92...</p>',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-09-09',
    readTime: '5 min',
  },
  {
    id: 93,
    slug: 'solo-female-travel-93',
    title: 'Solo Female Travel',
    excerpt:
      'Auto-generated excerpt for article 93. This covers Solo Female Travel and more features of Good Trips.',
    content: '<p>Full content for article 93...</p>',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-10-10',
    readTime: '6 min',
  },
  {
    id: 94,
    slug: 'digital-nomad-spots-94',
    title: 'Digital Nomad Spots',
    excerpt:
      'Auto-generated excerpt for article 94. This covers Digital Nomad Spots and more features of Good Life.',
    content: '<p>Full content for article 94...</p>',
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-11-11',
    readTime: '7 min',
  },
  {
    id: 95,
    slug: 'exploring-the-hidden-valleys-95',
    title: 'Exploring the Hidden Valleys',
    excerpt:
      'Auto-generated excerpt for article 95. This covers Exploring the Hidden Valleys and more features of Good Ideas.',
    content: '<p>Full content for article 95...</p>',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
    category: mockCategories[4], // Good Ideas
    author: mockAuthors[1],
    publishedAt: '2023-12-12',
    readTime: '8 min',
  },
  {
    id: 96,
    slug: 'the-taste-of-tradition-part-2-96',
    title: 'The Taste of Tradition Part 2',
    excerpt:
      'Auto-generated excerpt for article 96. This covers The Taste of Tradition Part 2 and more features of Good News.',
    content: '<p>Full content for article 96...</p>',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    category: mockCategories[5], // Good News
    author: mockAuthors[2],
    publishedAt: '2023-01-13',
    readTime: '9 min',
  },
  {
    id: 97,
    slug: 'sunset-over-the-dunes-part-2-97',
    title: 'Sunset over the Dunes Part 2',
    excerpt:
      'Auto-generated excerpt for article 97. This covers Sunset over the Dunes Part 2 and more features of The Goods.',
    content: '<p>Full content for article 97...</p>',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
    category: mockCategories[0], // The Goods
    author: mockAuthors[0],
    publishedAt: '2023-02-14',
    readTime: '10 min',
  },
  {
    id: 98,
    slug: 'a-journey-through-time-part-2-98',
    title: 'A Journey Through Time Part 2',
    excerpt:
      'Auto-generated excerpt for article 98. This covers A Journey Through Time Part 2 and more features of Good Stories.',
    content: '<p>Full content for article 98...</p>',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop',
    category: mockCategories[1], // Good Stories
    author: mockAuthors[1],
    publishedAt: '2023-03-15',
    readTime: '11 min',
  },
  {
    id: 99,
    slug: 'modern-nomads-part-2-99',
    title: 'Modern Nomads Part 2',
    excerpt:
      'Auto-generated excerpt for article 99. This covers Modern Nomads Part 2 and more features of Good Trips.',
    content: '<p>Full content for article 99...</p>',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    category: mockCategories[2], // Good Trips
    author: mockAuthors[2],
    publishedAt: '2023-04-16',
    readTime: '12 min',
  },
  {
    id: 100,
    slug: 'city-lights-and-ancient-walls-part-2-100',
    title: 'City Lights and Ancient Walls Part 2',
    excerpt:
      'Auto-generated excerpt for article 100. This covers City Lights and Ancient Walls Part 2 and more features of Good Life.',
    content: '<p>Full content for article 100...</p>',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    category: mockCategories[3], // Good Life
    author: mockAuthors[0],
    publishedAt: '2023-05-17',
    readTime: '3 min',
  },
];

// Получить статьи по категории
export const getArticlesByCategory = (slug: string, locale: string = 'en'): Article[] => {
  const categories = locale === 'de' ? mockCategoriesDe : mockCategories;
  const articles = locale === 'de' ? mockArticlesDe : mockArticles;

  const category = categories.find((cat) => cat.slug === slug);
  if (!category) return [];

  return articles.filter((article) => article.category.id === category.id);
};

// Навигационные ссылки
export const navLinks = [
  { label: 'Find Trips', href: '/trips', hasDropdown: true },
  { label: 'Articles', href: '/prototype/adventures', hasDropdown: true },
  { label: 'Tour Themes', href: '/themes', hasDropdown: true },
  { label: 'About', href: '/about', hasDropdown: true },
  { label: 'Write for us', href: '/prototype/adventures/write-for-us', hasDropdown: false },
];

export const navLinksDe = [
  { label: 'Reisen finden', href: '/trips', hasDropdown: true },
  { label: 'Artikel', href: '/prototype/adventures', hasDropdown: true },
  { label: 'Themenreisen', href: '/themes', hasDropdown: true },
  { label: 'Über uns', href: '/about', hasDropdown: true },
  {
    label: 'Schreiben Sie für uns',
    href: '/prototype/adventures/write-for-us',
    hasDropdown: false,
  },
];

export const getNavLinks = (locale: string = 'en') => {
  return locale === 'de' ? navLinksDe : navLinks;
};

// Footer ссылки
export const footerLinks = {
  company: [
    { label: 'About Minzifa', href: '/about' },
    { label: 'Find Trips', href: '/trips' },
    { label: 'Write for us', href: '/prototype/adventures/write-for-us' },
  ],
  blog: [
    { label: 'Articles', href: '/prototype/adventures' },
    { label: 'Stories', href: '/prototype/adventures/stories' },
    { label: 'Travel', href: '/prototype/adventures/category/travel' },
    { label: 'Tour Themes', href: '/themes' },
  ],
};

export const footerLinksDe = {
  company: [
    { label: 'Über Minzifa', href: '/about' },
    { label: 'Reisen finden', href: '/trips' },
    { label: 'Schreiben Sie für uns', href: '/prototype/adventures/write-for-us' },
  ],
  blog: [
    { label: 'Artikel', href: '/prototype/adventures' },
    { label: 'Geschichten', href: '/prototype/adventures/stories' },
    { label: 'Reisen', href: '/prototype/adventures/category/travel' },
    { label: 'Themenreisen', href: '/themes' },
  ],
};

export const getFooterLinks = (locale: string = 'en') => {
  return locale === 'de' ? footerLinksDe : footerLinks;
};

// Соц. сети
export const socialLinks = [
  { name: 'X', href: 'https://x.com', icon: 'X' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'LinkedIn' },
  { name: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
];

// --- German Data ---

export const mockCategoriesDe: Category[] = [
  { id: 1, name: 'Die Waren', slug: 'the-goods' },
  { id: 2, name: 'Gute Geschichten', slug: 'good-stories' },
  { id: 3, name: 'Gute Reisen', slug: 'good-trips' },
  { id: 4, name: 'Gutes Leben', slug: 'good-life' },
  { id: 5, name: 'Gute Ideen', slug: 'good-ideas' },
  { id: 6, name: 'Gute Nachrichten', slug: 'good-news' },
  { id: 7, name: 'Funktionen', slug: 'features' },
  { id: 8, name: 'Anleitungen', slug: 'guides' },
  { id: 9, name: 'Nachrichten', slug: 'news' },
  { id: 10, name: 'Geschichten', slug: 'stories' },
  { id: 11, name: 'Essen', slug: 'food' },
  { id: 12, name: 'Verantwortungsbewusstes Reisen', slug: 'responsible-travel' },
];

export const mockArticlesDe: Article[] = mockArticles.map((article) => {
  // Find corresponding category in DE
  const categoryDe = mockCategoriesDe.find((c) => c.id === article.category.id) || article.category;

  return {
    ...article,
    title: `[DE] ${article.title}`,
    excerpt: `[DE] ${article.excerpt}`,
    category: categoryDe,
    // Content is HTML/Markdown, we'll prefix it if it's string
    content:
      typeof article.content === 'string' ? `[DE Content] ${article.content}` : article.content,
    readTime: article.readTime.replace('min', 'Min'),
  };
});

// Update getters to use locale
export const getArticleBySlug = (slug: string, locale: string = 'en'): Article | undefined => {
  const articles = locale === 'de' ? mockArticlesDe : mockArticles;
  return articles.find((article) => article.slug === slug);
};

export const getRelatedArticles = (
  currentSlug: string,
  limit: number = 3,
  locale: string = 'en',
): Article[] => {
  const articles = locale === 'de' ? mockArticlesDe : mockArticles;
  return articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
};

export const getAllArticles = (locale: string = 'en'): Article[] => {
  return locale === 'de' ? mockArticlesDe : mockArticles;
};

export const getCategories = (locale: string = 'en'): Category[] => {
  return locale === 'de' ? mockCategoriesDe : mockCategories;
};
