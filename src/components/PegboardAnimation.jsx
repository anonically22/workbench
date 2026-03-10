import { motion } from 'framer-motion';
import { Wrench, Palette, Crop, QrCode } from 'lucide-react';

export default function PegboardAnimation() {
    const iconProps = { size: 16, strokeWidth: 2.5 };

    // Total animation loop = 4 seconds
    return (
        <div className="relative border-2 border-black bg-slate-50 flex items-center justify-center overflow-hidden h-12 w-[180px] brutalist-shadow-sm group cursor-default">
            {/* Pegboard Background Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(black 2px, transparent 2px)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0'
                }}
            />

            <div className="flex items-center gap-1.5 relative z-10 justify-center">
                <motion.div
                    animate={{
                        y: [-25, 0, 0, -2, 0, -25],
                        opacity: [0, 1, 1, 1, 1, 0],
                        color: ['#000', '#3b82f6', '#000', '#000', '#000', '#000'],
                        rotate: [15, 0, 0, -10, 0, -15]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.15, 0.7, 0.75, 0.9], ease: "backOut" }}
                >
                    <Wrench {...iconProps} />
                </motion.div>

                <motion.div
                    animate={{
                        y: [-25, 0, 0, -2, 0, -25],
                        opacity: [0, 0, 1, 1, 1, 0],
                        color: ['#000', '#000', '#3b82f6', '#000', '#000', '#000'],
                        rotate: [-15, 0, 0, 10, 0, 15]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.25, 0.72, 0.78, 0.9], ease: "backOut" }}
                >
                    <Palette {...iconProps} />
                </motion.div>

                <motion.div
                    animate={{
                        y: [-25, 0, 0, -2, 0, -25],
                        opacity: [0, 0, 0, 1, 1, 0],
                        color: ['#000', '#000', '#000', '#3b82f6', '#000', '#000'],
                        rotate: [15, 0, 0, -10, 0, -15]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.4, 0.75, 0.8, 0.9], ease: "backOut" }}
                >
                    <Crop {...iconProps} />
                </motion.div>

                <motion.div
                    animate={{
                        y: [-25, 0, 0, -2, 0, -25],
                        opacity: [0, 0, 0, 0, 1, 0],
                        color: ['#000', '#000', '#000', '#000', '#3b82f6', '#000'],
                        rotate: [-15, 0, 0, 10, 0, 15]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.55, 0.78, 0.82, 0.9], ease: "backOut" }}
                >
                    <QrCode {...iconProps} />
                </motion.div>

                {/* Text Reveal */}
                <motion.div
                    animate={{
                        opacity: [0, 0, 1, 1, 0],
                        x: [10, 10, 0, 0, 10],
                        width: [0, 0, 'auto', 'auto', 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.55, 0.65, 0.85, 0.9], ease: "easeInOut" }}
                    className="font-bold text-xs tracking-widest uppercase whitespace-nowrap text-black ml-1 pt-[2px] overflow-hidden"
                >
                    WORKBENCH
                </motion.div>
            </div>
        </div>
    );
}
