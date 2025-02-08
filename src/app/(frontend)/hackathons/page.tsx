import { HackathonCard } from '@/components/hackathon-card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Hackathon } from '@/types/hackathon'
import sunvest from '@/images/sunvest.png'
import cyberhacked from '@/images/cyberhacked.png'
import deltahealth from '@/images/deltahealth.png'
import crowdfund from '@/images/crowdfund.png'
import webroketheice from '@/images/webroketheice.png'

// This would typically come from an API or database
const hackathons: Hackathon[] = [
  {
    id: '1',
    name: 'GeeseHacks',
    date: 'Jan 25 - 26, 2025',
    imageUrl: sunvest,
    project: {
      name: 'SunVest',
      description:
        'SunVest is a platform that makes investing more engaging and social. It allows users to easily manage their investment portfolios, track performance, and share milestones with friends and the community. With an interactive dashboard and simple tools for analyzing investments, SunVest combines financial management with social sharing to create a more enjoyable and transparent investing experience.',
      websiteUrl: 'https://sunvest.vercel.app/',
      devpostUrl: 'https://devpost.com/software/sunvest',
      githubUrl: 'https://github.com/gurkiratz/sunvest',
    },
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'Python'],
  },
  {
    id: '2',
    name: 'UoftHacks 12',
    date: 'Jan 11 - 12, 2025',
    imageUrl: cyberhacked,
    project: {
      name: 'CyberHacked',
      description:
        'CyberHacked simulates real-world social engineering techniques. While interactions are safe within the app, remember that real-world social engineering attempts can have serious consequences. Use caution when interacting online and be wary of suspicious communications.',
      websiteUrl: 'https://cyberhacked.co/',
      devpostUrl: 'https://dorahacks.io/buidl/21615',
      githubUrl: 'https://github.com/gurkiratz/cyberhacked',
    },
    technologies: [
      'Next.js',
      'Google Gemini 1.5 flash',
      'Postgres',
      'Drizzle',
      'Clerk',
    ],
  },
  {
    id: '3',
    name: 'Deltahacks XI',
    date: 'Jan 11 - 12, 2025',
    imageUrl: deltahealth,
    project: {
      name: 'DeltaHealth',
      description:
        'DeltaHealth is designed to listen to your symptoms and utilize supervised machine learning to classify illnesses based on the symptoms you provide. It then assesses the severity of your condition and offers guidance on next steps.',
      websiteUrl: 'http://deltahealth.work/',
      devpostUrl: 'https://devpost.com/software/deltahealth',
      githubUrl: 'https://github.com/jasooh/deltahealth',
    },
    technologies: ['Next.js', 'TypeScript', 'Cohere AI', 'Vercel AI SDK'],
    won: true,
  },
  {
    id: '4',
    name: 'HackWestern 11',
    date: 'Nov 29th - Dec 1st, 2024',
    imageUrl: crowdfund,
    project: {
      name: 'Crowdfund',
      description:
        "Won 4th place in 'Best use of Starknet' track - A decentralized campaign funding platform where users can create campaigns, contribute funds, and monitor transactions on Starknet.",
      websiteUrl: 'https://crowdfund-hackwestern.vercel.app',
      devpostUrl: 'https://dorahacks.io/buidl/20383',
      githubUrl: 'https://github.com/gurkiratz/crowdfund-hackwestern',
    },
    technologies: ['Next.js', 'Starknet', 'Cairo', 'Postgres', 'Drizzle'],
    won: true,
  },
  {
    id: '5',
    name: 'HawkHacks 2024',
    date: 'May, 2024',
    // imageUrl: '/hackathon-images/hacknyu.jpg',
    project: {
      name: 'Workify',
      description:
        'A blockchain-based app for outsourcing tasks for big companies.',
      devpostUrl: 'https://dorahacks.io/buidl/20383',
      githubUrl:
        'https://taikai.network/hackbox/hackathons/hawkhacks/projects/clwd07nvc0cmiz901eq354ofp/idea',
    },
    technologies: ['Next.js', 'Node', 'S3', 'Postgres', 'Prisma'],
    won: false,
  },
  {
    id: '6',
    name: 'GDSC Hacks 2024',
    date: 'May, 2024',
    imageUrl: webroketheice,
    project: {
      name: 'We Broke The Ice',
      description:
        "'Best UI' winner. WeBrokeTheIce centralizes icebreaker ideas for easy access and intuitive step-by-step instructions.",
      websiteUrl: 'https://webroketheice.gurkiratz.co/',
      devpostUrl: 'https://devpost.com/software/breaktheice',
      githubUrl: 'https://github.com/gurkiratz/webroketheice/',
    },
    technologies: [
      'Next.js',
      'TypeScript',
      'NextAuth',
      'Google Gemini',
      'Postgres',
      'Prisma',
      'Subframe',
    ],
    won: true,
  },
  // Add more hackathons as needed
]

export default function HackathonsPage() {
  return (
    <SimpleLayout
      title="Hackathons"
      intro="I drink coffee, brainstorm ideas, and build full fledged apps that actually work"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
    </SimpleLayout>
  )
}
