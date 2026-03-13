-- Seed chapters for historical constitutions
-- Bypasses RLS since migrations run as superuser

-- 1922 Clifford Constitution
INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 1, 'The Legislative Council',
'The Clifford Constitution of 1922 established a Legislative Council for the Colony and Protectorate of Nigeria. The Council consisted of the Governor as President, official members who held their seats by virtue of their office, and unofficial members who were either nominated by the Governor or elected. The elected members represented Lagos (3 seats) and Calabar (1 seat), making this the first constitution to introduce the elective principle in British West Africa. The Legislative Council had the power to make laws for the Colony of Lagos and the Southern Provinces, but not for the Northern Provinces which remained under the Governor''s direct legislation through proclamations.',
'1-10'
FROM public.constitutions c WHERE c.year = 1922
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 2, 'The Executive Council',
'The Executive Council was established to advise the Governor on matters of governance. It consisted of the Governor as President and such persons as His Majesty may direct by Instructions under His Sign Manual and Signet. The Governor was required to consult the Executive Council on all matters of importance, but retained the power to act against the advice of the Council if he judged it necessary in the interest of public faith, order, or good government. In such cases, the Governor was required to report to the Secretary of State for the Colonies with his reasons for acting contrary to the Council''s advice.',
'11-15'
FROM public.constitutions c WHERE c.year = 1922
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 3, 'Revenue and Finance',
'All revenues and moneys raised or received by the Government of Nigeria shall form one consolidated revenue fund. No moneys shall be issued from the consolidated revenue fund except under the authority of an appropriation ordinance. The estimates of revenue and expenditure shall be laid before the Legislative Council annually. The Governor shall cause to be prepared and laid before the Legislative Council, before the commencement of each financial year, estimates of the revenue and expenditure of the Colony and Protectorate for the ensuing year.',
'16-22'
FROM public.constitutions c WHERE c.year = 1922
ON CONFLICT DO NOTHING;

-- 1946 Richards Constitution
INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 1, 'Regional Councils',
'The Richards Constitution of 1946 established Regional Councils for the Northern, Western, and Eastern Provinces of Nigeria. Each Regional Council consisted of the Chief Commissioner of the Region as President, official members, and unofficial members. The unofficial members included traditional rulers (Chiefs) and members selected by the Native Authorities. The Regional Councils had the power to consider and advise on any matter referred to them by the Governor, and could consider draft legislation affecting their region before it was introduced in the Legislative Council. This was the first constitution to formally recognize Nigeria''s regional diversity and to create a framework for regional governance.',
'1-20'
FROM public.constitutions c WHERE c.year = 1946
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 2, 'The Legislative Council',
'The Legislative Council was reconstituted under the Richards Constitution to include unofficial members from all regions of Nigeria, including the Northern Provinces for the first time. The Council consisted of the Governor as President, sixteen official members, and twenty-eight unofficial members. Of the unofficial members, four were elected (three from Lagos and one from Calabar, continuing the Clifford Constitution''s elective principle), while the remaining twenty-four were nominated by the Governor — including members selected from the Regional Councils. The Legislative Council now had jurisdiction over the entire country, unlike the Clifford Constitution which excluded the Northern Provinces.',
'21-40'
FROM public.constitutions c WHERE c.year = 1946
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 3, 'Powers of the Governor',
'The Governor retained extensive executive powers under the Richards Constitution. He served as the head of both the Executive Council and the Legislative Council, and had the power to assent to or withhold assent from any bill passed by the Legislative Council. The Governor could also reserve any bill for the signification of His Majesty''s pleasure. In matters of urgency, the Governor could enact legislation without the prior approval of the Legislative Council, although such legislation required subsequent ratification. The Governor also retained the power of appointment and removal of all public officers in the Colony and Protectorate.',
'41-55'
FROM public.constitutions c WHERE c.year = 1946
ON CONFLICT DO NOTHING;

-- 1960 Independence Constitution
INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 1, 'The Federation and its Territories',
'Nigeria shall be a Federation consisting of Regions and a Federal Territory. The Regions of the Federation shall be the Northern Region, the Western Region, and the Eastern Region. The Federal Territory shall be the territory comprised in the Federal Territory of Lagos. Parliament may by law provide for the creation of new regions and the alteration of the boundaries of existing regions. Any such law shall not be passed unless it has been approved by a resolution of each House of Parliament supported by the votes of not less than two-thirds of all the members of that House.',
'1-5'
FROM public.constitutions c WHERE c.year = 1960
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 2, 'Citizenship',
'Every person who, having been born in the former Colony or Protectorate of Nigeria, was on the thirtieth day of September, 1960, a citizen of the United Kingdom and Colonies or a British protected person shall become a citizen of Nigeria on the first day of October, 1960. A person shall also become a citizen of Nigeria if either of his parents was born in the former colony or protectorate of Nigeria. Any woman who is married to a citizen of Nigeria may, by application and upon taking an oath of allegiance, become a citizen of Nigeria. Parliament may make provision for the acquisition of citizenship by persons who are not entitled to become citizens by birth, descent, or registration, through the process of naturalization.',
'6-16'
FROM public.constitutions c WHERE c.year = 1960
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 3, 'Fundamental Rights',
'Every person in Nigeria is entitled to the fundamental rights and freedoms of the individual. No person shall be deprived intentionally of his life, save in execution of the sentence of a court in respect of a criminal offence of which he has been found guilty. No person shall be subjected to torture or to inhuman or degrading punishment or other treatment. No person shall be held in slavery or servitude. Every person shall be entitled to his personal liberty, and no person shall be deprived of such liberty save as may be authorized by law.',
'17-32'
FROM public.constitutions c WHERE c.year = 1960
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 4, 'The Parliament',
'The Parliament of the Federation shall consist of Her Majesty, a Senate, and a House of Representatives. The Senate shall consist of twelve senators representing each Region equally, and four senators representing the Federal Territory of Lagos. The House of Representatives shall consist of such number of members as Parliament may by law prescribe, directly elected on the basis of adult suffrage from single-member constituencies throughout the Federation. Parliament shall have power to make laws for the peace, order, and good government of the Federation with respect to any matter included in the Exclusive Legislative List.',
'33-60'
FROM public.constitutions c WHERE c.year = 1960
ON CONFLICT DO NOTHING;

-- 1963 Republican Constitution
INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 1, 'The Republic',
'Nigeria is hereby declared to be a Sovereign Republic by the name of the Federal Republic of Nigeria. Nigeria shall be a Federation comprising Regions and a Federal Territory. The Federal Territory shall be the territory comprised in the Federal territory of Lagos. The motto of the Federal Republic shall be Unity and Faith, Peace and Progress. The Flag of the Federation shall be of two equal vertical bands of green and white. The Constitution shall have binding force throughout the Federal Republic of Nigeria, and if any other law is inconsistent with this Constitution, this Constitution shall prevail and the other law shall, to the extent of the inconsistency, be void.',
'1-6'
FROM public.constitutions c WHERE c.year = 1963
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 2, 'Citizenship',
'Every person who, immediately before the date of the commencement of this Constitution, was a citizen of Nigeria under the provisions of the Constitution of the Federation which was in force before the coming into operation of this Constitution shall, on that date, become a citizen of Nigeria under this Constitution. A person born in Nigeria after the commencement of this Constitution shall become a citizen of Nigeria at the date of his birth if at that date either of his parents is a citizen of Nigeria. The President may grant certificates of naturalization to any person qualified under the provisions of this chapter.',
'7-17'
FROM public.constitutions c WHERE c.year = 1963
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 3, 'Fundamental Rights',
'Every person in Nigeria is entitled to the fundamental rights and freedoms of the individual as contained in this Chapter, but subject to the respect for the rights and freedoms of others and for the public interest. In the determination of his civil rights and obligations, a person shall be entitled to a fair hearing within a reasonable time by a court or other tribunal established by law. Every person who is charged with a criminal offence shall be presumed innocent until he is proved guilty. Every person shall be entitled to freedom of thought, conscience, and religion, including freedom to change his religion or belief.',
'18-33'
FROM public.constitutions c WHERE c.year = 1963
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 4, 'The President',
'There shall be a President of the Federal Republic of Nigeria who shall be the Head of State and Commander-in-Chief of the Armed Forces of the Federation. The President shall be elected by members of Parliament assembled together. A person shall be qualified for election as President if he is a citizen of Nigeria by birth and has attained the age of forty years. The President shall hold office for a term of five years. In the exercise of his functions under this Constitution or any other law, the President shall act in accordance with the advice of the Council of Ministers.',
'34-50'
FROM public.constitutions c WHERE c.year = 1963
ON CONFLICT DO NOTHING;

-- 1979 Constitution
INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 1, 'General Provisions',
'This Constitution is supreme and its provisions shall have binding force on all authorities and persons throughout the Federal Republic of Nigeria. The Federal Republic of Nigeria shall not be governed, nor shall any person or group of persons take control of the Government of Nigeria or any part thereof, except in accordance with the provisions of this Constitution. If any other law is inconsistent with the provisions of this Constitution, this Constitution shall prevail, and that other law shall to the extent of the inconsistency be void. The motto of the Federal Republic of Nigeria shall be Unity and Faith, Peace and Progress.',
'1-12'
FROM public.constitutions c WHERE c.year = 1979
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 2, 'Fundamental Objectives and Directive Principles of State Policy',
'It shall be the duty and responsibility of all organs of government, and of all authorities and persons, exercising legislative, executive or judicial powers, to conform to, observe and apply the provisions of this Chapter. The security and welfare of the people shall be the primary purpose of government. The participation by the people in their government shall be ensured in accordance with the provisions of this Constitution. The State shall direct its policy towards ensuring that all citizens have the opportunity for securing adequate means of livelihood as well as adequate opportunity to secure suitable employment.',
'13-22'
FROM public.constitutions c WHERE c.year = 1979
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 3, 'Citizenship',
'The following persons are citizens of Nigeria by birth: (a) every person born in Nigeria before the date of independence, either of whose parents or any of whose grandparents belongs or belonged to a community indigenous to Nigeria; (b) every person born in Nigeria after the date of independence either of whose parents or any of whose grandparents is a citizen of Nigeria; (c) every person born outside Nigeria either of whose parents is a citizen of Nigeria. A citizen of Nigeria by birth may not be deprived of his citizenship of Nigeria.',
'23-31'
FROM public.constitutions c WHERE c.year = 1979
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 4, 'Fundamental Rights',
'Every person has a right to life, and no one shall be deprived intentionally of his life, save in execution of the sentence of a court in respect of a criminal offence of which he has been found guilty in Nigeria. Every individual is entitled to respect for the dignity of his person, and accordingly no person shall be subjected to torture or to inhuman or degrading treatment. Every person shall be entitled to his personal liberty and no person shall be deprived of such liberty save in accordance with a procedure permitted by law. Every person shall be entitled to freedom of thought, conscience and religion. Every citizen of Nigeria is entitled to move freely throughout Nigeria and to reside in any part thereof.',
'32-42'
FROM public.constitutions c WHERE c.year = 1979
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 5, 'The Legislature',
'There shall be a National Assembly for the Federation which shall consist of a Senate and a House of Representatives. The Senate shall consist of three Senators from each State and one from the Federal Capital Territory. The House of Representatives shall consist of three hundred and sixty members representing constituencies of nearly equal population throughout the Federation. The National Assembly shall have power to make laws for the peace, order and good government of the Federation or any part thereof with respect to any matter included in the Exclusive Legislative List.',
'43-60'
FROM public.constitutions c WHERE c.year = 1979
ON CONFLICT DO NOTHING;

INSERT INTO public.constitution_chapters (constitution_id, chapter_number, title, content, section_range)
SELECT c.id, 6, 'The Executive',
'There shall be a President of the Federal Republic of Nigeria. The President shall be the Head of State, the Chief Executive of the Federation and Commander-in-Chief of the Armed Forces of the Federation. A person shall be qualified for election to the office of President if he is a citizen of Nigeria by birth, has attained the age of thirty-five years, is a member of a political party and is sponsored by that party. The President shall hold office for a term of four years and shall be eligible for re-election for one further term of four years. Subject to the provisions of this Constitution, the executive powers of the Federation shall be vested in the President.',
'61-85'
FROM public.constitutions c WHERE c.year = 1979
ON CONFLICT DO NOTHING;
