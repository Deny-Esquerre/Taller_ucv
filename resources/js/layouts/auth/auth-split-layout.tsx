import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, HelpCircle, Mail, Phone, Clock, MessageCircle, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { useState, useEffect } from 'react';

const carouselItems = [
    {
        src: '/images/edu1.webp',
        quote: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo.',
        author: 'Nelson Mandela'
    },
    {
        src: '/images/edu2.webp',
        quote: 'Desarrolla una pasión por aprender. Si lo haces, nunca dejarás de crecer.',
        author: "Anthony J. D'Angelo"
    },
    {
        src: '/images/edu3.webp',
        quote: 'La educación no es preparación para la vida; la educación es la vida misma.',
        author: 'John Dewey'
    }
];

const infoMessages = [
    "Gestiona tus talleres con un solo clic.",
    "Portal optimizado para la administración educativa.",
    "Control total sobre la programación académica."
];

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;
    const [currentImage, setCurrentImage] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % carouselItems.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
    };

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2">
            <div className="relative hidden h-full flex-col lg:flex p-6 pr-0">
                <div 
                    onMouseMove={handleMouseMove}
                    className="group relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-black p-10 text-white shadow-2xl"
                >
                    {carouselItems.map((item, index) => (
                        <img
                            key={item.src}
                            src={item.src}
                            alt="Educational environment"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            className={`absolute inset-0 h-full w-full object-cover select-none pointer-events-none transition-opacity duration-1000 ${
                                index === currentImage ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}
                    
                    <div className="absolute inset-0 z-10 bg-[rgb(35,53,89)]/95 pointer-events-none" />

                    {/* SVG Overlay */}
                    <img 
                        src="/images/overlay.svg" 
                        alt="" 
                        className="absolute inset-0 z-20 h-full w-full object-cover opacity-100 pointer-events-none" 
                    />

                    {/* Interactive Info Bubble that follows the Mouse */}
                    <div 
                        className="absolute z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                        style={{ 
                            left: `${mousePos.x}px`, 
                            top: `${mousePos.y}px`,
                            transform: 'translate(15px, 15px)' // Offset from cursor
                        }}
                    >
                        <div className="flex items-center gap-3 bg-[rgb(35,53,89)]/40 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl shadow-2xl ring-1 ring-white/10">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgb(220,38,38)] shadow-lg shadow-red-500/20">
                                <Info className="size-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-white tracking-tight uppercase leading-none mb-0.5">Tip Informativo</span>
                                <span className="text-[11px] text-white/90 leading-tight">
                                    {infoMessages[currentImage]}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative z-30 flex flex-col focus:outline-none">
                        <div className="mb-6 flex w-fit items-center gap-2 rounded-full bg-[rgb(220,38,38)] px-3 py-1 shadow-md">
                            <img src="/images/image.webp" alt="Logo UCV" className="size-5 object-contain brightness-0 invert" />
                            <span className="text-sm font-semibold tracking-wide text-white">
                                {name || "Talleres UCV"}
                            </span>
                        </div>
                        <h2 className="text-3xl font-medium tracking-tight text-white drop-shadow-sm lg:text-4xl lg:leading-[1.2]">
                            Bienvenidos a la<br />Plataforma Educativa.
                        </h2>
                        <p className="mt-4 max-w-md text-sm font-normal text-white/70 drop-shadow-sm sm:text-base">
                            Gestión, administración y control de talleres universitarios.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/20 focus:outline-none"
                    >
                        <ChevronLeft className="size-6" />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/20 focus:outline-none"
                    >
                        <ChevronRight className="size-6" />
                    </button>

                    {/* Content & Indicators */}
                    <div className="relative z-30 mt-auto flex flex-col items-start justify-end gap-6 pb-4 pr-12">
                        <blockquote className="max-w-lg space-y-3 text-left drop-shadow-md transition-opacity duration-500">
                            <p className="text-base font-medium leading-relaxed sm:text-lg text-balance">
                                &ldquo;{carouselItems[currentImage].quote}&rdquo;
                            </p>
                            <footer className="flex items-center justify-start gap-3 text-xs font-medium uppercase tracking-wider opacity-80">
                                <div className="h-px w-4 bg-white/50" />
                                {carouselItems[currentImage].author}
                            </footer>
                        </blockquote>

                        <div className="flex gap-2">
                            {carouselItems.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        idx === currentImage ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60 w-2'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex h-full w-full flex-col items-center justify-center lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-start gap-4 sm:items-center">
                        <div className="flex w-fit items-center gap-2 rounded-lg bg-[rgb(220,38,38)] px-3.5 py-2 font-medium shadow-md">
                            <img src="/images/image.webp" alt="Logo UCV" className="size-6 object-contain brightness-0 invert" />
                            <span className="text-base font-bold tracking-tight text-white">{name || "Talleres UCV"}</span>
                        </div>
                    </div>
                    {title && description && (
                        <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                            <h1 className="text-xl font-medium text-foreground">{title}</h1>
                            <p className="text-sm text-balance text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    )}
                    {children}
                </div>

                {/* Help Modal */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="absolute bottom-6 right-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none sm:bottom-8 sm:right-8">
                            <HelpCircle className="size-4" />
                            ¿Necesitas Ayuda?
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl">¿Problema con tu usuario y contraseña?</DialogTitle>
                            <DialogDescription className="text-base mt-2">
                                Comunícate con nuestra área de Soporte para que podamos ayudarte.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-5 py-4 text-sm text-foreground/90">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 font-semibold text-foreground">
                                    <Mail className="size-4 text-muted-foreground" /> Escríbenos a:
                                </div>
                                <span className="pl-6">denyesquerre293@gmail.com</span>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 font-semibold text-foreground">
                                    <Phone className="size-4 text-muted-foreground" /> Comunícate con nosotros:
                                </div>
                                <span className="pl-6">+51 902397119</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 font-semibold text-foreground">
                                    <Clock className="size-4 text-muted-foreground" /> Horario de atención:
                                </div>
                                <span className="pl-6">Lunes a Sábado<br/>7:30 a.m - 10:00 p.m</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 font-semibold text-foreground">
                                    <MessageCircle className="size-4 text-green-600" /> WhatsApp:
                                </div>
                                <a href="https://wa.me/51902397119" target="_blank" rel="noreferrer" className="pl-6 font-medium text-blue-600 hover:underline">
                                    +51 902397119
                                </a>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

