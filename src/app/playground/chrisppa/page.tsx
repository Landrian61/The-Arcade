"use client";
import Link from "next/link";
import { Caveat, Cinzel_Decorative } from "next/font/google";
import Image from "next/image";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

interface Project {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
}

const projects: Project[] = [
  {
    title: "The Shopping List",
    description: "Plan your provisions and estimate costs.",
    href: "/playground/chrisppa/shopping-list",
    imageSrc: "/images/cris/book.png",
  },
  {
    title: "The Lord of the Movies",
    description: "Check out my amazing movies",
    href: "/playground/chrisppa/movies",
    imageSrc: "/images/cris/movies_logo.png",
  },

];

export default function EntryPage() {
  return (
    <div className="min-h-screen w-full bg-[#f5e6c8] text-[#4a3728] flex flex-col items-start justify-start p-8 overflow-hidden">
      <main className="z-20 flex flex-col items-center w-full h-full text-center">
        <div className="mb-12 space-y-2">
          <h2
            className={`${cinzel.className} text-2xl tracking-[0.2em] text-[#2f5233]`}
          >
            THE
          </h2>
          <h1
            className={`${cinzel.className} text-6xl md:text-8xl font-black tracking-tighter text-[#4a3728] drop-shadow-sm`}
          >
            CHRISPPA
          </h1>
          <div className="flex items-center justify-center gap-4 opacity-70">
            <span className="h-[2px] w-12 bg-[#4a3728]"></span>
            <span className={`${cinzel.className} text-xl tracking-widest`}>
              PORTAL
            </span>
            <span className="h-[2px] w-12 bg-[#4a3728]"></span>
          </div>
        </div>

        {/* Navigation / Projects List */}
        <nav className="w-full">
          <ul className="grid grid-cols-5 gap-6">
            {projects.map((project) => (
              <ul key={project.title}>
                <Link href={project.href} className="group relative block h-full">
                  <div
                    className={`px-8 py-4 bg-[#fcf5e5] rounded-lg leading-none h-full`}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="flex-shrink-0">
                        <Image
                          src={project.imageSrc}
                          alt={`${project.title} Cover`}
                          width={300}
                          height={300}
                          className="w-34 h-32 object-contain rounded-md border border-[#d9c6a5]"
                        />
                      </div>
                      <div className="flex-1">
                        <span
                          className={`${cinzel.className} font-bold text-xl text-[#2f5233] block mb-1`}
                        >
                          {project.title}
                        </span>
                        <p className="text-sm text-[#2f5233]/80 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </ul>
            ))}
          </ul>
        </nav>

        {/* Footer Signature */}
        <footer className="mt-60 opacity-60">
          <p className={`${caveat.className} text-2xl text-[#2f5233]`}>
            - Crispa dev:{" "}
            <a href="https://crispa.dev" target="_blank">
              @chrisppa
            </a>{" "}
            -
          </p>
        </footer>
      </main>
    </div>
  );
}
