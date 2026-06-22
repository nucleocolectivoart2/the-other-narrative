
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ExperienciaPage() {
  const bannerImage = PlaceHolderImages.find(img => img.id === 'experiencia-bg');

  return (
    <div className="bg-background min-h-screen">
      <section className="relative h-[70vh] w-full flex items-end pb-24 overflow-hidden border-b bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage?.imageUrl || 'https://images.pexels.com/photos/631909/pexels-photo-631909.jpeg'}
            alt="Áreas de Trabajo"
            fill
            className="object-cover opacity-75 transition-all duration-[5000ms] animate-in fade-in zoom-in-110"
            priority
          />
        </div>
        <div className="section-container relative z-10 w-full text-white">
          <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block animate-in slide-in-from-bottom-4 duration-700">Capítulo 02</span>
          <div className="max-w-4xl animate-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-[0.9] mb-8 tracking-tighter text-white">
              Áreas de <br />
              <span className="italic font-normal text-primary">Trabajo.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="section-container py-24">
        {/* Row 1: Estrategia & Membresía */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-primary font-bold text-[10px] tracking-[0.4em] uppercase">01</span>
              <h3 className="text-3xl font-bold font-headline tracking-tighter">Estrategia y Priorización</h3>
              <ul className="space-y-4 text-sm font-light text-foreground/60 leading-relaxed border-l border-primary/20 pl-8">
                <li>• Alineación entre estrategia de negocio y sostenibilidad</li>
                <li>• Identificación de prioridades estratégicas</li>
                <li>• Diseño de hojas de ruta de comunicación</li>
                <li>• Arquitectura de mensajes</li>
                <li>• Narrativas institucionales</li>
                <li>• Comunicación para procesos de transformación</li>
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-primary font-bold text-[10px] tracking-[0.4em] uppercase">02</span>
              <h3 className="text-3xl font-bold font-headline tracking-tighter text-balance">Comunicación para Organizaciones de Membresía</h3>
              <ul className="space-y-4 text-sm font-light text-foreground/60 leading-relaxed border-l border-primary/20 pl-8">
                <li>• Estrategias de comunicación para gremios</li>
                <li>• Comunicación para cooperativas</li>
                <li>• Comunicación para asociaciones empresariales</li>
                <li>• Estrategias de engagement</li>
                <li>• Boletines y contenidos para afiliados</li>
                <li>• Fortalecimiento de identidad colectiva</li>
                <li>• Programas de participación y conversación</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Row 2: Laboratorio Editorial & Formación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 border-t pt-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold text-[10px] tracking-[0.4em] uppercase">03</span>
              </div>
              <h3 className="text-3xl font-bold font-headline tracking-tighter">Laboratorio Editorial</h3>
              <ul className="space-y-4 text-sm font-light text-foreground/60 leading-relaxed border-l border-primary/20 pl-8">
                <li>• Podcasts (Planeta Sostenible)</li>
                <li>• Libros digitales</li>
                <li>• Revistas institucionales</li>
                <li>• Newsletters estratégicos</li>
                <li>• Entrevistas de liderazgo</li>
                <li>• Casos de éxito y memorias de impacto</li>
                <li>• Artículos de liderazgo de pensamiento</li>
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold text-[10px] tracking-[0.4em] uppercase">04</span>
              </div>
              <h3 className="text-3xl font-bold font-headline tracking-tighter">Formación</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-l border-primary/20 pl-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Conferencias</h4>
                  <ul className="space-y-2 text-xs font-light text-foreground/60 italic">
                    <li>• Cómo comunicar la sostenibilidad</li>
                    <li>• Periodismo de soluciones</li>
                    <li>• Narrativas que generan confianza</li>
                    <li>• Liderazgo y comunicación</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Talleres</h4>
                  <ul className="space-y-2 text-xs font-light text-foreground/60 italic">
                    <li>• Diseño de narrativas</li>
                    <li>• Comunicación interna</li>
                    <li>• Escritura estratégica</li>
                    <li>• Storytelling organizacional</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-24 border-t mt-32">
          <Link href="/conciencia" className="btn-editorial btn-editorial-outline group">
            <ArrowLeft className="mr-4 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 01 Mirada
          </Link>
          <Link href="/accion" className="btn-editorial btn-editorial-primary">
            03 Proceso <ArrowRight className="ml-4 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
