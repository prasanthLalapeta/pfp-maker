"use client";
import Image from 'next/image';

const BuyMeCoffeeWidget = () => {
    return (
        <div className="inline-block relative group">
            {/* Popover Message */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64
                          bg-black rounded-xl shadow-lg p-4 
                          border border-gray-700
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300 ease-in-out
                          pointer-events-none">
                {/* Triangle Pointer */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2
                              w-4 h-4 bg-black
                              transform rotate-45">
                </div>
                <p className="text-sm text-white text-center relative z-10">
                    If you&apos;re vibing with my work, why not fuel the creativity with a coffee? ☕✨
                </p>
            </div>

            {/* Buy Me Coffee Button */}
            <a
                href="https://www.buymeacoffee.com/heylalapeta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
            >
                <Image
                    src="/buy-me-coffee.png"
                    alt="Buy Me A Coffee"
                    width={217}
                    height={60}
                    priority
                />
            </a>
        </div>
    );
};

export default BuyMeCoffeeWidget; 