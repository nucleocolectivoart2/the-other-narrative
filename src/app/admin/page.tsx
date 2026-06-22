
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  LogOut, 
  Plus, 
  Sparkles, 
  Radio, 
  Loader2, 
  Send,
  ShieldAlert,
  BookOpen,
  Trash2,
  Type,
  Quote as QuoteIcon,
  Pencil,
  Heading3,
  ChevronDown,
  ChevronUp,
  Bold,
  Italic,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react';
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase, useCollection } from '@/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, doc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { editorialAssistant, type EditorialOutput } from '@/ai/flows/editorial-assistant-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';

const AUTHORIZED_EMAILS = ['angelamgomez@gmail.com', 'nucleo.colectivo.art@gmail.com'];

type BlockType = 'title' | 'text' | 'quote';
type Alignment = 'left' | 'center' | 'right' | 'justify';

interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  alignment: Alignment;
}

/**
 * Componente de Bloque Editable (WYSIWYG)
 * Permite editar el contenido viendo el formato final.
 */
function EditableBlock({ 
  block, 
  onChange, 
  onRemove, 
  onMove 
}: { 
  block: ContentBlock; 
  onChange: (content: string, alignment: Alignment) => void;
  onRemove: () => void;
  onMove: (dir: 'up' | 'down') => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML, block.alignment);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML, block.alignment);
    }
  };

  const setAlignment = (align: Alignment) => {
    onChange(block.content, align);
  };

  return (
    <div className="group relative bg-white border border-border/40 rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-500 mb-8">
      {/* Controles Flotantes Laterales */}
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white border" onClick={() => onMove('up')}><ChevronUp className="h-4" /></Button>
        <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-lg" onClick={onRemove}><Trash2 className="h-3.5" /></Button>
        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white border" onClick={() => onMove('down')}><ChevronDown className="h-4" /></Button>
      </div>

      {/* Barra de Herramientas Estilo Editorial */}
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <div className="bg-[#FAF7F2] text-primary px-4 py-1.5 rounded-full flex items-center gap-2 border border-primary/10">
          <Type className="h-3 w-3" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
            {block.type === 'title' ? 'TÍTULO' : block.type === 'quote' ? 'CITA' : 'PÁRRAFO'}
          </span>
        </div>
        
        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => execCommand('bold')} title="Negrita"><Bold className="h-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => execCommand('italic')} title="Cursiva"><Italic className="h-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => execCommand('backColor', '#FFF9C4')} title="Resaltar"><Highlighter className="h-3.5" /></Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Button variant={block.alignment === 'left' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setAlignment('left')}><AlignLeft className="h-3.5" /></Button>
          <Button variant={block.alignment === 'center' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setAlignment('center')}><AlignCenter className="h-3.5" /></Button>
          <Button variant={block.alignment === 'right' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setAlignment('right')}><AlignRight className="h-3.5" /></Button>
          <Button variant={block.alignment === 'justify' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setAlignment('justify')}><AlignJustify className="h-3.5" /></Button>
        </div>
      </div>

      {/* Área Editable WYSIWYG */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: block.content }}
        className={cn(
          "outline-none min-h-[40px] transition-all duration-300",
          block.type === 'title' && "text-2xl font-headline font-bold tracking-tight",
          block.type === 'quote' && "text-xl italic font-headline border-l-4 border-primary pl-6 py-2 bg-muted/10",
          block.type === 'text' && "text-base font-light leading-relaxed",
          block.alignment === 'left' && "text-left",
          block.alignment === 'center' && "text-center",
          block.alignment === 'right' && "text-right",
          block.alignment === 'justify' && "text-justify"
        )}
      />
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const firestore = useFirestore();

  const adminDocRef = useMemoFirebase(() => user ? doc(firestore, 'adminRoles', user.uid) : null, [firestore, user]);
  const { data: adminData, isLoading: isAdminLoading } = useDoc(adminDocRef);

  const isAuthorized = adminData?.isAdmin || (user?.email && AUTHORIZED_EMAILS.includes(user.email));

  const [activeTab, setActiveTab] = useState('overview');
  const [activeForm, setActiveForm] = useState<'none' | 'podcast' | 'project' | 'blog' | 'resource'>('none');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // AI Assistant State
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState<EditorialOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogType, setBlogType] = useState('Reflexión');
  const [blogImage, setBlogImage] = useState('');
  const [blogAuthorName, setBlogAuthorName] = useState('Ángela María Gómez Duque');
  const [blogAuthorTitle, setBlogAuthorTitle] = useState('Periodista experta en sostenibilidad');
  const [blocks, setBlocks] = useState<ContentBlock[]>([{ id: 'init-1', type: 'text', content: '', alignment: 'justify' }]);

  // Podcast State
  const [podTitle, setPodTitle] = useState('');
  const [podDescription, setPodDescription] = useState('');
  const [podUrl, setPodUrl] = useState('');
  const [podGuest, setPodGuest] = useState('');

  // Collections
  const blogQuery = useMemoFirebase(() => query(collection(firestore, 'contentItems'), orderBy('date', 'desc')), [firestore]);
  const { data: blogItems } = useCollection(blogQuery);
  const podcastQuery = useMemoFirebase(() => query(collection(firestore, 'podcasts'), orderBy('createdAt', 'desc')), [firestore]);
  const { data: podItems } = useCollection(podcastQuery);

  useEffect(() => {
    if (!isUserLoading && !user) router.push('/login');
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const addBlock = (type: BlockType) => {
    setBlocks([...blocks, { id: Math.random().toString(36).substr(2, 9), type, content: '', alignment: type === 'text' ? 'justify' : 'left' }]);
  };

  const updateBlock = (id: string, content: string, alignment: Alignment) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content, alignment } : b));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const parseHtmlToBlocks = (html: string): ContentBlock[] => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const parsed: ContentBlock[] = [];
    
    Array.from(tempDiv.children).forEach((child, i) => {
      const id = `parsed-${i}-${Math.random().toString(36).substr(2, 5)}`;
      let alignment: Alignment = 'left';
      if (child.classList.contains('text-center')) alignment = 'center';
      if (child.classList.contains('text-right')) alignment = 'right';
      if (child.classList.contains('text-justify')) alignment = 'justify';

      if (child.tagName === 'H3') {
        parsed.push({ id, type: 'title', content: child.innerHTML, alignment });
      } else if (child.tagName === 'BLOCKQUOTE') {
        parsed.push({ id, type: 'quote', content: child.innerHTML, alignment });
      } else {
        parsed.push({ id, type: 'text', content: child.innerHTML, alignment });
      }
    });

    return parsed.length > 0 ? parsed : [{ id: 'fail-safe', type: 'text', content: html, alignment: 'justify' }];
  };

  const generateHtmlFromBlocks = () => {
    return blocks.map(block => {
      const alignClass = `text-${block.alignment}`;
      if (block.type === 'title') return `<h3 class="${alignClass}">${block.content}</h3>`;
      if (block.type === 'quote') return `<blockquote class="${alignClass}">${block.content}</blockquote>`;
      return `<p class="${alignClass}">${block.content}</p>`;
    }).join('\n');
  };

  const startEditingBlog = (item: any) => {
    setEditingId(item.id);
    setBlogTitle(item.title);
    setBlogExcerpt(item.excerpt);
    setBlogType(item.type);
    setBlogImage(item.image);
    setBlogAuthorName(item.authorName || 'Ángela María Gómez Duque');
    setBlogAuthorTitle(item.authorTitle || 'Cargo del Autor');
    setBlocks(parseHtmlToBlocks(item.body));
    setActiveForm('blog');
    setActiveTab('content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setBlogTitle(''); setBlogExcerpt(''); setBlogType('Reflexión'); setBlogImage('');
    setBlocks([{ id: 'reset', type: 'text', content: '', alignment: 'justify' }]);
    setActiveForm('none');
  };

  const saveBlogPost = () => {
    if (!blogTitle) {
      toast({ variant: "destructive", title: "Error", description: "El título es obligatorio." });
      return;
    }
    setIsSaving(true);
    const htmlBody = generateHtmlFromBlocks();
    const slug = blogTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const data = {
      title: blogTitle,
      excerpt: blogExcerpt || '...',
      body: htmlBody,
      type: blogType,
      image: blogImage || 'https://picsum.photos/seed/blog/1200/800',
      authorName: blogAuthorName,
      authorTitle: blogAuthorTitle,
      slug,
      date: new Date().toISOString(),
      updatedAt: serverTimestamp()
    };

    const action = editingId 
      ? updateDoc(doc(firestore, 'contentItems', editingId), data)
      : addDoc(collection(firestore, 'contentItems'), { ...data, createdAt: serverTimestamp() });

    action.then(() => {
      toast({ title: "Éxito", description: "Contenido guardado." });
      cancelEditing();
      setActiveTab('inventory');
    }).finally(() => setIsSaving(false));
  };

  if (isUserLoading || isAdminLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
  if (!user || !isAuthorized) return <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-8"><ShieldAlert className="h-16 w-16 opacity-20" /><h1 className="text-3xl font-bold font-headline">Acceso Restringido</h1><Button onClick={handleLogout}>Cerrar sesión</Button></div>;

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="bg-secondary text-white py-14 mb-12 border-b">
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline tracking-tighter">Panel de Control Editorial</h1>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">Admin: {user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-[9px] font-bold uppercase tracking-widest h-11 px-8"><LogOut className="mr-3 h-3.5" /> Salir</Button>
        </div>
      </div>

      <div className="section-container">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
          <TabsList className="bg-muted/30 p-1.5 rounded-sm border w-full md:w-auto">
            <TabsTrigger value="overview" className="text-[9px] font-bold uppercase tracking-widest px-8">Escritorio</TabsTrigger>
            <TabsTrigger value="inventory" className="text-[9px] font-bold uppercase tracking-widest px-8">Gestión</TabsTrigger>
            <TabsTrigger value="ai" className="text-[9px] font-bold uppercase tracking-widest px-8">Asistente IA</TabsTrigger>
            <TabsTrigger value="content" className="text-[9px] font-bold uppercase tracking-widest px-8">{editingId ? 'Editando' : 'Publicar'}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {[
              { title: 'Bitácora', icon: <BookOpen className="h-4 w-4" />, action: () => { setActiveForm('blog'); setActiveTab('content'); } },
              { title: 'Podcast', icon: <Radio className="h-4 w-4" />, action: () => { setActiveForm('podcast'); setActiveTab('content'); } },
            ].map(item => (
              <Card key={item.title} className="rounded-sm border-border/60 hover:shadow-xl transition-all group">
                <CardHeader className="border-b bg-muted/10 p-8 group-hover:bg-primary/5 transition-colors">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-4">
                    {item.icon} {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Button variant="outline" className="w-full text-[9px] font-bold uppercase h-11 border-dashed hover:border-primary hover:text-primary" onClick={item.action}>
                    <Plus className="mr-2 h-3" /> Crear Nueva
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="inventory" className="animate-in fade-in duration-500">
            <Card className="rounded-sm overflow-hidden border shadow-xl">
               <Tabs defaultValue="inv-blog">
                  <TabsList className="w-full justify-start border-b rounded-none h-16 bg-muted/5 p-0">
                    <TabsTrigger value="inv-blog" className="h-full rounded-none px-12 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary">Bitácora ({blogItems?.length || 0})</TabsTrigger>
                    <TabsTrigger value="inv-pod" className="h-full rounded-none px-12 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary">Podcast ({podItems?.length || 0})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="inv-blog" className="p-0">
                    <Table>
                      <TableHeader className="bg-muted/10">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="pl-12 py-6 text-[10px] font-bold uppercase tracking-widest">Título de la Crónica</TableHead>
                          <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right pr-12">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogItems?.length === 0 ? (
                          <TableRow><TableCell colSpan={2} className="text-center py-24 opacity-40 italic">No hay crónicas publicadas</TableCell></TableRow>
                        ) : (
                          blogItems?.map(item => (
                            <TableRow key={item.id} className="group hover:bg-muted/5 transition-colors border-b">
                              <TableCell className="pl-12 py-8 font-headline text-lg font-bold tracking-tight">{item.title}</TableCell>
                              <TableCell className="text-right pr-12 space-x-4">
                                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-all" onClick={() => startEditingBlog(item)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive transition-all" onClick={() => deleteDoc(doc(firestore, 'contentItems', item.id))}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="inv-pod" className="p-0">
                    <Table>
                      <TableHeader className="bg-muted/10">
                        <TableRow><TableHead className="pl-12 py-6 text-[10px] font-bold uppercase tracking-widest">Episodio</TableHead><TableHead className="text-[10px] font-bold text-right pr-12 uppercase">Acciones</TableHead></TableRow>
                      </TableHeader>
                      <TableBody>
                        {podItems?.map(item => (
                          <TableRow key={item.id} className="border-b">
                            <TableCell className="pl-12 py-8 font-headline text-lg font-bold">{item.title}</TableCell>
                            <TableCell className="text-right pr-12 space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => deleteDoc(doc(firestore, 'podcasts', item.id))}><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
               </Tabs>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-4 space-y-4">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Contenedor Editorial</h3>
                 <div className="grid grid-cols-1 gap-3">
                    <Button variant={activeForm === 'blog' ? 'default' : 'outline'} className="justify-start h-16 px-8 text-[10px] font-bold uppercase tracking-widest rounded-sm" onClick={() => setActiveForm('blog')}><BookOpen className="mr-4 h-4" /> Crónica Narrativa</Button>
                    <Button variant={activeForm === 'podcast' ? 'default' : 'outline'} className="justify-start h-16 px-8 text-[10px] font-bold uppercase tracking-widest rounded-sm" onClick={() => setActiveForm('podcast')}><Radio className="mr-4 h-4" /> Episodio Podcast</Button>
                 </div>
                 {editingId && <Button variant="destructive" className="w-full h-12 text-[10px] font-bold uppercase tracking-widest mt-8" onClick={cancelEditing}>Cancelar Edición</Button>}
               </div>

               <div className="lg:col-span-8">
                 {activeForm === 'blog' && (
                   <div className="space-y-12 animate-in slide-in-from-right-12 duration-500">
                     <Card className="rounded-sm border-border/60 shadow-2xl overflow-hidden">
                        <CardHeader className="bg-muted/10 p-8 border-b"><CardTitle className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4"><BookOpen className="h-4 text-primary" /> Datos de Portada</CardTitle></CardHeader>
                        <CardContent className="p-10 space-y-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3"><Label className="text-[10px] font-bold uppercase opacity-60">Título Principal</Label><Input value={blogTitle} onChange={e => setBlogTitle(e.target.value)} className="h-14 text-xl font-headline font-bold border-b-2 rounded-none focus-visible:ring-0" placeholder="Ej: La verdad en el muelle..." /></div>
                            <div className="space-y-3"><Label className="text-[10px] font-bold uppercase opacity-60">Categoría</Label><Input value={blogType} onChange={e => setBlogType(e.target.value)} className="h-14 border-b-2 rounded-none" /></div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3"><Label className="text-[10px] font-bold uppercase opacity-60">Nombre del Autor</Label><Input value={blogAuthorName} onChange={e => setBlogAuthorName(e.target.value)} className="h-14 border-b-2 rounded-none" /></div>
                            <div className="space-y-3"><Label className="text-[10px] font-bold uppercase opacity-60">Cargo del Autor</Label><Input value={blogAuthorTitle} onChange={e => setBlogAuthorTitle(e.target.value)} className="h-14 border-b-2 rounded-none" /></div>
                          </div>
                          <div className="space-y-3"><Label className="text-[10px] font-bold uppercase opacity-60">URL Imagen (Unsplash o Picsum)</Label><Input value={blogImage} onChange={e => setBlogImage(e.target.value)} className="h-14 border-b-2 rounded-none" placeholder="https://images.unsplash.com/..." /></div>
                          <div className="space-y-3"><Label className="text-[10px] font-bold uppercase opacity-60">Breve Resumen (Cápsula inicial)</Label><Textarea value={blogExcerpt} onChange={e => setBlogExcerpt(e.target.value)} className="min-h-[120px] italic font-light text-lg leading-relaxed border-2 rounded-sm p-6" placeholder="Un resumen que enganche al lector..." /></div>
                        </CardContent>
                     </Card>

                     <div className="space-y-8">
                        <div className="flex items-center justify-between border-b pb-4">
                           <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">Cuerpo del Artículo</h3>
                           <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">Sistema de Bloques WYSIWYG</span>
                        </div>
                        
                        {blocks.map((block, index) => (
                          <EditableBlock 
                            key={block.id}
                            block={block}
                            onChange={(content, alignment) => updateBlock(block.id, content, alignment)}
                            onRemove={() => setBlocks(prev => prev.filter(b => b.id !== block.id))}
                            onMove={(dir) => moveBlock(index, dir)}
                          />
                        ))}

                        <div className="grid grid-cols-3 gap-6 pt-10">
                           <Button variant="outline" className="h-20 border-dashed border-2 hover:border-primary hover:text-primary transition-all flex flex-col gap-3 rounded-sm" onClick={() => addBlock('title')}><Heading3 className="h-5 w-5" /> <span className="text-[9px] font-bold uppercase tracking-widest">Subtítulo</span></Button>
                           <Button variant="outline" className="h-20 border-dashed border-2 hover:border-primary hover:text-primary transition-all flex flex-col gap-3 rounded-sm" onClick={() => addBlock('text')}><Type className="h-5 w-5" /> <span className="text-[9px] font-bold uppercase tracking-widest">Párrafo</span></Button>
                           <Button variant="outline" className="h-20 border-dashed border-2 hover:border-primary hover:text-primary transition-all flex flex-col gap-3 rounded-sm" onClick={() => addBlock('quote')}><QuoteIcon className="h-5 w-5" /> <span className="text-[9px] font-bold uppercase tracking-widest">Cita</span></Button>
                        </div>

                        <Button className="w-full h-18 bg-secondary text-white text-[12px] font-bold uppercase tracking-[0.4em] mt-16 rounded-sm shadow-2xl hover:bg-primary transition-all duration-500 py-6" onClick={saveBlogPost} disabled={isSaving}>
                          {isSaving ? <Loader2 className="animate-spin h-6 w-6" /> : <><Send className="mr-4 h-5" /> {editingId ? 'Actualizar Crónica' : 'Publicar Crónica'}</>}
                        </Button>
                     </div>
                   </div>
                 )}
               </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="animate-in fade-in duration-500">
            {/* Mantener sección IA existente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <Card className="p-10 space-y-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold font-headline">Asistente Editorial</h3>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold uppercase opacity-60">Borrador o Ideas Sueltas</Label>
                    <Textarea value={aiInput} onChange={e => setAiInput(e.target.value)} className="min-h-[400px] font-light leading-relaxed text-base p-8 border-2" placeholder="Escribe aquí los datos técnicos o lo que sucedió en el territorio..." />
                  </div>
                  <Button className="w-full h-16 bg-primary text-[11px] font-bold uppercase tracking-widest" onClick={async () => {
                    if (!aiInput) return;
                    setIsAiLoading(true);
                    try { 
                      const res = await editorialAssistant({ text: aiInput }); 
                      setAiResult(res); 
                      toast({ title: "Narrativa Refinada" });
                    } catch (e) { 
                      toast({ variant: "destructive", title: "Error IA" }); 
                    } finally { 
                      setIsAiLoading(false); 
                    }
                  }} disabled={isAiLoading}>
                    {isAiLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Refinar Narrativa'}
                  </Button>
               </Card>
               {aiResult && (
                 <div className="space-y-8 animate-in slide-in-from-right-8">
                    <Card className="p-12 bg-secondary text-white border-0 shadow-2xl relative overflow-hidden">
                       <QuoteIcon className="absolute -top-4 -left-4 h-24 w-24 opacity-5 text-white" />
                       <div className="relative z-10 space-y-8">
                          <p className="text-2xl font-headline italic leading-relaxed">"{aiResult.refinedText}"</p>
                       </div>
                    </Card>
                    <Button variant="outline" className="w-full h-14 border-2 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white" onClick={() => { 
                      setBlocks([{ id: 'ai-gen', type: 'text', content: aiResult.refinedText, alignment: 'justify' }]); 
                      setActiveForm('blog'); setActiveTab('content'); 
                    }}>Utilizar en Nueva Crónica</Button>
                 </div>
               )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
