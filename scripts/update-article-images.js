#!/usr/bin/env node

/**
 * Скрипт для обновления изображений у существующих статей
 * 
 * Использование:
 * node scripts/update-article-images.js
 */

const axios = require('axios');

const API_URL = 'https://articles.minzifatravel.com/api/v1';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2ODgzMzMwOSwiZXhwIjoxNzY5NDM4MTA5fQ.TWesj5J_9ybBfx0yy5t3YWGMTOu99VoROds4jTiBipQ";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
    },
});

// Изображения для разных тем
const imagesByTheme = {
    'slow-travel': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop',
    'local-life': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    'creative-ways': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
    'tourist-routes': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop',
    'shopping-guide': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    'silk-road': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop',
    'tea-house': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&h=800&fit=crop',
    'itinerary': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
    'weekend-getaways': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop',
    'default': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop',
};

// Маппинг slug статьи к теме изображения
const articleImageMap = {
    'discovering-the-art-of-slow-travel-in-uzbekistan': imagesByTheme['slow-travel'],
    'living-like-a-local-traditional-uzbek-lifestyle': imagesByTheme['local-life'],
    '10-creative-ways-to-experience-uzbekistan-off-the-beaten-path': imagesByTheme['creative-ways'],
    'uzbekistan-opens-new-tourist-routes-for-2026': imagesByTheme['tourist-routes'],
    'the-ultimate-shopping-guide-uzbek-handicrafts-and-souvenirs': imagesByTheme['shopping-guide'],
    'a-silk-road-journey-following-ancient-trade-routes': imagesByTheme['silk-road'],
    'the-tea-house-chronicles-conversations-in-uzbekistan': imagesByTheme['tea-house'],
    'the-perfect-10-day-uzbekistan-itinerary': imagesByTheme['itinerary'],
    'weekend-getaways-from-tashkent-5-perfect-escapes': imagesByTheme['weekend-getaways'],
};

async function updateArticleImage(articleId, imageUrl) {
    try {
        await api.patch(`/articles/${articleId}`, { image: imageUrl });
        return true;
    } catch (error) {
        console.error(`Ошибка обновления статьи ${articleId}:`, error.response?.data || error.message);
        return false;
    }
}

async function updateImages() {
    console.log('🖼️  Начинаем обновление изображений...\n');

    try {
        // Получаем все статьи
        const response = await api.get('/articles');
        const articles = response.data?.data || [];

        console.log(`📚 Найдено статей: ${articles.length}\n`);

        let updated = 0;
        let skipped = 0;

        for (const article of articles) {
            // Если у статьи уже есть изображение, пропускаем
            if (article.image) {
                console.log(`⏭️  Пропущена (уже есть изображение): "${article.title}"`);
                skipped++;
                continue;
            }

            // Находим подходящее изображение
            const imageUrl = articleImageMap[article.slug] || imagesByTheme['default'];

            const success = await updateArticleImage(article.id, imageUrl);
            if (success) {
                console.log(`✅ Обновлена: "${article.title}"`);
                updated++;
            } else {
                console.log(`❌ Ошибка: "${article.title}"`);
                skipped++;
            }

            // Задержка между запросами
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        console.log('\n🎉 Готово!');
        console.log(`✅ Обновлено: ${updated}`);
        console.log(`⏭️  Пропущено: ${skipped}`);
        console.log(`📊 Всего: ${articles.length}\n`);

    } catch (error) {
        console.error('\n❌ Критическая ошибка:', error.message);
        process.exit(1);
    }
}

updateImages();
