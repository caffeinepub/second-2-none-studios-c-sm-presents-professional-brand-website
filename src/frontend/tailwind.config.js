import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                copper: {
                    DEFAULT: 'oklch(var(--copper) / <alpha-value>)',
                    foreground: 'oklch(var(--copper-foreground))'
                },
                glow: {
                    DEFAULT: 'oklch(var(--glow) / <alpha-value>)',
                    foreground: 'oklch(var(--glow-foreground))'
                },
                neon: {
                    DEFAULT: 'oklch(var(--neon) / <alpha-value>)',
                    foreground: 'oklch(var(--neon-foreground))'
                },
                'neon-green': {
                    DEFAULT: 'oklch(var(--neon-green) / <alpha-value>)'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                glow: '0 0 20px oklch(var(--glow) / 0.3), 0 0 40px oklch(var(--glow) / 0.1)',
                'glow-lg': '0 0 30px oklch(var(--glow) / 0.4), 0 0 60px oklch(var(--glow) / 0.2)',
                neon: '0 0 20px oklch(var(--neon) / 0.4), 0 0 40px oklch(var(--neon) / 0.2)'
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'glow-pulse': {
                    '0%, 100%': { 
                        boxShadow: '0 0 20px oklch(var(--glow) / 0.3), 0 0 40px oklch(var(--glow) / 0.1)' 
                    },
                    '50%': { 
                        boxShadow: '0 0 30px oklch(var(--glow) / 0.5), 0 0 60px oklch(var(--glow) / 0.2)' 
                    }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                },
                'golden-radiance': {
                    '0%': {
                        backgroundPosition: '200% 0',
                        filter: 'drop-shadow(0 0 15px oklch(var(--accent) / 0.6)) drop-shadow(0 0 30px oklch(var(--accent) / 0.4)) drop-shadow(0 0 45px oklch(var(--copper) / 0.3))'
                    },
                    '50%': {
                        backgroundPosition: '0% 0',
                        filter: 'drop-shadow(0 0 20px oklch(var(--accent) / 0.8)) drop-shadow(0 0 40px oklch(var(--accent) / 0.5)) drop-shadow(0 0 60px oklch(var(--copper) / 0.4))'
                    },
                    '100%': {
                        backgroundPosition: '-200% 0',
                        filter: 'drop-shadow(0 0 15px oklch(var(--accent) / 0.6)) drop-shadow(0 0 30px oklch(var(--accent) / 0.4)) drop-shadow(0 0 45px oklch(var(--copper) / 0.3))'
                    }
                },
                'neon-radiance': {
                    '0%': {
                        filter: 'drop-shadow(0 0 15px oklch(var(--neon-green) / 0.7)) drop-shadow(0 0 30px oklch(var(--neon-green) / 0.5)) drop-shadow(0 0 45px oklch(var(--neon-green) / 0.3))'
                    },
                    '50%': {
                        filter: 'drop-shadow(0 0 20px oklch(var(--neon-green) / 0.9)) drop-shadow(0 0 40px oklch(var(--neon-green) / 0.6)) drop-shadow(0 0 60px oklch(var(--neon-green) / 0.4))'
                    },
                    '100%': {
                        filter: 'drop-shadow(0 0 15px oklch(var(--neon-green) / 0.7)) drop-shadow(0 0 30px oklch(var(--neon-green) / 0.5)) drop-shadow(0 0 45px oklch(var(--neon-green) / 0.3))'
                    }
                },
                'orange-radiance': {
                    '0%': {
                        filter: 'drop-shadow(0 0 10px oklch(0.75 0.20 45 / 0.7)) drop-shadow(0 0 20px oklch(0.75 0.20 45 / 0.5))'
                    },
                    '50%': {
                        filter: 'drop-shadow(0 0 15px oklch(0.75 0.20 45 / 0.9)) drop-shadow(0 0 30px oklch(0.75 0.20 45 / 0.7))'
                    },
                    '100%': {
                        filter: 'drop-shadow(0 0 10px oklch(0.75 0.20 45 / 0.7)) drop-shadow(0 0 20px oklch(0.75 0.20 45 / 0.5))'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                'shimmer': 'shimmer 8s linear infinite',
                'golden-radiance': 'golden-radiance 8s ease-in-out infinite',
                'neon-radiance': 'neon-radiance 3s ease-in-out infinite',
                'orange-radiance': 'orange-radiance 2.5s ease-in-out infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
