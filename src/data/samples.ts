import type { CompetitionId } from "../types";

export interface SampleCompromis {
  id: string;
  title: string;
  competition: CompetitionId;
  summary: string;
  text: string;
}

export const SAMPLE_COMPROMISES: SampleCompromis[] = [
  {
    id: "jessup-auralia",
    title: "Republic of Auralia v Federation of Berythia — Dispute over the Kavora River Basin and the Vantage Cyber Operation",
    competition: "jessup",
    summary:
      "A fictional Jessup problem: a transboundary water diversion, an environmental impact assessment that was never shared, and a cyber operation against a dam control system. Tests jurisdiction, treaty interpretation, state responsibility for non-State actors, and reparation.",
    text: `COMPROMIS

Between: Republic of Auralia (Applicant) and Federation of Berythia (Respondent)

I. AGREED STATEMENT OF FACTS

1. Auralia and Berythia are neighbouring States sharing the Kavora River Basin, an international watercourse governed by the 2009 Kavora Basin Treaty and customary international law.

2. Both States are parties to the Kavora Basin Treaty, to the Charter of the United Nations, and to the Vienna Convention on the Law of Treaties.

3. Berythia completed the Marren Dam on the Kavora River in 2021, diverting approximately 40 percent of the river's dry-season flow into Berythian territory.

4. Auralia requested an environmental impact assessment for the dam. Berythia provided a summary in 2022 but declined to release the full assessment, citing commercial confidentiality.

5. On 14 March 2023, the control systems of the Marren Dam were disabled for six hours by a cyber operation. Berythia attributes the operation to a non-State group, the Kavora Liberation Front, operating from servers located in Auralia.

6. Auralia denies any involvement in the cyber operation and has offered to investigate. Berythia has not accepted the offer.

7. The parties have failed to settle the dispute by negotiation. Auralia has brought the matter before the International Court of Justice on the basis of the compromissory clause in Article 18 of the Kavora Basin Treaty.

II. DISPUTED FACTS

8. Whether the Marren Dam causes significant harm to Auralia's riparian rights, including the drying of the lower Kavora wetlands.

9. Whether Berythia's environmental impact assessment process satisfied its obligations under the Kavora Basin Treaty and customary international law.

10. Whether Auralia exercised effective control over the Kavora Liberation Front or otherwise directed or supported the cyber operation.

11. Whether the damage caused by the cyber operation is attributable to Auralia and, if so, in what amount.

III. PROCEDURAL HISTORY

12. Auralia instituted proceedings on 3 May 2023. Berythia raised preliminary objections to jurisdiction and admissibility on 12 July 2023. The Court joined the preliminary objections to the merits by Order of 9 October 2023.

IV. QUESTIONS PRESENTED

A. Whether the Court has jurisdiction over the dispute under Article 18 of the Kavora Basin Treaty.

B. Whether Berythia breached its obligations under the Kavora Basin Treaty and customary international law by constructing and operating the Marren Dam.

C. Whether Auralia is responsible under international law for the cyber operation against the Marren Dam.

D. What form and quantum of reparation is owed, if any.

V. PRAYERS FOR RELIEF

The Applicant, Republic of Auralia, respectfully requests the Court to adjudge and declare that the conduct of the Federation of Berythia is inconsistent with its obligations under international law, and to order cessation of the wrongful acts and full reparation for the injury caused. The Respondent, Federation of Berythia, respectfully requests the Court to dismiss the Application and to adjudge and declare that the conduct of the Republic of Auralia is inconsistent with its obligations under international law.`,
  },
  {
    id: "kenya-health",
    title: "Wanjiku Mwangi v Cabinet Secretary for Health & 2 others — Automated Triage in Public Hospitals",
    competition: "kenya-sc",
    summary:
      "A Kenyan constitutional petition: an AI triage system rolled out in public hospitals without a data protection impact assessment, public participation or a statutory basis, affecting the right to health, privacy, fair administrative action and equality.",
    text: `PETITION

Between: Wanjiku Mwangi (Petitioner) and (1) Cabinet Secretary for Health, (2) National Hospital Insurance Fund, (3) MedAI Systems Limited (Respondents)

I. AGREED FACTS

1. In January 2024 the Ministry of Health deployed an automated triage system, "MedAI", in twelve public hospitals. MedAI scores patients on urgency and routes them to treatment queues.

2. MedAI processes patient names, national identity numbers, medical histories and biometric identifiers. The system is hosted on servers located outside Kenya.

3. No data protection impact assessment was conducted before deployment. No public participation was held. The procurement was effected under emergency provisions of the Public Procurement and Asset Disposal Act.

4. On 3 March 2024 the Petitioner, a patient at Kenyatta National Hospital, was assigned a low urgency score and waited eleven hours before receiving treatment for a cardiac condition.

5. The Data Protection Act, 2019 and the Constitution of Kenya, 2010 apply.

II. DISPUTED FACTS

6. Whether the deployment of MedAI without a statutory basis and without public participation violates Articles 10, 27, 31, 43 and 47 of the Constitution.

7. Whether the transfer of patient data to servers outside Kenya without safeguards breaches Part VI of the Data Protection Act, 2019.

8. Whether the Petitioner's low urgency score, and the delay that followed, constitute a violation of the right to the highest attainable standard of health.

9. Whether the State has a positive obligation to regulate artificial intelligence in healthcare.

III. PROCEDURAL HISTORY

10. The Petitioner filed a constitutional petition on 2 April 2024. The Respondents filed replying affidavits on 30 April 2024, contending that the deployment was a policy choice falling within executive discretion.

IV. QUESTIONS PRESENTED

A. Whether the deployment of MedAI without a statutory basis and public participation is unconstitutional.

B. Whether the processing and cross-border transfer of patient data breaches the Data Protection Act, 2019.

C. Whether the Petitioner is entitled to constitutional remedies, including an order quashing the deployment and directing a data protection impact assessment.

V. PRAYERS

The Petitioner prays that this Honourable Court be pleased to declare that the deployment of MedAI violates Articles 10, 27, 31, 43 and 47 of the Constitution; to quash the deployment; and to direct the Respondents to conduct a data protection impact assessment and to hold public participation before any redeployment.`,
  },
  {
    id: "odpc-carecloud",
    title: "In the Matter of the Cross-Border Transfer of Health Data by CareCloud Limited",
    competition: "odpc",
    summary:
      "An ODPC complaint: a health-tech company transfers patient records to a processor in a third country without an adequacy decision or appropriate safeguards, without a data protection impact assessment and without freely given consent.",
    text: `COMPLAINT TO THE OFFICE OF THE DATA PROTECTION COMMISSIONER

Between: Jane Atieno (Complainant) and CareCloud Limited (Respondent)

I. AGREED FACTS

1. CareCloud Limited operates a patient-management platform used by seventeen clinics in Kenya. It stores patient names, national identity numbers, diagnoses and treatment histories.

2. In June 2023 CareCloud migrated its database to a cloud provider whose servers are located outside Kenya, in a jurisdiction with no adequacy decision.

3. Patients were informed of the migration by a single email. No consent was sought for the transfer. No data protection impact assessment was conducted.

4. The Complainant is a patient at one of the clinics. Her data is held on the platform.

5. The Data Protection Act, 2019 and the Data Protection (General) Regulations, 2021 apply.

II. DISPUTED FACTS

6. Whether the migration constitutes a cross-border transfer within Part VI of the Data Protection Act, 2019.

7. Whether the Respondent has demonstrated appropriate safeguards for the transfer.

8. Whether the consent relied on by the Respondent is freely given, specific and informed.

9. Whether the absence of a data protection impact assessment renders the processing unlawful.

III. PROCEDURAL HISTORY

10. The Complainant filed a complaint with the Office of the Data Protection Commissioner on 14 August 2023. The Respondent filed a reply on 12 September 2023, contending that the transfer is necessary for the provision of the service.

IV. QUESTIONS PRESENTED

A. Whether the cross-border transfer complies with Part VI of the Data Protection Act, 2019.

B. Whether the processing has a lawful basis under section 30 of the Act.

C. What enforcement measures, if any, should issue.

V. RELIEF SOUGHT

The Complainant invites the Commissioner to find the processing unlawful, to issue an enforcement notice requiring suspension of the transfers and erasure of the data unlawfully held, and to direct the Respondent to conduct a data protection impact assessment and to submit to an audit.`,
  },
  {
    id: "african-land",
    title: "Community of the Mara Forest v Republic of Zanthe — Eviction of an Indigenous Community",
    competition: "african",
    summary:
      "An African human-rights problem: the eviction of an indigenous community from ancestral forest land without consultation or compensation, affecting property, culture, religion and non-discrimination under the African Charter.",
    text: `APPLICATION TO THE AFRICAN COURT ON HUMAN AND PEOPLES' RIGHTS

Between: Community of the Mara Forest (Applicants) and Republic of Zanthe (Respondent)

I. AGREED FACTS

1. The Community of the Mara Forest is an indigenous community that has occupied and used the Mara Forest for over a century.

2. In 2022 the Government of Zanthe gazetted the forest as a protected area and ordered the eviction of the community. No consultation was held. No compensation was paid.

3. The community's homes, shrines and grazing areas were destroyed. Several members were arrested during the eviction.

4. Zanthe is a party to the African Charter on Human and Peoples' Rights and has accepted the jurisdiction of the African Court.

5. The community exhausted domestic remedies, which were dismissed on the ground that the eviction was a policy decision.

II. DISPUTED FACTS

6. Whether the eviction violates the community's rights to property, culture, religion and non-discrimination under Articles 14, 17 and 19 of the African Charter.

7. Whether the failure to consult and compensate breaches the right to development under Article 22.

8. Whether the State has a positive obligation to recognise indigenous land tenure.

III. PROCEDURAL HISTORY

9. The community filed an application before the African Court on 15 March 2023. The Respondent filed a response on 20 April 2023, contending that the eviction was necessary for conservation.

IV. QUESTIONS PRESENTED

A. Whether the eviction violates the African Charter.

B. Whether the Respondent is obliged to provide restitution and compensation.

C. What provisional measures, if any, should issue.

V. PRAYERS

The Applicants pray that the Court find that the Respondent has violated Articles 1, 2, 4, 5, 7, 14, 17, 19 and 24 of the African Charter; order restitution and compensation; and grant provisional measures protecting the community pending judgment.`,
  },
];

export const BENCHMARK_MEMORIAL = `BENCHMARK MEMORIAL EXCERPT (demo — replace with a real winning memorial)

STATEMENT OF JURISDICTION

May it please the Court. The Applicant, Republic of Auralia, submits that the Court has jurisdiction under Article 18 of the Kavora Basin Treaty. The jurisdictional threshold is satisfied on the face of the instrument: the clause is clear, the parties are States, and the dispute concerns the interpretation and application of the Treaty.

SUMMARY OF PLEADINGS

1. The Respondent breached Article 7 of the Kavora Basin Treaty by failing to conduct an environmental impact assessment and by failing to share it.

2. The Respondent breached its customary obligation not to cause significant harm to the territory of another State.

3. The cyber operation is not attributable to the Applicant; in the alternative, reparation must be proportionate.

ARGUMENT

I. THE COURT HAS JURISDICTION

A. The compromissory clause is clear and unconditional.

1. The Applicant submits that Article 18 confers jurisdiction over any dispute concerning the interpretation or application of the Treaty. The ordinary meaning of the words, read in context and in light of the object and purpose of the Treaty, leaves no room for the Respondent's narrow reading.

2. The Respondent's reliance on State responsibility is misplaced. The clause is not limited to disputes about State responsibility; it extends to all disputes concerning the Treaty, including the procedural obligations in Article 7.

B. THE RESPONDENT'S OBJECTION FAILS

3. The Respondent argues that the dispute is really about a cyber operation, not about the Treaty. That argument confuses the subject matter of the dispute with the legal characterisation of the claims. The Applicant's claims are squarely about the Treaty; the cyber operation is a separate issue.

CONCLUSION

For the foregoing reasons, the Applicant respectfully requests the Court to adjudge and declare that the conduct of the Respondent is inconsistent with its obligations under international law.`;

export const BENCHMARK_ORAL = `BENCHMARK ORAL SCRIPT EXCERPT (demo — replace with a real mooter's script)

OPENING APPEARANCE AND ROADMAP (2 minutes)

May it please the Court. I appear for the Applicant, Republic of Auralia. I will make three submissions. First, that this Court has jurisdiction under Article 18 of the Kavora Basin Treaty. Second, that the Respondent breached Article 7 and the customary obligation not to cause significant harm. Third, that the cyber operation is not attributable to the Applicant.

On the first point, the jurisdictional threshold is satisfied on the face of the instrument. The clause is clear, the parties are States, and the dispute concerns the interpretation and application of the Treaty.

CONTENTION I — JURISDICTION (5 minutes)

Your Honour, the Respondent's objection is that the dispute is really about a cyber operation. With respect, that mischaracterises the claim. The Applicant's claim is that the Respondent breached the Treaty; the cyber operation is a separate matter raised by the Respondent in defence.

If the Court were to accept the Respondent's reading, the compromissory clause would be emptied of content. That cannot be what the parties intended.

CONTENTION II — MERITS (5 minutes)

On the merits, the evidence establishes that the Marren Dam diverts 40 percent of the dry-season flow. The Respondent's own summary acknowledges a significant reduction in downstream flow. Under the customary rule, a State may not use its territory in a manner that causes significant harm to another State.

CONCLUSION AND PRAYERS (2 minutes)

For those reasons, the Applicant respectfully requests the Court to adjudge and declare that the conduct of the Respondent is inconsistent with its obligations under international law, and to order cessation and full reparation.

REBUTTAL (2 minutes)

On the Respondent's first point, we accept that the cyber operation caused damage. We do not accept that it is attributable to the Applicant. Attribution requires effective control; the Respondent has not shown effective control.`;


export const BENCHMARK_ORAL_EAC = `BENCHMARK ORAL SCRIPT EXCERPT (demo, EAC-style — replace with a real mooter's transcript)

OPENING APPEARANCE AND ROADMAP

May it please this Honourable Court. Appearing before you is counsel Muriki Keith, appearing for the Petitioner, the Republic of Tangazeni, alongside my co-counsel, Miss Lucy Mau. Of the thirty minutes graciously allocated to us by this Honourable Court, I will use the first sixteen minutes to dispense on the merits of the preliminary issues, proceeded by merit issue number three and merit issue number four. My co-counsel will use the subsequent twelve minutes on merit issue number one and merit issue number two, alongside our prayers. We shall reserve two minutes for rebuttals. If it pleases this Honourable Court, and if this Court grants me latitude, I wish to proceed. Much obliged.

Members of the bench, this is not the very first time in history that a creature by the name of the East Pandarian Community has come into existence. Post-independence, a community was established to ensure regional integration; unfortunately, due to non-cooperation and political issues, that creature collapsed. The community could not exist by itself; it required the consent of States. Much obliged.

JURISDICTION AND ADMISSIBILITY

May it please the Court. Unlike domestic legal systems, this Court's jurisdiction cannot be stipulated by a constitution or a statute alone. This being a regional and international court, this Court's jurisdiction flows from one word, and that word is consent. State parties must consent to being bound. Under Article 23 of the Treaty, this Court shall ensure observance of the law in the interpretation and application of the Treaty; and under Article 27, this Court shall have jurisdiction to interpret and ensure observance and compliance with the Treaty. If you look at the four issues tabled before you, they move this Honourable Court to interpret various provisions of the Treaty.

Counsel, quick questions. Does this Court have jurisdiction over human-rights violations? Is there an express provision giving this Tribunal jurisdiction over this matter?

Much obliged. The response can be derived from this Court's own determination in James Katabazi and 21 Others v Attorney General of Uganda, where the Court asked itself whether it had jurisdiction to respond to human-rights violations and answered: the simple answer is no; however, we will not abdicate our jurisdiction to interpret the Treaty merely because, when asked to interpret its provisions, we might have to answer questions touching on human rights. We are not asking the Court to determine whether human rights were violated, but whether the actions of the Respondent fell within the confines of their legal obligation under Article 6(2)(d) on good governance, which includes transparency, democracy and the rule of law. Much obliged.

STANDING AND CUSTOMARY INTERNATIONAL LAW

Members of the bench, the Petitioner is alive to the argument that we may lack locus standi to institute issue number three. We are not here on behalf of Mr. Tabaki or the Republic of Zalendo. We are here as a result of a violation of customary international law, under the doctrine of obligations owed erga omnes, which is totally different from the doctrine of diplomatic protection. The general rule is that, as long as you have not been injured, you should not approach an international court; this is provided for under Article 48 of the ILC Draft Articles on State Responsibility. However, a party may institute a claim where there is a violation of a treaty itself, or a violation of an obligation owed to the entire international community. The right to property has gained the status of customary international law, having met the requirements espoused in United States v Nicaragua: opinio juris and State practice, shown through duration, uniformity and generality. Much obliged.

TIME MANAGEMENT AND JUDICIAL INTERACTION

Seeing my time has really elapsed, I ask for discretionary minutes from the Court. The bench gave me discretionary minutes and I had requested that my time be calculated individually. Yes, they can confirm that. It is not really the clerk's time; it is our time. Apologies. So that your colleague can also address us on the issues, we are very particular on time. Much obliged.

CONCESSIONS AND PIVOTS

We accept that the cyber operation caused damage. We do not accept that it is attributable to the Applicant. Attribution requires effective control; the Respondent has not shown effective control. With respect, we concede that the measure caused hardship; however, the necessity defence is unavailable where the State contributed to the crisis. Even if the Court were to accept the Respondent's characterisation, the Petitioner submits that the measure was disproportionate.

DISTINGUISHING ADVERSE AUTHORITY

This is distinguishable from the case of Attorney General v Kituo cha Sheria, where a similar encampment directive was invalidated for being speculative and unsupported by evidence. Here, the nexus between refugee mobility and the attacks was concrete and substantiated. Unlike that case, where security forces rounded up and humiliated refugees, here refugees were given ten days to relocate voluntarily.

CONCLUSION

For those reasons, the Petitioner respectfully requests this Honourable Court to grant the declarations sought. Thus, we humbly contend. Dated this day. Advocates for the Petitioner.

REBUTTAL

The Respondent has kept mentioning sovereignty, sovereignty, sovereignty. However, Article 27 of the Vienna Convention on the Law of Treaties provides that a State cannot invoke its internal law or sovereignty to defend a breach of a treaty obligation. With that, we rest our case. Much obliged.
`;


export const BENCHMARK_ORAL_ICC = `BENCHMARK ORAL SCRIPT EXCERPT (demo, ICC-style — replace with a real mooter's transcript)

OPENING APPEARANCE AND ROADMAP

Presiding judge, your excellencies, may it please this honourable court. Good evening. My name is Michael Mushamba. It is an honour to appear before you today as first counsel for the prosecution. With me is my colleague and friend Tracy Jerop. I shall take ten minutes to address the second merit on admissibility. My colleague will then step in for fifteen minutes to address the first and third merits. We respectfully reserve five minutes for rebuttals. Thank you.

Thank you very much. And now, please, defence. Mr President, your excellencies, and may it please the court. It is an honour to represent the defence for Mr Jasper before your honourable court. Today I am Vagisha Mandler, first counsel for the defence. I will address the bench on the first and second issues for the initial fifteen minutes, and my co-counsel Mr Aayush Mishra will address the bench on the third issue for the remaining ten minutes. We reserve five minutes for sur-rebuttals. Please.

CONTEXTUALISING AND ISSUE FRAMING

Presiding judge, your excellencies, may it please this honourable court. As I had earlier introduced myself, my name is Michael Mushamba. I now proceed to make the substantive arguments for our case, starting with the second merit on admissibility. But before then, your excellencies, allow me to contextualise the case and the matters before you today. Your excellencies, the case before you today is quite monumental, as for the first time in history since the establishment of this court, it is faced with a standalone charge of direct and public incitement to commit genocide. But at the heart of these proceedings lies a great injustice inflicted upon the Adrenalin people by the accused person, Mr Roads. Through policies and insightful words, he unleashed a decade-long campaign to erase the Adrenalin religion, encouraging hate, harm and their permanent destruction. Your excellencies, throughout our submissions, we respectfully request this court to reaffirm the fundamental principle that never again will the most serious crimes of international concern go unpunished.

JUDICIAL INTERACTION AND CONCESSIONS

Your excellencies, at this point we anticipate that the defence may attempt to dissect each and every measure in isolation, but as confirmed in the 2024 pre-trial decision in Prosecutor v Coney at paragraph 56, these measures should not be assessed in isolation. They must be viewed together. And in the present case, newspapers must be read alongside podcasts and social media alongside diplomatic channels. We must recall that the law does not demand perfection. It demands reasonability.

Yes. You say you anticipate the defence may try to deal with matters individually. Are you suggesting that the fact that each measure in itself, if inadequate, nonetheless taken together makes an adequate measure?

Your Excellency, our argument is that when taken together they do amount to reasonable steps, and even when picked apart they still amount to reasonable steps, given that none of the individual measures is inadequate.

DISTINGUISHING AND AUTHORITY

We submit that the previous trials conducted in Raspia were conducted with an intent to shield Mr Roads from criminal responsibility. Pre-Trial Chamber One's 2013 decision in Prosecutor v Gaddafi and Al-Senussi, at paragraph 200, stated that national trials conducted with an intent to shield should be assessed on a case-by-case basis. Neither the Rome Statute nor judicial decisions give further guidance on what amounts to shielding. We rely on the preparatory works: the 1996 ILC Draft Code and the Surakusa Draft, which stated that factors such as inadequate sentences that do not commensurate the gravity of the crime can indicate an element of shielding.

TIME MANAGEMENT

Your excellencies, as my time is up, can I finish answering this? Thank you. In the 2023 decision of Prosecutor v Coney at paragraph 69, the court found that the passing of time cannot in and of itself justify holding a confirmation hearing in absentia. And therefore the question I would pose to the bench, in exercising your discretion, would be: for how much longer should we wait before justice delayed becomes justice denied? And considering that all reasonable steps have been taken, we ask you to find that three years would constitute reasonable time. And seeing as my time is up, it has been a pleasure submitting before this honourable court. Thank you.

REBUTTAL

Presiding judge, your excellencies, it is a pleasure to appear before you once again. In the next five minutes, the prosecution rises on three points of rebuttal: first, on the admissibility challenge; second, on the issue of direct and public incitement to commit genocide. On the first point, our learned friend argued that a reduction of sentence alone is not enough to demonstrate an intent to shield. However, the prosecution's case does not rest on a reduction of sentence alone. We draw attention to the surrounding circumstances upon which this sentence was imposed, specifically the discriminatory appointment of judges on religious grounds. Taken together, we ask this court to find these factors to form sufficiently compelling evidence that goes beyond mere theory or suspicion.

CLOSING

Your excellencies, the words of Mr Roads were not the words of a leader seeking to protect his people. These were not cautious warnings, nor were they the measured words of a president navigating crisis. They were deliberate, calculated, and charged with the intent to destroy. We therefore ask this court to find that these were not words of leadership but rather weapons charged at ordinary Adrenalin civilians. Consequently, we ask this court to find that, first, this case is admissible; second, that the requirements for a confirmation hearing in absentia have been met; and third, that there are substantial grounds to believe that Mr Roads is criminally liable for the crime of direct and public incitement to commit genocide. It has been an honour submitting before this honourable court. Thank you for your attention.

DEFENCE OPENING AND TIME ALLOCATION

Mr President, your excellencies, and may it please the court. This case is based on uncertain evidence and a procedure that fails to meet this court's standards. I will address the bench on the first and second issues for the initial fifteen minutes, and my co-counsel will address the bench on the third issue for the remaining ten minutes. We reserve five minutes for sur-rebuttals. Please.

JUDICIAL INTERRUPTIONS AND CONCESSIONS

Your excellencies, we submit that the prosecution has not contested the fulfilment of the requirements under Article 17(1)(c). We submit this on the basis of three grounds: first, that the suspect has already been tried by another court and the decision is final; second, that the suspect is being charged for substantially the same conduct; and third, that the present case does not fall within the exceptions of the ne bis in idem principle.

Council, can you please explain? You just said that the conduct is substantially the same. Could you please give us what are the main characteristics making the conduct substantially the same?

Your excellencies, his speech acts form the crux of the allegations against him before your excellencies, and his speech acts are exactly the conduct for which he has already been convicted by the domestic court. Therefore, there is a substantial overlap. If that answers your excellency's query, allow me to proceed.

CONCESSION AND PIVOT

We do acknowledge that the reduction of the sentence to the time that the suspect has already undergone detention is a general practice across various legal systems. However, we submit that since the judiciary was impartial and independent, and the domestic proceedings were not to shield Mr Roads, the exceptions of the ne bis in idem principle under Article 20(3)(a) and (b) do not apply.

DISTINGUISHING

We submit that the reduction of the sentence cannot indicate shielding of Mr Roads. The appellate court upheld his conviction. If they were so loyal, they could have acquitted him, but they convicted him. And the penalty imposed upon him of two months aligns with the penalties ordinarily imposed for the same crimes across various national jurisdictions.

CLOSING AND PRAYERS

Having submitted our prayers, I would like to urge this honourable court to adopt the appropriate legal propositions presented by the respondent in order to precisely evaluate and determine the present dispute. It has been an honour submitting before this honourable court. Much obliged, and may it please this court. Finally, what do you want the court to do for you? Oh, much obliged, your excellency. We ask this honourable court to dismiss the present petition. If that suffices, much obliged, and may it please this court.

JUDGE FEEDBACK (PATTERNS TO EMULATE)

Be concise, be precise. Don't lecture; make your case. Be flexible with time. You are not the future of the law; you are the present. Keep the flame of international criminal law alive.
`;


export const BENCHMARK_ORAL_SC = `BENCHMARK ORAL SCRIPT EXCERPT (demo, Supreme Court of Kenya style — replace with a real mooter's transcript)

OPENING AND WELCOME

The Honourable Chief Justice, my lords, my ladies, run counsel, all the participants, those present here in court and those joining us online, good morning. Before us is one of the very consequential cases coming for hearing: the Nyota Refugee Coalition v the Minister for Homeland Security and the Department of Refugee Services. We have allocated time to the appellants to share among themselves the forty-five minutes.

APPELLANT'S ROADMAP AND TIME ALLOCATION

May it please the Court, as earlier introduced, my name is Saras Karaoke, the lead counsel appearing for the appellant. I am joined by my co-counsel, Miss Na Akin Opio and Mr James Kenya. Together we are Team SC016. We intend to use the forty-five minutes allocated to us as follows: I will use the first fifteen minutes to converse our client's position as it regards the first and second issues; my co-counsel Miss Nara will use fifteen minutes to dispense with the merits of the third issue; and finally Mr James Kenya will use fifteen minutes to address the merits of the fourth issue. With the Court's permission, I would like to proceed.

Before proceeding to our substantive argument, members of the bench, I must indeed acknowledge what an honour and privilege it is to be submitting before such an esteemed panel of judges. It is indeed an honour of my life. With that being said, I wish to proceed to the merits of the case.

SUBSTANTIVE ARGUMENT WITH JUDICIAL INTERACTION

Members of the bench, at a time when the Zephyrian refugees have been confronted by mass persecution, enforced disappearances, sexual violence targeting women and girls and ethnic persecution, the respondents have gone on to do the unthinkable. Not only have they trampled on the refugee rights of the Zephyrians, they have also done so with the slightest of remorse. This, we submit, is repugnant to justice and morality.

Turning to the first issue, we indeed assert before this Honourable Court that the use of artificial intelligence in refugee status determination violates the rights under Article 47 and Article 50 of the Constitution of Nyota, as well as international refugee law. This position will be conversed in one head of argument to demonstrate to this court that the aforementioned provisions were indeed violated.

Members of the bench, how does the use of artificial intelligence in refugee status determination violate Article 47? We submit it does so in one way: it lacks sufficient human oversight. Human oversight, members of the bench, is a legal obligation created under Section 12 of the Refugee Act, as read together with Regulation 9 and Regulation 10 of the General Refugee Regulations.

Could you please clarify what terrorism or terrorist acts are, and the difference between terrorist acts and acts of political opinion?

Much obliged. We did not submit that Wido and his family are indeed a terrorist group. We submitted that they are not, and that the respondents, pursuant to paragraph 196 of the UNHCR Handbook, did not ascertain the facts. We place reliance on the OAU Convention on the Prevention and Combating of Terrorism, Article 3, and on United Nations Security Council Resolution 1566 of 2004.

CONCESSIONS AND PIVOTS

We do not wish to contest legality and necessity; however, we have a bone to chew with the respondents with regards to proportionality. In considering proportionality, allow me to rely on Kandie v Alassane BA, decided before this Honourable Court in 2017, where under paragraph 63 the Court acknowledged that the limitation of any right needs to adhere to the least restrictive means. The question then begs: was the least restrictive means adhered to? We submit it was not. The government of Nyota should have employed another least restrictive means. We wish to place reliance on the International Detention Coalition's Captured Childhood report, Chapter 6, which proposes that when the principle of non-refoulement and national security are at play, states should consider taking the people who are being refouled to another region or to another state where they are not a threat to the national security of that state.

TIME MANAGEMENT

Seeing my time has really elapsed, I ask for discretionary minutes from the Court. The bench gave me discretionary minutes and I had requested that my time be calculated individually. Much obliged. So that your colleague can also address us on the issues, we are very particular on time.

DISTINGUISHING ADVERSE AUTHORITY

This is distinguishable from the case of Attorney General v Kituo cha Sheria, where a similar encampment directive was invalidated for being speculative and unsupported by evidence. Here, the nexus between refugee mobility and the attacks was concrete and substantiated. Unlike that case, where security forces rounded up and humiliated refugees, here refugees were given ten days to relocate voluntarily.

REBUTTAL AND CLOSING

Members of the bench, in conclusion we submit and pray that this Honourable Court allows this appeal and find that the Court of Appeal erred in the following four aspects: first, in upholding the use of AI without adequate human oversight contrary to due process; second, in finding no violation of the principle of non-refoulement despite a clear risk of persecution; third, in disregarding the best interests of the child contrary to Article 53(2) of the Constitution; and lastly, in failing to recognise that the state violated the principles that define our constitutional order, that is dignity, equality and freedom of movement.

We urge this Honourable Court to vindicate the promise that even the most vulnerable individuals like Wido and his family deserve constitutional protection. We further wish this Court to grant our client the following remedies: first, to compel the state to release all individuals from the camp; second, to compel the respondent to improve the conditions within the camp; and third, to award damages within reasonable means of compensation.

Thus, we humbly contend. Dated this day. Advocates for the Appellants.

RESPONDENT'S OPENING

May it please this Honourable Court, good morning. As earlier introduced, my name is Tracy Jerop, appearing as the lead counsel for the respondents, with me today are my colleagues and friends, Mr Libatim Shindi and Miss Ashley Ngeno. In fifteen minutes I will be addressing the first and second issues on the use of artificial intelligence in refugee status determination. My colleague Mr Shindi will then step in for the next ten minutes to address the third issue concerning the best interests of the child principle, and finally Miss Ashley will address the fourth issue. If it pleases this Honourable Court, I will now proceed.

JUDICIAL FEEDBACK PATTERNS (TO EMULATE)

Be concise, be precise. Don't lecture; make your case. Be flexible with time. You are not the future of the law; you are the present. Keep the flame alive. The clarity of your reasoning and the sophistication of your advocacy are essential skills to pursue. Each party was passionately pitching a case for their client, and that is what is supposed to happen in court.
`;
