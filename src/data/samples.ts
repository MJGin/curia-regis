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
