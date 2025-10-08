// ============================================
// CONFIGURATION - Change these values
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxA3n0W05nn16Qvu_qZHcx48AU0C2wpWqCM2j61xRBEaaH89ixD1VUXhLTXbUFfOKvOPA/exec';
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/13N7EZsv32f1K9N0BjCTxGeRjIOil_A8_cyJ5zgI9bEM/edit?gid=0#gid=0';
const LOGIN_USERNAME = 'admin';
const LOGIN_PASSWORD = 'admin';

// Variable names organized by sections
const VARIABLE_SECTIONS = {
    'Location & Time': {
        description: 'Basic facility and reporting information',
        fields: {} // These are handled separately in the form
    },
    'UNDER_FIVE': { // Marker for Under Five sections start
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
    }, // End of UNDER_FIVE sections
    'GENERAL': { // Marker for General Form sections start
        // ============================================
        // ADD YOUR GENERAL FORM SECTIONS HERE
        // ============================================
        // Will be added when you provide the General Form questions
    }
};
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
    }, // End of UNDER_FIVE sections
    'GENERAL': { // Marker for General Form sections start
        // ============================================
        // ADD YOUR GENERAL FORM SECTIONS HERE
        // ============================================
        // Example structure:
        /*
        'General Patient Information': {
            description: 'Basic patient information',
            fields: {
                patient_name: { label: 'Patient Name', type: 'text' },
                patient_age: { label: 'Patient Age', type: 'number' },
                patient_sex: { label: 'Sex', type: 'select', options: ['Male', 'Female'] },
                diagnosis: { label: 'Diagnosis', type: 'yesno' }
            }
        },
        'Another Section': {
            description: 'Description here',
            fields: {
                field_name: { label: 'Field Label', type: 'yesno' }
            }
        }
        */
    }
};

// For backwards compatibility - flatten all fields
const VARIABLES = {};
Object.values(VARIABLE_SECTIONS).forEach(section => {
    if (section.fields) {
        Object.keys(section.fields).forEach(key => {
            VARIABLES[key] = section.fields[key].label || section.fields[key];
        });
    }
});

// Cascading data in pipe-delimited format (sample - you'll add the rest)
const CASCADING_DATA = `Eastern Region||Kailahun District
Eastern Region||Kenema District
Eastern Region||Kono District
Northern Region||Bombali District
Northern Region||Falaba District
Kailahun District||Dea Chiefdom
Kailahun District||Jahn Chiefdom
Bombali District||Biriwa Chiefdom
Bombali District||Makeni City
Dea Chiefdom||Baiwala CHP
Dea Chiefdom||Nagbena CHP
Jahn Chiefdom||Gbeika CHP
Biriwa Chiefdom||Bumban CHP
Biriwa Chiefdom||Kagbaneh CHC
Makeni City||Makeni Government Hospital
Makeni City||Red Cross (Makeni City) CHP`;
