import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Palette, Crop, QrCode } from 'lucide-react';

const ICONS = [
    { Icon: Wrench,  label: 'BUILD'  },
    { Icon: Palette, label: 'DESIGN' },
    { Icon: Crop,    label: 'EDIT'   },
    { Icon: QrCode,  label: 'FORGE'  },
];

// Each icon drops in one at a time, holds, then all fade out together before the next cycle
const HOLD_MS    = 1800;   // how long all 4 stay visible together
const STAGGER_MS = 280;    // delay between each icon dropping in
const FADE_MS    = 400;    // fade out duration
const PAUSE_MS   = 600;    // gap between cycles

const dropIn = {
    initial: { y: -28, opacity: 0, rotate: -8 },
    animate: {
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: {
            type: 'spring',
            stiffness: 380,
            damping: 22,
            mass: 0.6,
        },
    },
    exit: {
        y: 10,
        opacity: 0,
        transition: { duration: FADE_MS / 1000, ease: 'easeIn' },
    },
};

const labelReveal = {
    initial: { opacity: 0, x: 6 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut', delay: 0.08 },
    },
    exit: {
        opacity: 0,
        x: 4,
        transition: { duration: 0.18, ease: 'easeIn' },
    },
};

export default function PegboardAnimation() {
    const [phase, setPhase]   = useState('entering'); // 'entering' | 'holding' | 'exiting'
    const [visible, setVisible] = useState([]); // indices shown so far

    useEffect(() => {
        let timer;

        const runCycle = () => {
            // Step 1: drop icons in one by one
            setPhase('entering');
            setVisible([]);

            ICONS.forEach((_, i) => {
                timer = setTimeout(() => {
                    setVisible(prev => [...prev, i]);
                }, i * STAGGER_MS);
            });

            // Step 2: all visible — hold
            timer = setTimeout(() => {
                setPhase('holding');
            }, ICONS.length * STAGGER_MS + 80);

            // Step 3: exit
            timer = setTimeout(() => {
                setPhase('exiting');
                setVisible([]);
            }, ICONS.length * STAGGER_MS + HOLD_MS);

            // Step 4: pause then restart
            timer = setTimeout(() => {
                runCycle();
            }, ICONS.length * STAGGER_MS + HOLD_MS + FADE_MS + PAUSE_MS);
        };

        runCycle();
        return () => clearTimeout(timer);
    }, []);

    const allIn = phase === 'holding' || (phase === 'entering' && visible.length === ICONS.length);

    return (
        <div
            className="relative border-2 border-black bg-slate-100 flex items-center justify-center overflow-hidden h-12 w-[200px] brutalist-shadow-sm group cursor-default select-none"
            style={{ contain: 'layout paint' }}
        >
            {/* Pegboard dot grid */}
            <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)',
                    backgroundSize: '9px 9px',
                }}
            />

            {/* Icon strip */}
            <div className="flex items-center gap-2 relative z-10 px-3">
                {ICONS.map(({ Icon, label }, i) => (
                    <AnimatePresence key={i} mode="popLayout">
                        {visible.includes(i) && (
                            <motion.div
                                key={`icon-${i}`}
                                variants={dropIn}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="flex items-center"
                            >
                                <Icon
                                    size={14}
                                    strokeWidth={2.5}
                                    style={{
                                        color: allIn && i === visible.length - 1 ? '#6366f1' : '#000',
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                ))}

                {/* Label: only shows when all icons are in */}
                <AnimatePresence mode="wait">
                    {allIn && (
                        <motion.span
                            key="label"
                            variants={labelReveal}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="font-black text-[10px] tracking-[0.2em] uppercase whitespace-nowrap text-accent ml-0.5"
                        >
                            WORKBENCH
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
