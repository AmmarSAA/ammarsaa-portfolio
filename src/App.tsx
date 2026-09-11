import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { VideoHubSection } from './components/sections/VideoHubSection';
import { CollaborationSection } from './components/sections/CollaborationSection';
import { Toast } from './components/ui/Toast';
import { useToast } from './hooks/useToast';
import { SITE_CONFIG } from './data/siteData';

function App() {
  const { toast, showToast, hideToast } = useToast();

  const handleFormSuccess = () => {
    showToast(
      `Success! ${SITE_CONFIG.name}'s team will contact you soon.`,
      'success'
    );
  };

  const showContact = SITE_CONFIG.sections.contact !== 'none';

  return (
    <div
      className="min-h-screen text-[#FAFAFA] antialiased"
      style={{ backgroundColor: SITE_CONFIG.theme.bgColor }}
    >
      <Header />
      <main>
        {SITE_CONFIG.sections.hero      && <HeroSection />}
        {SITE_CONFIG.sections.about     && <AboutSection />}
        {SITE_CONFIG.sections.portfolio && <PortfolioSection />}
        {SITE_CONFIG.sections.videos    && <VideoHubSection />}
        {showContact && (
          <CollaborationSection
            onFormSuccess={handleFormSuccess}
            contactType={SITE_CONFIG.sections.contact}
          />
        )}
      </main>
      <Footer />
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}

export default App;
