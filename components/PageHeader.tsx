import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function PageHeader() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -left-10 top-0 w-64 h-64 blur-3xl">
          <div className="w-full h-full bg-gradient-to-r from-pink-200 to-purple-200 rounded-full" />
        </div>
        <div className="absolute -right-10 top-0 w-64 h-64 blur-3xl">
          <div className="w-full h-full bg-gradient-to-r from-purple-200 to-pink-200 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative py-6 md:py-8 text-center space-y-4 md:space-y-6">
        {/* Example Showcase */}
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-center gap-2 md:gap-6 max-w-xl mx-auto p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border">
            <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={`https://${process.env.BLOB_STORE_HOSTNAME}/profile-pic-2-GaehuNolv3ESif6J4VZ6XkQxvbMfRu.JPG`}
                alt="Original Photo"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-green-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-medium text-green-600">AI Magic</span>
            </div>

            <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={`https://${process.env.BLOB_STORE_HOSTNAME}/generated-chibi-Qss5vUYFBAnfnKyBsTNNisn75iD8g3.png`}
                alt="Chibi Version"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-4 md:space-y-6">
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight font-fredoka">
              <span className="relative inline-block px-3 md:px-4 py-2 animate-bounce-slow">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Chibi PFP AI Generator
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 transform rotate-1 rounded-lg" />
              </span>
            </h1>
            <div
              className="absolute -top-6 right-1/4 text-pink-400 text-xl md:text-2xl rotate-12 
                animate-[fade-in-out_3s_ease-in-out_infinite]"
            >
              ✨
            </div>
            <div
              className="absolute -bottom-4 left-1/3 text-purple-400 text-xl md:text-2xl -rotate-12
                animate-[fade-in-out_3s_ease-in-out_infinite_1.5s]"
            >
              ⭐
            </div>
          </div>

          <p className="mx-auto max-w-[600px] text-base sm:text-lg md:text-xl text-gray-600 font-quicksand font-medium px-4 md:px-0">
            Transform your photos into adorable chibi-style avatars
          </p>
        </div>
      </div>
    </div>
  );
}