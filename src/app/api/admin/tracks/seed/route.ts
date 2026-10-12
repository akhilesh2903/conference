import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Track from '@/models/Track';

function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
}

export const OFFICIAL_4_TRACKS = [
  {
    trackNumber: '01',
    title: 'Advanced and Sustainable Materials',
    text: [
      'Energy materials',
      'Solar cell materials',
      'Fuel cell materials',
      'Battery materials',
      'Supercapacitors',
      'Hydrogen storage materials',
      'Thermoelectric materials',
      'Energy harvesting materials',
      'Smart materials',
      'Biodegradable polymers',
      'Green and natural fiber composites',
      'Nanomaterials',
      'Optical/electronic materials',
      'Advanced coatings',
      'Recycled and sustainable materials',
      'Functional thin films',
    ].join('\n'),
  },
  {
    trackNumber: '02',
    title: 'Energy Systems, Hydrogen & Sustainable Energy',
    text: [
      'Renewable energy',
      'Solar energy',
      'Wind energy',
      'Bioenergy',
      'Green hydrogen',
      'Hydrogen storage',
      'Hydrogen utilization',
      'PEM fuel cells',
      'Energy management',
      'Energy efficiency',
      'AI-enabled energy systems',
      'Hydrogen mobility',
    ].join('\n'),
  },
  {
    trackNumber: '03',
    title: 'Environment, Climate & Sustainable Engineering',
    text: [
      'Environmental engineering',
      'Waste management',
      'Waste-to-energy',
      'Climate change mitigation',
      'Carbon capture and utilization',
      'GIS',
      'Remote sensing',
      'Environmental sustainability',
      'Circular economy',
    ].join('\n'),
  },
  {
    trackNumber: '04',
    title: 'Sustainable Management, Business & Finance',
    text: [
      'Sustainable business',
      'Strategic management',
      'Green banking',
      'Green finance',
      'Green marketing',
      'ESG',
      'Entrepreneurship',
      'AI for sustainability',
      'Sustainable supply chains',
      'Circular business models',
      'Innovation management',
      'Technology management',
      'CSR',
      'Sustainable consumption',
      'SDGs',
      'Stakeholder management',
      'Responsible investment',
      'Corporate governance',
      'Social entrepreneurship',
      'Ethical leadership',
      'Societal resilience',
      'Responsible AI',
      'Innovation',
      'Interdisciplinary approaches',
    ].join('\n'),
  },
];

export async function POST(request: Request) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const results = [];
    for (const trackData of OFFICIAL_4_TRACKS) {
      // Check if track with this title or number exists
      const existing = await Track.findOne({
        $or: [{ title: trackData.title }, { trackNumber: trackData.trackNumber }],
      });

      if (!existing) {
        const created = await Track.create(trackData);
        results.push({ action: 'created', track: created });
      } else {
        // Update if existing to ensure complete title and text
        existing.trackNumber = trackData.trackNumber;
        existing.title = trackData.title;
        existing.text = trackData.text;
        await existing.save();
        results.push({ action: 'updated', track: existing });
      }
    }

    return NextResponse.json({ success: true, count: results.length, results });
  } catch (error: any) {
    console.error('Seed tracks error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
