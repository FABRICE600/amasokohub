import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Dashboard from '@/components/Dashboard';
import Trust from '@/components/Trust';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Stats />
      <Dashboard />
      <Trust />
      <Footer />
    </div>
  );
}