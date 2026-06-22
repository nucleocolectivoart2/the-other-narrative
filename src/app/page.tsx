
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronDown, 
  Play, 
  Loader2,
  Target,
  Workflow
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const featuredVideos = [
  { id: 'ooZZ0i_1_gU', title: 'HAY FESTIVAL: Diálogos de Cambio', thumbnail: 'https://img.youtube.com/vi/ooZZ0i_1_gU/maxresdefault.jpg' },
  { id: 'VzQC-PPZmKQ', title: 'Conferencia: Narrativas que Movilizan', thumbnail: 'https://img.youtube.com/vi/VzQC-PPZmKQ/hqdefault.jpg' },
  { id: 'JhQ_EpuoiOQ', title: 'Estrategia de Comunicación Responsable', thumbnail: 'https://img.youtube.com/vi/JhQ_EpuoiOQ/maxresdefault.jpg' }
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-primary/30 overflow-x-hidden">
      
      {/* Preloader cinemático acelerado */}
      <div className={cn(
        "fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center text-white transition-all duration-700 ease-in-out",
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <div className="space-y-6 text-center px-6">
          <h2 className="text-2xl md:text-3xl font-headline italic tracking-widest text-primary lowercase">the other narrative.</h2>
          <div className="flex items-center gap-3 justify-center opacity-40">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        </div>
      </div>

      {/* Intro Splash Layer - IMPACTO ACELERADO */}
      {isLoaded && (
        <div className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center animate-impact-splash px-6">
           <div className="text-center">
              <h1 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[104px] font-bold font-headline leading-[0.85] text-white tracking-tighter lowercase">
                the other
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[104px] font-normal font-headline leading-[0.85] text-primary italic tracking-tighter lowercase">
                narrative.
              </h1>
           </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ 
              width: '100vw',
              height: '56.25vw', /* 16:9 aspect ratio */
              minHeight: '100vh',
              minWidth: '177.77vh', /* Ensure it covers height in vertical screens */
              transform: `translate(-50%, calc(-50% + ${scrollY * 0.05}px))` 
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/ooZZ0i_1_gU?autoplay=1&mute=1&controls=0&loop=1&playlist=ooZZ0i_1_gU&start=12&end=114&background=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1"
              className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.4] grayscale-[0.2]"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              title="Editorial Background Video"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 z-10" />
        </div>

        <div className="section-container relative z-20 w-full pt-10 sm:pt-20">
          <div className="max-w-6xl space-y-8 sm:space-y-10">
            
            {/* Logo / Marca */}
            <div className={cn(
              "flex flex-col items-start min-h-[120px] sm:min-h-[160px]",
              isLoaded ? "animate-layout-entry" : "opacity-0"
            )}>
              <h1 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[135px] font-bold font-headline leading-[0.85] text-white tracking-tighter lowercase">
                the other
              </h1>
              <h1 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[135px] font-normal font-headline leading-[0.85] text-primary italic tracking-tighter lowercase">
                narrative.
              </h1>
            </div>

            {/* Pill de Laboratorio */}
            <div className={cn(
              "inline-block",
              isLoaded ? "animate-stagger-1" : "opacity-0"
            )}>
              <span className="bg-primary text-white font-bold text-[8px] sm:text-[10px] tracking-[0.4em] uppercase px-3 sm:px-4 py-2 shadow-2xl">
                LABORATORIO ESTRATÉGICO Y EDITORIAL
              </span>
            </div>

            {/* Mensajes Principales */}
            <div className="space-y-6 max-w-5xl">
              <div className={cn(
                "flex flex-col gap-1",
                isLoaded ? "animate-stagger-2" : "opacity-0"
              )}>
                <p className="text-lg md:text-xl lg:text-[22px] text-white font-bold tracking-tight leading-tight">
                  Narrativas que generan <span className="text-primary">confianza.</span>
                </p>
                <p className="text-lg md:text-xl lg:text-[22px] text-white font-bold tracking-tight leading-tight">
                  Estrategias que movilizan <span className="text-primary">personas.</span>
                </p>
              </div>

              {/* Texto Descriptivo */}
              <div className={cn(
                "border-l-2 border-primary/60 max-w-2xl mt-6 sm:mt-8 pl-6",
                isLoaded ? "animate-stagger-3" : "opacity-0"
              )}>
                <p className="text-[10px] md:text-xs lg:text-[13px] text-white/80 font-light leading-relaxed">
                  En un entorno saturado, ayudamos a organizaciones a transformar conocimiento, propósito y estrategia en narrativas capaces de generar comprensión, participación y acción.
                </p>
              </div>
              
              {/* Botones Estilo Captura */}
              <div className="flex flex-wrap gap-4 pt-6 sm:pt-8">
                <Link 
                  href="/blog" 
                  className={cn(
                    "btn-editorial bg-primary text-white hover:bg-white hover:text-primary border-0 h-10 px-6 sm:px-8 text-[9px] tracking-[0.3em] font-bold shadow-2xl",
                    isLoaded ? "animate-stagger-4" : "opacity-0"
                  )}
                >
                  INSIGHTS
                </Link>
                <button 
                  onClick={() => scrollToSection('mission')} 
                  className={cn(
                    "btn-editorial border-white/60 text-white hover:bg-white/10 h-10 px-6 sm:px-8 text-[9px] tracking-[0.3em] font-bold backdrop-blur-md group",
                    isLoaded ? "animate-stagger-5" : "opacity-0"
                  )}
                >
                  NUESTRA MIRADA <ArrowRight className="ml-3 sm:ml-4 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('mission')}
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/30 hover:text-primary transition-all animate-bounce",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </section>

      {/* Secciones del Cuerpo */}
      <section id="mission" className="section-container py-24 sm:py-32 md:py-48 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5 w-full order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-2xl bg-muted">
              <Image
                src="https://images.pexels.com/photos/631909/pexels-photo-631909.jpeg"
                alt="Articulación de Realidades"
                fill
                className="object-cover grayscale brightness-90 contrast-110"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-10 sm:space-y-12 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              <span className="text-primary font-bold text-[10px] tracking-[0.6em] uppercase block">EL DESAFÍO</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-headline leading-[1.1] tracking-tighter text-foreground">
                Articular <br />
                <span className="italic font-normal text-primary">Realidades.</span>
              </h2>
            </div>
            <div className="space-y-6 sm:space-y-8 max-w-2xl">
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
                Las organizaciones enfrentan un desafío cada vez mayor: comunicar en medio de la saturación informativa, construir confianza en entornos complejos y conectar sus objetivos de negocio con las expectativas de una sociedad que exige coherencia, transparencia e impacto.
              </p>
              <div className="border-l-2 border-primary/20 pl-6 sm:pl-8 space-y-6 py-2">
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed italic">
                  "No creemos en comunicar por comunicar. Creemos en construir conversaciones que ayuden a tomar mejores decisiones."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="areas" className="section-container py-24 sm:py-32 border-t">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-6 sm:space-y-8">
              <span className="text-primary font-bold text-[10px] tracking-[0.6em] uppercase">ÁREAS DE TRABAJO</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-headline tracking-tighter">Impacto <br /><span className="italic font-normal text-primary">Estratégico.</span></h2>
              <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
                Nuestra visión integrada conecta la estrategia de sostenibilidad con la cultura organizacional y el liderazgo, transformando la teoría en práctica operativa.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                { title: 'Estrategia', icon: <Target className="h-5 w-5" />, text: 'Alineación de negocio y hojas de ruta.' },
                { title: 'Engagement', icon: <Workflow className="h-5 w-5" />, text: 'Estrategias para organizaciones de membresía.' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 sm:p-8 border bg-white rounded-sm hover:border-primary transition-colors">
                  <div className="h-10 w-10 bg-primary/10 flex items-center justify-center text-primary mb-6">{item.icon}</div>
                  <h4 className="text-lg sm:text-xl font-bold font-headline mb-4">{item.title}</h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      <section id="proceso" className="section-container py-24 sm:py-32 border-t">
         <div className="w-full space-y-12 sm:space-y-16">
            <div className="space-y-4 sm:space-y-6">
              <span className="text-primary font-bold text-[10px] tracking-[0.6em] uppercase">METODOLOGÍA</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-headline tracking-tighter">Escuchar. Priorizar. <br /><span className="italic font-normal text-primary">Movilizar.</span></h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-4">
               {[
                 { step: '01', title: 'Escuchar', desc: 'Comprender el contexto, los desafíos y las prioridades de la organización.' },
                 { step: '02', title: 'Priorizar', desc: 'Identificar los temas que realmente generan valor para la estrategia y los grupos de interés.' },
                 { step: '03', title: 'Diseñar', desc: 'Construir narrativas, herramientas y productos que permitan conectar con las personas.' },
                 { step: '04', title: 'Movilizar', desc: 'Generar conversaciones, contenidos y procesos que impulsen participación y confianza.' },
               ].map((item, idx) => (
                 <div key={idx} className="space-y-4 sm:space-y-6 p-6 sm:p-8 border border-border/40 rounded-sm hover:bg-muted/10 transition-colors">
                    <span className="text-3xl sm:text-4xl font-headline italic text-primary/20 font-bold block">{item.step}</span>
                    <h4 className="text-lg sm:text-xl font-bold font-headline border-b pb-4">{item.title}</h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Multimedia / Videos */}
      <section className="py-24 sm:py-32 bg-black text-white overflow-hidden">
        <div className="section-container mb-16 sm:mb-24">
          <div className="space-y-4 sm:space-y-6">
            <span className="text-primary font-bold text-[10px] tracking-[0.6em] uppercase">DIÁLOGOS TÉCNICOS</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-headline tracking-tighter">Multimedia.</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-black border-t border-l border-white/5">
          {featuredVideos.map((video) => (
            <Dialog key={video.id}>
              <DialogTrigger asChild>
                <div className="group relative bg-black aspect-square overflow-hidden cursor-pointer border-r border-b border-white/5">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover grayscale brightness-[0.3] group-hover:brightness-[0.4] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-10 p-8 sm:p-12 flex flex-col justify-between">
                    <div className="space-y-4 sm:space-y-6">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 block">VIDEO</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">REPRODUCIR</span>
                      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all shadow-2xl">
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-6xl p-0 bg-black aspect-video border-0 shadow-2xl overflow-hidden rounded-sm">
                <DialogHeader>
                  <DialogTitle className="sr-only">{video.title}</DialogTitle>
                  <DialogDescription className="sr-only">Reproductor de video para {video.title}</DialogDescription>
                </DialogHeader>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  title={video.title}
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>
    </div>
  );
}
