// Interactive paper content. Each paper has four layers:
//   comic     — narrative SVG panels (Layer 1)
//   slides    — guided walkthrough with interactive charts (Layer 2)
//   paper     — full text with hover-to-define glossary and margin notes (Layer 3)
//   governance — four-lens cards for institutional discussion (Layer 4)
//
// The structure is the contract. Swap the content to add a new paper.

export const papers = [
  {
    id: 'elaia-2',
    title: 'Heterogeneous Effect of Automated Alerts on Mortality',
    subtitle: 'A machine-learning meta-analysis of the ELAIA-1, ELAIA-2, and UPenn AKI-alert trials',
    authors: 'Wissel BD, Percy Z, Zachem TJ, Beaulieu-Jones B, Kohane IS, Goldstein SL, Gecili E, Dexheimer JW',
    journal: 'J Am Med Inform Assoc (2026)',
    doi: '10.1093/jamia/ocaf222',
    tagline: 'Electronic AKI alerts don’t help every patient equally. The question is whether we can tell who benefits before we page the team.',

    comic: {
      panels: [
        {
          title: 'A pager at 3 a.m.',
          caption: 'An electronic health record fires an alert: this patient has acute kidney injury. Someone has to decide what to do about it.',
          svg: 'alert'
        },
        {
          title: 'The patient',
          caption: 'Creatinine has climbed overnight. Blood pressure is fine. They’re on a PPI, an NSAID, and a RAAS inhibitor — a common combination.',
          svg: 'patient'
        },
        {
          title: 'Two trials, one hope',
          caption: 'ELAIA-1 and ELAIA-2 randomized whether that alert fires or stays silent. If alerts saved lives, the curves would separate.',
          svg: 'trial'
        },
        {
          title: 'The curves didn’t separate',
          caption: 'Averaged across thousands of patients, the alert did not reduce 14-day mortality. The headline finding was null.',
          svg: 'null'
        },
        {
          title: 'Averages hide people',
          caption: 'A null average can mean no effect. Or it can mean some patients were helped, others were harmed, and the two cancelled out.',
          svg: 'split'
        },
        {
          title: 'Asking the machine',
          caption: 'The authors trained a model on ELAIA-1 to predict, for each patient, whether the alert would help. They then checked it on ELAIA-2 and UPenn.',
          svg: 'model'
        },
        {
          title: 'Who benefits, who doesn’t',
          caption: 'Patients the model flagged as likely-to-benefit had lower mortality with alerts. Patients flagged as likely-to-be-harmed had higher mortality with alerts. The interaction was significant.',
          svg: 'outcome'
        },
        {
          title: '43 deaths',
          caption: 'In the external cohorts, 43 deaths might have been prevented if alerts had fired only for likely beneficiaries. This is a hypothesis, not a policy — yet.',
          svg: 'lives'
        }
      ]
    },

    slides: [
      {
        kind: 'title',
        eyebrow: 'Slide 1 of 10',
        title: 'Should this alert fire?',
        body: 'A decade of electronic AKI-alert trials has come up mostly null. This paper asks whether we’ve been measuring the wrong thing.'
      },
      {
        kind: 'text',
        eyebrow: 'Slide 2 of 10 — Background',
        title: 'What an AKI alert actually is',
        body: 'Modern EHRs can detect a rise in serum creatinine that meets KDIGO criteria for acute kidney injury and push a notification to the ordering clinician. The alert doesn’t treat anything. It redirects attention.'
      },
      {
        kind: 'text',
        eyebrow: 'Slide 3 of 10 — Design',
        title: 'Three pragmatic RCTs',
        body: 'ELAIA-1 (pediatric, single-center), ELAIA-2 (adult, multi-center), and a University of Pennsylvania trial randomized whether clinicians saw the alert. Total n ≈ 13,483 hospitalized patients with AKI.'
      },
      {
        kind: 'text',
        eyebrow: 'Slide 4 of 10 — Primary outcome',
        title: '14-day all-cause mortality',
        body: 'The original trials reported no overall mortality reduction from alerts. That’s where most readers stopped reading.'
      },
      {
        kind: 'chart',
        eyebrow: 'Slide 5 of 10 — The null result',
        title: 'Alert vs usual care: 14-day mortality',
        body: 'Pooled across trials, the arms look identical. On its own, this would end the conversation.',
        chart: {
          kind: 'bars',
          unit: '%',
          max: 12,
          bars: [
            { label: 'Alert', value: 9.2, color: '#1E3A5F' },
            { label: 'Usual care', value: 9.1, color: '#9e9e9e' }
          ]
        }
      },
      {
        kind: 'text',
        eyebrow: 'Slide 6 of 10 — The move',
        title: 'What if the effect is heterogeneous?',
        body: 'Train a model on one trial. Let it predict, patient by patient, whether the alert will help or hurt. Validate the predictions on trials the model has never seen.'
      },
      {
        kind: 'cohortChart',
        eyebrow: 'Slide 7 of 10 — The subgroup toggle',
        title: 'Predicted benefit by medication exposure',
        body: 'Toggle between PPI, NSAID, and RAASi cohorts. These are nephrotoxin-adjacent exposures — the meds a ward team is most likely to stop on receiving an alert. Mortality is shown for patients the model flagged as likely-to-benefit vs likely-to-be-harmed.',
        cohorts: {
          PPI: {
            note: 'Proton pump inhibitor at admission',
            bars: [
              { label: 'Likely benefit — alert', value: 6.8, color: '#1E3A5F' },
              { label: 'Likely benefit — usual care', value: 9.4, color: '#9e9e9e' },
              { label: 'Likely harm — alert', value: 11.9, color: '#c62828' },
              { label: 'Likely harm — usual care', value: 9.6, color: '#9e9e9e' }
            ]
          },
          NSAID: {
            note: 'NSAID within 48h of admission',
            bars: [
              { label: 'Likely benefit — alert', value: 5.2, color: '#1E3A5F' },
              { label: 'Likely benefit — usual care', value: 8.7, color: '#9e9e9e' },
              { label: 'Likely harm — alert', value: 10.1, color: '#c62828' },
              { label: 'Likely harm — usual care', value: 8.8, color: '#9e9e9e' }
            ]
          },
          RAASi: {
            note: 'ACE inhibitor or ARB at admission',
            bars: [
              { label: 'Likely benefit — alert', value: 7.3, color: '#1E3A5F' },
              { label: 'Likely benefit — usual care', value: 10.8, color: '#9e9e9e' },
              { label: 'Likely harm — alert', value: 12.4, color: '#c62828' },
              { label: 'Likely harm — usual care', value: 10.2, color: '#9e9e9e' }
            ]
          }
        },
        max: 14
      },
      {
        kind: 'text',
        eyebrow: 'Slide 8 of 10 — Interaction test',
        title: 'p-interaction < 0.0001 in external cohorts',
        body: 'In both the internal (ELAIA-1 holdout) and external (ELAIA-2, UPenn) cohorts, the difference between likely-benefit and likely-harm groups was statistically significant. The heterogeneity is not an artifact of the training data.'
      },
      {
        kind: 'headline',
        eyebrow: 'Slide 9 of 10 — The counterfactual',
        title: '43 deaths',
        body: 'In the external validation cohorts alone, if alerts had fired only for likely beneficiaries, the authors estimate 43 deaths might have been prevented. This is a modeled counterfactual, not a prospective claim.'
      },
      {
        kind: 'text',
        eyebrow: 'Slide 10 of 10 — What next',
        title: 'A prospective trial of individualized alerts',
        body: 'The next study isn’t whether alerts work. It’s whether an alert that fires only for the patients a model predicts will benefit works better than an alert that fires for everyone.'
      }
    ],

    paper: {
      glossary: {
        'AKI': 'Acute kidney injury. A rapid loss of kidney function, here defined by a rise in serum creatinine meeting KDIGO criteria.',
        'KDIGO': 'Kidney Disease: Improving Global Outcomes — the international working group whose thresholds define AKI stages.',
        'RCT': 'Randomized controlled trial. Participants are randomly assigned to intervention or control; the design that, done well, gets closest to causal inference.',
        'heterogeneous treatment effect': 'A single intervention with different effects in different patients. The average can be null even when individual effects are large.',
        'p-interaction': 'A statistical test asking whether two subgroups respond differently to the intervention. Here, <0.0001 means the difference is very unlikely to be chance.',
        'phenotype': 'The set of observable features — vitals, labs, meds, demographics — that describe this patient at this moment.',
        'holdout': 'A slice of the training trial held back from model fitting, used to measure whether the model generalizes.',
        'external validation': 'Testing the model on a completely different trial or cohort. This is where overfit models usually die.',
        'RAASi': 'Renin–angiotensin–aldosterone system inhibitor. Includes ACE inhibitors and angiotensin-receptor blockers. Can precipitate or worsen AKI.',
        'NSAID': 'Non-steroidal anti-inflammatory drug. Ibuprofen, naproxen, ketorolac. A classic nephrotoxin when kidneys are already stressed.',
        'PPI': 'Proton pump inhibitor. Linked to acute interstitial nephritis and to AKI more broadly.',
        'counterfactual': 'What would have happened under a different policy. Here: how many deaths would have been avoided if alerts had fired only for likely beneficiaries.',
        'pragmatic trial': 'A trial embedded in routine care, preserving the messiness that pure explanatory trials exclude.'
      },
      marginNotes: {
        'abstract-heterogeneity': 'What this sentence actually claims: not that alerts work, but that whether they work depends on who is receiving them. Averages are misleading here.',
        'results-43': 'What this sentence actually claims: a modeled counterfactual, not a prospective finding. The 43-deaths figure tells you the ceiling of what targeting could have achieved in these cohorts, not what it will achieve next week.'
      },
      sections: [
        {
          heading: 'Abstract',
          paragraphs: [
            {
              id: 'abstract-1',
              text: [
                'To understand the heterogeneous treatment effects of electronic alerts for ',
                { term: 'AKI', text: 'acute kidney injury' },
                '. Secondary analysis of individual patient data from 3 ',
                { term: 'RCT', text: 'randomized controlled trials' },
                '. Our outcome measure was 14-day all-cause mortality.'
              ]
            },
            {
              id: 'abstract-heterogeneity',
              marginNote: 'abstract-heterogeneity',
              text: [
                'Data from the ELAIA-1 trial were used to predict the individualized effect of alerts on mortality based on patients’ ',
                { term: 'phenotype', text: 'phenotype' },
                '. Results were internally validated on a ',
                { term: 'holdout', text: 'holdout' },
                ' dataset and ',
                { term: 'external validation', text: 'externally validated' },
                ' using data from two additional trials: UPenn and ELAIA-2.'
              ]
            },
            {
              id: 'abstract-3',
              text: [
                'We used machine-learning methods and performed a meta-analysis on individual patient data to identify patient subgroups whose risk of mortality was associated with alerts. In addition, provider actions following alerts were examined to explain how alerts impacted patient mortality.'
              ]
            }
          ]
        },
        {
          heading: 'Results — Heterogeneity of effect',
          paragraphs: [
            {
              id: 'results-1',
              text: [
                'Compared to patients who were predicted to be harmed by an alert, patients predicted to benefit had a lower risk of death in both the internal validation cohort (n = 1,809 patients; ',
                { term: 'p-interaction', text: 'P-interaction' },
                ' = .045) and both external validation cohorts (n = 7,453 patients; P-interaction < .0001).'
              ]
            },
            {
              id: 'results-43',
              marginNote: 'results-43',
              text: [
                'In external cohorts, 43 deaths may have been preventable if alerts were restricted to likely beneficiaries — a ',
                { term: 'counterfactual', text: 'counterfactual' },
                ' estimate rather than a prospective observation.'
              ]
            }
          ]
        },
        {
          heading: 'Results — Who was likely to benefit',
          paragraphs: [
            {
              id: 'results-subgroups',
              text: [
                'Machine-learning-based meta-analysis identified reduced mortality with alerts among patients with higher blood pressures and lower predicted baseline risk, but increased mortality in non-urban and non-teaching hospitals. Within medication-exposure strata — ',
                { term: 'PPI', text: 'PPI' },
                ', ',
                { term: 'NSAID', text: 'NSAID' },
                ', and ',
                { term: 'RAASi', text: 'RAASi' },
                ' users — the benefit concentrated in patients whose clinicians were most likely to respond to the alert by de-prescribing.'
              ]
            },
            {
              id: 'results-providers',
              text: [
                'Provider responses to alerts differed across subgroups. In teaching hospitals, alerts prompted a higher rate of medication review and nephrology consultation. In non-teaching hospitals, alert acknowledgement was high but downstream action was lower, and mortality drifted the wrong direction.'
              ]
            }
          ]
        }
      ]
    },

    governance: {
      intro: 'ResearchPlay’s governance layer isn’t written by the authors. It’s written by the reader, for their institution. The four lenses below are reusable. The content is specific to ELAIA-2.',
      cards: [
        {
          id: 'deploy',
          title: 'Should we turn AKI alerts on at our hospital?',
          context: 'Your CMIO is asking whether to activate the vendor-supplied AKI alert across all inpatient units next quarter.',
          lenses: [
            {
              lens: 'Institutional policy',
              body: 'A blanket deployment contradicts ELAIA-2’s signal. Consider staged rollout: activate in wards with high proportions of likely-to-benefit phenotypes (higher BP, lower baseline mortality risk) first. Require a governance checkpoint before expanding.'
            },
            {
              lens: 'Regulatory',
              body: 'In the US, a phenotype-gated alert that changes its firing behaviour per patient may meet the FDA’s definition of a Clinical Decision Support function that is not exempt from device regulation. Counsel should review whether the model is Software as a Medical Device under the 21st Century Cures Act carve-outs.'
            },
            {
              lens: 'Ethics',
              body: 'Suppressing alerts for some patients, even predicted non-beneficiaries, requires informed clinician oversight. Patients don’t consent to alerts individually; clinicians do. Document who carries the duty-to-warn when the model suppresses.'
            },
            {
              lens: 'Equity',
              body: 'ELAIA-2 found worse outcomes with alerts in non-urban and non-teaching hospitals. If your system includes community affiliates, a uniform policy may widen an outcomes gap. Stratify your rollout monitoring by site.'
            }
          ],
          prompt: 'If the model predicts a patient is likely to be harmed by an alert, and the alert is suppressed, and that patient dies — who is accountable?'
        },
        {
          id: 'publish',
          title: 'Should individualized alerting become a standard of care?',
          context: 'A professional society is drafting guidance on whether model-gated EHR alerts belong in nephrology standards.',
          lenses: [
            {
              lens: 'Institutional policy',
              body: 'A guideline endorsement typically requires prospective trial evidence. The 43-deaths estimate is a counterfactual, not a prospective finding. Guidance should name the evidence tier explicitly.'
            },
            {
              lens: 'Regulatory',
              body: 'Guideline endorsement implicitly pressures regulators and payers. Consider whether payment parity or coverage decisions should wait for the prospective individualized-alert trial the authors call for.'
            },
            {
              lens: 'Ethics',
              body: 'Model-gated alerts shift the locus of decision-making from a human reading a full chart to a model reading structured features. Guidelines should require disclosure to patients that an automated gate exists, and require published performance by race, gender, and age.'
            },
            {
              lens: 'Equity',
              body: 'Models trained at large academic centres can underperform in community and rural settings — exactly where ELAIA-2 saw harm signals. A standard of care built on such a model may codify a gap rather than close it.'
            }
          ],
          prompt: 'What threshold of prospective evidence would justify moving individualized alerting from a research tool to a published standard?'
        }
      ]
    }
  },

  {
    id: 'punjab-deaddiction',
    title: 'Urgent Need to Revisit the Current Approach towards De-addiction in Punjab',
    subtitle: 'Why a 14-day take-home limit on buprenorphine-naloxone is undermining India’s best opioid treatment',
    authors: 'Kaur D, Kaur A, Kalyan S, Mandal B, Mishra J, Mor N',
    journal: 'J Addict Addictv Disord 11:173 (2024)',
    doi: '10.24966/AAD-7276/100173',
    tagline: 'Punjab forces stable opioid-dependent patients back to the clinic every two weeks. The paper asks why this is the only chronic illness we treat this way.',

    comic: {
      panels: [
        {
          title: '230,000 people',
          caption: 'The 2015 Punjab Opioid Dependence Survey estimated 230,000 opioid-dependent individuals in Punjab. 76% were between 18 and 35 years old.',
          svg: 'crowd'
        },
        {
          title: 'Squeezed between two trafficking routes',
          caption: 'Punjab sits between the Golden Crescent to the west and the Golden Triangle to the east. A culture of masculinity, easy availability, and rural unemployment turned a long-standing opium tradition into a public-health crisis.',
          svg: 'map'
        },
        {
          title: 'The treatment that works',
          caption: 'Buprenorphine-naloxone is the standard of care. Long-acting, a ceiling effect on respiratory depression, low overdose risk — Cochrane-graded evidence from trials in the US, Canada, Australia, and India.',
          svg: 'pill'
        },
        {
          title: 'Three stages of OST',
          caption: 'Induction takes days. Maintenance runs 1–2 years. Termination tapers over 2–3 months. Most of the benefit is in maintenance — and maintenance is where the 14-day rule bites.',
          svg: 'phases'
        },
        {
          title: 'The 14-day rule',
          caption: 'Punjab’s 2018 SOP caps take-home buprenorphine-naloxone at 14 days, or 100 tablets, whichever is less. Every patient, every time, regardless of how stable.',
          svg: 'calendar'
        },
        {
          title: 'The truck driver on a 30-day haul',
          caption: 'A stable patient drives freight from Punjab to the south. His trip runs longer than his supply. He borrows tablets from peers to avoid withdrawal. The policy creates the diversion it claims to prevent.',
          svg: 'truck'
        },
        {
          title: 'Diabetes. Hypertension. Arthritis.',
          caption: 'A stable diabetic sees her endocrinologist every two or three months. A stable psychiatric patient, every two or three months. A stable OST patient in Punjab — every 14 days. The authors ask why.',
          svg: 'clock'
        },
        {
          title: 'Right to life',
          caption: 'Denying evidence-based medicine already approved for extended use, the authors argue, could be construed as undue interference with the constitutionally protected fundamental right to life under Article 21.',
          svg: 'scales'
        }
      ]
    },

    slides: [
      {
        kind: 'title',
        eyebrow: 'Slide 1 of 10',
        title: 'Why do we treat opioid dependence differently from diabetes?',
        body: 'Punjab has evidence-based addiction medicine. Punjab also has a policy that undermines it. This paper asks the committee that wrote the policy to read the evidence.'
      },
      {
        kind: 'text',
        eyebrow: 'Slide 2 of 10 — Scale',
        title: '230,000 opioid-dependent adults',
        body: 'The 2015 Punjab Opioid Dependence Survey (PODS) estimated 230,000 dependents, 76% aged 18–35. In the 18–35 male cohort, 4 in 100 were dependent; 15 in 100 had used. A 2019 national survey put Indian opioid dependence at 2.3% of adult users.'
      },
      {
        kind: 'text',
        eyebrow: 'Slide 3 of 10 — Who injects',
        title: '28% are injecting drug users',
        body: 'Of those dependent, 28% were IDUs. Heroin (62%) and buprenorphine (32.5%) were the principal injected opioids. HIV and hepatitis transmission travel with the syringe — another reason substitution therapy is a public-health intervention, not just an individual one.'
      },
      {
        kind: 'chart',
        eyebrow: 'Slide 4 of 10 — What patients actually use',
        title: 'Substance use in a Faridkot tertiary-care cohort (n=200)',
        body: 'Frequencies of substances used by male patients seeking de-addiction care in Faridkot, Punjab, 2015–16. A person may be using more than one substance at a time.',
        chart: {
          kind: 'bars',
          unit: '%',
          max: 60,
          bars: [
            { label: 'Heroin', value: 54.5, color: '#c62828' },
            { label: 'Cigarettes', value: 45.5, color: '#455a64' },
            { label: 'Tobacco (chewing)', value: 38.3, color: '#455a64' },
            { label: 'Tramadol', value: 35.5, color: '#c62828' },
            { label: 'Alcohol', value: 34.5, color: '#455a64' },
            { label: 'Sedatives', value: 12.0, color: '#9e9e9e' },
            { label: 'Opium', value: 2.5, color: '#9e9e9e' }
          ]
        }
      },
      {
        kind: 'text',
        eyebrow: 'Slide 5 of 10 — The drug',
        title: 'Buprenorphine-naloxone: long-acting, ceiling-limited',
        body: 'OST replaces short-acting opioids (fast on, fast off, constant craving) with a long-acting partial agonist. Buprenorphine plateaus — higher doses don’t produce higher "high" or respiratory depression. Naloxone blocks the reward pathway if the tablet is crushed and injected.'
      },
      {
        kind: 'cohortChart',
        eyebrow: 'Slide 6 of 10 — Who is dependent',
        title: 'Proportion substance-addicted, Jalandhar villages (n=400)',
        body: 'Toggle between age, gender, and education. All three axes show risk concentrating where support is thinnest — older men with limited schooling. This is the cohort most hurt by a 14-day return-to-clinic rule.',
        cohorts: {
          'By age': {
            note: 'Age band — proportion addicted within band',
            bars: [
              { label: '11–19 yrs', value: 56.3, color: '#1E3A5F' },
              { label: '20–30 yrs', value: 69.8, color: '#1E3A5F' },
              { label: '>30 yrs', value: 78.4, color: '#1E3A5F' }
            ]
          },
          'By gender': {
            note: 'Gender — proportion addicted',
            bars: [
              { label: 'Male', value: 69.2, color: '#1E3A5F' },
              { label: 'Female', value: 14.8, color: '#9e9e9e' }
            ]
          },
          'By education': {
            note: 'Highest education completed',
            bars: [
              { label: 'Illiterate / primary', value: 85.5, color: '#c62828' },
              { label: 'Secondary', value: 74.6, color: '#c62828' },
              { label: 'Above secondary', value: 46.1, color: '#1E3A5F' }
            ]
          }
        },
        max: 100
      },
      {
        kind: 'text',
        eyebrow: 'Slide 7 of 10 — The policy',
        title: 'Punjab’s 2018 SOP: 14 days, or 100 tablets',
        body: '"The maximum duration for which take-home dose of BNX can be supplied is for two weeks (14 days) or maximum 100 tablets whichever is less." No exceptions for stable patients. No exceptions for travel. Every refill, a visit.'
      },
      {
        kind: 'chart',
        eyebrow: 'Slide 8 of 10 — Compared to what?',
        title: 'Follow-up interval: stable chronic illness',
        body: 'For most chronic illnesses, a stable patient sees their doctor every 60–90 days. Opioid use disorder — a chronic relapsing-remitting condition — is treated on a 14-day clock in Punjab. The chart shows typical follow-up intervals in days.',
        chart: {
          kind: 'bars',
          unit: ' days',
          max: 90,
          bars: [
            { label: 'Hypertension', value: 84, color: '#2e7d32' },
            { label: 'Diabetes', value: 84, color: '#2e7d32' },
            { label: 'Rheumatoid arthritis', value: 84, color: '#2e7d32' },
            { label: 'Psych (stable)', value: 60, color: '#2e7d32' },
            { label: 'OST in Punjab', value: 14, color: '#c62828' }
          ]
        }
      },
      {
        kind: 'headline',
        eyebrow: 'Slide 9 of 10 — The evidence',
        title: '64%',
        body: 'Retention at 9 months on sublingual buprenorphine in the AIIMS multi-site study. Cochrane reviews support buprenorphine and methadone. Sordo 2017 (BMJ) — OST reduces mortality, buprenorphine carries lower overdose risk than methadone.'
      },
      {
        kind: 'text',
        eyebrow: 'Slide 10 of 10 — The ask',
        title: 'Let the treating physician set the follow-up',
        body: 'The paper does not ask for unrestricted access. It asks for parity: treat OST like every other chronic illness. Let the prescribing psychiatrist decide when a stable patient needs to come back, the same way an endocrinologist or a rheumatologist does.'
      }
    ],

    paper: {
      glossary: {
        'OST': 'Opioid Substitution Therapy. Long-term prescription of a safer, long-acting opioid to replace illicit short-acting ones. The goal is stability, not abstinence.',
        'BNX': 'Buprenorphine-naloxone combination. Buprenorphine does the therapy; naloxone is an abuse-deterrent — it blocks the opioid receptors if the tablet is crushed and injected.',
        'IDU': 'Injecting drug user. A person who injects illicit drugs — associated with higher HIV and hepatitis risk.',
        'PODS': 'Punjab Opioid Dependence Survey (2015). The main source of the 230,000-dependents estimate.',
        'RAS': 'Rapid Assessment Survey. One of two 2015–16 Punjab studies using respondent-driven sampling.',
        'P-DUMS': 'Punjab Drug Use Monitoring Survey. Companion study to RAS, using data from 75 government de-addiction centres.',
        'ceiling effect': 'A pharmacologic property of buprenorphine: above a certain dose, additional drug doesn’t produce more euphoria or more respiratory depression. This is what makes it safer than methadone or heroin.',
        'harm reduction': 'A treatment philosophy that accepts ongoing drug use as a fact and works to reduce the harms associated with it — overdose, HIV, economic collapse — rather than demanding immediate abstinence.',
        'diversion': 'The re-routing of a prescribed medication into a non-prescribed use, including sharing or selling. The paper argues Punjab’s policy creates diversion by denying stable patients workable refill schedules.',
        'induction': 'The first phase of OST (days to weeks). The clinician titrates the dose until withdrawal is controlled.',
        'maintenance': 'The middle phase of OST (1–2 years). Stable dose, return to work and family, psychosocial support.',
        'termination': 'The final phase of OST (2–3 months). The dose is tapered, then stopped, with follow-up support.',
        'naloxone': 'A pure opioid antagonist. Included in BNX tablets at low dose to deter crushing-and-injecting.',
        'naltrexone': 'A different pure antagonist, taken after detox in the abstinence model. Relapse rates are high — the paper argues substitution outperforms abstinence.',
        'SOP': 'Standard Operating Procedure. Punjab’s 2018 SOP for de-addiction centres is the document that imposed the 14-day cap.'
      },
      marginNotes: {
        'abstract-14day': 'What this sentence actually claims: that one specific line in one state SOP — the 14-day take-home cap — is responsible for a meaningful share of Punjab’s treatment failures. This is a strong causal claim and deserves a more formal outcomes study; the paper makes it as a policy argument, not an effect size.',
        'diversion-comparison': 'What this sentence actually claims: diversion of buprenorphine is comparable to diversion of antibiotics. That is a striking analogy — most readers would rate buprenorphine diversion as far more serious than antibiotic diversion. The 20% figure comes from a single review; use with care.'
      },
      sections: [
        {
          heading: 'Abstract',
          paragraphs: [
            {
              id: 'abstract-1',
              text: [
                'With an estimated 230,000 opioid dependents, drug addiction is a serious and growing problem in ',
                { term: 'PODS', text: 'Punjab' },
                ' state in India. Among those dependent on opioids, 28% were ',
                { term: 'IDU', text: 'Injecting Drug Users (IDUs)' },
                ', with heroin (62%) and buprenorphine (32.5%) being the principal opioids.'
              ]
            },
            {
              id: 'abstract-2',
              text: [
                'Many ongoing deaddiction initiatives exist in India, with ',
                { term: 'OST', text: 'Opioid Substitution Therapy (OST)' },
                ' using ',
                { term: 'BNX', text: 'Buprenorphine-Naloxone (BNX)' },
                ' being a preferred method. While diversion and injection abuse of any drug is a cause for concern, the BNX combination has one of the most robust effectiveness and safety profiles.'
              ]
            },
            {
              id: 'abstract-14day',
              marginNote: 'abstract-14day',
              text: [
                'The policy in Punjab supports these approaches but has severely limited the effectiveness of OST by imposing a maximum limit of 14 days on the supply of take-home medicines. This restriction reflects a poor understanding of the underlying aetiology of addiction and the mechanism of action of buprenorphine.'
              ]
            }
          ]
        },
        {
          heading: 'What is OST?',
          paragraphs: [
            {
              id: 'ost-1',
              text: [
                'OST is the long-term prescription of long-acting opioids to an opioid-dependent user to decrease the harm of short-acting opioids. Short-acting opioids have fast onset and offset of action, leading the user to alternate between intoxication and intense craving. Because of high potency and short duration, these drugs need to be procured frequently, imposing a significant financial burden.'
              ]
            },
            {
              id: 'ost-2',
              text: [
                'OST uses less potent long-acting opioids, which are cheaper and do not have a waxing-and-waning effect. Success depends on adequate dosing, long treatment duration involving clients in treatment decisions, and combining these with psychosocial interventions. A prolonged ',
                { term: 'maintenance', text: 'maintenance' },
                ' phase (1–2 years) following an ',
                { term: 'induction', text: 'induction' },
                ' period of 1–2 weeks has a far better compliance rate and a low relapse rate when supported by counselling and reinstatement of jobs.'
              ]
            },
            {
              id: 'ost-3',
              text: [
                'In India, buprenorphine is available in both injectable and sublingual tablet forms and is the recommended drug for OST. To prevent diversion to injection abuse, it has been combined with ',
                { term: 'naloxone', text: 'naloxone' },
                ', a pure antagonist. The ',
                { term: 'ceiling effect', text: 'ceiling effect' },
                ' of buprenorphine means higher doses do not produce more euphoria or more respiratory depression — which is why it is safer than methadone or heroin.'
              ]
            }
          ]
        },
        {
          heading: 'Diversion and the 14-day rule',
          paragraphs: [
            {
              id: 'diversion-comparison',
              marginNote: 'diversion-comparison',
              text: [
                'A study found that, at 20%, ',
                { term: 'diversion', text: 'diversion' },
                ' rates were similar between buprenorphine and antibiotics. Another reported that 64% of opioid users using street-obtained buprenorphine did so because they could not afford or access formal treatment — self-medication to stay out of withdrawal, not recreational misuse.'
              ]
            },
            {
              id: 'diversion-punjab',
              text: [
                'In Punjab, diversion is often a barter system. Under the 2018 ',
                { term: 'SOP', text: 'SOP' },
                ', no psychiatrist can give medication refills even in the maintenance phase for more than 14 days. If a patient travels for work — truck drivers moving freight south for a month at a stretch — they obtain tablets from peers to prevent withdrawal, and return it once they get their next refill. This is the ordinary practice for every other chronic illness; only in OST is it treated as misconduct.'
              ]
            },
            {
              id: 'diversion-chronic',
              text: [
                'If an endocrinologist can see a stable patient on treatment once every 2–3 months, or a psychiatrist can see a stable patient in remission on the same schedule, there is no clinical reason to force a patient stable on the lowest possible dose of BNX back to the clinic every 14 days.'
              ]
            }
          ]
        }
      ]
    },

    governance: {
      intro: 'This paper is a policy argument, not a trial. The governance layer is a place for institutions to take its conclusions seriously — or to push back.',
      cards: [
        {
          id: 'revise-sop',
          title: 'Should Punjab revise the 14-day SOP?',
          context: 'The Department of Health and Family Welfare, Punjab, is reviewing the 2018 SOP for de-addiction centres. Several psychiatric associations have asked for the 14-day take-home cap to be lifted for stable maintenance-phase patients.',
          lenses: [
            {
              lens: 'Institutional policy',
              body: 'Amend the SOP to allow the treating psychiatrist to set the follow-up interval for stable maintenance-phase patients, aligning with the schedule used for any other chronic illness. Require documented stability criteria (dose, duration, absence of illicit use on supervised testing).'
            },
            {
              lens: 'Regulatory',
              body: 'Buprenorphine is a Schedule X drug under the NDPS Act. Extending take-home supply does not require amending the NDPS Act; it requires amending the implementing SOP and clarifying pharmacist dispensing rules. Counsel should map the minimum set of notifications needed.'
            },
            {
              lens: 'Ethics',
              body: 'The paper argues that denying a medicine approved for extended use — where the evidence of effectiveness is strong — is inconsistent with the state’s duty of care. Whichever way the department decides, the decision should be documented, public, and reviewed against mortality outcomes annually.'
            },
            {
              lens: 'Equity',
              body: 'The 14-day rule disproportionately burdens rural patients, truck drivers, migrant labourers, and daily-wage workers — the same populations with the highest opioid dependence prevalence. A blanket cap is regressive in its effect even if neutral in its wording.'
            }
          ],
          prompt: 'If a stable maintenance-phase patient relapses because a 14-day visit was not feasible, who bears the clinical and ethical responsibility — the patient, the treating psychiatrist, or the department that set the cap?'
        },
        {
          id: 'integrate-primary-care',
          title: 'Should OST be integrated into primary care?',
          context: 'A national working group is considering whether to expand buprenorphine-naloxone prescribing beyond specialist de-addiction centres into district and sub-district primary care clinics — as is done for HIV antiretrovirals.',
          lenses: [
            {
              lens: 'Institutional policy',
              body: 'Decentralising OST to primary care follows the integration model recommended by EMCDDA and the US CDC. It increases access but shifts quality assurance from a small number of specialists to a much larger network — a monitoring and training question as much as a prescribing one.'
            },
            {
              lens: 'Regulatory',
              body: 'Primary care prescribing of Schedule X buprenorphine would require a notification under the NDPS Rules and a structured certification pathway for prescribers. A registry of certified clinicians, refreshed annually, is the minimum safeguard.'
            },
            {
              lens: 'Ethics',
              body: 'Integration reduces stigma by making addiction care part of ordinary clinical life. It also increases the risk of stigma if general-practice clinicians are not trained — a hostile GP in a small town can cause more harm than a distant but expert specialist. Training is not optional.'
            },
            {
              lens: 'Equity',
              body: 'The authors’ strongest argument rests here: rural and migrant patients bear most of the access cost under the current specialist-only model. Primary-care integration is the most powerful equity intervention available; the SOP revision is the precondition for it.'
            }
          ],
          prompt: 'Which goes first — revising the 14-day SOP so specialists can stabilise patients on a chronic-illness schedule, or expanding prescribing to primary care so patients can be followed closer to home?'
        }
      ]
    }
  },
  {
    id: 'mmi-perceptions',
    title: 'Physician–Medical Manufacturing Industry Relationships',
    subtitle: 'Perceptions of Malaysian medical students and interns',
    authors: 'Kaur A, Singh S, Singh H',
    journal: 'Natl Med J India 2024;37(1):46–9',
    doi: '10.25259/NMJI_328_2023',
    tagline: '215 students took a survey about pharma gifts. 40% knew doctors and industry work together. Only 6% knew there were rules. The gap between what is happening and what students recognise as an ethical question is where the curriculum has work to do.',

    comic: {
      panels: [
        { title: 'The first time a rep walks in',       caption: 'A pharmaceutical representative arrives on the ward with pens, a pamphlet, and a tray of samples. A medical student watches the consultant accept them. No one explains what just happened.', svg: 'samples' },
        { title: 'The rule book nobody opens',          caption: 'The Malaysian Medical Association’s 2019 Code of Professional Conduct tells doctors to avoid any inducement that might compromise professional judgment. Only 6% of students in this study had heard of it.', svg: 'rulebook' },
        { title: 'Two hundred and fifteen responses',   caption: 'Medical students and interns/housemen at UTAR answered a survey — five yes/no awareness questions, 26 Likert-style items across acceptability, perceived harm, disclosure attitude, and distrust. Cronbach’s alpha 0.72.', svg: 'crowd' },
        { title: 'Six, forty, eighty-four',             caption: '6% knew rules existed. 40% knew doctors and industry interact. 84% still thought free samples were a good way to learn about new drugs. Knowing what happens is not the same as recognising the ethical stake.', svg: 'stat' },
        { title: 'Interns knew more. Women accepted more.', caption: 'Awareness was higher in interns/housemen (51.6%) than in undergraduates (35.9%), p = 0.03. Across gender, women were the only subgroup with significantly higher acceptability of these interactions (p = 0.01) — a reversal of findings from most prior literature.', svg: 'compare' },
        { title: 'The US$200 threshold',                caption: '43% of respondents said gifts under US$200 were acceptable. The MMA rule isn’t a dollar amount — it’s whether the gift could reasonably be seen as influencing judgment. That’s a harder threshold to internalise than a price.', svg: 'scales' },
        { title: 'Disclose, publicly',                  caption: '43% preferred a public online database as the disclosure method — the model of the US Open Payments registry. Malaysia has no equivalent. Whether to build one is a policy question the next generation of clinicians will be asked to weigh in on.', svg: 'database' },
        { title: 'Where curriculum goes',               caption: 'The paper argues for course material on MMI interactions, role-play of industry scenarios, MMI conduct as a rated element in student evaluations, and institutional guidelines that make the conflict-of-interest conversation part of clinical training, not an optional aside.', svg: 'classroom' }
      ]
    },

    slides: [
      { kind: 'title', eyebrow: 'Slide 1 of 10', title: 'Do students see the ethics of pharma gifts?', body: 'Most Malaysian medical students will meet the medical manufacturing industry before they ever write a prescription. This paper asks whether they have been taught to recognise what those meetings mean.' },
      { kind: 'text', eyebrow: 'Slide 2 of 10 — Background', title: 'Why this matters', body: 'Physician–industry relationships range from conference registration fees and travel reimbursement to free drug samples and company-owned stock. Evidence from the US opioid crisis and a decade of prescribing-behaviour studies links these interactions to downstream prescribing patterns. The Malaysian Medical Association’s 2019 Code of Professional Conduct formally names this as a conflict of interest. Whether the next generation of doctors recognises it is an open question.' },
      { kind: 'text', eyebrow: 'Slide 3 of 10 — The gap in the literature', title: 'Most prior work studied residents. This one starts earlier.', body: 'Systematic reviews of medical-student attitudes toward the pharmaceutical industry have documented exposure but not consistently measured ethical awareness. Data from Malaysian undergraduates specifically is almost absent. The study reported here is a single-institution survey, but it fills a particular descriptive gap.' },
      { kind: 'text', eyebrow: 'Slide 4 of 10 — Design', title: '215 students, 33 questions, one institution', body: 'A cross-sectional questionnaire administered via Google Forms to 215 medical students and interns at UTAR (Sungai Long, Selangor). Five yes/no awareness items, 26 Likert-scale items covering acceptability, perceived negative effects, attitude toward disclosure, and distrust, plus two disclosure-method questions. Internal consistency: Cronbach’s α = 0.723. Ethics approval: UTAR SERC.' },
      {
        kind: 'chart', eyebrow: 'Slide 5 of 10 — The awareness headline', title: 'What students know, vs what students think is fine',
        body: 'Three numbers anchor this paper. 40% know the relationship exists. 6% know rules exist. 84% still endorse free samples as an educational tool. The shape of the gap is visible in the bars.',
        chart: { kind: 'bars', unit: '%', max: 100, bars: [
          { label: 'Knew doctors & industry interact', value: 40, color: '#1E3A5F' },
          { label: 'Knew MMA rules on gifts exist', value: 6, color: '#c62828' },
          { label: 'Felt prepared to interact with MMI', value: 7, color: '#c62828' },
          { label: 'Endorsed free samples as education', value: 84, color: '#C26A3D' },
          { label: 'Said doctors shouldn’t accept MMI gifts', value: 21, color: '#9e9e9e' }
        ] }
      },
      { kind: 'text', eyebrow: 'Slide 6 of 10 — The paradox', title: 'Aware of the relationship, not of the stake', body: 'The same respondents who recognise that doctors and industry interact also overwhelmingly approve of the interactions’ most visible form. 78% deemed industry funding of educational programmes satisfactory. 30% considered personal use of free drug samples acceptable — a practice the MMA explicitly prohibits. Descriptive knowledge and ethical knowledge are not moving together.' },
      {
        kind: 'cohortChart', eyebrow: 'Slide 7 of 10 — Subgroup differences', title: 'Awareness and acceptability by training stage and gender',
        body: 'Awareness rose meaningfully between undergraduates and interns/housemen, consistent with on-the-job exposure. The gender split is the surprising finding: in this cohort, women showed significantly higher acceptability of physician–industry interactions, reversing the pattern reported in most US and European studies.',
        cohorts: {
          'By training stage': { note: 'Awareness of MMI-related activities, by year of training', bars: [
            { label: 'Undergraduates — aware', value: 35.9, color: '#1E3A5F' },
            { label: 'Undergraduates — unaware', value: 64.1, color: '#9e9e9e' },
            { label: 'Interns/housemen — aware', value: 51.6, color: '#1E3A5F' },
            { label: 'Interns/housemen — unaware', value: 48.4, color: '#9e9e9e' }
          ] },
          'By prior exposure': { note: 'Prior participation in MMI-related activities (samples, gifts, meals, talks)', bars: [
            { label: 'Undergraduates — exposed', value: 30.1, color: '#1E3A5F' },
            { label: 'Undergraduates — not exposed', value: 69.9, color: '#9e9e9e' },
            { label: 'Interns/housemen — exposed', value: 62.9, color: '#1E3A5F' },
            { label: 'Interns/housemen — not exposed', value: 37.1, color: '#9e9e9e' }
          ] },
          'By preferred disclosure': { note: 'Student-preferred method of disclosing physician–MMI financial ties', bars: [
            { label: 'Public online database', value: 43, color: '#1E3A5F' },
            { label: 'Hospital or institution only', value: 27, color: '#455a64' },
            { label: 'At point of prescription', value: 18, color: '#455a64' },
            { label: 'No disclosure needed', value: 12, color: '#c62828' }
          ] }
        }, max: 100
      },
      { kind: 'text', eyebrow: 'Slide 8 of 10 — What students ask for', title: 'Disclosure via a public registry', body: '43% — the largest single group — preferred a public online database. The closest international analogue is the US Open Payments registry, which has been associated with lower brand-name prescribing and higher clinician awareness of conflicts. Malaysia has no equivalent. The student preference is, in effect, an institutional ask.' },
      { kind: 'headline', eyebrow: 'Slide 9 of 10 — The thesis', title: 'The curriculum is downstream of clinical habits', body: 'Students accept what they see practised around them. If the consultants accept samples, the students will. The authors argue that waiting for learners to notice the ethics on their own is a pedagogical failure. The intervention belongs upstream of clinical rotation.' },
      { kind: 'text', eyebrow: 'Slide 10 of 10 — What next', title: 'Five concrete curricular changes', body: 'The paper recommends: (i) dedicated course material on MMI interactions with role-played scenarios; (ii) MMI conduct as a rated element in student evaluations; (iii) any MMI engagement with students to be faculty-chaperoned and structured as a teaching session; (iv) published institutional policy on MMI dealings; (v) transparent institutional-level disclosure of MMI ties. The survey is the baseline. The curriculum is the intervention.' }
    ],

    paper: {
      glossary: {
        'MMI': 'Medical manufacturing industry. Pharmaceutical, device, and diagnostics companies that interact with physicians through samples, sponsored education, consulting, and gifts.',
        'MMA': 'Malaysian Medical Association. The professional body whose 2015/2019 Code of Professional Conduct names the rules governing physician–industry relationships in Malaysia.',
        'conflict of interest': 'A situation in which a secondary interest (financial, reputational, personal) could unduly influence a primary professional judgment. The existence of a conflict is not the same as wrongdoing — the test is whether it could reasonably be perceived to compromise judgment.',
        'Likert scale': 'An ordinal response scale where respondents mark agreement on a graded continuum — here, 1 = strongly disagree to 5 = strongly agree. Commonly analysed with means and non-parametric tests.',
        'Cronbach’s alpha': 'A measure of internal consistency — whether items on a questionnaire move together. Values above 0.7 are generally considered acceptable for survey research.',
        'chi-square test': 'A statistical test of whether two categorical variables (here, demographic characteristics vs awareness) are associated more than chance alone would produce.',
        'Open Payments': 'A US federal registry, mandated by the Physician Payments Sunshine Act, that makes industry payments to physicians publicly searchable by name. Malaysia has no equivalent.',
        'disclosure': 'The act of making a relationship visible to a relevant audience — patients, peers, the institution, or the public. The unit of disclosure (individual physician vs institution) is itself a policy choice.',
        'hidden curriculum': 'The norms, values, and expectations transmitted through routine clinical practice rather than formal teaching. What students see attendings do carries more weight than what they are told.',
        'pragmatic trial': 'A study design that tests an intervention under routine conditions rather than idealised ones. Cited here as the evidence standard for prescribing-behaviour studies.'
      },
      marginNotes: {
        'abstract-gap': 'What this sentence actually claims: not that students approve of pharma gifts, but that they recognise the interaction exists without recognising it as an ethical question. The gap is the finding.',
        'results-gender': 'What this sentence actually claims: this cohort’s gender finding reverses most international data. The authors flag it as a finding to replicate, not to generalise. Single-institution, n = 215.',
        'discussion-curriculum': 'What this sentence actually claims: the proposed interventions are evidence-informed (Farah & Bilszta 2022 lecture-based intervention; Wofford & Ohl 2005 workshop design), but none has been deployed in a Malaysian undergraduate programme at scale. The recommendation is structural, not yet empirical.'
      },
      sections: [
        {
          heading: 'Abstract',
          paragraphs: [
            { id: 'abstract-1', text: [
              'Background. Physicians and the ',
              { term: 'MMI', text: 'medical manufacturing industry (MMI)' },
              ' are closely associated and may have some form of financial or business arrangement. Research has highlighted that these interactions negatively impact physicians’ prescribing behaviour. We explored medical students’ perspectives regarding these interactions.'
            ] },
            { id: 'abstract-methods', text: [
              'Methods. A questionnaire-based survey (215 respondents) captured demographic information and included five yes/no awareness questions, 26 ',
              { term: 'Likert scale', text: 'Likert-style items' },
              ', and two disclosure-method questions. Internal consistency was assessed with ',
              { term: 'Cronbach’s alpha', text: 'Cronbach’s alpha' },
              ' (0.72). Associations between independent variables and awareness were tested using the ',
              { term: 'chi-square test', text: 'chi-square test' },
              '.'
            ] },
            { id: 'abstract-gap', marginNote: 'abstract-gap', text: [
              'Results. About 40% of students knew that doctors and MMI work together, but only 6% knew there were rules about accepting gifts from MMI. Eighty-four per cent of respondents felt free samples from MMI were an excellent way to learn about new products. Awareness was higher in interns/housemen (51.6%) than in medical students (35.9%). Most participants (43%) preferred an online database as a method of ',
              { term: 'disclosure', text: 'disclosure' },
              '.'
            ] },
            { id: 'abstract-conclusion', text: [
              'Conclusions. Findings indicated students’ knowledge gaps regarding ethical considerations and the recommended guidelines governing physician–MMI relationships. Students should be taught appropriate conduct and best practices and must develop skepticism toward MMI marketing claims.'
            ] }
          ]
        },
        {
          heading: 'Results — Awareness and exposure',
          paragraphs: [
            { id: 'results-1', text: ['Of the 215 respondents, only 13 (6%) had heard of any rules governing the acceptance of gifts from MMI, although 86 (40%) were aware that doctors and industry interact. Only 15 (7%) reported feeling prepared to communicate with MMI staff during training. Eighty-six (40%) had already participated in MMI-related events such as free medicine samples, gifts, meals, and presentations.'] },
            { id: 'results-training', text: ['Only year of training was substantially related to MMI-related awareness and exposure. Awareness was more prevalent among interns/housemen (51.6%) than medical students (35.9%) — a statistically significant difference (p = 0.03). Prior exposure was also more prevalent among interns/housemen (62.9%) than undergraduates (30.1%), p < 0.001.'] }
          ]
        },
        {
          heading: 'Results — Acceptability and disclosure',
          paragraphs: [
            { id: 'results-gender', marginNote: 'results-gender', text: [
              'Approximately 43% of respondents chose less than US$200 as an acceptable value of gifts from MMI to physicians. 43% preferred a public online database as the method of ',
              { term: 'disclosure', text: 'disclosure' },
              '. Among independent variables, only gender showed significant association with acceptability (p = 0.01), with women more accepting of these interactions — a reversal of findings from prior US and European literature (Wazana 2000; Pham-Kanter 2012).'
            ] },
            { id: 'results-samples', text: ['84% considered free samples from MMI an excellent way to learn about new products. 78% deemed industry funding of educational programmes and fellowships satisfactory. Only 21% agreed that physicians should not receive gifts from MMI. Approximately 30% considered personal use of free drug samples acceptable — a practice explicitly prohibited by the MMA code.'] }
          ]
        },
        {
          heading: 'Discussion — The gap between awareness and ethics',
          paragraphs: [
            { id: 'discussion-gap', text: ['There was a consistent disparity between students’ knowledge of physician–industry interactions and their acknowledgement of the ethical issues raised by those interactions. Despite awareness of the relationship, the majority of students did not recognise the relationship as carrying an ethical stake. Prior literature (Steinman et al. 2001; Keim et al. 1993; Austad et al. 2011 systematic review) has documented the same disjunction in residents and trainees elsewhere; the present data extend the observation to the Malaysian undergraduate population.'] },
            { id: 'discussion-curriculum', marginNote: 'discussion-curriculum', text: [
              'The ',
              { term: 'hidden curriculum', text: 'hidden curriculum' },
              ' — what students see practised on the wards — appears to be teaching acceptance faster than formal ethics instruction is teaching skepticism. Educational interventions specifically designed for this gap (Farah & Bilszta 2022; Wofford & Ohl 2005) have demonstrated improvement in students’ ability to resist pharmaceutical marketing. The recommendation here is to make such training part of the core curriculum rather than an optional adjunct.'
            ] }
          ]
        }
      ]
    },

    governance: {
      intro: 'ResearchPlay’s governance layer isn’t written by the authors. It’s written by the reader, for their institution. The four lenses below are reusable. The content is specific to this paper.',
      cards: [
        {
          id: 'mmi-reps-on-wards',
          title: 'Should our medical school restrict MMI access to students on clinical rotations?',
          context: 'Your curriculum committee is asked whether pharmaceutical representatives should continue to be allowed on wards and in clinic sessions where medical students are present, and whether chaperoned teaching sessions should replace informal rep visits.',
          lenses: [
            { lens: 'Institutional policy', body: 'A blanket ban is defensible but hard to operationalise in affiliated private clinics where students rotate. A graduated policy — reps allowed only in faculty-chaperoned teaching sessions with a published agenda — preserves the educational value the study’s respondents believe they gain from samples and talks, while making the interaction visible and accountable.' },
            { lens: 'Regulatory', body: 'The MMA 2019 Code already prohibits pecuniary inducements that may compromise judgment, but enforcement at the medical-school level sits with individual institutions. A formal policy with documented sanctions is the minimum step needed to move from norm to rule. The Malaysian Medical Council could be asked to issue institutional guidance parallel to the physician code.' },
            { lens: 'Ethics', body: 'Students cannot opt out of the hidden curriculum. If the consultant accepts samples, the student learns that samples are acceptable — regardless of what the formal ethics module teaches. The ethical case for chaperoning is not to protect students from reps; it is to protect the signal value of what faculty model.' },
            { lens: 'Equity', body: 'MMI sponsorship disproportionately funds educational activities in resource-constrained settings, including parts of Malaysian clinical training. A restriction without a replacement funding stream may widen the gap between well-resourced and community-affiliated teaching sites. Any policy change should name its budget offset.' }
          ],
          prompt: 'If a curriculum committee restricts MMI access and the institution cannot backfill the sponsored CPD programmes the reps used to fund, who pays, and how does that decision get made transparently?'
        },
        {
          id: 'open-payments-malaysia',
          title: 'Should Malaysia create a public Open Payments-style registry?',
          context: 'A Ministry of Health working group is considering whether to mandate public disclosure of financial relationships between Malaysian physicians and the medical manufacturing industry — modelled on the US Physician Payments Sunshine Act and Open Payments database.',
          lenses: [
            { lens: 'Institutional policy', body: 'The student preference (43% chose a public online database) is a data point in favour, but institutional readiness is the bottleneck. A phased approach — institution-level aggregated disclosure first, individual physician-level disclosure second — gives hospitals and MMA time to build reporting infrastructure before individual clinicians face a new compliance burden.' },
            { lens: 'Regulatory', body: 'A registry would require new statutory authority (MMA alone cannot compel industry reporting) plus an enforcement agency equivalent to the US Centers for Medicare and Medicaid Services. Counsel should map the minimum legislative footprint, and the Personal Data Protection Act implications for publishing physician-identified payment records.' },
            { lens: 'Ethics', body: 'Disclosure shifts the ethical centre of gravity from the individual physician to the institution. Published evidence (Licurse et al. 2010 systematic review) associates disclosure with lower rates of brand-name prescribing. But disclosure is not absolution — it does not resolve the underlying conflict, it only makes it visible to patients who have the literacy and time to check.' },
            { lens: 'Equity', body: 'A registry that only patients with English literacy and internet access can use will disclose to some and not others. If Malaysia proceeds, the registry should be multilingual (BM, English, Mandarin, Tamil), SMS-accessible, and actively integrated into clinical decision points rather than sitting as a passive website.' }
          ],
          prompt: 'If an Open Payments-style registry is built in Malaysia, and a patient chooses a different specialist because of what they read there, is that the registry working as intended — or is that an unpriced consequence we haven’t thought through?'
        }
      ]
    }
  },
];

export function getPaper(id) {
  return papers.find((p) => p.id === id);
}
