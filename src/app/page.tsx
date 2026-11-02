import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ImportantDatesStrip from '@/components/home/ImportantDatesStrip';
import WelcomeSection from '@/components/home/WelcomeSection';
import ThemeCards from '@/components/home/ThemeCards';
import PublicationHighlight from '@/components/home/PublicationHighlight';
import RegistrationPreview from '@/components/home/RegistrationPreview';
import SpeakersPreview from '@/components/home/SpeakersPreview';
import VenueContactPreview from '@/components/home/VenueContactPreview';
import SectionDivider from '@/components/home/SectionDivider';
import { getTracks } from '@/lib/tracks';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ICMEMS 2027 | Home',
};

export default async function HomePage() {
  const tracks = await getTracks();

  return (
    <>
      <HeroSection />

      <SectionDivider icon="globe" />

      <WelcomeSection tracks={tracks} />

      <SectionDivider icon="cap" />

      <ImportantDatesStrip />

      <SectionDivider icon="paper" />

      <ThemeCards tracks={tracks} />

      <SectionDivider icon="flask" />

      <PublicationHighlight />

      <SectionDivider icon="chart" />

      <RegistrationPreview />

      <SectionDivider icon="crystal" />

      <SpeakersPreview />

      <SectionDivider icon="leaf" />

      <VenueContactPreview />
    </>
  );
}
