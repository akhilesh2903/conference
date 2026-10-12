import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ImportantDatesStrip from '@/components/home/ImportantDatesStrip';
import WelcomeSection from '@/components/home/WelcomeSection';
import ThemeCards from '@/components/home/ThemeCards';
import PublicationHighlight from '@/components/home/PublicationHighlight';
import RegistrationPreview from '@/components/home/RegistrationPreview';
import SpeakersPreview from '@/components/home/SpeakersPreview';
import VenueContactPreview from '@/components/home/VenueContactPreview';
import DownloadsPreview from '@/components/home/DownloadsPreview';
import { getTracks } from '@/lib/tracks';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'IC-MEMS 2027 | Home',
};

export default async function HomePage() {
  const tracks = await getTracks();

  return (
    <>
      <HeroSection />
      <ImportantDatesStrip />
      <WelcomeSection tracks={tracks} />
      <ThemeCards tracks={tracks} />
      <PublicationHighlight />
      <RegistrationPreview />
      <SpeakersPreview />
      <VenueContactPreview />
      <DownloadsPreview />
    </>
  );
}
