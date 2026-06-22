
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, ArrowLeft, Loader2, User, MessageCircleQuestion } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const firestore = useFirestore();
  const [formattedDate, setFormattedDate] = useState<string>('');

  const articleQuery = useMemoFirebase(() => {
    if (!slug) return null;
    return query(
      collection(firestore, 'contentItems'), 
      where('slug', '==', slug),
      limit(1)
    );
  }, [firestore, slug]);

  const { data: firestoreArticles, isLoading } = useCollection(articleQuery);
  
  const article = firestoreArticles?.[0];
  
  const defaultImage = PlaceHolderImages.find(img => img.id === 'bitacora')?.imageUrl || '';

  useEffect(() => {
    if (article?.date) {
      setFormattedDate(new Date(article.date).toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      }));
    }
  }, [article?.date]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold font-headline">Esta historia aún no ha sido escrita</h1>
        <Link href="/blog" className="btn-editorial btn-editorial-primary">Volver a la Bitácora</Link>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen pb-32">
      <section className="relative h-[80vh] w-full flex items-end pb-24 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={article?.image || defaultImage}
            alt={article?.title || ''}
            fill
            className="object-cover opacity-75 transition-all duration-[5000ms] animate-in fade-in zoom-in-110"
            priority
          />
        </div>
        <div className="section-container relative z-10 w-full text-white">
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-8 duration-1000">
            <span className="bg-primary text-white text-[9px] font-bold px-4 py-2 uppercase tracking-[0.4em] inline-block shadow-2xl">
              {article?.type}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-[0.9] tracking-tighter text-white">
              {article?.title}
            </h1>
            <div className="flex flex-wrap gap-8 pt-4 text-white/60 text-[10px] font-bold uppercase tracking-widest">
               <div className="flex items-center gap-3">
                 <User className="h-4 w-4 text-primary" /> 
                 <div className="flex flex-col">
                   <span>{article?.authorName || 'Ángela Gómez'}</span>
                   <span className="opacity-50 text-[8px] tracking-widest lowercase italic">{article?.authorTitle || 'Periodista en Sostenibilidad'}</span>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <CalendarDays className="h-4 w-4 text-primary" /> 
                 {formattedDate}
               </div>
               <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-primary" /> {article?.readTime || 8} min de lectura</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[5]" />
      </section>

      <article className="section-container py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="relative border-l-4 border-primary/20 pl-10">
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/70 italic">
                {article?.excerpt}
              </p>
            </div>

            <div 
              className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-headline prose-headings:tracking-tighter prose-headings:font-bold
                prose-p:font-light prose-p:leading-relaxed prose-p:text-foreground/80
                prose-strong:text-primary prose-strong:font-bold
                prose-blockquote:border-primary/30 prose-blockquote:bg-muted/30 prose-blockquote:px-8 prose-blockquote:py-2 prose-blockquote:rounded-sm
                prose-hr:border-primary/20 prose-hr:my-12"
              dangerouslySetInnerHTML={{ __html: article?.body || '' }}
            />

            <div className="mt-24 pt-16 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-12">
              <Link href="/blog" className="btn-editorial btn-editorial-outline group">
                <ArrowLeft className="mr-4 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Volver a la Bitácora
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-32">
            <div className="bg-muted/30 p-10 rounded-sm space-y-6">
              <div className="flex items-center gap-3 text-primary mb-4">
                <MessageCircleQuestion className="h-5 w-5" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em]">Hablemos de esto</h4>
              </div>
              <p className="text-sm font-light leading-relaxed text-foreground/60 italic">
                ¿Qué opinas sobre este desafío? Me encantaría conocer cómo habitas tú la verdad en tu organización.
              </p>
              <Link href="/contacto" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                Iniciar conversación →
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
