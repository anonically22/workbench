import { useState } from 'react';
import { Type, Copy, RefreshCw, FileText, Info, Eye } from 'lucide-react';

export default function MarkdownPreviewer() {
    const [text, setText] = useState('# Hello Workbench\n\nThis is a **markdown** previewer.\n\n- Local tools\n- 100% Client-side\n- Privacy focused');

    // Extremely basic markdown to HTML for demonstration without heavy deps
    const render = (md) => {
        let html = md;
        html = html.replace(/^# (.*)/gm, '<h1 class="text-3xl font-black mb-4">$1</h1>');
        html = html.replace(/^## (.*)/gm, '<h2 class="text-2xl font-black mb-3">$1</h2>');
        html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\[(.*)\]\((.*)\)/g, '<a href="$2" class="text-primary underline font-bold">$1</a>');
        html = html.replace(/^- (.*)/gm, '<li class="ml-4 list-disc mb-1">$1</li>');
        html = html.replace(/\n\n/g, '<p class="mb-4"></p>');
        return html;
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Markdown Input</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-[500px] p-8 rounded-[40px] border-2 border-border bg-background focus:border-primary outline-none transition-all font-mono text-sm leading-relaxed"
                    placeholder="# Title..."
                />
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Live Preview</label>
                <div className="bg-sidebar p-10 rounded-[40px] h-[500px] overflow-y-auto border border-border shadow-inner relative group">
                    <div
                        className="prose prose-slate max-w-none text-text-primary"
                        dangerouslySetInnerHTML={{ __html: render(text) }}
                    />
                    <div className="absolute top-6 right-6 p-3 bg-white rounded-2xl shadow-sm border border-border text-primary">
                        <Eye size={18} />
                    </div>
                </div>

                <div className="p-6 bg-white border border-border rounded-3xl flex items-center gap-4">
                    <Info className="text-primary shrink-0" size={20} />
                    <p className="text-[11px] text-text-secondary">
                        Workbench processes markdown instantaneously. Perfect for drafting GitHub readmes or blog posts without context-switching.
                    </p>
                </div>
            </div>
        </div>
    );
}
