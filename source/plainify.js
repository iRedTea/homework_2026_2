'use strict';

/**
 * Функция, преобразующая вложенный объект в plain-объект.
 * Собственные вложенные объекты разворачиваются в ключи с точкой (например, `b.c`).
 * Массивы, null и undefined сохраняются как значения и не разворачиваются.
 * Исходный объект не изменяется. Значения в результате — ссылки на те же данные
 * (массивы и другие не-объектные значения не копируются глубоко).
 *
 * @param {Object} originalObject - объект с вложенными свойствами
 *
 * @example
 * // returns { a: 1, 'b.c': 2 }
 * plainify({ a: 1, b: { c: 2 } });
 *
 * @returns {Object} plain-объект или пустой объект при некорректном входе
 */
const plainify = (originalObject) => {
    if (originalObject === null || typeof originalObject !== 'object' || Array.isArray(originalObject)) {
        return {};
    }

    const result = {};

    /**
     * Рекурсивно разворачивает вложенный объект в result
     * @param {Object} obj - текущий уровень объекта
     * @param {string} [prefix=''] - префикс ключа
     * @returns {void}
     */
    const flatten = (obj, prefix = '') => {
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                flatten(value, fullKey);
            } else {
                result[fullKey] = value;
            }
        }
    };

    flatten(originalObject);
    return result;
};
