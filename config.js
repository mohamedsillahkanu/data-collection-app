// ============================================
// CONFIGURATION - Change these values
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqhplQAEn3Xp_TKqzTddtvTAicoEu_4ltq5C4iR7LNIElN18exltV1-t12RjiQcvLx/exec';
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_3jdmPYJMJ7DzKpJqR33t5RwdsRRJ9PbUUUjd9k9zfI/edit?gid=0#gid=0';
const LOGIN_USERNAME = 'admin';
const LOGIN_PASSWORD = 'admin';

// Variable names organized by sections
const VARIABLE_SECTIONS = {
    'Location & Time': {
        description: 'Basic facility and reporting information',
        fields: {}
    },
    'UNDER_FIVE': {
        'General Information': {
            description: 'Patient basic information',
            fields: {
                reg_no: { label: 'Registration Number', type: 'text' },
                date_visit: { label: 'Date of Visit', type: 'date' },
                date_onset: { label: 'Date of Onset', type: 'date' },
                child_name: { label: 'Name of Child', type: 'text' },
                age_group: { label: 'Age Group', type: 'select', options: ['<1 Month', '1-5 Months', '6-11 Months', '12-23 Months', '24-59 Months'] },
                sex: { label: 'Sex', type: 'select', options: ['Male', 'Female'] },
                address: { label: 'Address', type: 'text' },
                disability: { label: 'Disability', type: 'yesno' },
                evd_survivor: { label: 'EVD Survivor', type: 'yesno' }
            }
        },
        'Nutrition Screening': {
            description: 'Nutritional assessment and interventions',
            fields: {
                height_cm: { label: 'Height (cm)', type: 'number' },
                weight_kg: { label: 'Weight (kg)', type: 'number' },
                muac_cm: { label: 'MUAC (cm)', type: 'number' },
                bilateral_oedema: { label: 'Bilateral Oedema', type: 'select', options: ['0', '+', '++', '+++'] },
                vitamin_a_6_11m: { label: 'Vitamin A (6-11 months)', type: 'yesno' },
                vitamin_a_12_59m: { label: 'Vitamin A (12-59 months)', type: 'yesno' },
                deworming_12_23m: { label: 'Deworming (12-23 months)', type: 'yesno' },
                deworming_24_59m: { label: 'Deworming (24-59 months)', type: 'yesno' },
                early_breastfeeding: { label: 'Early Initiation of Breastfeeding', type: 'yesno' },
                exclusive_breastfeeding: { label: 'Exclusive Breastfeeding (0-5 months)', type: 'yesno' },
                continued_breastfeeding: { label: 'Continued Breastfeeding (6-23 months)', type: 'yesno' },
                type_of_visit: { label: 'Type of Visit', type: 'select', options: ['New', 'Follow-up'] }
            }
        },
        'Malaria': {
            description: 'Malaria testing and treatment',
            fields: {
                fever_suspected_malaria: { label: 'Fever Case (Suspected Malaria)', type: 'yesno' },
                rdt_positive: { label: 'RDT Test - Positive', type: 'yesno' },
                rdt_negative: { label: 'RDT Test - Negative', type: 'yesno' },
                microscopy_positive: { label: 'Microscopy - Positive', type: 'yesno' },
                microscopy_negative: { label: 'Microscopy - Negative', type: 'yesno' },
                act_less_24h: { label: 'Malaria Treated with ACT <24 hours', type: 'yesno' },
                act_more_24h: { label: 'Malaria Treated with ACT >24 hours', type: 'yesno' },
                treated_without_act_less_24h: { label: 'Treated without ACT <24 hours', type: 'yesno' },
                treated_without_act_more_24h: { label: 'Treated without ACT >24 hours', type: 'yesno' }
            }
        },
        'Eye Conditions': {
            description: 'Eye infections and conditions',
            fields: {
                eye_infection: { label: 'Eye Infection', type: 'yesno' },
                other_eye_condition: { label: 'Eye Condition (all types, except infection)', type: 'yesno' }
            }
        },
        'Infectious Diseases': {
            description: 'Various infectious conditions and diseases',
            fields: {
                moderate_malnutrition: { label: 'Moderate Malnutrition', type: 'yesno' },
                severe_malnutrition: { label: 'Severe Malnutrition', type: 'yesno' },
                snake_bites: { label: 'Snake Bites', type: 'yesno' },
                aids: { label: 'AIDS', type: 'yesno' },
                ari_with_antibiotic: { label: 'ARI Treated with Antibiotic', type: 'yesno' },
                ari_without_antibiotic: { label: 'ARI Treated without Antibiotic', type: 'yesno' },
                pneumonia_with_antibiotic: { label: 'Pneumonia Treated with Antibiotic', type: 'yesno' },
                pneumonia_without_antibiotic: { label: 'Pneumonia Treated without Antibiotic', type: 'yesno' },
                chicken_pox: { label: 'Chicken Pox', type: 'yesno' },
                diarrhoea_ors_zinc: { label: 'Diarrhoea Treated with ORS and Zinc', type: 'yesno' },
                diarrhoea_ors_only: { label: 'Diarrhoea Treated with ORS Only', type: 'yesno' },
                hepatitis: { label: 'Hepatitis (all types)', type: 'yesno' },
                leprosy: { label: 'Leprosy', type: 'yesno' },
                mumps: { label: 'Mumps', type: 'yesno' },
                sepsis: { label: 'Sepsis', type: 'yesno' },
                skin_infection: { label: 'Skin Infection', type: 'yesno' },
                sti_pid: { label: 'STI - Pelvic Inflammatory Disease (PID)', type: 'yesno' },
                sti_genital_discharge: { label: 'STI - Genital Discharge', type: 'yesno' },
                sti_genital_ulcer: { label: 'STI - Genital Ulcer', type: 'yesno' },
                tetanus: { label: 'Tetanus', type: 'yesno' },
                tuberculosis: { label: 'Tuberculosis (TB)', type: 'yesno' },
                uti: { label: 'UTI (Urinary Tract Infection)', type: 'yesno' },
                worm_infestation: { label: 'Worm Infestation', type: 'yesno' },
                yaws: { label: 'Yaws', type: 'yesno' }
            }
        },
        'Internal Medicine & NCD': {
            description: 'Non-communicable diseases and mental health',
            fields: {
                adverse_drug_reaction: { label: 'Adverse Drug Reaction', type: 'yesno' },
                anaemia: { label: 'Anaemia', type: 'yesno' },
                sickle_cell: { label: 'Sickle Cell Disease', type: 'yesno' },
                cancer: { label: 'Cancer (all types)', type: 'yesno' },
                cardiovascular: { label: 'Cardiovascular Diseases', type: 'yesno' },
                chronic_respiratory: { label: 'Chronic Respiratory Diseases', type: 'yesno' },
                diabetes: { label: 'Diabetes (Type 1 or Type 2)', type: 'yesno' },
                epilepsy: { label: 'Epilepsy', type: 'yesno' },
                hypertension: { label: 'Hypertension', type: 'yesno' },
                kidney_disorders: { label: 'Kidney Disorders', type: 'yesno' },
                mental_disorder: { label: 'Mental Disorder (all types)', type: 'yesno' }
            }
        },
        'Neonatal Conditions': {
            description: 'Conditions affecting newborns',
            fields: {
                asphyxia: { label: 'Asphyxia', type: 'yesno' },
                congenital_abnormality: { label: 'Congenital Abnormality', type: 'yesno' },
                prematurity: { label: 'Prematurity', type: 'yesno' },
                hypothermia: { label: 'Hypothermia', type: 'yesno' },
                respiratory_distress: { label: 'Respiratory Distress Syndrome', type: 'yesno' }
            }
        },
        'Surgical Conditions': {
            description: 'Surgical and trauma conditions',
            fields: {
                acute_abdomen: { label: 'Acute Abdomen', type: 'yesno' },
                appendicitis: { label: 'Appendicitis', type: 'yesno' },
                ent_disorder: { label: 'ENT Disorder', type: 'yesno' },
                hernia: { label: 'Hernia', type: 'yesno' },
                hydrocele: { label: 'Hydrocele', type: 'yesno' },
                lymphodema: { label: 'Lymphodema', type: 'yesno' },
                oral_dental: { label: 'Oral and Dental Conditions', type: 'yesno' },
                pud: { label: 'PUD (Peptic Ulcer Disease)', type: 'yesno' },
                wounds_rta: { label: 'Wounds/Trauma - RTA', type: 'yesno' },
                wounds_non_rta: { label: 'Wounds/Trauma - Non-RTA', type: 'yesno' },
                burns: { label: 'Burns', type: 'yesno' }
            }
        },
        'Tracer and Life-Saving Medicines': {
            description: 'Availability of essential tracer and life-saving medicines and supplies',
            fields: {
                albendazole_400mg_tab: { label: 'Albendazole 400mg, Tab', type: 'yesno' },
                amoxycillin_125mg_susp: { label: 'Amoxycillin 125mg/5ml, Suspension (100ml)', type: 'yesno' },
                amoxicillin_250mg_tab: { label: 'Amoxicillin 250mg, Dispersible Tab', type: 'yesno' },
                ampicillin_500mg_inj: { label: 'Ampicillin 500mg, Powder for Injection (Vial)', type: 'yesno' },
                benzyl_benzoate_25_emulsion: { label: 'Benzyl Benzoate 25%, Emulsion (100ml)', type: 'yesno' },
                chlorhexidine_7_1_gel: { label: 'Chlorhexidine 7.1%, Gel (Tube)', type: 'yesno' },
                clotrimazole_1_cream: { label: 'Clotrimazole 1%, Cream (30g Tube)', type: 'yesno' },
                cotrimoxazole_120mg_tab: { label: 'Cotrimoxazole 120mg, Tab', type: 'yesno' },
                cotrimoxazole_240mg_susp: { label: 'Cotrimoxazole 240mg/5ml, Suspension (100ml)', type: 'yesno' },
                dexamethasone_4mg_inj: { label: 'Dexamethasone 4mg/ml, Inj (1ml Amp)', type: 'yesno' },
                dextrose_5_sol: { label: 'Dextrose 5%, Solution (500ml Bag)', type: 'yesno' },
                diazepam_5mg_inj: { label: 'Diazepam 5mg/ml, Inj (2ml Amp)', type: 'yesno' },
                erythromycin_125mg_susp: { label: 'Erythromycin 125mg/5ml, Suspension (100ml)', type: 'yesno' },
                erythromycin_250mg_tab: { label: 'Erythromycin 250mg, Tab', type: 'yesno' },
                ferrous_sulphate_125mg_drop: { label: 'Ferrous Sulphate 125mg/ml, Oral Drops (60ml)', type: 'yesno' },
                ferrous_sulphate_200mg_tab: { label: 'Ferrous Sulphate 200mg, Tab', type: 'yesno' },
                folic_acid_5mg_tab: { label: 'Folic Acid 5mg, Tab', type: 'yesno' },
                gentamycin_0_5_eye_drop: { label: 'Gentamycin 0.5%, Eye Drops (10ml)', type: 'yesno' },
                gentamycin_40mg_inj: { label: 'Gentamycin 40mg/ml, Inj (2ml Amp)', type: 'yesno' },
                lidocaine_2_inj: { label: 'Lidocaine HCl 2%, Inj (50ml Vial)', type: 'yesno' },
                metronidazole_200mg_susp: { label: 'Metronidazole 200mg/5ml, Suspension (100ml)', type: 'yesno' },
                metronidazole_250mg_tab: { label: 'Metronidazole 250mg, Tab', type: 'yesno' },
                normal_saline_0_9_sol: { label: 'Normal Saline 0.9%, Solution (500ml Bag)', type: 'yesno' },
                ors_sachet: { label: 'Oral Rehydration Salt (ORS), Sachet', type: 'yesno' },
                paracetamol_100mg_tab: { label: 'Paracetamol 100mg, Tab', type: 'yesno' },
                paracetamol_125mg_syrup: { label: 'Paracetamol 125mg/5ml, Syrup (60–100ml)', type: 'yesno' },
                paracetamol_250mg_tab: { label: 'Paracetamol 250mg, Dispersible Tab', type: 'yesno' },
                ringers_lactate_500ml: { label: "Ringer's Lactate, Solution (500ml)", type: 'yesno' },
                tetracycline_1_eye_ointment: { label: 'Tetracycline 1%, Eye Ointment (5g)', type: 'yesno' },
                rutf_sachet: { label: 'Ready to Use Therapeutic Food (RUTF), Sachet', type: 'yesno' },
                zinc_sulphate_20mg_tab: { label: 'Zinc Sulphate 20mg, Tab', type: 'yesno' },
                act_al6_or_asaq_3tab_infant: { label: 'ACT (AL-6 Tab Blister or ASAQ-3 Tab, 2–11 months)', type: 'yesno' },
                act_al12_or_asaq_3tab_child: { label: 'ACT (AL-12 Tab Blister or ASAQ-3 Tab, 1–5 years)', type: 'yesno' },
                artesunate_60mg_inj: { label: 'Artesunate 60mg/ml Inj, 1ml, Vial', type: 'yesno' },
                artesunate_50mg_supp: { label: 'Artesunate 50mg, Suppository', type: 'yesno' },
                llin_piece: { label: 'LLIN (Long-Lasting Insecticidal Net), Piece', type: 'yesno' },
                glove_examination_piece: { label: 'Glove, Examination, Disposable, Piece', type: 'yesno' },
                needle_disposable_piece: { label: 'Needle, Disposable, Piece', type: 'yesno' },
                syringe_disposable_piece: { label: 'Syringe, Disposable, Piece', type: 'yesno' },
                remarks: { label: 'Remarks', type: 'text' }
            }
        }
    },
    'GENERAL': {
        'General Information': {
            description: 'Patient basic information for above five years',
            fields: {
                reg_no_gen: { label: 'Registration Number', type: 'text' },
                date_seen: { label: 'Date Seen', type: 'date' },
                date_onset_gen: { label: 'Date of Onset', type: 'date' },
                patient_name: { label: 'Patient Name', type: 'text' },
                age_years: { label: 'Age in Years', type: 'number' },
                sex_gen: { label: 'Sex', type: 'select', options: ['Male', 'Female'] },
                address_gen: { label: 'Address', type: 'text' },
                marital_status: { label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'] },
                occupation: { label: 'Occupation', type: 'text' },
                type_of_visit_gen: { label: 'Type of Visit', type: 'select', options: ['New', 'Follow-up'] },
                category_patient: { label: 'Category of Patient', type: 'select', options: ['General', 'Pregnant', 'Lactating', 'EVD Survivor', 'Disability'] }
            }
        },
        'Malaria': {
            description: 'Malaria testing and treatment for above five',
            fields: {
                fever_cases_gen: { label: 'No of Fever Cases (Suspected Malaria)', type: 'yesno' },
                fever_tested_rdt_gen: { label: 'Fever case tested for Malaria (RDT)', type: 'select', options: ['Positive', 'Negative', 'Not Done'] },
                fever_tested_microscopy_gen: { label: 'Fever case tested for Malaria (Microscopy)', type: 'select', options: ['Positive', 'Negative', 'Not Done'] },
                malaria_act_facility_gen: { label: 'Malaria treated at Facility with ACT', type: 'select', options: ['<24 hours', '>24 hours', 'Not Applicable'] },
                malaria_without_act_gen: { label: 'Malaria treated at Facility without ACT', type: 'select', options: ['<24 hours', '>24 hours', 'Not Applicable'] },
                severe_malaria_gen: { label: 'Severe Malaria', type: 'yesno' }
            }
        },
        'Eye Conditions': {
            description: 'Eye infections and conditions',
            fields: {
                eye_infection_gen: { label: 'Eye Infection', type: 'yesno' },
                other_eye_condition_gen: { label: 'Eye condition (all types, except for eye infection)', type: 'yesno' }
            }
        },
        'Infectious Diseases': {
            description: 'Various infectious conditions and notifiable diseases',
            fields: {
                moderate_malnutrition_gen: { label: 'Moderate Malnutrition', type: 'yesno' },
                severe_malnutrition_gen: { label: 'Severe Malnutrition', type: 'yesno' },
                afp: { label: 'AFP (Acute Flaccid Paralysis)', type: 'yesno' },
                acute_viral_haemorragic_fever: { label: 'Acute Viral Haemorragic Fever', type: 'yesno' },
                aids_gen: { label: 'AIDS (Acquired Immune Deficiency Syndrome)', type: 'yesno' },
                ari_treated_gen: { label: 'ARI treated in Facility', type: 'select', options: ['With Antibiotic', 'Without Antibiotic', 'Not Applicable'] },
                pneumonia_treated_gen: { label: 'Pneumonia treated in Facility', type: 'select', options: ['With Antibiotic', 'Without Antibiotic', 'Not Applicable'] },
                chicken_pox_gen: { label: 'Chicken Pox', type: 'yesno' },
                cholera: { label: 'Cholera', type: 'yesno' },
                diarrhoea_watery_gen: { label: 'Diarrhoea, watery - treated at facility', type: 'select', options: ['With ORS and Zinc', 'With ORS only', 'Not Applicable'] },
                dysentery: { label: 'Dysentery (Bloody diarrhoea)', type: 'yesno' },
                hepatitis_gen: { label: 'Hepatitis (all types)', type: 'yesno' },
                leprosy_gen: { label: 'Leprosy', type: 'yesno' },
                measles: { label: 'Measles', type: 'yesno' },
                rubella: { label: 'Rubella', type: 'yesno' },
                meningitis_encephalitis: { label: 'Meningitis / Encephalitis', type: 'yesno' },
                mumps_gen: { label: 'Mumps', type: 'yesno' },
                buruli_ulcer: { label: 'Buruli Ulcer', type: 'yesno' },
                yellow_fever: { label: 'Yellow Fever', type: 'yesno' },
                typhoid_fever: { label: 'Typhoid Fever', type: 'yesno' },
                animal_bites: { label: 'Animal Bites (dogs, cats and Snakes)', type: 'yesno' },
                sepsis_gen: { label: 'Sepsis', type: 'yesno' },
                skin_infection_gen: { label: 'Skin Infection', type: 'yesno' },
                sti_pid_gen: { label: 'STI - Pelvic Inflammatory Disease (PID)', type: 'yesno' },
                sti_genital_discharge_gen: { label: 'STI - Genital Discharge', type: 'yesno' },
                sti_genital_ulcer_gen: { label: 'STI - Genital Ulcer', type: 'yesno' },
                tetanus_gen: { label: 'Tetanus', type: 'yesno' },
                tuberculosis_gen: { label: 'Tuberculosis (TB)', type: 'yesno' },
                uti_gen: { label: 'UTI (Urinary Tract Infection)', type: 'yesno' },
                worm_infestation_gen: { label: 'Worm Infestation', type: 'yesno' },
                yaws_gen: { label: 'Yaws', type: 'yesno' },
                onchocerciasis: { label: 'Onchocerciasis', type: 'yesno' },
                schistosomiasis: { label: 'Schistosomiasis', type: 'yesno' },
                trachoma: { label: 'Trachoma', type: 'yesno' },
                other_infectious: { label: 'Other infectious conditions', type: 'yesno' }
            }
        },
        'Internal Medicine & NCD': {
            description: 'Non-communicable diseases and mental health',
            fields: {
                adverse_drug_reaction_gen: { label: 'Adverse Drug Reaction', type: 'yesno' },
                anaemia_gen: { label: 'Anaemia', type: 'yesno' },
                sickle_cell_gen: { label: 'Sickle Cell Disease', type: 'yesno' },
                cancer_gen: { label: 'Cancer (all types)', type: 'yesno' },
                cardiovascular_gen: { label: 'Cardiovascular diseases (All types)', type: 'yesno' },
                chronic_respiratory_gen: { label: 'Chronic Respiratory Diseases (asthma, COPD, others)', type: 'yesno' },
                diabetes_gen: { label: 'Diabetes (Type 1 or Type 2)', type: 'yesno' },
                epilepsy_gen: { label: 'Epilepsy', type: 'yesno' },
                hypertension_gen: { label: 'Hypertension', type: 'yesno' },
                kidney_disorders_gen: { label: 'Kidney disorders', type: 'yesno' },
                mental_disorder_gen: { label: 'Mental disorder (all types)', type: 'yesno' },
                other_ncd: { label: 'Other NCD conditions', type: 'yesno' }
            }
        },
        'Neonatal Conditions': {
            description: 'Conditions affecting newborns',
            fields: {
                asphyxia_gen: { label: 'Asphyxia', type: 'yesno' },
                congenital_abnormality_gen: { label: 'Congenital Abnormality', type: 'yesno' },
                prematurity_gen: { label: 'Prematurity', type: 'yesno' },
                hypothermia_gen: { label: 'Hypothermia', type: 'yesno' },
                respiratory_distress_gen: { label: 'Respiratory Distress Syndrome', type: 'yesno' }
            }
        },
        'Surgical Conditions': {
            description: 'Surgical and trauma conditions',
            fields: {
                acute_abdomen_gen: { label: 'Acute Abdomen', type: 'yesno' },
                appendicitis_gen: { label: 'Appendicitis', type: 'yesno' },
                ent_disorder_gen: { label: 'Ear Nose and Throat (ENT) disorder', type: 'yesno' },
                hernia_gen: { label: 'Hernia', type: 'yesno' },
                hydrocele_gen: { label: 'Hydrocele', type: 'yesno' },
                lymphodema_gen: { label: 'Lymphodema', type: 'yesno' },
                oral_dental_gen: { label: 'Oral and dental conditions', type: 'yesno' },
                pud_gen: { label: 'PUD (Peptic Ulcer Disease)', type: 'yesno' },
                wounds_trauma_gen: { label: 'Wounds/Trauma', type: 'select', options: ['RTA', 'Non-RTA', 'Not Applicable'] },
                burns_gen: { label: 'Burns', type: 'yesno' },
                other_surgical: { label: 'Other Surgical conditions', type: 'yesno' }
            }
        },
        'Tracer and Life-Saving Medicines': {
            description: 'Availability of essential tracer and life-saving medicines for general patients',
            fields: {
                albendazole_400mg_tab_gen: { label: 'Albendazole 400mg, Tab', type: 'yesno' },
                aluminium_hydroxide_500mg: { label: 'Aluminium Hydroxide 500mg, Tab', type: 'yesno' },
                amoxicillin_250mg_disp_gen: { label: 'Amoxicillin 250mg, dispersible, Tab', type: 'yesno' },
                amoxicillin_500mg_cap: { label: 'Amoxicillin 500mg, Cap/Tab', type: 'yesno' },
                ampicillin_500mg_inj_gen: { label: 'Ampicillin 500mg, powder for inj, Vial', type: 'yesno' },
                ciprofloxacin_250mg: { label: 'Ciprofloxacin 250mg, Tab', type: 'yesno' },
                ciprofloxacin_500mg: { label: 'Ciprofloxacin 500mg, Tab', type: 'yesno' },
                clotrimazole_500mg_pessary: { label: 'Clotrimazole 500mg, Pessary', type: 'yesno' },
                cotrimoxazole_480mg: { label: 'Cotrimoxazole 480 mg, Tab', type: 'yesno' },
                dexamethasone_4mg_inj_gen: { label: 'Dexamethasone 4mg/ml, Inj, 1 ml, Amp', type: 'yesno' },
                dextrose_5_sol_gen: { label: 'Dextrose 5%, Solution, 500ml, Bag', type: 'yesno' },
                diazepam_5mg_inj_gen: { label: 'Diazepam 5mg/ml, Inj 2ml, Amp', type: 'yesno' },
                erythromycin_250mg_tab_gen: { label: 'Erythromycin 250mg, Tab', type: 'yesno' },
                erythromycin_500mg_tab: { label: 'Erythromycin 500mg, Tab', type: 'yesno' },
                ferrous_sulphate_125mg_drop_gen: { label: 'Ferrous Sulphate 125mg/ml, Oral drop, 30ml, Bot', type: 'yesno' },
                ferrous_sulphate_200mg_tab_gen: { label: 'Ferrous Sulphate 200mg, Tab', type: 'yesno' },
                fefol_200_0_4mg: { label: '(Fefol) Ferrous/Folic acid, 200/0.4mg, Tab', type: 'yesno' },
                folic_acid_5mg_tab_gen: { label: 'Folic Acid 5mg, Tab', type: 'yesno' },
                gentamycin_0_5_eye_drop_gen: { label: 'Gentamycin 0.5%, eye drops, 10ml, Bot', type: 'yesno' },
                gentamycin_40mg_inj_gen: { label: 'Gentamycin 40mg/ml, Inj, 2ml, Amp', type: 'yesno' },
                hydralazine_20mg_inj: { label: 'Hydralazine 20mg/ml, powder for inj, 1ml, Vial', type: 'yesno' },
                lidocaine_2_inj_gen: { label: 'Lidocaine HCl 2%, 50ml, Vial', type: 'yesno' },
                magnesium_trisilicate: { label: 'Magnesium Trisilicate, Tab', type: 'yesno' },
                magnesium_sulphate_20: { label: 'Magnesium Sulphate 20%, Inj, 10ml, Amp', type: 'yesno' },
                metronidazole_250mg_tab_gen: { label: 'Metronidazole 250mg, Tab', type: 'yesno' },
                metronidazole_5mg_solution: { label: 'Metronidazole 5mg/ml, Solution, 100ml IV, Bag', type: 'yesno' },
                methyldopa_250mg: { label: 'Methyldopa 250mg, Tab', type: 'yesno' },
                misoprostol_200mcg: { label: 'Misoprostol 200mcg, Tab', type: 'yesno' },
                normal_saline_0_9_sol_gen: { label: 'Normal Saline 0.9%, Solution, 500ml, Bag', type: 'yesno' },
                ors_sachet_gen: { label: '(ORS) Oral Rehydration Salt, Sachet', type: 'yesno' },
                oxytocin_5iu: { label: 'Oxytocin 5IU, Inj, Amp', type: 'yesno' },
                paracetamol_250mg_tab_gen: { label: 'Paracetamol 250mg, dispersible, Tab', type: 'yesno' },
                paracetamol_500mg_tab_gen: { label: 'Paracetamol 500mg, Tab', type: 'yesno' },
                ringers_lactate_500ml_gen: { label: "Ringer's Lactate, Solution, 500ml, Bag", type: 'yesno' },
                rutf_sachet_gen: { label: '(RUTF) Ready to Use Therapeutic Food, Sachet', type: 'yesno' },
                zinc_sulphate_20mg_tab_gen: { label: 'Zinc Sulfate 20mg, Tab', type: 'yesno' }
            }
        },
        'Antimalarial Products': {
            description: 'Antimalarial medicines and supplies',
            fields: {
                act_al6_asaq3_adolescent: { label: 'ACT (AL-6 Tab Blister* or ASAQ-3 Tab (adolescent) Blister*)', type: 'yesno' },
                act_al12_asaq3_adolescent: { label: 'ACT (AL-12 Tab Blister* or ASAQ-3 Tab (adolescent) Blister*)', type: 'yesno' },
                act_al18_asaq3_adolescent: { label: 'ACT (AL-18 Tab Blister or ASAQ-3 Tab (adolescent) Blister*)', type: 'yesno' },
                act_al24_asaq6_adult: { label: 'ACT (AL-24 Tab Blister or ASAQ-6 Tab (adult) Blister*)', type: 'yesno' },
                artesunate_60mg_inj_gen: { label: 'Artesunate 60mg/ml Inj, 1ml, Vial', type: 'yesno' },
                llin_piece_gen: { label: 'LLIN (Long Lasting Insecticide-Treated Net), Piece', type: 'yesno' },
                quinine_sulphate_300mg: { label: 'Quinine Sulphate 300mg, Tab', type: 'yesno' },
                sp_500_25mg: { label: '(SP) Sulphadoxine/Pyrimethamine 500/25mg, Tab', type: 'yesno' }
            }
        },
        'Medical Supplies': {
            description: 'Medical supplies and consumables',
            fields: {
                glove_examination_piece_gen: { label: 'Glove, Examination, Disposable, Piece', type: 'yesno' },
                needle_disposable_piece_gen: { label: 'Needle, Disposable, Piece', type: 'yesno' },
                syringe_disposable_piece_gen: { label: 'Syringe, Disposable, Piece', type: 'yesno' }
            }
        },
        'Cost': {
            description: 'Patient cost information',
            fields: {
                free_health_care: { label: 'Free Health Care', type: 'yesno' },
                cost_recovery: { label: 'Cost Recovery', type: 'yesno' }
            }
        },
        'Remarks': {
            description: 'Additional notes and comments',
            fields: {
                remarks_gen: { label: 'Remarks', type: 'text' }
            }
        }
    }
};

// For backwards compatibility - flatten all fields
const VARIABLES = {};

// Flatten UNDER_FIVE sections
if (VARIABLE_SECTIONS['UNDER_FIVE']) {
    Object.values(VARIABLE_SECTIONS['UNDER_FIVE']).forEach(section => {
        if (section.fields) {
            Object.keys(section.fields).forEach(key => {
                VARIABLES[key] = section.fields[key].label || section.fields[key];
            });
        }
    });
}

// Flatten GENERAL sections
if (VARIABLE_SECTIONS['GENERAL']) {
    Object.values(VARIABLE_SECTIONS['GENERAL']).forEach(section => {
        if (section && section.fields) {
            Object.keys(section.fields).forEach(key => {
                VARIABLES[key] = section.fields[key].label || section.fields[key];
            });
        }
    });
}

console.log('Config loaded: VARIABLES object created with', Object.keys(VARIABLES).length, 'fields');

// Cascading data in pipe-delimited format
const CASCADING_DATA = `Eastern Region||Kailahun District
Eastern Region||Kenema District
Eastern Region||Kono District
Northern Region||Bombali District
Northern Region||Falaba District
Northern Region||Koinadugu District
Northern Region||Tonkolili District
North West Region||Kambia District
North West Region||Karene District
North West Region||Port Loko District
Southern Region||Bo District
Southern Region||Bonthe District
Southern Region||Moyamba District
Southern Region||Pujehun District
Western Area||Western Area Urban District
Western Area||Western Area Rural District`;
