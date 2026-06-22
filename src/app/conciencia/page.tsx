"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ShieldCheck, Target, Award, Quote } from 'lucide-react';
import { NarrativeBlock } from '@/components/NarrativeBlock';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ConcienciaPage() {
  const firestore = useFirestore();
  const bannerImage = PlaceHolderImages.find(img => img.id === 'conciencia-bg');

  const testimonialsQuery = useMemoFirebase(() => query(collection(firestore, 'testimonials')), [firestore]);
  const { data: testimonials } = useCollection(testimonialsQuery);

  const mockTestimonials = [
    {
      id: 'mock-t1',
      quote: 'Ángela tiene la capacidad de transformar los datos técnicos en una narrativa que no solo informa, sino que conecta con la esencia de lo que hacemos.',
      authorName: 'Líder de Sostenibilidad',
      authorTitle: 'Organización Internacional'
    },
    {
      id: 'mock-t2',
      quote: 'The Other Narrative nos ayudó a encontrar nuestra propia voz en un entorno de comunicación saturado y complejo.',
      authorName: 'Director Ejecutivo',
      authorTitle: 'Gremio Nacional'
    }
  ];

  const displayTestimonials = (testimonials && testimonials.length > 0) ? testimonials : mockTestimonials;

  return (
    <div className="bg-background min-h-screen">
      <section className="relative h-[70vh] w-full flex items-end pb-24 overflow-hidden border-b bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage?.imageUrl || 'https://images.pexels.com/photos/13730514/pexels-photo-13730514.jpeg'}
            alt="Nuestra Mirada"
            fill
            className="object-cover opacity-75 transition-all duration-[5000ms] animate-in fade-in zoom-in-110"
            priority
          />
        </div>
        <div className="section-container relative z-10 w-full text-white">
          <span className="text-primary font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block animate-in slide-in-from-bottom-4 duration-700">Capítulo 01</span>
          <div className="max-w-4xl animate-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-[0.9] mb-8 tracking-tighter text-white">
              Nuestra <br />
              <span className="italic font-normal text-primary">Mirada.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="section-container py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-7 space-y-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter text-primary/80">El Desafío</h2>
            <p className="text-xl font-light text-foreground/70 leading-relaxed">
              Las organizaciones enfrentan un desafío cada vez mayor: comunicar en medio de la saturación informativa, construir confianza en entornos complejos y conectar sus objetivos de negocio con las expectativas de una sociedad que exige coherencia, transparencia e impacto.
            </p>
            <p className="text-xl font-light text-foreground/70 leading-relaxed">
              En <span className="font-bold text-primary">The Other Narrative</span> ayudamos a organizaciones, gremios, cooperativas, fundaciones, universidades y empresas a transformar conocimiento, propósito y estrategia en narrativas capaces de generar comprensión, participación y acción.
            </p>
          </div>
          
          <div className="lg:col-span-5 bg-muted/20 p-12 space-y-8 rounded-sm h-fit border border-border/40 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-bold font-headline tracking-tighter">Visión Integrada</h3>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">
              <li className="flex items-center gap-3"><Target className="h-3 w-3 text-primary" /> Estrategia</li>
              <li className="flex items-center gap-3"><Target className="h-3 w-3 text-primary" /> Sostenibilidad</li>
              <li className="flex items-center gap-3"><Target className="h-3 w-3 text-primary" /> Cultura organizacional</li>
              <li className="flex items-center gap-3"><Target className="h-3 w-3 text-primary" /> Liderazgo</li>
              <li className="flex items-center gap-3"><Target className="h-3 w-3 text-primary" /> Participación</li>
              <li className="flex items-center gap-3"><Target className="h-3 w-3 text-primary" /> Generación de conocimiento</li>
            </ul>
          </div>
        </div>

        <NarrativeBlock quote className="my-32">
          “La comunicación no es el punto de llegada. Es el puente entre la estrategia y las personas.”
        </NarrativeBlock>

        {/* Testimonials Section */}
        <section className="py-24 border-t border-b border-border/40">
           <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <span className="text-primary font-bold text-[10px] tracking-[0.6em] uppercase">VOCES DE CONFIANZA</span>
                <h3 className="text-3xl sm:text-5xl font-bold font-headline tracking-tighter">Impacto Narrativo</h3>
              </div>

              <Carousel className="w-full">
                <CarouselContent>
                  {displayTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <div className="p-8 sm:p-16 text-center space-y-8">
                        <Quote className="h-8 w-8 text-primary/20 mx-auto" />
                        <p className="text-xl sm:text-2xl md:text-3xl font-light font-headline italic leading-relaxed text-foreground/80">
                          "{testimonial.quote}"
                        </p>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{testimonial.authorName}</p>
                          <p className="text-[9px] font-light uppercase tracking-widest text-muted-foreground">{testimonial.authorTitle}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="left-0 -translate-x-12" />
                  <CarouselNext className="right-0 translate-x-12" />
                </div>
              </Carousel>
           </div>
        </section>

        <div className="pt-24 space-y-12">
          <div className="flex items-center gap-4">
            <Award className="h-6 w-6 text-primary" />
            <h3 className="text-3xl font-bold font-headline tracking-tighter">Sobre The Other Narrative</h3>
          </div>
          <p className="text-lg font-light text-foreground/70 leading-relaxed max-w-4xl">
            The Other Narrative es un laboratorio estratégico y editorial que trabaja en la intersección entre comunicación, sostenibilidad y construcción de confianza. Acompañamos organizaciones que buscan fortalecer sus narrativas, movilizar comunidades y generar conversaciones relevantes para el futuro.
          </p>
        </div>

        <div className="flex justify-between items-center py-24 border-t mt-32">
          <Link href="/" className="btn-editorial btn-editorial-outline group">
            <ArrowLeft className="mr-4 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Inicio
          </Link>
          <Link href="/experiencia" className="btn-editorial btn-editorial-primary">
            02 Áreas de Trabajo <ArrowRight className="ml-4 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
