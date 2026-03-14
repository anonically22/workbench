import { useState, useMemo } from 'react';

const ROLES = [
    { role: 'alert', type: 'Live Region', desc: 'A live region with important, time-sensitive information.', usage: 'Error messages, notifications that need immediate attention.', example: '<div role="alert">Form saved successfully</div>' },
    { role: 'alertdialog', type: 'Window', desc: 'A dialog containing an alert message that requires user response.', usage: 'Confirmation dialogs for destructive actions.', example: '<div role="alertdialog" aria-labelledby="title">...</div>' },
    { role: 'application', type: 'Document Structure', desc: 'Declares a region as a web application rather than a document.', usage: 'Complex interactive widgets like spreadsheets or code editors.', example: '<div role="application">...</div>' },
    { role: 'banner', type: 'Landmark', desc: 'Site-oriented content at the top of the page.', usage: 'Main site header with logo and primary navigation.', example: '<header role="banner">...</header>' },
    { role: 'button', type: 'Widget', desc: 'A clickable element that triggers an action.', usage: 'Non-<button> elements styled as buttons.', example: '<div role="button" tabindex="0">Click me</div>' },
    { role: 'checkbox', type: 'Widget', desc: 'A checkable input with true/false/mixed states.', usage: 'Custom checkbox implementations.', example: '<div role="checkbox" aria-checked="true">✓</div>' },
    { role: 'complementary', type: 'Landmark', desc: 'Supporting content related to the main content.', usage: 'Sidebars with related links or additional info.', example: '<aside role="complementary">...</aside>' },
    { role: 'contentinfo', type: 'Landmark', desc: 'Information about the page such as copyright and privacy.', usage: 'Page footer with legal info and links.', example: '<footer role="contentinfo">...</footer>' },
    { role: 'dialog', type: 'Window', desc: 'A dialog box or window overlaid on the page.', usage: 'Modal dialogs, popups, settings panels.', example: '<div role="dialog" aria-labelledby="title" aria-modal="true">...</div>' },
    { role: 'feed', type: 'Document Structure', desc: 'A scrollable list of articles.', usage: 'Social media feeds, news article lists.', example: '<div role="feed" aria-label="News feed">...</div>' },
    { role: 'form', type: 'Landmark', desc: 'A region containing form elements.', usage: 'Form containers that need to be identified as landmarks.', example: '<form role="form" aria-label="Contact">...</form>' },
    { role: 'grid', type: 'Widget', desc: 'An interactive table-like structure.', usage: 'Data grids with interactive cells, spreadsheet-like UIs.', example: '<table role="grid">...</table>' },
    { role: 'heading', type: 'Document Structure', desc: 'A heading for a section of the page.', usage: 'Non-heading elements that act as headings.', example: '<div role="heading" aria-level="2">Title</div>' },
    { role: 'img', type: 'Document Structure', desc: 'A container for a collection of image elements.', usage: 'Complex images composed of multiple elements.', example: '<div role="img" aria-label="Bar chart">...</div>' },
    { role: 'link', type: 'Widget', desc: 'An interactive reference to an internal or external resource.', usage: 'Non-<a> elements that navigate the user.', example: '<span role="link" tabindex="0">Go to page</span>' },
    { role: 'list', type: 'Document Structure', desc: 'A section containing list items.', usage: 'Non-<ul>/<ol> elements displaying lists.', example: '<div role="list">...</div>' },
    { role: 'listbox', type: 'Widget', desc: 'A widget that allows selecting one or more items from a list.', usage: 'Custom select dropdowns, multi-select UIs.', example: '<ul role="listbox" aria-label="Colors">...</ul>' },
    { role: 'log', type: 'Live Region', desc: 'A live region where new information is added in sequence.', usage: 'Chat logs, activity feeds, console output.', example: '<div role="log" aria-live="polite">...</div>' },
    { role: 'main', type: 'Landmark', desc: 'The main content area of the document.', usage: 'Primary content area, one per page.', example: '<main role="main">...</main>' },
    { role: 'marquee', type: 'Live Region', desc: 'Non-essential information that changes frequently.', usage: 'Stock tickers, scrolling news banners.', example: '<div role="marquee">...</div>' },
    { role: 'menu', type: 'Widget', desc: 'A widget offering a list of choices.', usage: 'Context menus, dropdown action menus.', example: '<ul role="menu">...</ul>' },
    { role: 'menubar', type: 'Widget', desc: 'A horizontal menu bar typically at the top of an application.', usage: 'Application menu bars like File, Edit, View.', example: '<nav role="menubar">...</nav>' },
    { role: 'menuitem', type: 'Widget', desc: 'An option in a menu.', usage: 'Individual items within role="menu".', example: '<li role="menuitem">Save</li>' },
    { role: 'navigation', type: 'Landmark', desc: 'A collection of navigational elements.', usage: 'Primary and secondary navigation menus.', example: '<nav role="navigation" aria-label="Main">...</nav>' },
    { role: 'none', type: 'Document Structure', desc: 'An element with no semantic meaning (removes implicit role).', usage: 'Presentational elements that should be ignored by assistive tech.', example: '<img role="none" />' },
    { role: 'note', type: 'Document Structure', desc: 'A section whose content is parenthetic or ancillary to the main.', usage: 'Footnotes, tips, side notes.', example: '<div role="note">Tip: use keyboard shortcuts</div>' },
    { role: 'progressbar', type: 'Widget', desc: 'Displays the progress of a long-running task.', usage: 'File upload progress, loading indicators.', example: '<div role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>' },
    { role: 'radio', type: 'Widget', desc: 'A checkable input where only one in a group can be checked.', usage: 'Custom radio button groups.', example: '<div role="radio" aria-checked="true">Option A</div>' },
    { role: 'radiogroup', type: 'Widget', desc: 'A group of radio buttons.', usage: 'Container for a set of radio inputs.', example: '<div role="radiogroup" aria-label="Size">...</div>' },
    { role: 'region', type: 'Landmark', desc: 'A perceivable section with a specific purpose.', usage: 'Generic labeled landmark sections.', example: '<section role="region" aria-label="Stats">...</section>' },
    { role: 'search', type: 'Landmark', desc: 'A landmark for search functionality.', usage: 'Search forms and related controls.', example: '<form role="search">...</form>' },
    { role: 'separator', type: 'Document Structure', desc: 'A divider separating groups of content.', usage: 'Visual and semantic separators.', example: '<hr role="separator" />' },
    { role: 'slider', type: 'Widget', desc: 'An input that allows selecting a value from a range.', usage: 'Custom range sliders, volume controls.', example: '<div role="slider" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">...</div>' },
    { role: 'spinbutton', type: 'Widget', desc: 'A range input that allows cycling through values.', usage: 'Numeric steppers, quantity selectors.', example: '<input role="spinbutton" aria-valuenow="5" />' },
    { role: 'status', type: 'Live Region', desc: 'A live region for advisory information.', usage: 'Status messages, connection indicators.', example: '<div role="status">Saved</div>' },
    { role: 'switch', type: 'Widget', desc: 'A toggle that represents on/off values.', usage: 'Custom toggle switches.', example: '<button role="switch" aria-checked="true">Dark mode</button>' },
    { role: 'tab', type: 'Widget', desc: 'A tab in a tabbed interface.', usage: 'Individual tab buttons in a tab bar.', example: '<button role="tab" aria-selected="true">Tab 1</button>' },
    { role: 'tablist', type: 'Widget', desc: 'A list of tab elements.', usage: 'Container for tab buttons.', example: '<div role="tablist">...</div>' },
    { role: 'tabpanel', type: 'Widget', desc: 'A container for the content associated with a tab.', usage: 'The content area that changes when tabs are selected.', example: '<div role="tabpanel">...</div>' },
    { role: 'textbox', type: 'Widget', desc: 'An input that allows free-form text.', usage: 'Custom text inputs, contenteditable areas.', example: '<div role="textbox" contenteditable="true">...</div>' },
    { role: 'timer', type: 'Live Region', desc: 'A numerical counter indicating elapsed time.', usage: 'Countdown timers, session timers.', example: '<div role="timer">05:00</div>' },
    { role: 'toolbar', type: 'Document Structure', desc: 'A collection of commonly used functions in a compact form.', usage: 'Editor toolbars, action button groups.', example: '<div role="toolbar" aria-label="Formatting">...</div>' },
    { role: 'tooltip', type: 'Widget', desc: 'A popup that displays information related to an element.', usage: 'Hover/focus tooltips with supplementary info.', example: '<div role="tooltip">This button saves your work</div>' },
    { role: 'tree', type: 'Widget', desc: 'A widget that allows selecting from a hierarchical list.', usage: 'File browsers, nested navigation menus.', example: '<ul role="tree">...</ul>' },
    { role: 'treeitem', type: 'Widget', desc: 'An item in a tree.', usage: 'Individual items within a tree structure.', example: '<li role="treeitem">Documents</li>' },
];

const TYPES = ['All', 'Landmark', 'Widget', 'Live Region', 'Document Structure', 'Window'];

export default function AriaRoleReference() {
    const [search, setSearch] = useState('');
    const [activeType, setActiveType] = useState('All');
    const [expanded, setExpanded] = useState(null);

    const filtered = useMemo(() => {
        return ROLES.filter(r => {
            const matchType = activeType === 'All' || r.type === activeType;
            const matchSearch = !search ||
                r.role.toLowerCase().includes(search.toLowerCase()) ||
                r.desc.toLowerCase().includes(search.toLowerCase()) ||
                r.usage.toLowerCase().includes(search.toLowerCase());
            return matchType && matchSearch;
        });
    }, [search, activeType]);

    const handleCopy = (text) => navigator.clipboard.writeText(text);

    return (
        <div className="space-y-6">
            {/* Search + Filter */}
            <div className="border-2 border-black bg-white p-4">
                <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search roles, descriptions, or use cases..."
                    className="w-full border-2 border-black px-4 py-2.5 text-xs font-bold uppercase tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-accent" />
            </div>

            <div className="flex flex-wrap gap-2">
                {TYPES.map(t => (
                    <button key={t} onClick={() => setActiveType(t)}
                        className={`px-4 py-2 border-2 text-xs font-black uppercase tracking-widest transition-colors ${
                            activeType === t ? 'bg-black text-white border-black' : 'border-slate-300 hover:border-black'
                        }`}>{t}</button>
                ))}
            </div>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{filtered.length} role{filtered.length !== 1 ? 's' : ''} found</p>

            {/* Role Cards */}
            <div className="space-y-3">
                {filtered.map(r => (
                    <div key={r.role} className="border-2 border-black bg-white transition-colors">
                        <button
                            onClick={() => setExpanded(expanded === r.role ? null : r.role)}
                            className="w-full text-left p-4 flex items-center gap-4"
                        >
                            <code className="text-sm font-mono font-bold text-accent flex-shrink-0">role="{r.role}"</code>
                            <span className="text-[10px] px-2 py-0.5 border border-slate-200 font-bold uppercase tracking-widest text-slate-400 flex-shrink-0">{r.type}</span>
                            <span className="text-xs text-slate-500 font-bold truncate flex-1">{r.desc}</span>
                            <span className="text-slate-400 text-sm">{expanded === r.role ? '▲' : '▼'}</span>
                        </button>
                        {expanded === r.role && (
                            <div className="border-t-2 border-black p-4 space-y-3 bg-slate-50">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">When to Use</p>
                                    <p className="text-xs font-bold text-slate-600">{r.usage}</p>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Example</p>
                                        <button onClick={() => handleCopy(r.example)}
                                            className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">Copy</button>
                                    </div>
                                    <code className="block text-xs font-mono bg-white border border-slate-200 p-3 break-all">{r.example}</code>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
