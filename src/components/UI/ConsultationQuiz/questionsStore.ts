import { Question } from "./_types";

export const questions: Question[] = [
    {
        question: "Вы посещали Узбекистан ранее?",
        answers: [
            "Да ❤",
            "Планирую посетить впервые"
        ],
        type: "radio",
        name: "visites",
        autoNext: true,
    },
    {
        question: "В каких городах Вы хотели бы побывать в рамках этой поездки?",
        answers: [
            "Ташкент-Самарканд",
            "Ташкент - Самарканд - Бухара",
            "Ташкент - Самарканд - Бухара - Хива",
        ],
        type: "radio",
        name: "cities",
        autoNext: true,
    },
    {
        question: "Сколько времени планируете пробыть в Узбекистане?",
        answers: [
            "Менее 3 дней",
            "От 3 до 7 дней",
            "От 7 до 14 дней",
            "Более 14 дней",
        ],
        type: "radio",
        name: "days",
        autoNext: true,
    },
    {
        question: "Каким составом Вы планируете путешествовать?",
        answers: [
            "Нас 2 человека",
            "3 - 4 человека",
            "Нас 4 - 8 человек",
            "Нас еще больше :)",
            "Мы с детками до 2 лет",
            "Нашим деткам от 2 до 12 лет"
        ],
        type: "radio",
        name: "travellers",
        autoNext: true,
    },
    {
        question: "Заполните форму ниже",
        inputs: [
            {
                name: "name",
                label: "Ваше имя",
            },
            {
                name: "email",
                label: "Ваш e-mail",
            },
            {
                name: "phone",
                label: "Номер Whatsapp",
            }
        ],
        type: "text",
    }
];