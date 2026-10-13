import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, ShieldCheck, Feather, Wrench, Globe2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import heroImage from '@/assets/bike-hero.jpg';
import gravelImage from '@/assets/gravel-bike.jpg';
import mountainImage from '@/assets/mountain-bike.jpg';
import storyImage from '@/assets/ride-story.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'VELO — Bikes for the ride' },
    { name: 'description', content: 'Explore the VELO collection of road, gravel and mountain bikes. Exceptional design for wherever the ride takes you.' },
    { property: 'og:title', content: 'VELO — Bikes for the ride' },
    { property: 'og:description', content: 'Discover beautifully crafted road, gravel and mountain bikes.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
const bikes = [
  { name: 'Aero One', category: 'Road', image: heroImage, label: 'THE FLAGSHIP', description: 'Less resistance. More possibility.', frame: 'Carbon fiber', weight: '7.4 kg', gears: '2 × 12 speed', terrain: 'Road & racing', color: 'Carbon black' },
  { name: 'Terra Allroad', category: 'Gravel', image: gravelImage, label: 'GO ANYWHERE', description: 'The best roads aren’t always roads.', frame: 'Carbon fiber', weight: '8.9 kg', gears: '1 × 12 speed', terrain: 'Gravel & adventure', color: 'Forest olive' },
  { name: 'Summit Trail', category: 'Mountain', image: mountainImage, label: 'BUILT FOR THE WILD', description: 'Find your line. Make it your own.', frame: 'Alloy', weight: '13.2 kg', gears: '1 × 12 speed', terrain: 'Trails & mountains', color: 'Glacier blue' },
];
type Bike = typeof bikes[number];
function Index() {
  const [category, setCategory] = useState('All bikes');
  const [selected, setSelected] = useState<Bike | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const visibleBikes = bikes.filter(bike => category === 'All bikes' || bike.category === category);
  function browse(filter = 'All bikes') { setCategory(filter); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }
  return <>
    <header className="site-header">
      <a href="/" className="wordmark" aria-label="VELO home">VELO<span className="wordmark-dot">.</span></a>
      <nav className="header-nav" aria-label="Main navigation">
        <Button variant="ghost" className="desktop-nav" onClick={() => browse()}>Our bikes</Button>
        <Button variant="ghost" className="desktop-nav" onClick={() => setStoryOpen(true)}>The VELO story</Button>
        <Button variant="ghost" className="desktop-nav" onClick={() => browse('Gravel')}>Find your ride</Button>
      </nav>
      <Button variant="outline" onClick={() => browse()}>Explore bikes <ArrowUpRight /></Button>
    </header>
    <main>
      <section className="hero">
        <img src={heroImage} className="hero-image" alt="Matte black Aero One road bike with carbon wheels and tan-wall tires" width={1536} height={1024} fetchPriority="high" />
        <div className="hero-content">
          <div className="eyebrow">Engineered for the everyday escape</div>
          <h1>Bikes for<br />the ride.</h1>
          <p className="hero-copy">The early starts. The long way home.<br />The moments that move you.<br />Find a bike that feels like you.</p>
          <Button size="lg" onClick={() => browse()}>Discover the collection <ArrowUpRight /></Button>
        </div>
        <div className="hero-bottom">
          <div className="hero-index"><strong>01</strong><i /><span>03</span></div>
          <div className="hero-caption"><strong>AERO ONE</strong><br />Pure carbon. Pure possibility.</div>
        </div>
      </section>
      <section className="values-strip" aria-label="Our approach">
        <div className="value"><Feather /><div>Thoughtfully engineered<span>Every gram has a purpose</span></div></div>
        <div className="value"><ShieldCheck /><div>Made to go the distance<span>Quality without compromise</span></div></div>
        <div className="value"><Wrench /><div>Precision in every detail<span>From the frame to the finish</span></div></div>
        <div className="value"><Globe2 /><div>One planet. More exploring.<span>Powered by you</span></div></div>
      </section>
      <section className="collection" id="collection">
        <div className="section-heading"><div><div className="eyebrow">The collection</div><h2>Your next chapter starts here.</h2></div><p>Different paths. The same love of the ride.</p></div>
        <div className="collection-tools"><div className="filter-tabs" role="tablist" aria-label="Bike categories">{['All bikes','Road','Gravel','Mountain'].map(filter => <Button key={filter} variant="ghost" role="tab" aria-selected={category === filter} data-active={category === filter} onClick={() => setCategory(filter)}>{filter}</Button>)}</div><span className="result-count">{visibleBikes.length.toString().padStart(2,'0')} bikes to explore</span></div>
        <div className="bike-grid">{visibleBikes.map(bike => <article className="bike-card" key={bike.name}>
          <div className="bike-image-wrap"><img src={bike.image} className={`bike-image ${bike.category === 'Road' ? 'road-image' : ''}`} alt={`${bike.color} ${bike.name} ${bike.category.toLowerCase()} bike`} width={1024} height={768} loading="lazy" /><span className="bike-label">{bike.label}</span></div>
          <div className="bike-detail"><div className="bike-category">{bike.category}</div><div className="bike-title-row"><h3>{bike.name}</h3><Button variant="ghost" size="icon" title={`Explore ${bike.name}`} aria-label={`Explore ${bike.name}`} onClick={() => setSelected(bike)}><ArrowUpRight /></Button></div><p>{bike.description}</p><div className="bike-specs"><span>{bike.frame} frame</span><strong>{bike.weight}</strong></div></div>
        </article>)}</div>
        <div className="collection-bottom"><Button variant="outline" size="lg" onClick={() => category !== 'All bikes' ? setCategory('All bikes') : setSelected(bikes[0] ?? null)}>{category !== 'All bikes' ? 'View all bikes' : 'Meet the Aero One'} <ArrowRight /></Button></div>
      </section>
      <section className="story-banner"><img src={storyImage} alt="Two cyclists exploring a winding coastal road by the sea" width={1536} height={1024} loading="lazy" /><div className="story-content"><div className="eyebrow">More than a bike</div><h2>Life looks better<br />from the saddle.</h2><p>We believe the best things happen when you get out there. Less scrolling. More rolling.</p><Button variant="inverse" size="lg" onClick={() => setStoryOpen(true)}>The VELO story <ArrowUpRight /></Button></div></section>
    </main>
    <footer className="site-footer"><a href="/" className="wordmark" aria-label="VELO home">VELO<span className="wordmark-dot">.</span></a><p>Made for the love of riding.</p><p>© 2026 VELO. All rights reserved.</p></footer>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="max-h-[90vh] overflow-y-auto">{selected && <><div className="bike-category">{selected.category} collection</div><DialogTitle className="text-3xl font-display">{selected.name}</DialogTitle><DialogDescription>{selected.description}</DialogDescription><img src={selected.image} alt={selected.name} className="detail-photo" width={1024} height={768} /><div className="spec-grid">{[['Frame', selected.frame],['Weight',selected.weight],['Drivetrain',selected.gears],['Made for',selected.terrain],['Finish',selected.color],['Frame sizes','XS · S · M · L · XL']].map(([label,value]) => <div key={label}>{label}<strong>{value}</strong></div>)}</div></>}</DialogContent></Dialog>
    <Dialog open={storyOpen} onOpenChange={setStoryOpen}><DialogContent className="max-h-[90vh] overflow-y-auto"><div className="eyebrow">Our philosophy</div><DialogTitle className="text-3xl font-display">For the love of riding.</DialogTitle><DialogDescription>Not just the destination. Everything in between.</DialogDescription><img src={storyImage} alt="Cyclists on a coastal adventure" className="detail-photo" width={1536} height={1024} /><p className="text-sm leading-7 text-muted-foreground">VELO is a celebration of the simple joy of two wheels. The quiet morning miles, the unexplored trail, the climb that’s worth the view. Our collection brings thoughtful design and purposeful engineering to every kind of ride.</p><Button onClick={() => { setStoryOpen(false); browse(); }}>Find your next ride <Plus /></Button></DialogContent></Dialog>
  </>;
}
