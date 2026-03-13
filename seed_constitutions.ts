import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://iuozmafmbhyfggxwyfhh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1b3ptYWZtYmh5ZmdneHd5ZmhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDI1MzYsImV4cCI6MjA4ODk3ODUzNn0.pgU2e5fNqJLXSvmuuweSTty2r0NigAdm8IASW5nzD48";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const historicalData = [
  {
    year: 1922,
    chapters: [
      { chapter_number: 1, title: 'The Legislative Council', content: 'The Clifford Constitution of 1922 established a Legislative Council for the Colony and Protectorate of Nigeria. The Council consisted of the Governor as President, official members who held their seats by virtue of their office, and unofficial members who were either nominated by the Governor or elected. The elected members represented Lagos (3 seats) and Calabar (1 seat), making this the first constitution to introduce the elective principle in British West Africa. The Legislative Council had the power to make laws for the Colony of Lagos and the Southern Provinces, but not for the Northern Provinces which remained under the Governor\'s direct legislation through proclamations.', section_range: '1-10' },
      { chapter_number: 2, title: 'The Executive Council', content: 'The Executive Council was established to advise the Governor on matters of governance. It consisted of the Governor as President and such persons as His Majesty may direct by Instructions under His Sign Manual and Signet. The Governor was required to consult the Executive Council on all matters of importance, but retained the power to act against the advice of the Council if he judged it necessary in the interest of public faith, order, or good government. In such cases, the Governor was required to report to the Secretary of State for the Colonies with his reasons for acting contrary to the Council\'s advice.', section_range: '11-15' },
      { chapter_number: 3, title: 'Revenue and Finance', content: 'All revenues and moneys raised or received by the Government of Nigeria shall form one consolidated revenue fund. No moneys shall be issued from the consolidated revenue fund except under the authority of an appropriation ordinance. The estimates of revenue and expenditure shall be laid before the Legislative Council annually. The Governor shall cause to be prepared and laid before the Legislative Council, before the commencement of each financial year, estimates of the revenue and expenditure of the Colony and Protectorate for the ensuing year.', section_range: '16-22' }
    ]
  },
  {
    year: 1946,
    chapters: [
      { chapter_number: 1, title: 'Regional Councils', content: 'The Richards Constitution of 1946 established Regional Councils for the Northern, Western, and Eastern Provinces of Nigeria. Each Regional Council consisted of the Chief Commissioner of the Region as President, official members, and unofficial members. The unofficial members included traditional rulers (Chiefs) and members selected by the Native Authorities. The Regional Councils had the power to consider and advise on any matter referred to them by the Governor, and could consider draft legislation affecting their region before it was introduced in the Legislative Council. This was the first constitution to formally recognize Nigeria\'s regional diversity and to create a framework for regional governance.', section_range: '1-20' },
      { chapter_number: 2, title: 'The Legislative Council', content: 'The Legislative Council was reconstituted under the Richards Constitution to include unofficial members from all regions of Nigeria, including the Northern Provinces for the first time. The Council consisted of the Governor as President, sixteen official members, and twenty-eight unofficial members. Of the unofficial members, four were elected (three from Lagos and one from Calabar, continuing the Clifford Constitution\'s elective principle), while the remaining twenty-four were nominated by the Governor — including members selected from the Regional Councils. The Legislative Council now had jurisdiction over the entire country, unlike the Clifford Constitution which excluded the Northern Provinces.', section_range: '21-40' },
      { chapter_number: 3, title: 'Powers of the Governor', content: 'The Governor retained extensive executive powers under the Richards Constitution. He served as the head of both the Executive Council and the Legislative Council, and had the power to assent to or withhold assent from any bill passed by the Legislative Council. The Governor could also reserve any bill for the signification of His Majesty\'s pleasure. In matters of urgency, the Governor could enact legislation without the prior approval of the Legislative Council, although such legislation required subsequent ratification. The Governor also retained the power of appointment and removal of all public officers in the Colony and Protectorate.', section_range: '41-55' }
    ]
  },
  {
    year: 1960,
    chapters: [
      { chapter_number: 1, title: 'The Federation and its Territories', content: 'Nigeria shall be a Federation consisting of Regions and a Federal Territory. The Regions of the Federation shall be the Northern Region, the Western Region, and the Eastern Region. The Federal Territory shall be the territory comprised in the Federal Territory of Lagos. Parliament may by law provide for the creation of new regions and the alteration of the boundaries of existing regions. Any such law shall not be passed unless it has been approved by a resolution of each House of Parliament supported by the votes of not less than two-thirds of all the members of that House, and has also been approved by a resolution of the House of Assembly and the House of Chiefs (if any) of the Region whose boundaries are to be altered.', section_range: '1-5' },
      { chapter_number: 2, title: 'Citizenship', content: 'Every person who, having been born in the former Colony or Protectorate of Nigeria, was on the thirtieth day of September, 1960, a citizen of the United Kingdom and Colonies or a British protected person shall become a citizen of Nigeria on the first day of October, 1960. A person shall also become a citizen of Nigeria if either of his parents was born in the former colony or protectorate of Nigeria. Any woman who is married to a citizen of Nigeria may, by application and upon taking an oath of allegiance, become a citizen of Nigeria. Parliament may make provision for the acquisition of citizenship by persons who are not entitled to become citizens by birth, descent, or registration, through the process of naturalization.', section_range: '6-16' },
      { chapter_number: 3, title: 'Fundamental Rights', content: 'Every person in Nigeria is entitled to the fundamental rights and freedoms of the individual. No person shall be deprived intentionally of his life, save in execution of the sentence of a court in respect of a criminal offence of which he has been found guilty. No person shall be subjected to torture or to inhuman or degrading punishment or other treatment. No person shall be held in slavery or servitude. Every person shall be entitled to his personal liberty, and no person shall be deprived of such liberty save as may be authorized by law in cases of persons convicted of criminal offences, persons of unsound mind, persons addicted to drugs or alcohol, or persons who are vagrants. Every person who is charged with a criminal offence shall be presumed innocent until proved guilty.', section_range: '17-32' },
      { chapter_number: 4, title: 'The Parliament', content: 'The Parliament of the Federation shall consist of Her Majesty, a Senate, and a House of Representatives. The Senate shall consist of twelve senators representing each Region equally, and four senators representing the Federal Territory of Lagos. Each member of the Senate shall be appointed by the Governor of the Region on the advice of the Premier. The House of Representatives shall consist of such number of members as Parliament may by law prescribe, directly elected on the basis of adult suffrage from single-member constituencies throughout the Federation. Parliament shall have power to make laws for the peace, order, and good government of the Federation with respect to any matter included in the Exclusive Legislative List.', section_range: '33-60' }
    ]
  },
  {
    year: 1963,
    chapters: [
      { chapter_number: 1, title: 'The Republic', content: 'Nigeria is hereby declared to be a Sovereign Republic by the name of the Federal Republic of Nigeria. Nigeria shall be a Federation comprising Regions and a Federal Territory. The Federal Territory shall be the territory comprised in the Federal territory of Lagos. The motto of the Federal Republic shall be Unity and Faith, Peace and Progress. The Flag of the Federation shall be of two equal vertical bands of green and white with the green bands on both the hoist and fly side. The Constitution shall have binding force throughout the Federal Republic of Nigeria, and if any other law (including the constitution of a Region) is inconsistent with this Constitution, this Constitution shall prevail and the other law shall, to the extent of the inconsistency, be void.', section_range: '1-6' },
      { chapter_number: 2, title: 'Citizenship', content: 'Every person who, immediately before the date of the commencement of this Constitution, was a citizen of Nigeria under the provisions of the Constitution of the Federation which was in force before the coming into operation of this Constitution shall, on that date, become a citizen of Nigeria under this Constitution. A person born in Nigeria after the commencement of this Constitution shall become a citizen of Nigeria at the date of his birth if at that date either of his parents is a citizen of Nigeria. A person born outside Nigeria after the commencement of this Constitution whose father is a citizen of Nigeria shall be a citizen of Nigeria. The President may grant certificates of naturalization to any person qualified under the provisions of this chapter.', section_range: '7-17' },
      { chapter_number: 3, title: 'Fundamental Rights', content: 'Every person in Nigeria is entitled to the fundamental rights and freedoms of the individual as contained in this Chapter, but subject to the respect for the rights and freedoms of others and for the public interest. In the determination of his civil rights and obligations, a person shall be entitled to a fair hearing within a reasonable time by a court or other tribunal established by law. Every person who is charged with a criminal offence shall be presumed innocent until he is proved guilty. No person shall be subjected to torture or to inhuman or degrading treatment. No person shall be held in slavery or required to perform forced labour. Every person shall be entitled to freedom of thought, conscience, and religion, including freedom to change his religion or belief. Every person shall be entitled to freedom of expression, including freedom to hold opinions and to receive and impart ideas and information without interference.', section_range: '18-33' },
      { chapter_number: 4, title: 'The President', content: 'There shall be a President of the Federal Republic of Nigeria who shall be the Head of State and Commander-in-Chief of the Armed Forces of the Federation. The President shall be elected by members of Parliament assembled together. A person shall be qualified for election as President if he is a citizen of Nigeria by birth and has attained the age of forty years. The President shall hold office for a term of five years. In the exercise of his functions under this Constitution or any other law, the President shall act in accordance with the advice of the Council of Ministers. The President may be removed from office for gross misconduct by a resolution supported by not less than two-thirds of all members of each House of Parliament.', section_range: '34-50' }
    ]
  },
  {
    year: 1979,
    chapters: [
      { chapter_number: 1, title: 'General Provisions', content: 'This Constitution is supreme and its provisions shall have binding force on all authorities and persons throughout the Federal Republic of Nigeria. The Federal Republic of Nigeria shall not be governed, nor shall any person or group of persons take control of the Government of Nigeria or any part thereof, except in accordance with the provisions of this Constitution. If any other law is inconsistent with the provisions of this Constitution, this Constitution shall prevail, and that other law shall to the extent of the inconsistency be void. The Federal Republic of Nigeria shall be a State based on the principles of democracy and social justice. The motto of the Federal Republic of Nigeria shall be Unity and Faith, Peace and Progress. The national flag shall be two vertical bands of green-white-green.', section_range: '1-12' },
      { chapter_number: 2, title: 'Fundamental Objectives and Directive Principles of State Policy', content: 'It shall be the duty and responsibility of all organs of government, and of all authorities and persons, exercising legislative, executive or judicial powers, to conform to, observe and apply the provisions of this Chapter. The security and welfare of the people shall be the primary purpose of government. The participation by the people in their government shall be ensured in accordance with the provisions of this Constitution. The State shall direct its policy towards ensuring that all citizens have the opportunity for securing adequate means of livelihood as well as adequate opportunity to secure suitable employment. The State shall direct its policy towards ensuring that the material resources of the community are harnessed and distributed as best as possible to serve the common good.', section_range: '13-22' },
      { chapter_number: 3, title: 'Citizenship', content: 'The following persons are citizens of Nigeria by birth: (a) every person born in Nigeria before the date of independence, either of whose parents or any of whose grandparents belongs or belonged to a community indigenous to Nigeria; (b) every person born in Nigeria after the date of independence either of whose parents or any of whose grandparents is a citizen of Nigeria; (c) every person born outside Nigeria either of whose parents is a citizen of Nigeria. A citizen of Nigeria by birth may not be deprived of his citizenship of Nigeria. Any person who is married to a citizen of Nigeria may apply for registration as a citizen of Nigeria. The President may grant a certificate of naturalization to any alien who satisfies the conditions prescribed by law.', section_range: '23-31' },
      { chapter_number: 4, title: 'Fundamental Rights', content: 'Every person has a right to life, and no one shall be deprived intentionally of his life, save in execution of the sentence of a court in respect of a criminal offence of which he has been found guilty in Nigeria. Every individual is entitled to respect for the dignity of his person, and accordingly no person shall be subjected to torture or to inhuman or degrading treatment. Every person shall be entitled to his personal liberty and no person shall be deprived of such liberty save in accordance with a procedure permitted by law. Every person shall be entitled to freedom of thought, conscience and religion. Every person shall be entitled to freedom of expression, including freedom to hold opinions and to receive and impart ideas and information without interference. Every citizen of Nigeria is entitled to move freely throughout Nigeria and to reside in any part thereof.', section_range: '32-42' },
      { chapter_number: 5, title: 'The Legislature', content: 'There shall be a National Assembly for the Federation which shall consist of a Senate and a House of Representatives. The Senate shall consist of three Senators from each State and one from the Federal Capital Territory. The House of Representatives shall consist of three hundred and sixty members representing constituencies of nearly equal population throughout the Federation. The National Assembly shall have power to make laws for the peace, order and good government of the Federation or any part thereof with respect to any matter included in the Exclusive Legislative List. The National Assembly may also make laws with respect to any matter in the Concurrent Legislative List.', section_range: '43-60' },
      { chapter_number: 6, title: 'The Executive', content: 'There shall be a President of the Federal Republic of Nigeria. The President shall be the Head of State, the Chief Executive of the Federation and Commander-in-Chief of the Armed Forces of the Federation. A person shall be qualified for election to the office of President if he is a citizen of Nigeria by birth, has attained the age of thirty-five years, is a member of a political party and is sponsored by that party, and has been educated up to at least School Certificate level. The President shall hold office for a term of four years and shall be eligible for re-election for one further term of four years. Subject to the provisions of this Constitution, the executive powers of the Federation shall be vested in the President.', section_range: '61-85' }
    ]
  }
];

async function seed() {
  // First sign in as the admin user
  console.log("Signing in as admin...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'yakyakyak1414@gmail.com',
    password: 'SuperSecurePassword123!'
  });
  
  if (authError) {
    console.error("Auth error:", authError);
    return;
  }
  console.log("Signed in successfully as:", authData.user?.email);

  console.log("Fetching constitutions...");
  const { data: constitutions, error: fetchError } = await supabase.from('constitutions').select('id, year');
  
  if (fetchError || !constitutions) {
    console.error("Error fetching constitutions:", fetchError);
    return;
  }

  for (const yearData of historicalData) {
    const constitution = constitutions.find(c => c.year === yearData.year);
    if (!constitution) {
      console.warn(`Constitution for year ${yearData.year} not found. Skipping.`);
      continue;
    }

    console.log(`Seeding chapters for ${yearData.year} (ID: ${constitution.id})...`);
    for (const chapter of yearData.chapters) {
      const { error: insertError } = await supabase.from('constitution_chapters').upsert({
        constitution_id: constitution.id,
        chapter_number: chapter.chapter_number,
        title: chapter.title,
        content: chapter.content,
        section_range: chapter.section_range
      });

      if (insertError) {
        console.error(`Error inserting chapter ${chapter.chapter_number} for ${yearData.year}:`, insertError);
      } else {
        console.log(`  ✓ Chapter ${chapter.chapter_number}: ${chapter.title}`);
      }
    }
    console.log(`✓ Finished seeding ${yearData.year}`);
  }
  
  console.log("\nSeeding complete!");
}

seed();
