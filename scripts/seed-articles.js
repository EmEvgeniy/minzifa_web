#!/usr/bin/env node

/**
 * Скрипт для массового создания статей для категорий Adventures
 * 
 * Использование:
 * 1. Установите зависимости: npm install axios dotenv
 * 2. Создайте .env файл с переменной ADVENTURES_TOKEN (токен из админ-панели)
 * 3. Запустите: node scripts/seed-articles.js
 */

const axios = require('axios');

const API_URL = 'https://articles.minzifatravel.com/api/v1';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2ODgzMzMwOSwiZXhwIjoxNzY5NDM4MTA5fQ.TWesj5J_9ybBfx0yy5t3YWGMTOu99VoROds4jTiBipQ";

if (!TOKEN) {
    console.error('❌ Ошибка: ADVENTURES_TOKEN не найден в .env файле');
    console.log('\nДля получения токена:');
    console.log('1. Откройте http://localhost:3000/en/prototype/adventures/admin/login');
    console.log('2. Войдите в систему');
    console.log('3. Откройте DevTools → Application → Local Storage');
    console.log('4. Скопируйте значение ключа "adventures_auth_token"');
    console.log('5. Добавьте в .env: ADVENTURES_TOKEN=ваш_токен\n');
    process.exit(1);
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
    },
});

// Шаблоны статей для каждой категории
const articleTemplates = {
    'good-life': [
        {
            title: 'Discovering the Art of Slow Travel in Uzbekistan',
            excerpt: 'Learn how to embrace the slow travel philosophy while exploring the ancient cities of the Silk Road.',
            content: `# Discovering the Art of Slow Travel in Uzbekistan

In our fast-paced world, slow travel offers a refreshing alternative. Instead of rushing through destinations, slow travel encourages you to immerse yourself in local culture, build meaningful connections, and truly experience a place.

## Why Uzbekistan is Perfect for Slow Travel

Uzbekistan's rich history, stunning architecture, and warm hospitality make it an ideal destination for slow travelers. The ancient cities of Samarkand, Bukhara, and Khiva invite you to wander their streets at a leisurely pace.

## Tips for Slow Travel in Uzbekistan

1. **Stay Longer in Each City**: Spend at least 3-4 days in major cities
2. **Connect with Locals**: Visit local markets and tea houses
3. **Learn the Language**: A few words in Uzbek or Russian go a long way
4. **Take Your Time**: Don't rush through historical sites

## The Benefits

Slow travel allows you to discover hidden gems, understand local customs, and create lasting memories. You'll return home not just with photos, but with stories and friendships.`,
            tags: ['slow travel', 'culture', 'lifestyle', 'mindful travel'],
            readTime: '8',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop',
        },
        {
            title: 'Living Like a Local: Traditional Uzbek Lifestyle',
            excerpt: 'Experience the warmth of Uzbek hospitality and discover the daily rhythms of life in Central Asia.',
            content: `# Living Like a Local: Traditional Uzbek Lifestyle

The Uzbek way of life is deeply rooted in tradition, family values, and hospitality. Understanding these cultural nuances enriches your travel experience immensely.

## Daily Life in Uzbekistan

From morning tea rituals to evening family gatherings, Uzbek life follows time-honored traditions that have been passed down through generations.

## The Importance of Hospitality

In Uzbekistan, guests are considered a blessing. The concept of "mehmon" (guest) is sacred, and you'll often be invited into homes for tea and conversation.

## Traditional Practices

- **Tea Culture**: Tea is central to social life
- **Family Meals**: Shared meals strengthen bonds
- **Respect for Elders**: Age is deeply respected
- **Community Events**: Celebrations bring neighborhoods together`,
            tags: ['culture', 'traditions', 'local life', 'hospitality'],
            readTime: '6',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
        },
        {
            title: 'Wellness and Relaxation in Uzbekistan\'s Ancient Bathhouses',
            excerpt: 'Discover the therapeutic traditions of Uzbek hammams and their role in local wellness culture.',
            content: `# Wellness and Relaxation in Uzbekistan's Ancient Bathhouses

The traditional hammam experience in Uzbekistan is more than just bathing—it's a cultural ritual that has been perfected over centuries.

## The History of Uzbek Hammams

Bathhouses have been central to Central Asian life since ancient times, serving as social hubs and places of purification.

## What to Expect

- **Warm Welcome**: Traditional tea and sweets upon arrival
- **Steam Rooms**: Multiple temperature zones
- **Massage**: Vigorous scrubbing with kese (rough mitt)
- **Relaxation**: Post-bath tea in the cooling room

## Health Benefits

Regular hammam visits improve circulation, detoxify skin, and reduce stress.`,
            tags: ['wellness', 'hammam', 'culture', 'relaxation'],
            readTime: '7',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop',
        },
        {
            title: 'Sustainable Tourism: Supporting Local Communities',
            excerpt: 'Learn how to travel responsibly and make a positive impact on the communities you visit.',
            content: `# Sustainable Tourism: Supporting Local Communities

As tourism grows in Uzbekistan, it's important to travel in ways that benefit local communities.

## Choose Local Accommodations

Stay in family-run guesthouses and homestays instead of international chains.

## Support Local Artisans

Buy handicrafts directly from makers rather than souvenir shops.

## Eat Local

Choose family-owned restaurants and try traditional dishes.

## Respect Cultural Norms

- Dress modestly at religious sites
- Ask permission before photographing people
- Learn basic greetings
- Respect prayer times`,
            tags: ['sustainable travel', 'responsible tourism', 'community'],
            readTime: '9',
            image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&h=800&fit=crop',
        },
    ],
    'good-ideas': [
        {
            title: '10 Creative Ways to Experience Uzbekistan Off the Beaten Path',
            excerpt: 'Discover unique and innovative approaches to exploring Uzbekistan beyond the typical tourist trail.',
            content: `# 10 Creative Ways to Experience Uzbekistan Off the Beaten Path

While the main attractions are stunning, these creative ideas will help you discover a different side of Uzbekistan.

## 1. Take a Cooking Class

Learn to make plov, samsa, and other traditional dishes from local grandmothers.

## 2. Stay in a Yurt

Experience nomadic life in the Nuratau Mountains or Aydarkul Lake.

## 3. Attend a Local Wedding

If you're lucky enough to be invited, Uzbek weddings are spectacular cultural experiences.

## 4. Explore Soviet Architecture

Discover the fascinating Soviet-era buildings in Tashkent.

## 5. Visit Artisan Workshops

Watch master craftsmen create ceramics, silk, and metalwork.

## 6. Take the Train

Travel between cities by train to see the countryside and meet locals.

## 7. Join a Tea House Gathering

Spend an afternoon in a traditional chaikhana listening to stories.

## 8. Hike in the Mountains

Explore the Chimgan Mountains or Fergana Valley on foot.

## 9. Visit Local Markets

Experience the vibrant atmosphere of bazaars like Chorsu in Tashkent.

## 10. Learn Traditional Music

Take a lesson in playing the dutar or doira.`,
            tags: ['travel tips', 'unique experiences', 'adventure', 'culture'],
            readTime: '10',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
        },
        {
            title: 'Photography Guide: Capturing Uzbekistan\'s Beauty',
            excerpt: 'Tips and techniques for photographing Uzbekistan\'s stunning architecture and landscapes.',
            content: `# Photography Guide: Capturing Uzbekistan's Beauty

Uzbekistan is a photographer's paradise with its blue-tiled domes and ancient architecture.

## Best Times for Photography

**Golden Hour**: Sunrise and sunset create magical light on blue-tiled domes.

## Must-Photograph Locations

### Registan Square, Samarkand
Best time: Sunset and evening when illuminated.

### Itchan Kala, Khiva
Best time: Early morning for empty streets.

## Technical Tips

- Use a polarizing filter to enhance blue tiles
- Fast shutter speed for candid market shots
- Bring a tripod for long exposures

## Respectful Photography

- Always ask permission before photographing people
- Don't photograph people praying
- Be mindful of women who may not want to be photographed`,
            tags: ['photography', 'travel tips', 'visual arts', 'guide'],
            readTime: '10',
            image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=800&fit=crop',
        },
        {
            title: 'Hidden Gems: Lesser-Known Destinations',
            excerpt: 'Explore off-the-beaten-path locations that most tourists miss.',
            content: `# Hidden Gems: Lesser-Known Destinations

Beyond the famous cities lie incredible places waiting to be discovered.

## Termez

Ancient Buddhist sites and archaeological treasures near the Afghan border.

## Shahrisabz

Tamerlane's birthplace with impressive ruins of Ak-Saray Palace.

## Aydarkul Lake

Desert lake perfect for yurt stays and stargazing.

## Fergana Valley

Silk production center with stunning mountain scenery.

## Nurata

Sacred sites and mountain villages with traditional shepherd life.`,
            tags: ['hidden gems', 'off the beaten path', 'adventure'],
            readTime: '11',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        },
    ],
    'goods-news': [
        {
            title: 'Uzbekistan Opens New Tourist Routes for 2026',
            excerpt: 'Exciting developments in Uzbekistan tourism infrastructure make travel easier and more accessible than ever.',
            content: `# Uzbekistan Opens New Tourist Routes for 2026

Great news for travelers! Uzbekistan continues to invest in tourism infrastructure, making it easier to explore this fascinating country.

## New High-Speed Rail Connections

The government has announced new high-speed rail routes connecting:
- Tashkent to Fergana Valley
- Samarkand to Termez
- Bukhara to Khiva

## Visa-Free Travel Extended

Uzbekistan has extended visa-free travel to citizens of 90+ countries for stays up to 30 days.

## New Hotels and Accommodations

Several international hotel chains are opening properties in major cities, while boutique hotels preserve traditional architecture.

## Improved Airport Facilities

Tashkent International Airport has completed major renovations, improving the arrival experience.

## What This Means for Travelers

These developments make Uzbekistan more accessible while preserving its authentic character. It's the perfect time to visit!`,
            tags: ['news', 'tourism', 'infrastructure', 'travel updates'],
            readTime: '5',
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop',
        },
    ],
    'goods': [
        {
            title: 'The Ultimate Shopping Guide: Uzbek Handicrafts and Souvenirs',
            excerpt: 'Discover the finest traditional crafts and authentic souvenirs to bring home from Uzbekistan.',
            content: `# The Ultimate Shopping Guide: Uzbek Handicrafts and Souvenirs

Uzbekistan is a treasure trove of traditional handicrafts. Here's your guide to the best items to bring home.

## Ceramics

Rishtan ceramics are world-famous for their vibrant blue glazes. Visit workshops to see masters at work.

## Silk and Textiles

- **Ikat Fabrics**: Traditional tie-dye silk
- **Suzani Embroidery**: Intricate hand-stitched textiles
- **Silk Carpets**: Beautiful handwoven rugs

## Jewelry and Metalwork

Look for traditional silver jewelry and copper vessels in the bazaars.

## Spices and Food

- Dried fruits and nuts
- Traditional spices
- Uzbek tea
- Halva and sweets

## Where to Shop

- **Chorsu Bazaar** (Tashkent): Everything under one roof
- **Siab Bazaar** (Samarkand): Great for spices
- **Bukhara Trading Domes**: Historic shopping experience

## Tips for Shopping

1. Always bargain (except in fixed-price shops)
2. Ask about shipping for large items
3. Get certificates for antiques
4. Support local artisans directly`,
            tags: ['shopping', 'handicrafts', 'souvenirs', 'culture'],
            readTime: '7',
        },
    ],
    'good-stories': [
        {
            title: 'A Silk Road Journey: Following Ancient Trade Routes',
            excerpt: 'One traveler\'s unforgettable journey along the historic Silk Road through Uzbekistan.',
            content: `# A Silk Road Journey: Following Ancient Trade Routes

Standing in Registan Square at sunset, I realized I was walking the same paths that merchants traveled centuries ago.

## The Beginning

My journey started in Tashkent, the modern capital that serves as a gateway to ancient wonders.

## Samarkand: The Heart of the Silk Road

The blue domes of Samarkand took my breath away. Each monument tells stories of Tamerlane's empire and the scholars who gathered here.

## Bukhara: A Living Museum

In Bukhara, I felt transported back in time. The old city remains remarkably preserved, with caravanserais and madrasas still standing.

## Khiva: The Desert Jewel

Khiva's walled city of Itchan Kala is like stepping into a fairy tale. Every corner reveals another architectural marvel.

## Lessons from the Road

This journey taught me that the Silk Road was more than a trade route—it was a bridge between cultures, ideas, and civilizations.

## Meeting Modern Silk Road Travelers

Along the way, I met fellow travelers from around the world, all drawn to these ancient cities. We shared stories over tea, continuing the tradition of cultural exchange.`,
            tags: ['travel stories', 'silk road', 'personal experience', 'history'],
            readTime: '9',
        },
        {
            title: 'The Tea House Chronicles: Conversations in Uzbekistan',
            excerpt: 'Stories and wisdom gathered from countless hours in traditional Uzbek tea houses.',
            content: `# The Tea House Chronicles: Conversations in Uzbekistan

Tea houses (chaikhanas) are the social heart of Uzbek communities. Here are the stories I collected.

## The Storyteller of Bukhara

In a small chaikhana near the Ark Fortress, I met an elderly man who shared tales of old Bukhara.

## The Young Entrepreneur

A 25-year-old in Tashkent told me about his dreams of combining traditional crafts with modern design.

## The Grandmother's Wisdom

Over green tea and sweets, a grandmother shared her philosophy on life, family, and happiness.

## The Musician

A dutar player explained how traditional music keeps history alive.

## What I Learned

These conversations taught me that true travel is about human connections, not just seeing sights.`,
            tags: ['stories', 'culture', 'people', 'tea culture'],
            readTime: '7',
        },
    ],
    'good-trips': [
        {
            title: 'The Perfect 10-Day Uzbekistan Itinerary',
            excerpt: 'A carefully crafted route that covers the highlights while allowing time to truly experience each destination.',
            content: `# The Perfect 10-Day Uzbekistan Itinerary

This itinerary balances must-see sights with authentic experiences and relaxation time.

## Day 1-2: Tashkent

- Explore Chorsu Bazaar
- Visit the Museum of Applied Arts
- See Khast Imam Complex
- Enjoy modern Tashkent's cafes

## Day 3-5: Samarkand

- Marvel at Registan Square
- Visit Gur-e-Amir Mausoleum
- Explore Shah-i-Zinda necropolis
- Take a cooking class

## Day 6-8: Bukhara

- Wander the old city
- Visit the Ark Fortress
- Explore trading domes
- Attend a traditional music performance

## Day 9-10: Khiva

- Explore Itchan Kala
- Climb the Islam Khoja Minaret
- Visit artisan workshops
- Watch the sunset from the city walls

## Travel Tips

- Book trains in advance
- Allow flexibility in your schedule
- Budget extra time for spontaneous experiences
- Consider hiring local guides`,
            tags: ['itinerary', 'travel planning', 'trip ideas', 'guide'],
            readTime: '12',
        },
        {
            title: 'Weekend Getaways from Tashkent: 5 Perfect Escapes',
            excerpt: 'Discover amazing destinations within a few hours of Uzbekistan\'s capital city.',
            content: `# Weekend Getaways from Tashkent: 5 Perfect Escapes

Living in or visiting Tashkent? These nearby destinations make perfect weekend trips.

## 1. Chimgan Mountains (2 hours)

Perfect for hiking, skiing, and mountain air. Stay in a cozy guesthouse.

## 2. Charvak Lake (2.5 hours)

Beautiful reservoir surrounded by mountains. Great for swimming and water sports.

## 3. Fergana Valley (4 hours)

Explore traditional crafts, visit silk factories, and enjoy stunning mountain scenery.

## 4. Nurata Mountains (5 hours)

Experience yurt stays, meet local shepherds, and stargaze in pristine darkness.

## 5. Samarkand (2.5 hours by train)

Yes, it deserves a weekend! Take the high-speed train for a quick getaway.

## Planning Your Trip

- Most destinations are accessible by car or train
- Book accommodations in advance during summer
- Pack layers—mountain weather changes quickly
- Bring cash—not all places accept cards`,
            tags: ['weekend trips', 'day trips', 'tashkent', 'travel ideas'],
            readTime: '8',
        },
    ],
};

async function getCategories() {
    try {
        const response = await api.get('/categories');
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('❌ Ошибка при получении категорий:', error.message);
        throw error;
    }
}

async function createArticle(articleData, categoryId, userId = 3) {
    const payload = {
        ...articleData,
        categories: [categoryId],
        userId: userId,
        status: 'Published',
        lang: 'en',
        publishedAt: new Date().toISOString().split('T')[0],
        slug: articleData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
    };

    try {
        const response = await api.post('/articles', payload);
        return response.data;
    } catch (error) {
        console.error(`❌ Ошибка при создании статьи "${articleData.title}":`, error.response?.data || error.message);
        throw error;
    }
}

async function getExistingArticles() {
    try {
        const response = await api.get('/articles');
        const articles = response.data?.data || [];
        // Создаем Set из slug'ов для быстрой проверки
        return new Set(articles.map(a => a.slug));
    } catch (error) {
        console.error('❌ Ошибка при получении существующих статей:', error.message);
        return new Set();
    }
}

async function seedArticles() {
    console.log('🌱 Начинаем создание статей...\n');

    try {
        // Получаем категории
        const categories = await getCategories();
        console.log(`✅ Найдено категорий: ${categories.length}`);

        // Получаем существующие статьи
        const existingSlugs = await getExistingArticles();
        console.log(`📚 Существующих статей: ${existingSlugs.size}\n`);

        let created = 0;
        let skipped = 0;
        let duplicates = 0;

        // Создаем статьи для каждой категории
        for (const category of categories) {
            const templates = articleTemplates[category.slug];

            if (!templates || templates.length === 0) {
                console.log(`⏭️  Пропускаем категорию "${category.name}" (${category.slug}) - нет шаблонов`);
                continue;
            }

            console.log(`📝 Создаем статьи для категории "${category.name}" (${category.slug})...`);

            for (const template of templates) {
                // Генерируем slug для проверки
                const slug = template.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');

                // Проверяем, существует ли уже статья с таким slug
                if (existingSlugs.has(slug)) {
                    duplicates++;
                    console.log(`   ⏭️  Пропущена (дубликат): "${template.title}"`);
                    continue;
                }

                try {
                    await createArticle(template, category.id);
                    created++;
                    console.log(`   ✅ Создана: "${template.title}"`);

                    // Небольшая задержка между запросами
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    skipped++;
                    console.log(`   ⚠️  Ошибка: "${template.title}"`);
                }
            }

            console.log('');
        }

        console.log('\n🎉 Готово!');
        console.log(`✅ Создано статей: ${created}`);
        console.log(`⏭️  Пропущено (дубликаты): ${duplicates}`);
        console.log(`⚠️  Ошибки: ${skipped}`);
        console.log(`📊 Всего обработано: ${created + duplicates + skipped}\n`);

    } catch (error) {
        console.error('\n❌ Критическая ошибка:', error.message);
        process.exit(1);
    }
}

// Запуск скрипта
seedArticles();
