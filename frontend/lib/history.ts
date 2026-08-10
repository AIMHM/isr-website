export type HistoryConfidence =
  | 'A'
  | 'B'
  | 'C'
  | 'D'

export type HistorySource = {
  id: string
  title: string
  publisher: string
  year: string
  confidence: HistoryConfidence
  url: string
  note: string
}

export type HistoryEntry = {
  id: string
  period: string
  title: string
  summary: string
  details: string[]
  sourceIds: string[]
  publicReady: boolean
}

export type HistoryResearchLead = {
  period: string
  title: string
  note: string
  confidence: HistoryConfidence
  sourceUrl?: string
}

export const HISTORY_CONFIDENCE_LABELS: Record<
  HistoryConfidence,
  string
> = {
  A: 'Primary / official evidence',
  B: 'Strong independent evidence',
  C: 'Supporting historical evidence',
  D: 'Research lead / requires corroboration',
}

export const HISTORY_SOURCES: HistorySource[] = [
  {
    id: 'ward-wood-2010',
    title:
      '“Right the wrong”: the RMIT University Muslim Prayer Room Campaign 2008–2009',
    publisher:
      'Liam Ward and Katie Wood, Marxist Interventions',
    year: '2010',
    confidence: 'B',
    url:
      'https://archive.sa.org.au/mi/2/mi2wardwood.pdf',
    note:
      'Detailed retrospective study of the campaign. The authors were involved in the campaign, so their participation and perspective should be kept in mind when using the account.',
  },
  {
    id: 'anu-campaign-record',
    title:
      'ANU repository record — RMIT University Muslim Prayer Room Campaign 2008–2009',
    publisher:
      'Australian National University repository',
    year: '2015 repository record',
    confidence: 'A',
    url:
      'https://dspace-prod.anu.edu.au/items/9a599e9a-0381-4a12-bf1c-fe2b65d101e3',
    note:
      'Institutional repository record preserving the Ward and Wood campaign study.',
  },
  {
    id: 'abc-2009',
    title:
      'Islamic students angry over prayer room at RMIT',
    publisher:
      'ABC News',
    year: '24 March 2009',
    confidence: 'B',
    url:
      'https://www.abc.net.au/news/2009-03-24/islamic-students-angry-over-prayer-room-at-rmit/1628762',
    note:
      'Contemporary independent reporting of the dispute, protest and competing positions.',
  },
  {
    id: 'hreoc-2008',
    title:
      'Australian response concerning combating defamation of religions',
    publisher:
      'Human Rights and Equal Opportunity Commission',
    year: '2008',
    confidence: 'A',
    url:
      'https://humanrights.gov.au/sites/default/files/content/pdf/partnerships/combating_defamation_of_religions.pdf',
    note:
      'Australian human-rights submission to the UN High Commissioner for Human Rights that discussed the RMIT prayer-facilities controversy. This does not mean the UN itself made a finding against RMIT.',
  },
  {
    id: 'umsu-stance',
    title:
      'Students’ Council stance record — Right the Wrong campaign',
    publisher:
      'University of Melbourne Student Union',
    year: '2009 record preserved in later stance compilation',
    confidence: 'A',
    url:
      'https://umsu.unimelb.edu.au/pageassets/about/studentscouncil/Stance-Booklet-2024.pdf',
    note:
      'Preserves the Students’ Council motion supporting the RMITIS campaign and 23 March 2009 protest.',
  },
  {
    id: 'chowdhury-2003',
    title:
      'Presenting Islam: The role of Australia-Based Muslim Student Associations',
    publisher:
      'Nayeefa Chowdhury',
    year: 'Website material accessed 26 August 2003',
    confidence: 'B',
    url:
      'https://www.researchgate.net/publication/233355766_Presenting_Islam_The_role_of_Australia-Based_Muslim_Student_Associations',
    note:
      'Academic research documenting the RMIT Islamic Society website and its programs in the early 2000s.',
  },
  {
    id: 'green-left-2001',
    title:
      'We stand in solidarity',
    publisher:
      'Green Left',
    year: '2001',
    confidence: 'C',
    url:
      'https://www.greenleft.org.au/2001/466/we-stand-solidarity',
    note:
      'Contemporary publication naming a speaker from the Islamic Society of RMIT. The publication has an explicit political perspective; it is used only as evidence of the society’s public presence.',
  },
  {
    id: 'islamicfinder-2005',
    title:
      'Historical RMIT prayer-room directory listing',
    publisher:
      'IslamicFinder',
    year: 'Listing updated 2005',
    confidence: 'C',
    url:
      'https://www.islamicfinder.org/world/view-place/19082/',
    note:
      'Historical directory evidence for the former Building 9 prayer room and RMITIS web presence.',
  },
  {
    id: 'rmit-2022-eid',
    title:
      'RMIT’s inclusive community on show during Eid al-Adha celebrations',
    publisher:
      'RMIT University',
    year: '2022',
    confidence: 'A',
    url:
      'https://www.rmit.edu.au/students/news/2022/july/rmits-inclusive-community-on-show-during-eid-al-adha-celebrations',
    note:
      'Official RMIT account of the Bowen Street Eid festival and Muslim student community.',
  },
  {
    id: 'rmit-2023-eid',
    title:
      'Eid al-Adha Festival wrap',
    publisher:
      'RMIT University',
    year: '2023',
    confidence: 'A',
    url:
      'https://www.rmit.edu.au/students/news/2023/jul/eid-al-adha-festival-wrap',
    note:
      'Official RMIT account of an inter-university Eid festival involving students from multiple Melbourne universities.',
  },
  {
    id: 'rmit-2023-centre',
    title:
      'State-of-the-art prayer and wellbeing facility opens on city campus',
    publisher:
      'RMIT University',
    year: '23 November 2023',
    confidence: 'A',
    url:
      'https://www.rmit.edu.au/news/all-news/2023/nov/prayer-wellbeing-facility',
    note:
      'Official record of the opening of the purpose-built Multifaith and Wellbeing Centre.',
  },
  {
    id: 'rmit-prayer-current',
    title:
      'Prayer rooms',
    publisher:
      'RMIT University',
    year: 'Current',
    confidence: 'A',
    url:
      'https://www.rmit.edu.au/about/our-locations-and-facilities/facilities/prayer-rooms',
    note:
      'Current official room numbers and published campus prayer arrangements.',
  },
  {
    id: 'bundoora-guide-2019',
    title:
      'RMIT Bundoora Guide',
    publisher:
      'RMIT / campus guide copy',
    year: '2019',
    confidence: 'C',
    url:
      'https://www.readkong.com/page/your-guide-to-rmit-bundoora-7046431',
    note:
      'Historical campus-guide evidence listing the RMIT Bundoora Islamic Society.',
  },
  {
    id: 'victorian-muslimah-2015',
    title:
      'Melbourne Taraweeh Prayer Times 2015',
    publisher:
      'Victorian Muslimah',
    year: '2015',
    confidence: 'C',
    url:
      'https://victorianmuslimah.wordpress.com/2015/06/17/melbourne-taraweeh-prayer-times-2015/',
    note:
      'Community directory preserving a snapshot of RMITIS Ramadan prayer arrangements.',
  },
  {
    id: 'umis-2017',
    title:
      'RMITIS Islamic Awareness Week promotion',
    publisher:
      'University of Melbourne Islamic Society',
    year: '2017',
    confidence: 'C',
    url:
      'https://www.facebook.com/contactumis/photos/assalamualaikum-everyoneour-brothers-and-sisters-from-rmit-islamic-society-rmiti/1751536961553888/',
    note:
      'Supporting evidence that Islamic Awareness Week continued as an RMITIS program in the 2010s.',
  },
  {
    id: 'amust-2018',
    title:
      'Student organisations statement concerning Mohamed Kamer Nizamdeen',
    publisher:
      'AMUST',
    year: '2018',
    confidence: 'C',
    url:
      'https://www.amust.com.au/2018/10/unjust-treatment-of-kamer-statement-by-students-organisations/',
    note:
      'Records RMIT Islamic Society among supporting student organisations. Used only to document the recorded support, not to independently endorse contested claims in the statement.',
  },
  {
    id: 'isr-rebrand-2024',
    title:
      'RMITIS to ISR rebrand announcement',
    publisher:
      'Islamic Society of RMIT',
    year: '2024',
    confidence: 'A',
    url:
      'https://www.instagram.com/reel/C8ouD_zPybY/',
    note:
      'Primary ISR announcement stating that RMITIS / RMIT Islamic Society was becoming ISR / Islamic Society of RMIT.',
  },
  {
    id: 'overland-2024',
    title:
      'Victorian Muslim community open letter concerning the Premier’s Iftar',
    publisher:
      'Overland',
    year: '2024',
    confidence: 'C',
    url:
      'https://overland.org.au/2024/02/why-should-the-victorian-muslim-community-boycott-the-premiers-iftar-this-year/',
    note:
      'Published final version lists RMIT Islamic Society among supporting organisations. This is documented as historical participation rather than a permanent ISR political position.',
  },
  {
    id: 'mwa-2025',
    title:
      'Australian Muslim Community Statement — Sumud Freedom Flotilla',
    publisher:
      'Muslim Women Australia-hosted statement',
    year: '2025',
    confidence: 'A',
    url:
      'https://mwa.org.au/wp-content/uploads/2025/10/Muslim-Community-Statement-Sumud-Freedom-Flotilla.pdf',
    note:
      'Primary statement listing Islamic Society of RMIT as a signatory. Inclusion documents the society’s recorded participation; it does not independently verify every assertion in the statement.',
  },
]

export const HISTORY_TIMELINE: HistoryEntry[] = [
  {
    id: 'early-prayer-life',
    period: 'Early 1990s',
    title:
      'Dedicated Muslim prayer life takes root at RMIT',
    summary:
      'Later evidence indicates that a dedicated Muslim prayer facility existed at RMIT for almost fifteen years before its demolition in late 2007.',
    details: [
      'The strongest surviving retrospective account describes the former dedicated City prayer facility as having existed for almost fifteen years before late 2007.',
      'That places dedicated Muslim prayer infrastructure at RMIT approximately in the early 1990s.',
      'This date concerns the prayer facility. It does not establish the founding year of the Islamic Society.',
    ],
    sourceIds: [
      'ward-wood-2010',
      'islamicfinder-2005',
    ],
    publicReady: true,
  },
  {
    id: 'society-public-2001',
    period: '2001',
    title:
      'The Islamic Society of RMIT appears in contemporary public records',
    summary:
      'A contemporary publication names Hashmat Moslih as being from the Islamic Society of RMIT.',
    details: [
      'This provides direct published evidence that an organisation using the Islamic Society of RMIT name was operating by 2001.',
      'The source has an explicit political editorial perspective, so it is being used narrowly as contemporaneous evidence of the organisation’s existence and public activity.',
    ],
    sourceIds: [
      'green-left-2001',
    ],
    publicReady: true,
  },
  {
    id: 'rmitis-2003',
    period: '2003',
    title:
      'RMITIS is documented as an established educational and community organisation',
    summary:
      'Academic research records an RMIT Islamic Society website and a broad program of Islamic resources and activities.',
    details: [
      'The study recorded the RMIT site rmitis.org when Australian Muslim student-association websites were reviewed in August 2003.',
      'It described resources, a multimedia centre, public lectures, conferences, video screenings and Islamic Awareness Week activity.',
      'This shows that by the early 2000s the organisation had developed well beyond an informal prayer gathering.',
    ],
    sourceIds: [
      'chowdhury-2003',
    ],
    publicReady: true,
  },
  {
    id: 'building-nine-era',
    period: '2000s',
    title:
      'Building 9 becomes a centre of Muslim prayer life',
    summary:
      'Historical records place a dedicated RMIT Muslim prayer space in Building 9, Level 4.',
    details: [
      'Historical prayer directories recorded the City prayer facility at Building 9, Level 4.',
      'The later prayer-room campaign literature identifies the old dedicated facility lost during redevelopment as the central space whose replacement became contested.',
    ],
    sourceIds: [
      'islamicfinder-2005',
      'ward-wood-2010',
    ],
    publicReady: true,
  },
  {
    id: 'demolition-2007',
    period: 'Late 2007',
    title:
      'Demolition of the long-standing City prayer facility',
    summary:
      'Redevelopment removed the long-standing dedicated Muslim prayer facility and triggered a major disagreement over replacement arrangements.',
    details: [
      'RMIT provided replacement men’s and women’s prayer rooms within a Spiritual Centre arrangement.',
      'RMITIS objected to the replacement spaces being treated as multifaith rather than dedicated Muslim facilities and raised concerns about access and practical religious use.',
      'RMIT maintained that it had invested significantly in accommodating religious practice. The historical record therefore contains clearly competing positions.',
    ],
    sourceIds: [
      'ward-wood-2010',
      'abc-2009',
    ],
    publicReady: true,
  },
  {
    id: 'campaign-2008',
    period: '2008',
    title:
      'The “Right the Wrong” campaign develops',
    summary:
      'RMITIS organised a sustained campaign seeking the return of dedicated Muslim prayer rooms.',
    details: [
      'Campaign activity included a boycott of the replacement arrangements, information stalls, leaflets, petitions and direct advocacy.',
      'The detailed campaign account reports approximately 1,100 petition signatures being gathered in one week.',
      'From February 2008, Friday prayers in Bowen Street became a highly visible recurring element of the campaign.',
      'The campaign gained support from Muslim community organisations as well as a number of student and staff organisations.',
    ],
    sourceIds: [
      'ward-wood-2010',
    ],
    publicReady: true,
  },
  {
    id: 'human-rights-2008',
    period: '2008',
    title:
      'The RMIT dispute enters a national human-rights submission',
    summary:
      'Australia’s Human Rights and Equal Opportunity Commission discussed the RMIT prayer-facilities controversy in material sent to the UN High Commissioner for Human Rights.',
    details: [
      'This gave the controversy significance beyond an internal campus disagreement.',
      'The Australian Commission used RMIT in discussing structural religious discrimination and the experiences of Muslim communities.',
      'This must not be misstated as a finding or condemnation issued by the United Nations itself.',
    ],
    sourceIds: [
      'hreoc-2008',
    ],
    publicReady: true,
  },
  {
    id: 'support-2009',
    period: 'March 2009',
    title:
      'Support for the campaign spreads across campuses',
    summary:
      'The University of Melbourne Students’ Council formally endorsed the RMITIS campaign and planned protest.',
    details: [
      'The preserved motion endorsed “Right the Wrong, Return the Prayer Room”.',
      'It supported the 23 March protest and future actions connected with the campaign.',
      'The motion provides formal evidence that support had extended beyond RMIT.',
    ],
    sourceIds: [
      'umsu-stance',
    ],
    publicReady: true,
  },
  {
    id: 'rally-2009',
    period: '23–24 March 2009',
    title:
      'Major rally and national media coverage',
    summary:
      'A major Bowen Street rally was followed by ABC coverage of the prayer-room dispute.',
    details: [
      'The campaign study records several hundred people participating in the 23 March rally.',
      'ABC reported on the demolition of the old facility, the students’ protest and RMIT’s position that it had made substantial efforts to accommodate religious practice.',
      'ABC also reported that the dispute had intensified after a female Muslim student said she had been sexually assaulted while praying elsewhere. This allegation is preserved with attribution and is not presented as an independently established finding by ISR.',
    ],
    sourceIds: [
      'ward-wood-2010',
      'abc-2009',
    ],
    publicReady: true,
  },
  {
    id: 'forum-2009',
    period: '28 April 2009',
    title:
      'RMITIS publicly argues its case',
    summary:
      'RMITIS held a public forum responding to the University’s account of the available Muslim prayer facilities.',
    details: [
      'The campaign literature identifies Mohamed Elrafihi as RMITIS President during this period.',
      'The forum disputed the University’s descriptions of the number, location and adequacy of available prayer rooms.',
      'This provides one of the clearest surviving records of identified RMITIS leadership during the campaign.',
    ],
    sourceIds: [
      'ward-wood-2010',
    ],
    publicReady: true,
  },
  {
    id: 'victory-2009',
    period: '18 September 2009',
    title:
      'RMITIS announces the end of the 18-month campaign',
    summary:
      'RMITIS announced that the prayer-room campaign had achieved its purpose and brought the protest to an end.',
    details: [
      'The campaign had lasted approximately 18 months.',
      'The conclusion marked one of the best-documented milestones in the organisation’s history.',
      'Later academic treatment has used the episode as a case study in Muslim student activism, racism, citizenship and university space.',
    ],
    sourceIds: [
      'ward-wood-2010',
      'anu-campaign-record',
    ],
    publicReady: true,
  },
  {
    id: 'ramadan-2015',
    period: '2015',
    title:
      'Ramadan worship remains part of organised RMIT Muslim life',
    summary:
      'A community Ramadan directory recorded RMIT Islamic Society Taraweeh arrangements.',
    details: [
      'The record gives a useful snapshot of ordinary religious programming that is often absent from formal institutional archives.',
      'Because it is a community directory rather than an official RMIT or ISR archive, it is treated as supporting evidence.',
    ],
    sourceIds: [
      'victorian-muslimah-2015',
    ],
    publicReady: true,
  },
  {
    id: 'awareness-week-2017',
    period: '2017',
    title:
      'Islamic Awareness Week continues across generations',
    summary:
      'A University of Melbourne Islamic Society post promoted RMITIS’s annual Islamic Awareness Week.',
    details: [
      'This is notable because Islamic Awareness Week activity had already been documented in the 2003 academic record.',
      'Together, the records show continuity in one category of RMITIS public Islamic education over more than a decade.',
    ],
    sourceIds: [
      'chowdhury-2003',
      'umis-2017',
    ],
    publicReady: true,
  },
  {
    id: 'national-student-2018',
    period: '2018',
    title:
      'RMITIS appears in multi-university Muslim student advocacy',
    summary:
      'RMIT Islamic Society was recorded among student organisations supporting a public statement concerning Mohamed Kamer Nizamdeen.',
    details: [
      'The historical fact being recorded is the Society’s inclusion among supporting organisations.',
      'ISR’s history page does not adopt disputed factual or legal claims contained in historical advocacy statements as independently established fact.',
    ],
    sourceIds: [
      'amust-2018',
    ],
    publicReady: true,
  },
  {
    id: 'bundoora-2019',
    period: '2019',
    title:
      'A distinct Bundoora Muslim student presence is formally visible',
    summary:
      'A surviving RMIT Bundoora campus guide lists the RMIT Bundoora Islamic Society.',
    details: [
      'This strengthens evidence that Bundoora developed its own organised Muslim student presence.',
      'The precise historic organisational relationship between the Bundoora Islamic Society and City-based RMITIS remains an open research question.',
    ],
    sourceIds: [
      'bundoora-guide-2019',
    ],
    publicReady: true,
  },
  {
    id: 'eid-2022',
    period: '2022',
    title:
      'Bowen Street Eid festival reflects a large modern community',
    summary:
      'RMIT documented a major Eid al-Adha celebration on Bowen Street.',
    details: [
      'The official RMIT account identifies Ayana Lokhandwala as the Islamic Society President at the time.',
      'The festival included food, activities, performances, speakers and community stalls.',
      'RMIT Vice-Chancellor Alec Cameron attended, giving us a strong institutional record of the Society’s modern community role.',
    ],
    sourceIds: [
      'rmit-2022-eid',
    ],
    publicReady: true,
  },
  {
    id: 'eid-2023',
    period: '2023',
    title:
      'Inter-university community becomes increasingly visible',
    summary:
      'RMIT officially recorded an Eid festival bringing together Muslim students from multiple Melbourne universities.',
    details: [
      'Students from RMIT, Melbourne, Victoria, La Trobe and Deakin universities were documented as participating.',
      'The event illustrates the Society’s growing role within a wider Melbourne Muslim student network.',
    ],
    sourceIds: [
      'rmit-2023-eid',
    ],
    publicReady: true,
  },
  {
    id: 'centre-2023',
    period: '23 November 2023',
    title:
      'The Multifaith and Wellbeing Centre opens',
    summary:
      'RMIT officially opened a purpose-built City facility containing dedicated prayer and ablution spaces.',
    details: [
      'The centre was opened by Victorian Minister Gayle Tierney and RMIT Vice-Chancellor Alec Cameron.',
      'RMIT states that the project was funded through the Victorian Higher Education State Investment Fund.',
      'The facility forms part of the long history of Muslim prayer provision at RMIT, but the available evidence does not justify claiming that the 2009 campaign directly caused the 2023 project.',
    ],
    sourceIds: [
      'rmit-2023-centre',
    ],
    publicReady: true,
  },
  {
    id: 'rebrand-2024',
    period: '2024',
    title:
      'RMITIS becomes the Islamic Society of RMIT — ISR',
    summary:
      'The Society publicly adopted its present ISR identity and branding.',
    details: [
      'ISR’s own rebrand announcement referred directly to what students previously knew as RMITIS / the RMIT Islamic Society.',
      'The change introduced the Islamic Society of RMIT name, ISR acronym and new visual identity.',
      'The rebrand represents a new organisational chapter rather than the creation of an entirely new Muslim student community.',
    ],
    sourceIds: [
      'isr-rebrand-2024',
    ],
    publicReady: true,
  },
  {
    id: 'public-statement-2024',
    period: '2024',
    title:
      'RMIT Islamic Society appears in a Victorian Muslim community statement',
    summary:
      'A published open letter concerning the Victorian Premier’s Iftar lists RMIT Islamic Society among supporting organisations.',
    details: [
      'This is recorded as part of the Society’s historical footprint.',
      'A committee’s participation in a particular historical statement should not automatically be treated as a permanent political position binding future ISR committees.',
    ],
    sourceIds: [
      'overland-2024',
    ],
    publicReady: true,
  },
  {
    id: 'national-statement-2025',
    period: '2025',
    title:
      'ISR appears among organisations in a national Muslim community statement',
    summary:
      'Islamic Society of RMIT was listed as a signatory to an Australian Muslim community statement concerning the Sumud Freedom Flotilla.',
    details: [
      'The signatory record is preserved as part of ISR’s national community history.',
      'The history records participation without treating every assertion in the external statement as an independently verified ISR fact.',
    ],
    sourceIds: [
      'mwa-2025',
    ],
    publicReady: true,
  },
  {
    id: 'isr-today',
    period: 'Today',
    title:
      'ISR serves Muslim students across RMIT',
    summary:
      'The present Islamic Society of RMIT continues a multi-decade tradition of worship, Islamic learning, community, support, events, volunteering and representation.',
    details: [
      'Current Muslim prayer provision spans City, Bundoora East, Bundoora West and Brunswick.',
      'ISR’s current identity centres on being the home of Muslim students at RMIT and representing Muslims on campus.',
      'The exact founding year of the Society remains under historical research.',
    ],
    sourceIds: [
      'rmit-prayer-current',
      'isr-rebrand-2024',
    ],
    publicReady: true,
  },
]

export const HISTORY_RESEARCH_LEADS: HistoryResearchLead[] = [
  {
    period: 'c. 1993–94',
    title:
      'Exact establishment date of the former dedicated Muslim prayer room',
    note:
      'The “almost fifteen years” statement points approximately to the early 1990s, but a primary room-allocation record should still be located.',
    confidence: 'D',
  },
  {
    period: '1990s',
    title:
      'Exact founding date and first constitution of the Islamic Society',
    note:
      'No surviving primary constitution, club registration or AGM record has yet established an exact founding year. Do not label ISR “Founded 1993” without such evidence.',
    confidence: 'D',
  },
  {
    period: '1997',
    title:
      'RMIT Annual Report Muslim student community lead',
    note:
      'A prior research lead points to RMIT institutional material referring to an active Muslim student community. The exact primary record should be archived before being elevated into the strongest public chronology.',
    confidence: 'D',
  },
  {
    period: '1999–2004',
    title:
      'Early committee-member biographies',
    note:
      'Individual alumni profiles appear to identify RMIT Islamic Society participation and office-holding in this period. These are useful leads but require corroboration through society or university records.',
    confidence: 'D',
  },
  {
    period: '2016',
    title:
      'RMIT Bundoora Islamic Society social-media archive',
    note:
      'Surviving social posts may help reconstruct prayer-room moves, Bundoora leadership and the relationship between the Bundoora and City organisations.',
    confidence: 'D',
  },
  {
    period: '2020–21',
    title:
      'COVID-era online programs',
    note:
      'Search evidence points to RMITIS joining online Ramadan and Muslim-community programs during the pandemic. A systematic social-media archive is still required.',
    confidence: 'D',
  },
  {
    period: 'All years',
    title:
      'Past committees, constitutions, minutes, posters and handovers',
    note:
      'Recovering former committee lists, constitutions, election records, photos, event posters and handover folders could substantially strengthen the institutional record.',
    confidence: 'D',
  },
]

export function historySourcesFor(
  sourceIds: string[],
): HistorySource[] {
  return sourceIds
    .map((id) =>
      HISTORY_SOURCES.find(
        (source) =>
          source.id === id,
      ),
    )
    .filter(
      (
        source,
      ): source is HistorySource =>
        Boolean(source),
    )
}
