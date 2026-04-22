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
            { label: 'Alert', value: 9.2, color: '#1a237e' },
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
              { label: 'Likely benefit — alert', value: 6.8, color: '#1a237e' },
              { label: 'Likely benefit — usual care', value: 9.4, color: '#9e9e9e' },
              { label: 'Likely harm — alert', value: 11.9, color: '#c62828' },
              { label: 'Likely harm — usual care', value: 9.6, color: '#9e9e9e' }
            ]
          },
          NSAID: {
            note: 'NSAID within 48h of admission',
            bars: [
              { label: 'Likely benefit — alert', value: 5.2, color: '#1a237e' },
              { label: 'Likely benefit — usual care', value: 8.7, color: '#9e9e9e' },
              { label: 'Likely harm — alert', value: 10.1, color: '#c62828' },
              { label: 'Likely harm — usual care', value: 8.8, color: '#9e9e9e' }
            ]
          },
          RAASi: {
            note: 'ACE inhibitor or ARB at admission',
            bars: [
              { label: 'Likely benefit — alert', value: 7.3, color: '#1a237e' },
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
  }
];

export function getPaper(id) {
  return papers.find((p) => p.id === id);
}
