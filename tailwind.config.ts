import type { Config } from 'tailwindcss'

export default <Config>{
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            colors: {
                // HEXACO Trait Colors
                hexaco: {
                    h: '#0c886f', // Honesty - Teal
                    e: '#ff8a4a', // Emotionality - Orange
                    x: '#041d2a', // Extraversion - Dark Navy
                    a: '#ffa93f', // Agreeableness - Amber
                    c: '#345d76', // Conscientiousness - Blue-gray
                    o: '#5be8ff', // Openness - Cyan
                },
                // Base backgrounds
                cream: '#fffbef',
                navy: {
                    900: '#041d2a', // Same as X
                    800: '#0c2d3f',
                    700: '#345d76', // Same as C
                },
                teal: {
                    DEFAULT: '#0c886f',
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#0c886f', // Our custom teal
                    600: '#0f766e',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                    950: '#083344',
                }
            }
        }
    }
}
