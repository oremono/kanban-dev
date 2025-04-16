import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  time: string;
  date: string;
}

export interface EventsByDate {
  [date: string]: Event[];
}

export interface EventsByWeek {
  [week: number]: EventsByDate;
}

const events = (idx: number): EventsByDate => {
  const base = 10 + 7 * idx;
  return {
    [`2024-03-${base}`]: [
      {
        id: uuidv4(),
        title: 'Weekend Hackathon Prep',
        description: 'Kick off preparations for the internal hackathon. Discuss theme, guidelines, and team formation.',
        imageUrl: 'https://fastly.picsum.photos/id/145/1920/1080.jpg?hmac=745bp388SbDWrZpgXUHM5uRK5D4vdEC6XuPZPp9TvRs',
        time: '10:00 AM',
        date: `2024-03-${base}`
      }
    ],
    [`2024-03-${base + 1}`]: [
      {
        id: uuidv4(),
        title: 'Coffee with Alex',
        description:
          "Meet with Alex to brainstorm ideas for the upcoming product launch. We'll review market research and competitor analysis to identify potential opportunities and challenges.",
        imageUrl: 'https://fastly.picsum.photos/id/312/1920/1080.jpg?hmac=OD_fP9MUQN7uJ8NBR7tlii78qwHPUROGgohG4w16Kjw',
        time: '09:00 AM',
        date: `2024-03-${base + 1}`
      },
      {
        id: uuidv4(),
        title: 'Team Standup',
        description:
          "Weekly standup meeting with the dev team. Discuss progress, blockers, and align on next week's priorities.",
        imageUrl: 'http://fastly.picsum.photos/id/737/1920/1080.jpg?hmac=aFzER8Y4wcWTrXVx2wVKSj10IqnygaF33gESj0WGDwI',
        time: '02:00 PM',
        date: `2024-03-${base + 1}`
      }
    ],
    [`2024-03-${base + 2}`]: [
      {
        id: uuidv4(),
        title: 'Yoga Session',
        description:
          'Join for a relaxing yoga session to reduce stress and improve mindfulness. Suitable for all levels, focusing on gentle stretches.',
        imageUrl: 'https://fastly.picsum.photos/id/392/1920/1080.jpg?hmac=Fvbf7C1Rcozg8EccwYPqsGkk_o6Bld2GQRDPZKWpd7g',
        time: '12:00 PM',
        date: `2024-03-${base + 2}`
      },
      {
        id: uuidv4(),
        title: 'Product Demo',
        description: 'Demo of UI improvements and performance optimizations to gather stakeholder feedback.',
        imageUrl: 'https://fastly.picsum.photos/id/249/1920/1080.jpg?hmac=cPMNdgGXRh6T_KhRMuaQjRtAx5cWRraELjtL2MHTfYs',
        time: '03:30 PM',
        date: `2024-03-${base + 2}`
      }
    ],
    [`2024-03-${base + 3}`]: [
      {
        id: uuidv4(),
        title: 'Client Meeting',
        description: 'Review project progress, timeline adjustments, and outline roadmap for next quarter with the client.',
        imageUrl: 'https://fastly.picsum.photos/id/908/1920/1080.jpg?hmac=MeG_oA1s75hHAL_4JzCioh6--zyFTWSCTxOhe8ugvXo',
        time: '11:30 AM',
        date: `2024-03-${base + 3}`
      }
    ],
    [`2024-03-${base + 4}`]: [
      {
        id: uuidv4(),
        title: 'Design Review',
        description: 'Evaluate UI mockups and ensure alignment with branding and accessibility standards.',
        imageUrl: 'https://fastly.picsum.photos/id/554/1920/1080.jpg?hmac=xGriRcjdEWz3SykVN_2QvpDz2kHei6eYTV8JKXequVw',
        time: '01:00 PM',
        date: `2024-03-${base + 4}`
      }
    ],
    [`2024-03-${base + 5}`]: [
      {
        id: uuidv4(),
        title: 'Lunch & Learn: AI Trends',
        description: 'Internal session covering recent developments in AI and their impact on product strategy.',
        imageUrl: 'https://fastly.picsum.photos/id/24/1920/1080.jpg?hmac=D_28OvoFHWE0yprAOfK4GLptCDLcBYejfISPtDLZmHc',
        time: '12:30 PM',
        date: `2024-03-${base + 5}`
      }
    ],
    [`2024-03-${base + 6}`]: [
      {
        id: uuidv4(),
        title: 'Code Review Sprint',
        description: 'Focus day for reviewing pull requests and addressing tech debt across key modules.',
        imageUrl: 'https://fastly.picsum.photos/id/168/1920/1080.jpg?hmac=ZmuLNoH0AjN59T9dDfSBqmJiX-XWZ2PSKRt-nKq-Q24',
        time: '10:00 AM',
        date: `2024-03-${base + 6}`
      }
    ]
  };
};

const weekEvents: EventsByWeek = {
  1: events(0),
  2: events(1),
  3: events(2)
};

export default function handler(req: NextApiRequest, res: NextApiResponse<EventsByWeek>) {
  res.status(200).json(weekEvents);
}
