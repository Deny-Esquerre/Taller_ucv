import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, HelpCircle, Mail, Phone, Clock, MessageCircle, Info, Sparkles, ExternalLink, Headset } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { useState, useEffect, useRef } from 'react';

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
    "Optimiza la gestión académica con procesos automatizados y eficientes.",
    "Visualiza métricas de rendimiento en tiempo real para una gestión basada en datos.",
    "Garantiza la integridad y el control total sobre la programación de talleres."
];

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;
    const [currentImage, setCurrentImage] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const tooltipWidth = 280;
        const tooltipHeight = 85;
        const margin = 20;

        let posX = x + margin;
        let posY = y + margin;

        if (x + tooltipWidth + margin > rect.width) {
            posX = x - tooltipWidth - margin;
        }

        if (y + tooltipHeight + margin > rect.height) {
            posY = y - tooltipHeight - margin;
        }

        posX = Math.max(margin, Math.min(posX, rect.width - tooltipWidth - margin));
        posY = Math.max(margin, Math.min(posY, rect.height - tooltipHeight - margin));

        setMousePos({ x: posX, y: posY });
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
                    ref={containerRef}
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

                    {/* Interactive Info Bubble */}
                    <div 
                        className="absolute z-40 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 pointer-events-none whitespace-nowrap ease-out"
                        style={{ 
                            left: `${mousePos.x}px`, 
                            top: `${mousePos.y}px`
                        }}
                    >
                        <div className="flex w-[280px] items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/30 px-5 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/20">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(220,38,38)] to-red-600 shadow-lg shadow-red-500/40">
                                <Sparkles className="size-4.5 text-white animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className="text-[11px] font-black text-white tracking-widest uppercase leading-none">UCV Insight</span>
                                    <div className="size-1 rounded-full bg-red-500 animate-ping" />
                                </div>
                                <span className="text-[12px] font-medium text-white/95 leading-snug whitespace-normal">
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

                {/* Help Modal - Professional Redesign */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="absolute bottom-6 right-6 flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-600 shadow-lg ring-1 ring-neutral-200 transition-all hover:bg-neutral-50 hover:text-[rgb(220,38,38)] hover:shadow-xl focus:outline-none sm:bottom-8 sm:right-8">
                            <HelpCircle className="size-4.5" />
                            ¿Necesitas Ayuda?
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none rounded-[1.5rem] shadow-2xl">
                        <div className="bg-[rgb(35,53,89)] p-8 text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                                    <Headset className="size-6 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Centro de Soporte</span>
                                    <h2 className="text-xl font-bold">¿Problemas de acceso?</h2>
                                </div>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Nuestro equipo de soporte técnico está disponible para ayudarte a recuperar tu cuenta o resolver dudas del sistema.
                            </p>
                        </div>
                        
                        <div className="grid gap-3 p-6 bg-white dark:bg-neutral-950">
                            {/* Contact Card: Email */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 transition-colors hover:bg-white dark:hover:bg-neutral-800">
                                <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600">
                                    <Mail className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase text-neutral-400">Correo Electrónico</span>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">aguilarbenja.98@gmail.com</span>
                                </div>
                            </div>

                            {/* Contact Card: Phone */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 transition-colors hover:bg-white dark:hover:bg-neutral-800">
                                <div className="flex size-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 text-[rgb(220,38,38)]">
                                    <Phone className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase text-neutral-400">Línea Directa</span>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">+51 983054134</span>
                                </div>
                            </div>

                            {/* Contact Card: Hours */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800">
                                <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600">
                                    <Clock className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase text-neutral-400">Horario de Atención</span>
                                    <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">Lun - Sáb (7:30 AM - 10:00 PM)</span>
                                </div>
                            </div>

                            {/* WhatsApp Button Action */}
                            <a 
                                href="https://wa.me/51983054134" 
                                target="_blank" 
                                rel="noreferrer"
                                className="group mt-2 flex items-center justify-between gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-white shadow-lg transition-all hover:bg-[#22c35e] hover:shadow-[#25D366]/20"
                            >
                                <div className="flex items-center gap-3">
                                    <MessageCircle className="size-5 fill-white text-white" />
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[10px] font-bold uppercase opacity-80">Soporte Inmediato</span>
                                        <span className="text-sm font-bold">Contactar vía WhatsApp</span>
                                    </div>
                                </div>
                                <ExternalLink className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 text-center">
                            <p className="text-[10px] text-neutral-400 font-medium">© {new Date().getFullYear()} Plataforma de Talleres UCV - Soporte IT</p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
