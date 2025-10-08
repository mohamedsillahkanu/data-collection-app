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
Western Area||Western Area Rural District
Bo District||Bo City
Bo District||Badjia Chiefdom
Bo District||Bagbwe Chiefdom
Bo District||Baoma Chiefdom
Bo District||Bargbo Chiefdom
Bo District||Bongor Chiefdom
Bo District||Bumpe Ngao Chiefdom
Bo District||Gbo Chiefdom
Bo District||Jaiama Chiefdom
Bo District||Kakua Chiefdom
Bo District||Komboya Chiefdom
Bo District||Lugbu Chiefdom
Bo District||Niawa Lenga Chiefdom
Bo District||Selenga Chiefdom
Bo District||Tikonko Chiefdom
Bo District||Valunia Chiefdom
Bo District||Wonde Chiefdom
Bombali District||Biriwa Chiefdom
Bombali District||Bombali Sebora Chiefdom
Bombali District||Bombali Serry Chiefdom
Bombali District||Gbanti (Bombali) Chiefdom
Bombali District||Gbendembu Chiefdom
Bombali District||Kamaranka Chiefdom
Bombali District||Magbaimba Ndohahun Chiefdom
Bombali District||Makarie Chiefdom
Bombali District||Mara Chiefdom
Bombali District||Ngowahun Chiefdom
Bombali District||Paki Masabong Chiefdom
Bombali District||Safroko Limba Chiefdom
Bombali District||Makeni City
Bonthe District||Bendu-Cha Chiefdom
Bonthe District||Bum Chiefdom
Bonthe District||Dema Chiefdom
Bonthe District||Imperi Chiefdom
Bonthe District||Jong Chiefdom
Bonthe District||Kpanda Kemoh Chiefdom
Bonthe District||Kwamebai Krim Chiefdom
Bonthe District||Nongoba Bullom Chiefdom
Bonthe District||Sittia Chiefdom
Bonthe District||Sogbini Chiefdom
Bonthe District||Yawbeko Chiefdom
Bonthe District||Bonthe Town
Falaba District||Barawa Wollay Chiefdom
Falaba District||Delmandugu Chiefdom
Falaba District||Dembelia-Sinkunia Chiefdom
Falaba District||Folosaba Dembelia Chiefdom
Falaba District||Folosaba Kamba Chiefdom
Falaba District||Kabelia Chiefdom
Falaba District||Kamadugu Yiraia Chiefdom
Falaba District||Kulor Saradu Chiefdom
Falaba District||Mongo Chiefdom
Falaba District||Morifindu Chiefdom
Falaba District||Neya Chiefdom
Falaba District||Nyedu Chiefdom
Falaba District||Sulima Chiefdom
Kailahun District||Dea Chiefdom
Kailahun District||Jahn Chiefdom
Kailahun District||Jawei Chiefdom
Kailahun District||Kissi Kama Chiefdom
Kailahun District||Kissi Teng Chiefdom
Kailahun District||Kissi Tongi Chiefdom
Kailahun District||Luawa Chiefdom
Kailahun District||Malema Chiefdom
Kailahun District||Mandu Chiefdom
Kailahun District||Njaluahun Chiefdom
Kailahun District||Peje Bongre Chiefdom
Kailahun District||Peje West Chiefdom
Kailahun District||Penguia Chiefdom
Kailahun District||Upper Bambara Chiefdom
Kailahun District||Yawei Chiefdom
Kambia District||Bramaia Chiefdom
Kambia District||Dixon Chiefdom
Kambia District||Gbinleh Chiefdom
Kambia District||Konimaka Chiefdom
Kambia District||Magbema Chiefdom
Kambia District||Mambolo Chiefdom
Kambia District||Masumgbala Chiefdom
Kambia District||Munu Thalla Chiefdom
Kambia District||Samu Chiefdom
Kambia District||Tonko Limba Chiefdom
Karene District||Buya Chiefdom
Karene District||Dibia Chiefdom
Karene District||Gbanti (Karene) Chiefdom
Karene District||Gormbahun Chiefdom
Karene District||Mafonda Makerembay Chiefdom
Karene District||Romende Chiefdom
Karene District||Safroko Chiefdom
Karene District||Sanda Loko Chiefdom
Karene District||Sanda Magbolonthor Chiefdom
Karene District||Sanda Tendaren Chiefdom
Karene District||Sella Limba Chiefdom
Karene District||Tambaka Simibungie Chiefdom
Karene District||Tambaka Yobangie Chiefdom
Kenema District||Kenema City
Kenema District||Dama Chiefdom
Kenema District||Dodo Chiefdom
Kenema District||Gaura Chiefdom
Kenema District||Gorama Mende Chiefdom
Kenema District||Kandu Leppiama Chiefdom
Kenema District||Koya (Kenema) Chiefdom
Kenema District||Langroma Chiefdom
Kenema District||Lower Bambara Chiefdom
Kenema District||Malegohun Chiefdom
Kenema District||Niawa Chiefdom
Kenema District||Nomo Chiefdom
Kenema District||Nongowa Chiefdom
Kenema District||Simbaru Chiefdom
Kenema District||Small Bo Chiefdom
Kenema District||Tunkia Chiefdom
Kenema District||Wandor Chiefdom
Koinadugu District||Diang Chiefdom
Koinadugu District||Gbonkorbor Kayaka Chiefdom
Koinadugu District||Kallian Chiefdom
Koinadugu District||Kamukeh Chiefdom
Koinadugu District||Kasunko Kakellay Chiefdom
Koinadugu District||Nieni Chiefdom
Koinadugu District||Sengbeh Chiefdom
Koinadugu District||Thamiso Chiefdom
Koinadugu District||Wara Wara Bafodia Chiefdom
Koinadugu District||Wara Wara Yagala Chiefdom
Kono District||Koidu New Sembehun City
Kono District||Fiama Chiefdom
Kono District||Gbane Chiefdom
Kono District||Gbane Kandor Chiefdom
Kono District||Gbense Chiefdom
Kono District||Gorama Kono Chiefdom
Kono District||Kamara Chiefdom
Kono District||Lei Chiefdom
Kono District||Mafindor Chiefdom
Kono District||Nimikoro Chiefdom
Kono District||Nimiyama Chiefdom
Kono District||Sandor Chiefdom
Kono District||Soa Chiefdom
Kono District||Tankoro Chiefdom
Kono District||Toli Chiefdom
Moyamba District||Bagruwa Chiefdom
Moyamba District||Bumpeh Chiefdom
Moyamba District||Dasse Chiefdom
Moyamba District||Fakunya Chiefdom
Moyamba District||Kaiyamba Chiefdom
Moyamba District||Kamajei Chiefdom
Moyamba District||Kargboro Chiefdom
Moyamba District||Kongbora Chiefdom
Moyamba District||Kori Chiefdom
Moyamba District||Kowa Chiefdom
Moyamba District||Lower Banta Chiefdom
Moyamba District||Ribbi Chiefdom
Moyamba District||Timdale Chiefdom
Moyamba District||Upper Banta Chiefdom
Port Loko District||Port Loko City
Port Loko District||Bake-Loko Chiefdom
Port Loko District||Bureh Chiefdom
Port Loko District||Kaffu Bullom Chiefdom
Port Loko District||Kamasondo Chiefdom
Port Loko District||Kasseh Chiefdom
Port Loko District||Koya (Port Loko) Chiefdom
Port Loko District||Lokomasama Chiefdom
Port Loko District||Maconteh Chiefdom
Port Loko District||Maforki Chiefdom
Port Loko District||Makama Chiefdom
Port Loko District||Marampa Chiefdom
Port Loko District||Masimera Chiefdom
Port Loko District||Tainkatopa Chiefdom
Pujehun District||Barri Chiefdom
Pujehun District||Galliness Chiefdom
Pujehun District||Kabonde Chiefdom
Pujehun District||Kpaka Chiefdom
Pujehun District||Kpanga Chiefdom
Pujehun District||Kpanga Krim Chiefdom
Pujehun District||Makpele Chiefdom
Pujehun District||Malen Chiefdom
Pujehun District||Mano Sakrim Chiefdom
Pujehun District||Peje Chiefdom
Pujehun District||Perri Chiefdom
Pujehun District||Soro Gbeima Chiefdom
Pujehun District||Sowa Chiefdom
Pujehun District||Yakemoh Kpukumu Krim Chiefdom
Tonkolili District||Dansogoia Chiefdom
Tonkolili District||Gbokolenken Masankong Chiefdom
Tonkolili District||Gbokolenken Mayeppoh Chiefdom
Tonkolili District||Gbokolenken Polie Chiefdom
Tonkolili District||Gbokolenken Yele Chiefdom
Tonkolili District||Kafe Chiefdom
Tonkolili District||Kalantuba Chiefdom
Tonkolili District||Kholifa Mabang Chiefdom
Tonkolili District||Kholifa Mamuntha Chiefdom
Tonkolili District||Kholifa Rowalla Chiefdom
Tonkolili District||Kunike Barina Chiefdom
Tonkolili District||Kunike Fulawusu Chiefdom
Tonkolili District||Kunike Sanda Chiefdom
Tonkolili District||Malal Chiefdom
Tonkolili District||Sambaya Bendugu Chiefdom
Tonkolili District||Simiria Chiefdom
Tonkolili District||Tane Chiefdom
Tonkolili District||Yoni Mabanta Chiefdom
Tonkolili District||Yoni Mamala Chiefdom
Western Area Rural District||Koya Rural Zone
Western Area Rural District||Mountain Rural Zone
Western Area Rural District||Waterloo Rural Zone
Western Area Rural District||York Rural Zone
Western Area Urban District||Central 1 Zone
Western Area Urban District||Central 2 Zone
Western Area Urban District||East 1 Zone
Western Area Urban District||East 2 Zone
Western Area Urban District||East 3 Zone
Western Area Urban District||West 1 Zone
Western Area Urban District||West 2 Zone
Western Area Urban District||West 3 Zone
Bo City||Aethel CHP
Bo City||Agape Way CHP
Bo City||Anglican Diocese Clinic
Bo City||Batiama Layout MCHP
Bo City||Bo Government Hospital
Bo City||Bo School Bay CHP
Bo City||Breakthrough MCHP
Bo City||Brima Town CHP
Bo City||EDC Unit CHP
Bo City||Favour MCHP
Bo City||Gbanja Town MCHP
Bo City||Gbotima CHP
Bo City||Genda CHP
Bo City||Genda MCHP
Bo City||Gilas Hospital
Bo City||Haikel CHP
Bo City||Kakua Static CHC
Bo City||Kandeh Town CHP
Bo City||Kindoya Hospital
Bo City||Kowama (Kakua) CHP
Bo City||Lewaibu CHP
Bo City||Lyn Maternity MCHP
Bo City||Manjiama CHC
Bo City||Mercy Ships (Bo City) Hospital
Bo City||Mid Land MCHP
Bo City||Morning Star CHP
Bo City||Nafaya MCHP
Bo City||Needy CHP
Bo City||New Police Barracks CHC
Bo City||Praise Foundation CHC
Bo City||Red Cross (Bo City) CHC
Bo City||Rescue Health Care Clinic
Bo City||Simbo Town CHP
Bo City||Sowa's Clinic
Bo City||Spllenz Clinic
Bo City||St Monica's Clinic
Bo City||Tengbewabu MCHP
Bo City||Topkoi Town CHP
Bo City||UNIMUS MCHP
Bo City||Walk In Medical Associate Clinic
Bo City||Yemoh Town CHC
Badjia Chiefdom||Ngelehun (Badjia) CHC
Badjia Chiefdom||Njagbahun (Badjia) MCHP
Badjia Chiefdom||Njandama MCHP
Bagbwe Chiefdom||Barlie MCHP
Bagbwe Chiefdom||Benduma (Bagbwe) MCHP
Bagbwe Chiefdom||Kondiama MCHP
Bagbwe Chiefdom||Kpetema (Bagbwe) MCHP
Bagbwe Chiefdom||Mendewa MCHP
Bagbwe Chiefdom||Ngalu CHC
Bagbwe Chiefdom||Samie Buma MCHP
Baoma Chiefdom||Baoma Station CHP
Baoma Chiefdom||Blamawo MCHP
Baoma Chiefdom||Faabu CHP
Baoma Chiefdom||Foindu (Baoma) MCHP
Baoma Chiefdom||Gbahama (Baoma) CHP
Baoma Chiefdom||Gerehun CHC
Baoma Chiefdom||Golu MCHP
Baoma Chiefdom||Jan Christian Helvings Clinic
Baoma Chiefdom||Jembe CHC
Baoma Chiefdom||Jormu (Baoma) MCHP
Baoma Chiefdom||Kigbai MCHP
Baoma Chiefdom||Kpunbu MCHP
Baoma Chiefdom||Mbundorbu MCHP
Baoma Chiefdom||Pelewahun (Baoma) MCHP
Baoma Chiefdom||Tugbebu CHP
Baoma Chiefdom||Yakaji MCHP
Baoma Chiefdom||Yamandu CHC
Bargbo Chiefdom||Bum Kaku MCHP
Bargbo Chiefdom||Gbangbalia MCHP
Bargbo Chiefdom||Jimmi CHC
Bargbo Chiefdom||Kakama MCHP
Bargbo Chiefdom||Kasse MCHP
Bargbo Chiefdom||Limba CHP
Bargbo Chiefdom||Mano Yorgbo MCHP
Bargbo Chiefdom||Momajo CHP
Bargbo Chiefdom||Niagorehun (Bargbo) CHP
Bargbo Chiefdom||Senehun Ngolan MCHP
Bongor Chiefdom||Gbaama MCHP
Bongor Chiefdom||Lowoma (Bongor) MCHP
Bongor Chiefdom||Mamboma (Bongor) CHC
Bongor Chiefdom||Telu CHC
Bumpe Ngao Chiefdom||Bongor (Bumpe Ngao) MCHP
Bumpe Ngao Chiefdom||Buma MCHP
Bumpe Ngao Chiefdom||Bumpe CHC
Bumpe Ngao Chiefdom||Kabiyama MCHP
Bumpe Ngao Chiefdom||Kaniya MCHP
Bumpe Ngao Chiefdom||Kpetema (Bumpe Ngao) CHP
Bumpe Ngao Chiefdom||Makayonie MCHP
Bumpe Ngao Chiefdom||Mokoba MCHP
Bumpe Ngao Chiefdom||Mokpende MCHP
Bumpe Ngao Chiefdom||Ngolahun (Bumpe Ngao) CHC
Bumpe Ngao Chiefdom||Niagorehun Vaakie MCHP
Bumpe Ngao Chiefdom||Sahn (Bumpe Ngao) CHP
Bumpe Ngao Chiefdom||Serabu (Bumpe Ngao) CHC
Bumpe Ngao Chiefdom||Serabu Mission Hospital
Bumpe Ngao Chiefdom||Taninahun (Bumpe Ngao) CHP
Bumpe Ngao Chiefdom||Walihun (Bumpe Ngao) MCHP
Bumpe Ngao Chiefdom||Yengema (Bumpe Ngao) MCHP
Gbo Chiefdom||Gbaiima CHC
Gbo Chiefdom||Sembehun Mamagewoh CHC
Jaiama Chiefdom||Koribondo CHC
Jaiama Chiefdom||Mano-Jaiama CHP
Jaiama Chiefdom||Niayahun CHP
Kakua Chiefdom||Bandajuma MCHP
Kakua Chiefdom||Bo Childrens Hospital
Kakua Chiefdom||Egyptian (Bo) Clinic
Kakua Chiefdom||Fengehun MCHP
Kakua Chiefdom||Fullawahun MCHP
Kakua Chiefdom||Gbongboma MCHP
Kakua Chiefdom||Gender CHP
Kakua Chiefdom||Keindeyella MCHP
Kakua Chiefdom||Maguama CHP
Kakua Chiefdom||Mamasa Life Saving Hospital
Kakua Chiefdom||Manjiama CHC
Kakua Chiefdom||Marie Stopes (Kakua) Clinic
Kakua Chiefdom||Massah Memorial Maternity MCHP
Kakua Chiefdom||Ndegbomie MCHP
Kakua Chiefdom||Nduvuibu MCHP
Kakua Chiefdom||United Methodist Church Manjama CHC
Kakua Chiefdom||Veronical MCHP
Komboya Chiefdom||Gumahun MCHP
Komboya Chiefdom||Komboya Gbauja MCHP
Komboya Chiefdom||Kpamajama MCHP
Komboya Chiefdom||Mano (Komboya) MCHP
Komboya Chiefdom||Niagorehun (Komboya) MCHP
Komboya Chiefdom||Njala (Komboya) CHC
Komboya Chiefdom||Teibor CHP
Lugbu Chiefdom||Bontiwo MCHP
Lugbu Chiefdom||Feiba CHP
Lugbu Chiefdom||Hima MCHP
Lugbu Chiefdom||Karleh MCHP
Lugbu Chiefdom||Kpetewoma CHP
Lugbu Chiefdom||Ngieyehun MCHP
Lugbu Chiefdom||Sumbuya (Lugbu) CHC
Lugbu Chiefdom||Upper Saama MCHP
Lugbu Chiefdom||Yambama CHP
Niawa Lenga Chiefdom||Korbu MCHP
Niawa Lenga Chiefdom||Nengbema CHP
Niawa Lenga Chiefdom||Ngogbebu MCHP
Niawa Lenga Chiefdom||Pendebu MCHP
Niawa Lenga Chiefdom||Sahn (Niawa Lenga) CHC
Selenga Chiefdom||Damballa CHC
Selenga Chiefdom||Gbangba MCHP
Tikonko Chiefdom||Gondama (Tikonko) CHC
Tikonko Chiefdom||Griema MCHP
Tikonko Chiefdom||Haikal CHP
Tikonko Chiefdom||Kassama MCHP
Tikonko Chiefdom||Mattru on the Rail MCHP
Tikonko Chiefdom||Mendewa 2 Clinic
Tikonko Chiefdom||Mendewa CHP
Tikonko Chiefdom||Sebehun Tarbay MCHP
Tikonko Chiefdom||Sembehun 17 (Tikonko) CHP
Tikonko Chiefdom||Theresa Hakim CHP
Tikonko Chiefdom||Tikonko (Bo) CHC
Tikonko Chiefdom||Towama MCHP
Tikonko Chiefdom||Veronica MCHP
Tikonko Chiefdom||We Care Health Centre Clinic
Tikonko Chiefdom||Zion CHC
Valunia Chiefdom||Baomahun CHC
Valunia Chiefdom||Foya (Valunia) CHP
Valunia Chiefdom||Grima (Valunia) CHP
Valunia Chiefdom||Kenema Blango CHC
Valunia Chiefdom||Kpewama MCHP
Valunia Chiefdom||Kpuabu MCHP
Valunia Chiefdom||Mongere CHC
Valunia Chiefdom||Ngolahun Jabaty CHP
Valunia Chiefdom||Pujehun (Valunia) CHP
Wonde Chiefdom||Bathurst MCHP
Wonde Chiefdom||Fanima (Wonde) MCHP
Wonde Chiefdom||Gboyama CHC
Wonde Chiefdom||Kambawama MCHP
Biriwa Chiefdom||Bumban CHP
Biriwa Chiefdom||Bumbanday MCHP
Biriwa Chiefdom||Kagbaneh CHC
Biriwa Chiefdom||Kagbankona MCHP
Biriwa Chiefdom||Kakorla MCHP
Biriwa Chiefdom||Kamabai CHC
Biriwa Chiefdom||Kamasikie CHP
Biriwa Chiefdom||Kamathudgu MCHP
Biriwa Chiefdom||Kanikay MCHP
Biriwa Chiefdom||Karina CHP
Biriwa Chiefdom||Kathakeya CHP
Biriwa Chiefdom||Kayainkassa CHP
Biriwa Chiefdom||Kayonkoro CHP
Biriwa Chiefdom||Manjoro MCHP
Biriwa Chiefdom||Waridala Clinic
Bombali Sebora Chiefdom||Arab (Makeni) Clinic
Bombali Sebora Chiefdom||Maboleh CHP
Bombali Sebora Chiefdom||Maforay (Bombali Sebora) CHP
Bombali Sebora Chiefdom||Makama CHP
Bombali Sebora Chiefdom||Makump CHP
Bombali Sebora Chiefdom||Masory CHP
Bombali Sebora Chiefdom||Pate-Bana Masimbo CHP
Bombali Sebora Chiefdom||Patebana CHC
Bombali Sebora Chiefdom||Rescue International (Bombali Sebora) Clinic
Bombali Sebora Chiefdom||Robat CHP
Bombali Serry Chiefdom||Manonkoh Clinic
Bombali Serry Chiefdom||Rokonta CHC
Gbanti (Bombali) Chiefdom||Kunsho CHP
Gbanti (Bombali) Chiefdom||Panlap CHP
Gbanti (Bombali) Chiefdom||Stocco CHP
Gbanti (Bombali) Chiefdom||Yoni (Gbanti) CHP
Gbendembu Chiefdom||Gbendembu CHC
Gbendembu Chiefdom||Kortohun MCHP
Gbendembu Chiefdom||Madina Loko CHP
Gbendembu Chiefdom||Mamaka (Gbendembu) MCHP
Gbendembu Chiefdom||Mambala MCHP
Kamaranka Chiefdom||Kamaranka CHC
Kamaranka Chiefdom||Makaiba MCHP
Kamaranka Chiefdom||Makassa MCHP
Kamaranka Chiefdom||Rosint MCHP
Kamaranka Chiefdom||Royeama CHP
Magbaimba Ndohahun Chiefdom||Hunduwa MCHP
Magbaimba Ndohahun Chiefdom||Kagbere CHC
Magbaimba Ndohahun Chiefdom||Mambiama MCHP
Magbaimba Ndohahun Chiefdom||Manjaka MCHP
Makarie Chiefdom||Fullah Town 1 (Makarie) CHP
Makarie Chiefdom||Karefay Themne CHP
Makarie Chiefdom||Kerefay Loko MCHP
Makarie Chiefdom||Kolisokoh CHP
Makarie Chiefdom||Mabayo MCHP
Makarie Chiefdom||Magbaikoli MCHP
Makarie Chiefdom||Magbenteh Hospital
Makarie Chiefdom||Makarie MCHP
Makarie Chiefdom||Mangay Loko MCHP
Makarie Chiefdom||Marie Stopes (Makarie) Clinic
Makarie Chiefdom||Masongbo (Makarie) CHC
Makarie Chiefdom||Mateneh MCHP
Makarie Chiefdom||Punthun MCHP
Makarie Chiefdom||Thonkoba CHP
Makarie Chiefdom||Yainkassa CHP
Mara Chiefdom||Kiampkakolo MCHP
Mara Chiefdom||Manewa MCHP
Mara Chiefdom||Mara CHC
Ngowahun Chiefdom||Kalangba (Ngowahun) CHC
Ngowahun Chiefdom||Maharie CHP
Ngowahun Chiefdom||Makiteh (Ngowahun) MCHP
Ngowahun Chiefdom||Masongbo Loko CHP
Ngowahun Chiefdom||Tambiama CHP
Paki Masabong Chiefdom||Kathanta Bana CHP
Paki Masabong Chiefdom||Kathekeya Kaboli CHP
Paki Masabong Chiefdom||Makeni Lol MCHP
Paki Masabong Chiefdom||Makolor CHP
Paki Masabong Chiefdom||Mapaki CHC
Paki Masabong Chiefdom||Masabong Pil MCHP
Paki Masabong Chiefdom||Masingbi Lol MCHP
Safroko Limba Chiefdom||Binkolo CHC
Safroko Limba Chiefdom||Kabombeh MCHP
Safroko Limba Chiefdom||Kabonka MCHP
Safroko Limba Chiefdom||Kagbo MCHP
Safroko Limba Chiefdom||Kapethe MCHP
Safroko Limba Chiefdom||Kateneh MCHP
Safroko Limba Chiefdom||Kayasie CHP
Safroko Limba Chiefdom||Mabonkani MCHP
Safroko Limba Chiefdom||Maselleh MCHP
Safroko Limba Chiefdom||Masongbo Limba MCHP
Makeni City||Bombali Police CHC
Makeni City||Branda Medical Centre Hospital
Makeni City||Caring Hands Clinic
Makeni City||City Garden Clinic
Makeni City||Fullah Town 2 (Makeni City) CHP
Makeni City||Hamanda Clinic
Makeni City||Happy Kid and Adolescent (Makeni City) Clinic
Makeni City||Holy Spirit Hospital
Makeni City||Holy Spirit Mobile Clinic
Makeni City||Loreto Clinic
Makeni City||Makeni Correctional Centre Clinic
Makeni City||Makeni Government Hospital
Makeni City||Masuba Clinic
Makeni City||Modern Clinic
Makeni City||Mordan Clinic
Makeni City||New Hope Hospital
Makeni City||Red Cross (Makeni City) CHP
Makeni City||Sanda Clinic
Makeni City||Stocco Leprosy and TB Hospital
Makeni City||Teko Barracks CHP
Makeni City||Tonko CHP
Bendu-Cha Chiefdom||Bendu (Bendu-Cha) CHC
Bendu-Cha Chiefdom||Foya (Bendu-Cha) CHP
Bendu-Cha Chiefdom||Giebina CHP
Bendu-Cha Chiefdom||Mindohun MCHP
Bendu-Cha Chiefdom||Mo-Davies CHP
Bendu-Cha Chiefdom||Taigbe CHP
Bum Chiefdom||Karlleh MCHP
Bum Chiefdom||Madina (Bum) CHC
Bum Chiefdom||Mammy CHP
Bum Chiefdom||Ngepehun CHP
Bum Chiefdom||Ngessehun MCHP
Bum Chiefdom||Sogballeh MCHP
Bum Chiefdom||Tassor CHP
Bum Chiefdom||Torma Bum CHP
Dema Chiefdom||Bumpetoke (Dema) CHP
Dema Chiefdom||Mbaoma (Dema) CHP
Dema Chiefdom||Tissana (Dema) CHC
Dema Chiefdom||Tombay CHP
Imperi Chiefdom||Gaindema CHP
Imperi Chiefdom||Gbamgbaia CHC
Imperi Chiefdom||Gbamgbama CHC
Imperi Chiefdom||Jangallor CHP
Imperi Chiefdom||Junctionla MCHP
Imperi Chiefdom||Mo-Kepay CHP
Imperi Chiefdom||Mogbwemo CHC
Imperi Chiefdom||Mokaba MCHP
Imperi Chiefdom||Moriba Town (Imperri) CHC
Imperi Chiefdom||Mount Hope Hospital
Imperi Chiefdom||Sierra Rutile Hospital
Imperi Chiefdom||Victoria MCHP
Imperi Chiefdom||Yargoi CHP
Jong Chiefdom||Barbar MCHP
Jong Chiefdom||Gambia CHC
Jong Chiefdom||Gbaninga CHP
Jong Chiefdom||Henry Kormoi Community Hospital
Jong Chiefdom||Jorma CHP
Jong Chiefdom||Kabati CHP
Jong Chiefdom||Komende (Jong) MCHP
Jong Chiefdom||Mattru CHC
Jong Chiefdom||Mattru UBC Hospital
Jong Chiefdom||Mo-Savie MCHP
Jong Chiefdom||Mogbwe MCHP
Jong Chiefdom||Mongerewa MCHP
Jong Chiefdom||Moyowa MCHP
Jong Chiefdom||Red Cross (Mattru) CHP
Jong Chiefdom||Segbwema (Jong) CHP
Jong Chiefdom||Semabu (Jong) CHP
Jong Chiefdom||Tissana (Jong) CHP
Kpanda Kemoh Chiefdom||Gambia Popayma MCHP
Kpanda Kemoh Chiefdom||Gbongeh MCHP
Kpanda Kemoh Chiefdom||Lawana (Kpanda Kemo) MCHP
Kpanda Kemoh Chiefdom||Mottuo CHC
Kpanda Kemoh Chiefdom||Senjehun MCHP
Kwamebai Krim Chiefdom||Benduma CHC
Kwamebai Krim Chiefdom||Hoya CHP
Kwamebai Krim Chiefdom||Massah Kpoanguma CHP
Kwamebai Krim Chiefdom||Mosenteh CHP
Kwamebai Krim Chiefdom||Tei CHP
Kwamebai Krim Chiefdom||Topain CHP
Nongoba Bullom Chiefdom||Batahall CHP
Nongoba Bullom Chiefdom||Gbamani CHP
Nongoba Bullom Chiefdom||Gbap CHC
Nongoba Bullom Chiefdom||Maamu MCHP
Nongoba Bullom Chiefdom||Mbaoma Kpengeh CHC
Nongoba Bullom Chiefdom||Mbaoma Kpengeh CHP
Nongoba Bullom Chiefdom||Minah CHP
Nongoba Bullom Chiefdom||Ngaringa MCHP
Nongoba Bullom Chiefdom||Sembehun (Nongoba Bullom) MCHP
Nongoba Bullom Chiefdom||Subu MCHP
Nongoba Bullom Chiefdom||Torma Gbagba CHP
Nongoba Bullom Chiefdom||Waiba MCHP
Sittia Chiefdom||Delken CHC
Sittia Chiefdom||Delken MCHP
Sittia Chiefdom||Mania MCHP
Sittia Chiefdom||Mbokie MCHP
Sittia Chiefdom||Mo-Sandi CHP
Sittia Chiefdom||Ngepay CHP
Sittia Chiefdom||Sanhaya CHP
Sittia Chiefdom||Yoni (Sittia) CHC
Sogbini Chiefdom||Grima (Sogbini) CHP
Sogbini Chiefdom||Kanga (Sogbini) MCHP
Sogbini Chiefdom||Kpetema (Sogbini) MCHP
Sogbini Chiefdom||Mandu CHP
Sogbini Chiefdom||Ngueh MCHP
Sogbini Chiefdom||Tihun CHC
Yawbeko Chiefdom||Mobefa MCHP
Yawbeko Chiefdom||Sargor CHP
Yawbeko Chiefdom||Senehun Gbloh MCHP
Yawbeko Chiefdom||Talia (Yawbeko) CHC
Yawbeko Chiefdom||Tuakan CHP
Bonthe Town||Bonthe Government Hospital
Bonthe Town||Bonthe Under Fives Clinic
Bonthe Town||Red Cross (Bonthe) CHP
Bonthe Town||St Joseph's Clinic
Bonthe Town||York Island CHP
Barawa Wollay Chiefdom||Banadakafaia CHP
Barawa Wollay Chiefdom||Bandakoro MCHP
Barawa Wollay Chiefdom||Firawa CHC
Barawa Wollay Chiefdom||Konombaia CHP
Barawa Wollay Chiefdom||Kulanko MCHP
Delmandugu Chiefdom||Deldu Kamaron MCHP
Delmandugu Chiefdom||Mansadu CHC
Delmandugu Chiefdom||Masadu CHC
Delmandugu Chiefdom||Mongo Kamaron CHP
Delmandugu Chiefdom||Seremudu MCHP
Delmandugu Chiefdom||Tambalia Balia MCHP
Dembelia-Sinkunia Chiefdom||Fullamansa MCHP
Dembelia-Sinkunia Chiefdom||Gbindi CHP
Dembelia-Sinkunia Chiefdom||Manna MCHP
Dembelia-Sinkunia Chiefdom||Sinkunia CHC
Folosaba Dembelia Chiefdom||Dogoloya CHP
Folosaba Dembelia Chiefdom||Koromasilaia MCHP
Folosaba Dembelia Chiefdom||Largo MCHP
Folosaba Dembelia Chiefdom||Musaia (Dembelia) CHC
Folosaba Kamba Chiefdom||Gbentu CHC
Folosaba Kamba Chiefdom||Hamdalia MCHP
Folosaba Kamba Chiefdom||Kalia MCHP
Folosaba Kamba Chiefdom||Kamba Mamudia CHP
Kabelia Chiefdom||Ganya CHP
Kamadugu Yiraia Chiefdom||Dankawalie CHC
Kamadugu Yiraia Chiefdom||Kamadu Badala MCHP
Kamadugu Yiraia Chiefdom||Kamadu Sokuralla CHP
Kamadugu Yiraia Chiefdom||Yiraia CHP
Kulor Saradu Chiefdom||Bandapirie CHP
Kulor Saradu Chiefdom||Durukoro MCHP
Kulor Saradu Chiefdom||Kulia CHP
Kulor Saradu Chiefdom||Yarawadu MCHP
Mongo Chiefdom||Mongo Bendugu CHC
Mongo Chiefdom||Mongo Karifaia MCHP
Mongo Chiefdom||Seria CHP
Mongo Chiefdom||Walia MCHP
Morifindu Chiefdom||Gberefeh MCHP
Morifindu Chiefdom||Kombili CHP
Morifindu Chiefdom||Serekolia CHC
Morifindu Chiefdom||Tubah MCHP
Neya Chiefdom||Banboria MCHP
Neya Chiefdom||Kurubonla CHC
Neya Chiefdom||Mansofinia CHP
Neya Chiefdom||Porpon MCHP
Nyedu Chiefdom||Bumbukoro CHC
Nyedu Chiefdom||Masonia MCHP
Sulima Chiefdom||Falaba CHC
Sulima Chiefdom||Gberia Timbakor CHP
Sulima Chiefdom||Kaliyereh MCHP
Sulima Chiefdom||Koindu Kura CHP
Sulima Chiefdom||Sonkoya MCHP
Dea Chiefdom||Baiwala CHP
Dea Chiefdom||Nagbena CHP
Dea Chiefdom||Sienga CHP
Jahn Chiefdom||Gbeika CHP
Jawei Chiefdom||Bombohun MCHP
Jawei Chiefdom||Daru CHC
Jawei Chiefdom||Kambama CHP
Jawei Chiefdom||Kortuma MCHP
Jawei Chiefdom||Mamabu CHP
Jawei Chiefdom||Njala-Grima CHP
Jawei Chiefdom||Nyeama CHP
Jawei Chiefdom||Pellie CHP
Jawei Chiefdom||Pewama CHP
Jawei Chiefdom||SWAKAB (Jawei) Clinic
Kissi Kama Chiefdom||Dia CHC
Kissi Kama Chiefdom||Foidu CHP
Kissi Teng Chiefdom||Bayama (Kissi Teng) CHP
Kissi Teng Chiefdom||Kangama (Kissi Teng) CHP
Kissi Teng Chiefdom||Koindu CHC
Kissi Tongi Chiefdom||Buedu CHC
Kissi Tongi Chiefdom||Dawa CHP
Kissi Tongi Chiefdom||Gbandiwulo CHP
Kissi Tongi Chiefdom||Madopolahun CHP
Kissi Tongi Chiefdom||Sandia (Kissi Tongi) MCHP
Kissi Tongi Chiefdom||Voahun CHP
Kissi Tongi Chiefdom||Weh CHP
Luawa Chiefdom||Bandajuma Sinneh MCHP
Luawa Chiefdom||Baoma (Luawa) CHP
Luawa Chiefdom||Dodo-Kortuma CHP
Luawa Chiefdom||Gbalahun CHP
Luawa Chiefdom||Gbeworbu Gao CHP
Luawa Chiefdom||Giema (Luawa) CHP
Luawa Chiefdom||Jengbellu CHP
Luawa Chiefdom||Kailahun Government Hospital
Luawa Chiefdom||Konjo (Luawa) CHP
Luawa Chiefdom||Kpandebu (Luawa) MCHP
Luawa Chiefdom||Luawa Under Fives CHC
Luawa Chiefdom||Madina (Luawa) MCHP
Luawa Chiefdom||Mano-Sewalu CHP
Luawa Chiefdom||Marie Stopes (Luawa) Clinic
Luawa Chiefdom||Mende Buima MCHP
Luawa Chiefdom||Morfindor CHP
Luawa Chiefdom||Ngiehun (Luawa) CHP
Luawa Chiefdom||Nyandehun (Luawa) CHP
Luawa Chiefdom||Sandeyallu CHP
Luawa Chiefdom||Sengema (Luawa) CHP
Luawa Chiefdom||Talia (Luawa) MCHP
Malema Chiefdom||Bumpeh (Malema) CHP
Malema Chiefdom||Fobu CHP
Malema Chiefdom||Jojoima CHC
Malema Chiefdom||Madina (Malema) CHP
Malema Chiefdom||Njama (Malema) MCHP
Mandu Chiefdom||Baiima CHP
Mandu Chiefdom||Levuma (Mandu) CHP
Mandu Chiefdom||Mobai CHC
Mandu Chiefdom||Yoyah CHP
Njaluahun Chiefdom||Bandajuma Kpolihun CHP
Njaluahun Chiefdom||Dambu CHC
Njaluahun Chiefdom||Daru Field Hospital Clinic
Njaluahun Chiefdom||Follah MCHP
Njaluahun Chiefdom||Laleihun (Njaluahun) CHP
Njaluahun Chiefdom||Mano-Menima CHP
Njaluahun Chiefdom||Niahun Gbuyama CHP
Njaluahun Chiefdom||Nixon Hospital
Njaluahun Chiefdom||Nixon Under Fives CHC
Njaluahun Chiefdom||Njaluahun Military Hospital
Njaluahun Chiefdom||Nyandehun Nguvoihun CHP
Njaluahun Chiefdom||Pendembu-Njeigbla CHP
Njaluahun Chiefdom||Segbwema (Njaluahun) MCHP
Peje Bongre Chiefdom||Gbahama (Peje Bongre) CHP
Peje Bongre Chiefdom||Grima MCHP
Peje Bongre Chiefdom||Mamboma (Peje Bongre) CHP
Peje Bongre Chiefdom||Manowa CHC
Peje Bongre Chiefdom||Ngolahun MCHP
Peje Bongre Chiefdom||Pujehun (Peje Bongre) CHP
Peje West Chiefdom||Bunumbu CHC
Peje West Chiefdom||El-Shaddai (Peje West) Clinic
Peje West Chiefdom||Jokibu CHP
Peje West Chiefdom||Peje Baoma CHP
Peje West Chiefdom||Pejewa (Peje West) CHP
Penguia Chiefdom||Kono-Bendu CHP
Penguia Chiefdom||Lalehun CHP
Penguia Chiefdom||Sandaru (Penguia) CHC
Penguia Chiefdom||Woroma CHP
Upper Bambara Chiefdom||Bomaru CHP
Upper Bambara Chiefdom||Hand Maid Clinic
Upper Bambara Chiefdom||Jenneh MCHP
Upper Bambara Chiefdom||Mendekelema (Upper Bambara) CHP
Upper Bambara Chiefdom||Pendembu (Upper Bambara) CHC
Upper Bambara Chiefdom||Siama (Upper Bambara) CHP
Yawei Chiefdom||Bandajuma CHC
Yawei Chiefdom||Bendu CHP
Yawei Chiefdom||Kwellu-Ngieya CHP
Yawei Chiefdom||Macca CHP
Yawei Chiefdom||Malema (Yawei) CHP
Yawei Chiefdom||Massayeima CHP
Bramaia Chiefdom||Gbolon MCHP
Bramaia Chiefdom||Kanku Bramaia MCHP
Bramaia Chiefdom||Kukuna CHC
Bramaia Chiefdom||Shekaia MCHP
Dixon Chiefdom||Fodaya MCHP
Dixon Chiefdom||Mafaray CHP
Gbinleh Chiefdom||Gbalamuya CHC
Gbinleh Chiefdom||Madamaya Good Grace Clinic
Gbinleh Chiefdom||Magbengbeh MCHP
Gbinleh Chiefdom||Tawuya MCHP
Gbinleh Chiefdom||Worreh MCHP
Konimaka Chiefdom||Barakuya MCHP
Konimaka Chiefdom||Konta (Bramaia) CHP
Magbema Chiefdom||Ahmadiyya Mission Clinic
Magbema Chiefdom||Arab (Magbema) Clinic
Magbema Chiefdom||Barmoi Luma CHP
Magbema Chiefdom||Dibia CHP
Magbema Chiefdom||Gbonkomaria CHP
Magbema Chiefdom||Kamba MCHP
Magbema Chiefdom||Kambia Government Hospital
Magbema Chiefdom||Magbema Under Fives Clinic
Magbema Chiefdom||Magbethy MCHP
Magbema Chiefdom||Mathuraneh MCHP
Magbema Chiefdom||Menicurve MCHP
Magbema Chiefdom||Mile 18 MCHP
Magbema Chiefdom||Modia MCHP
Magbema Chiefdom||Red Cross (Magbema) CHP
Magbema Chiefdom||Rokupr CHC
Magbema Chiefdom||Senthai MCHP
Magbema Chiefdom||Wullah Thenkle MCHP
Mambolo Chiefdom||Kalainkay MCHP
Mambolo Chiefdom||Macoth MCHP
Mambolo Chiefdom||Mambolo (Kambia) CHC
Mambolo Chiefdom||Mayakie MCHP
Mambolo Chiefdom||Rokel (Mambolo) MCHP
Mambolo Chiefdom||Romando MCHP
Mambolo Chiefdom||Rotain Bana CHP
Mambolo Chiefdom||Tombo Wallah CHP
Masumgbala Chiefdom||Kania CHC
Masumgbala Chiefdom||Kawula CHC
Munu Thalla Chiefdom||Banka Makuloh MCHP
Munu Thalla Chiefdom||Barmoi Munu CHC
Munu Thalla Chiefdom||Gbalan Thallan MCHP
Samu Chiefdom||Bapuya CHP
Samu Chiefdom||Kangbor MCHP
Samu Chiefdom||Kassirie CHC
Samu Chiefdom||Kortimoh MCHP
Samu Chiefdom||Koya (Samu) MCHP
Samu Chiefdom||Kychom CHC
Samu Chiefdom||Mafufuneh CHC
Samu Chiefdom||Mange Bissan MCHP
Samu Chiefdom||Mapotolon CHC
Samu Chiefdom||Moribaya MCHP
Samu Chiefdom||Rokai MCHP
Samu Chiefdom||Rosinor CHP
Samu Chiefdom||Soriebolomia MCHP
Samu Chiefdom||Yelieboya CHP
Tonko Limba Chiefdom||Bubuya MCHP
Tonko Limba Chiefdom||Kamagbewu MCHP
Tonko Limba Chiefdom||Kamassasa CHC
Tonko Limba Chiefdom||Kamawala MCHP
Tonko Limba Chiefdom||Kasoria CHP
Tonko Limba Chiefdom||Katherie MCHP
Tonko Limba Chiefdom||Layia Gboray CHP
Tonko Limba Chiefdom||Madina (Tonko Limba) CHC
Tonko Limba Chiefdom||Madina Wesleyan Clinic
Tonko Limba Chiefdom||Masaralie MCHP
Tonko Limba Chiefdom||Masselleh CHP
Tonko Limba Chiefdom||Masunthun CHP
Tonko Limba Chiefdom||Mile 14 CHP
Tonko Limba Chiefdom||Numea CHP
Tonko Limba Chiefdom||Samaia MCHP
Tonko Limba Chiefdom||Sellah Kafta MCHP
Tonko Limba Chiefdom||Timbo MCHP
Tonko Limba Chiefdom||Yebaya MCHP
Buya Chiefdom||Kamasondo CHC
Buya Chiefdom||Manumtheneh MCHP
Buya Chiefdom||Masamboi MCHP
Buya Chiefdom||Rosint Buya MCHP
Dibia Chiefdom||Gbinti CHC
Dibia Chiefdom||Gbombana MCHP
Dibia Chiefdom||Magborognor MCHP
Dibia Chiefdom||Roctolon MCHP
Dibia Chiefdom||Rogballan (Dibia) CHP
Gbanti (Karene) Chiefdom||Borongoh Makarankay MCHP
Gbanti (Karene) Chiefdom||Gbainkfay MCHP
Gbanti (Karene) Chiefdom||Gbanti CHP
Gbanti (Karene) Chiefdom||Gbinti Maria MCHP
Gbanti (Karene) Chiefdom||Gbonkobana MCHP
Gbanti (Karene) Chiefdom||Kambia CHP
Gormbahun Chiefdom||BatKanu CHC
Gormbahun Chiefdom||Kiamunday MCHP
Gormbahun Chiefdom||Magbaingba MCHP
Gormbahun Chiefdom||Matoto MCHP
Mafonda Makerembay Chiefdom||Gbonkonka MCHP
Mafonda Makerembay Chiefdom||Rochain Loko CHP
Romende Chiefdom||Foredugu MCHP
Romende Chiefdom||Gbomsamba MCHP
Romende Chiefdom||Mabureh Mende MCHP
Romende Chiefdom||Rokamba MCHP
Romende Chiefdom||Worreh Bana MCHP
Safroko Chiefdom||Maron CHP
Sanda Loko Chiefdom||Kamalo CHC
Sanda Loko Chiefdom||Laiya MCHP
Sanda Loko Chiefdom||Laminaya CHP
Sanda Loko Chiefdom||Madina Fullah MCHP
Sanda Loko Chiefdom||Maharibo CHP
Sanda Loko Chiefdom||Marcorba Loko MCHP
Sanda Loko Chiefdom||Mayolla CHP
Sanda Loko Chiefdom||Rochain Salcost CHP
Sanda Loko Chiefdom||Rothatha MCHP
Sanda Magbolonthor Chiefdom||Gbogbodo MCHP
Sanda Magbolonthor Chiefdom||Kantia MCHP
Sanda Magbolonthor Chiefdom||Komneh CHP
Sanda Magbolonthor Chiefdom||Magbolonthor MCHP
Sanda Magbolonthor Chiefdom||Sendugu CHC
Sanda Tendaren Chiefdom||Mabunduka CHC
Sanda Tendaren Chiefdom||Malontho MCHP
Sanda Tendaren Chiefdom||Manack MCHP
Sanda Tendaren Chiefdom||Mateboi CHC
Sanda Tendaren Chiefdom||Rogbin MCHP
Sanda Tendaren Chiefdom||Rokulan CHC
Sanda Tendaren Chiefdom||Royanka Lol CHP
Sella Limba Chiefdom||Kabba Ferry CHP
Sella Limba Chiefdom||Kagboray MCHP
Sella Limba Chiefdom||Kamabaio MCHP
Sella Limba Chiefdom||Kamakwie CHP
Sella Limba Chiefdom||Kamakwie Wesleyan Hospital
Sella Limba Chiefdom||Kamawornie MCHP
Sella Limba Chiefdom||Kaponkie MCHP
Sella Limba Chiefdom||Kathanta Yimbor CHC
Sella Limba Chiefdom||Masankorie CHP
Tambaka Simibungie Chiefdom||Komoya CHP
Tambaka Simibungie Chiefdom||Samaya MCHP
Tambaka Yobangie Chiefdom||Dombaya CHP
Tambaka Yobangie Chiefdom||Fintonia CHC
Tambaka Yobangie Chiefdom||Sanya MCHP
Kenema City||African Muslim Agency Clinic
Kenema City||Ahmadiyya Muslim (Nongowa) Hospital
Kenema City||BL Services Clinic
Kenema City||Burma 2 MCHP
Kenema City||Degbuama MCHP
Kenema City||Direct Aid Orphanage (Kenema City) Clinic
Kenema City||Egyptian (Kenema City) Clinic
Kenema City||Ensah Foundation Clinic
Kenema City||Friends For Lives Clinic
Kenema City||Gbo-Kakajama 1 MCHP
Kenema City||Gbo-Kakajama 2 MCHP
Kenema City||Gbo-Lambayama 1 CHC
Kenema City||Gbo-Lambayama 2 MCHP
Kenema City||Kenema City Military Clinic
Kenema City||Kenema Government Hospital
Kenema City||Kenema Under Fives CHP
Kenema City||Kondebotihun MCHP
Kenema City||Koyagbema MCHP
Kenema City||Kpayama 1 MCHP
Kenema City||Kpayama 2 MCHP
Kenema City||Kpetema (Kenema City) CHC
Kenema City||Lango Town MCHP
Kenema City||Malian Friendship Hospital
Kenema City||Marie Stopes (Kenema City) Clinic
Kenema City||Nongowa Static MCHP
Kenema City||Nyandeyama MCHP
Kenema City||Rainbow Clinic
Kenema City||Red Cross (Kenema City) CHP
Kenema City||Samai Town CHC
Kenema City||Torkpombu MCHP
Dama Chiefdom||Diamei MCHP
Dama Chiefdom||Gao MCHP
Dama Chiefdom||Giema (Dama) CHP
Dama Chiefdom||Konia (Dama) MCHP
Dama Chiefdom||Konjo (Dama) CHP
Dama Chiefdom||Kpandebu CHC
Dama Chiefdom||Lileima MCHP
Dama Chiefdom||Loppa CHP
Dama Chiefdom||Majihun MCHP
Dama Chiefdom||Patama MCHP
Dama Chiefdom||Tawahun MCHP
Dama Chiefdom||Tokpombu (Dama) CHP
Dodo Chiefdom||Dodo CHC
Dodo Chiefdom||Guala MCHP
Dodo Chiefdom||Kundorma CHP
Dodo Chiefdom||Mbowohun CHP
Gaura Chiefdom||Joru CHC
Gaura Chiefdom||Kokoru CHP
Gaura Chiefdom||Mendekelema (Gaura) CHP
Gaura Chiefdom||Perrie MCHP
Gaura Chiefdom||Sandaru (Gaura) MCHP
Gaura Chiefdom||Sembehun (Gaura) MCHP
Gaura Chiefdom||Tikonko (Gaura) MCHP
Gaura Chiefdom||Venima CHP
Gorama Mende Chiefdom||Bambara Kaima CHP
Gorama Mende Chiefdom||Fomaya CHP
Gorama Mende Chiefdom||Konta (Gorama Mende) CHP
Gorama Mende Chiefdom||Kortuhun (Gorama Mende) MCHP
Gorama Mende Chiefdom||Mondema CHC
Gorama Mende Chiefdom||Ngiegboiye CHP
Gorama Mende Chiefdom||Njagbewema (Gorama Mende) MCHP
Gorama Mende Chiefdom||Punduru CHP
Gorama Mende Chiefdom||Tungie CHC
Kandu Leppiama Chiefdom||Baoma Oil Mill CHC
Kandu Leppiama Chiefdom||Diema MCHP
Kandu Leppiama Chiefdom||Gbado CHP
Kandu Leppiama Chiefdom||Levuma (Kandu Leppiama) CHC
Kandu Leppiama Chiefdom||Sembehun (Kandu Leppiama) MCHP
Koya (Kenema) Chiefdom||Baoma (Koya) CHC
Koya (Kenema) Chiefdom||Bongor (Koya) MCHP
Koya (Kenema) Chiefdom||Jui (Koya) CHP
Koya (Kenema) Chiefdom||Menima MCHP
Koya (Kenema) Chiefdom||Njaluahun (Koya) MCHP
Koya (Kenema) Chiefdom||Nyandehun (Koya) MCHP
Koya (Kenema) Chiefdom||Serabu (Koya) CHP
Langroma Chiefdom||Woyama MCHP
Langroma Chiefdom||Yabaima CHP
Lower Bambara Chiefdom||Bomie MCHP
Lower Bambara Chiefdom||Foindu (Lower Bambara) CHC
Lower Bambara Chiefdom||Foindu (Lower Bambara) CHP
Lower Bambara Chiefdom||Kamboma (Lower Bambara) CHC
Lower Bambara Chiefdom||Kamboma (Lower Bambara) MCHP
Lower Bambara Chiefdom||Komende Getewalu CHP
Lower Bambara Chiefdom||Komende Luyema MCHP
Lower Bambara Chiefdom||Konjo (Lower Bambara) CHC
Lower Bambara Chiefdom||Konjo (Lower Bambara) MCHP
Lower Bambara Chiefdom||Kornia Kpindema CHP
Lower Bambara Chiefdom||Kpandebu (Lower Bambara) CHC
Lower Bambara Chiefdom||Kpandebu (Lower Bambara) MCHP
Lower Bambara Chiefdom||Kpetema (Lower Bambara) CHP
Lower Bambara Chiefdom||Lowoma (Lower Bambara) CHC
Lower Bambara Chiefdom||Ngiehun (Lower Bambara) CHC
Lower Bambara Chiefdom||Njagbahun (Lower Bambara) MCHP
Lower Bambara Chiefdom||Panguma CHC
Lower Bambara Chiefdom||Panguma Hospital
Lower Bambara Chiefdom||Pelewahun (Lower Bambara) MCHP
Lower Bambara Chiefdom||Saama CHP
Lower Bambara Chiefdom||Sandeyiema MCHP
Lower Bambara Chiefdom||Sembiema MCHP
Lower Bambara Chiefdom||Semewabu MCHP
Lower Bambara Chiefdom||Tongo CHC
Lower Bambara Chiefdom||Wiema CHC
Malegohun Chiefdom||Bendu (Malegohun) CHC
Malegohun Chiefdom||Benduma (Malegohun) MCHP
Malegohun Chiefdom||Helegombu MCHP
Malegohun Chiefdom||Ngiehun Konjo CHP
Niawa Chiefdom||Bandawor MCHP
Niawa Chiefdom||Gandorhun (Niawa) CHP
Niawa Chiefdom||Sendumei CHC
Nomo Chiefdom||Baoma (Nomo) CHP
Nomo Chiefdom||Damabara MCHP
Nomo Chiefdom||Faama CHC
Nongowa Chiefdom||Bambawo MCHP
Nongowa Chiefdom||Hangah CHC
Nongowa Chiefdom||Jormu (Nongowa) CHP
Nongowa Chiefdom||Komende (Nongowa) MCHP
Nongowa Chiefdom||Konabu MCHP
Nongowa Chiefdom||Largo CHC
Nongowa Chiefdom||Massahun MCHP
Nongowa Chiefdom||Medicins Sans Frontiere Hospital
Nongowa Chiefdom||Ngelehun (Nongowa) MCHP
Nongowa Chiefdom||Niahun Buima MCHP
Nongowa Chiefdom||Niekabu CHC
Nongowa Chiefdom||Panderu MCHP
Nongowa Chiefdom||Potehun MCHP
Nongowa Chiefdom||Talia (Nongowa) CHC
Nongowa Chiefdom||Vaahun MCHP
Simbaru Chiefdom||Boajibu CHC
Simbaru Chiefdom||Gbageima MCHP
Small Bo Chiefdom||Blama CHC
Small Bo Chiefdom||Doujo CHP
Small Bo Chiefdom||Gelehun MCHP
Small Bo Chiefdom||London (Blama) MCHP
Small Bo Chiefdom||Nyangbe-Bo MCHP
Small Bo Chiefdom||Sarabu CHP
Small Bo Chiefdom||Tobanda CHC
Tunkia Chiefdom||Belebu CHP
Tunkia Chiefdom||Fayiema CHP
Tunkia Chiefdom||Gbeworbu CHP
Tunkia Chiefdom||Gegbwema CHC
Tunkia Chiefdom||Gorahun CHC
Tunkia Chiefdom||Jao (Tunkia) CHP
Tunkia Chiefdom||Mano Ngiebla CHP
Tunkia Chiefdom||Ngiewahun CHP
Tunkia Chiefdom||Nyiemiga MCHP
Tunkia Chiefdom||Shenge MCHP
Wandor Chiefdom||Baama CHC
Wandor Chiefdom||Bambara MCHP
Wandor Chiefdom||Faala CHP
Wandor Chiefdom||Gendema MCHP
Wandor Chiefdom||Kamboma (Wandor) MCHP
Diang Chiefdom||Badala MCHP
Diang Chiefdom||Dalakuru CHP
Diang Chiefdom||Diang Kamaron MCHP
Diang Chiefdom||Diang Sokurala MCHP
Diang Chiefdom||Foria CHP
Diang Chiefdom||Kania (Diang) CHP
Diang Chiefdom||Kondembaia CHC
Diang Chiefdom||Lengekoro CHP
Diang Chiefdom||Nyawulia MCHP
Diang Chiefdom||Solia MCHP
Diang Chiefdom||Waia MCHP
Diang Chiefdom||Yara CHP
Diang Chiefdom||Yiben MCHP
Gbonkorbor Kayaka Chiefdom||Kakarima MCHP
Gbonkorbor Kayaka Chiefdom||Kasassie CHP
Gbonkorbor Kayaka Chiefdom||Madina Gbonkorbor CHP
Gbonkorbor Kayaka Chiefdom||Sawuria CHP
Kallian Chiefdom||Alkalia CHP
Kallian Chiefdom||Kandeya MCHP
Kallian Chiefdom||Kumala CHP
Kallian Chiefdom||Sesawulia MCHP
Kallian Chiefdom||Tukolie CHP
Kallian Chiefdom||Worombalia MCHP
Kamukeh Chiefdom||Kambalia MCHP
Kamukeh Chiefdom||Kambia MCHP
Kamukeh Chiefdom||Mandia MCHP
Kamukeh Chiefdom||Thellia CHP
Kasunko Kakellay Chiefdom||Fadugu CHC
Kasunko Kakellay Chiefdom||Kagbasia MCHP
Kasunko Kakellay Chiefdom||Kassasie Kakeleh MCHP
Kasunko Kakellay Chiefdom||Madina Kamandie MCHP
Kasunko Kakellay Chiefdom||Sawuria CHP
Nieni Chiefdom||Fankoya CHP
Nieni Chiefdom||Kaya MCHP
Nieni Chiefdom||Krutor CHP
Nieni Chiefdom||Mangae MCHP
Nieni Chiefdom||Safinia MCHP
Nieni Chiefdom||Sumbaria CHP
Nieni Chiefdom||Yiffin CHC
Sengbeh Chiefdom||Arab (Sengbeh) Clinic
Sengbeh Chiefdom||Bambukoro CHP
Sengbeh Chiefdom||Bambukura MCHP
Sengbeh Chiefdom||Gbenikoro MCHP
Sengbeh Chiefdom||Koinadugu 2 CHC
Sengbeh Chiefdom||Kondeya (Sengbeh) MCHP
Sengbeh Chiefdom||Momorimaria MCHP
Sengbeh Chiefdom||Nasarah Clinic
Sengbeh Chiefdom||Red Cross (Sengbeh) Clinic
Thamiso Chiefdom||Kamathoi MCHP
Thamiso Chiefdom||Karasa MCHP
Thamiso Chiefdom||Kasanikoro CHP
Wara Wara Bafodia Chiefdom||Bafodia CHC
Wara Wara Bafodia Chiefdom||Kadanso MCHP
Wara Wara Bafodia Chiefdom||Kakoya MCHP
Wara Wara Bafodia Chiefdom||Karpakie MCHP
Wara Wara Bafodia Chiefdom||Sakuta MCHP
Wara Wara Bafodia Chiefdom||Samamaia MCHP
Wara Wara Yagala Chiefdom||Arab (Wara Wara Yagala) Clinic
Wara Wara Yagala Chiefdom||Heremakono CHP
Wara Wara Yagala Chiefdom||Kabala Government Hospital
Wara Wara Yagala Chiefdom||Kabala Static CHC
Wara Wara Yagala Chiefdom||Kayako MCHP
Wara Wara Yagala Chiefdom||Konkoba MCHP
Wara Wara Yagala Chiefdom||Mamudia Koro MCHP
Wara Wara Yagala Chiefdom||Marie Stopes (Kabala) Clinic
Wara Wara Yagala Chiefdom||Sarakoh MCHP
Wara Wara Yagala Chiefdom||Senekedugu CHP
Wara Wara Yagala Chiefdom||Wara Wara Faith Clinic
Wara Wara Yagala Chiefdom||Yataya CHP
Koidu New Sembehun City||Adama Martha Memorial CHC
Koidu New Sembehun City||Arabic Clinic
Koidu New Sembehun City||Dabundeh Clinic
Koidu New Sembehun City||Egyptian (Koidu) Clinic
Koidu New Sembehun City||Gbongonlekeh Clinic
Koidu New Sembehun City||Gbongonleken Clinic
Koidu New Sembehun City||Hussein Mackie Memorial Hospital
Koidu New Sembehun City||In God Be Truth Clinic
Koidu New Sembehun City||Joanna Enterprise Clinic
Koidu New Sembehun City||Kamadu CHP
Koidu New Sembehun City||Kensay CHP
Koidu New Sembehun City||Kimbadu CHC
Koidu New Sembehun City||Kissi Bona CHP
Koidu New Sembehun City||Koakoyima CHC
Koidu New Sembehun City||Koeyor CHP
Koidu New Sembehun City||Koidu Government Hospital
Koidu New Sembehun City||Koidu Static CHC
Koidu New Sembehun City||Koidu Static CHP
Koidu New Sembehun City||Marie Stopes (Koidu) Clinic
Koidu New Sembehun City||Obama Clinic
Koidu New Sembehun City||Paul Sorie Farma's Hospital
Koidu New Sembehun City||Pessima Clinic
Koidu New Sembehun City||Simbakoro MCHP
Koidu New Sembehun City||Small Sefadu CHP
Koidu New Sembehun City||White House Clinic
Fiama Chiefdom||Bandasuma (Fiama) CHP
Fiama Chiefdom||Bombordu CHP
Fiama Chiefdom||Gbetema (Fiama) MCHP
Fiama Chiefdom||Njagbwema (Fiama) CHC
Fiama Chiefdom||Yekior MCHP
Gbane Chiefdom||Bandama (Gbane) MCHP
Gbane Chiefdom||Fembedu CHP
Gbane Chiefdom||Foindu (Gbane) CHP
Gbane Chiefdom||Gandorhun (Gbane) CHC
Gbane Chiefdom||Kanekor MCHP
Gbane Chiefdom||Kuangor MCHP
Gbane Chiefdom||Mbaoma (Gbane) CHP
Gbane Chiefdom||Sunga MCHP
Gbane Kandor Chiefdom||Koardu CHC
Gbane Kandor Chiefdom||Sindadu MCHP
Gbense Chiefdom||Boroma CHP
Gbense Chiefdom||Gbangadu MCHP
Gbense Chiefdom||Koakor MCHP
Gbense Chiefdom||Musa and Family CHC
Gbense Chiefdom||Quidadu MCHP
Gbense Chiefdom||Small Sefadu CHP
Gbense Chiefdom||Well Body Clinic
Gorama Kono Chiefdom||Bunabu CHP
Gorama Kono Chiefdom||Kangama (Gorama Kono) CHC
Gorama Kono Chiefdom||Njagbwema (Gorama Kono) CHP
Gorama Kono Chiefdom||Torkpumbu MCHP
Kamara Chiefdom||Peyima CHP
Kamara Chiefdom||Samiquidu MCHP
Kamara Chiefdom||Sukudu (Kamara) CHP
Kamara Chiefdom||Tombodu CHC
Lei Chiefdom||Foakor MCHP
Lei Chiefdom||Gbongongor MCHP
Lei Chiefdom||Kenewa MCHP
Lei Chiefdom||Koima (Lei) MCHP
Lei Chiefdom||Komba Yendeh CHC
Lei Chiefdom||Kongoifeh CHP
Lei Chiefdom||Kulunbaya CHP
Lei Chiefdom||Kunundu MCHP
Lei Chiefdom||Saiama (Lei) CHP
Mafindor Chiefdom||Kamiendor CHC
Mafindor Chiefdom||Kamiendor MCHP
Mafindor Chiefdom||Koindu-Kuteh MCHP
Mafindor Chiefdom||Sambaya (Mafindor) CHP
Nimikoro Chiefdom||Aiah Mass Clinic
Nimikoro Chiefdom||Ashley Clinic
Nimikoro Chiefdom||Bumpeh (Nimikoro) CHC
Nimikoro Chiefdom||Bumpeh (Nimikoro) CHP
Nimikoro Chiefdom||Gondama (Nimikoro) MCHP
Nimikoro Chiefdom||Jaiama CHC
Nimikoro Chiefdom||Mansundu (Nimikoro) MCHP
Nimikoro Chiefdom||Motema CHC
Nimikoro Chiefdom||Ngaiya MCHP
Nimikoro Chiefdom||Njagbwema (Nimikoro) CHC
Nimikoro Chiefdom||Njagbwema (Nimikoro) CHP
Nimikoro Chiefdom||Njala (Nimikoro) CHC
Nimikoro Chiefdom||Seidu MCHP
Nimikoro Chiefdom||Senjekoro MCHP
Nimikoro Chiefdom||Tongorma MCHP
Nimikoro Chiefdom||United Methodist Church Jaiama Clinic
Nimikoro Chiefdom||Yengema (Nimikoro) CHC
Nimiyama Chiefdom||Condama CHP
Nimiyama Chiefdom||Jaiama Sewafe CHC
Nimiyama Chiefdom||Massabendu MCHP
Nimiyama Chiefdom||Ngo Town CHP
Nimiyama Chiefdom||Peya MCHP
Nimiyama Chiefdom||Sandia (Nimiyama) MCHP
Nimiyama Chiefdom||Walihun (Nimiyama) MCHP
Sandor Chiefdom||Bangambaya CHP
Sandor Chiefdom||Dunamor CHP
Sandor Chiefdom||Fabandu MCHP
Sandor Chiefdom||Fanema MCHP
Sandor Chiefdom||Fensedu MCHP
Sandor Chiefdom||Gbambiadu MCHP
Sandor Chiefdom||Gbeya MCHP
Sandor Chiefdom||Kayima CHC
Sandor Chiefdom||Kochero MCHP
Sandor Chiefdom||Koima (Sandor) MCHP
Sandor Chiefdom||Kondeya (Sandor) MCHP
Sandor Chiefdom||Mansundu (Sandor) MCHP
Sandor Chiefdom||Samandu MCHP
Sandor Chiefdom||Seidu Sandor MCHP
Sandor Chiefdom||Taiya MCHP
Sandor Chiefdom||Tefeya CHC
Sandor Chiefdom||Tefeya CHP
Sandor Chiefdom||Wordu CHP
Sandor Chiefdom||Yardu CHC
Sandor Chiefdom||Yardu MCHP
Sandor Chiefdom||Yengema Sandor CHP
Sandor Chiefdom||Yormandu CHC
Soa Chiefdom||Bandasuma (Soa) MCHP
Soa Chiefdom||Feuror MCHP
Soa Chiefdom||Foindu Mongor CHP
Soa Chiefdom||Gbamandu MCHP
Soa Chiefdom||Kainkordu CHC
Soa Chiefdom||Kainkordu CHP
Soa Chiefdom||Kamindu MCHP
Soa Chiefdom||Manjama CHC
Soa Chiefdom||Manjama MCHP
Soa Chiefdom||Semendu MCHP
Soa Chiefdom||Sukudu (Soa) MCHP
Tankoro Chiefdom||Adama Marth Memorial CHC
Tankoro Chiefdom||Baiama CHC
Tankoro Chiefdom||Kensay CHP
Tankoro Chiefdom||Kimbadu CHC
Tankoro Chiefdom||Kissi Bona CHP
Tankoro Chiefdom||Koakoyima CHC
Tankoro Chiefdom||Koyadu CHC
Tankoro Chiefdom||Tongoro MCHP
Tankoro Chiefdom||White House Clinic
Tankoro Chiefdom||Woama CHP
Toli Chiefdom||Kondewakoro MCHP
Toli Chiefdom||Kpetema (Toli) MCHP
Bagruwa Chiefdom||Benkeh MCHP
Bagruwa Chiefdom||Kawaya CHP
Bagruwa Chiefdom||Mokassie CHP
Bagruwa Chiefdom||Mosenegor MCHP
Bagruwa Chiefdom||Ngiebu CHC
Bagruwa Chiefdom||Sembehun (Bagruwa) CHC
Bagruwa Chiefdom||Sembehunwo MCHP
Bumpeh Chiefdom||Belletin CHP
Bumpeh Chiefdom||Bumpeh River CHP
Bumpeh Chiefdom||Mende Town MCHP
Bumpeh Chiefdom||Moforay MCHP
Bumpeh Chiefdom||Mokaiyegbeh MCHP
Bumpeh Chiefdom||Mosella CHP
Bumpeh Chiefdom||Motorbong MCHP
Bumpeh Chiefdom||Moyeamoh CHP
Bumpeh Chiefdom||Rotifunk CHC
Bumpeh Chiefdom||Sahun (Bumpeh) MCHP
Bumpeh Chiefdom||Samu CHP
Bumpeh Chiefdom||Seweima MCHP
Bumpeh Chiefdom||UMC Rotifunk Hospital
Bumpeh Chiefdom||Yenkessa MCHP
Dasse Chiefdom||Bambuibu Tommy MCHP
Dasse Chiefdom||Hope Rising CHP
Dasse Chiefdom||Kabaima MCHP
Dasse Chiefdom||Kenema Gbandoma MCHP
Dasse Chiefdom||Laugh Out Loud Clinic
Dasse Chiefdom||Laught Out Loud Clinic
Dasse Chiefdom||Mano (Dasse) CHC
Dasse Chiefdom||Mogbaske CHP
Dasse Chiefdom||Taninihun Kapuima MCHP
Fakunya Chiefdom||Falaba MCHP
Fakunya Chiefdom||Gandorhun (Fakunya) CHC
Fakunya Chiefdom||Mokalley MCHP
Fakunya Chiefdom||Mokorewa MCHP
Fakunya Chiefdom||Moyamba Junction CHC
Fakunya Chiefdom||Moyollo MCHP
Fakunya Chiefdom||Njagbahun (Fakunya) MCHP
Fakunya Chiefdom||Rotawa CHP
Kaiyamba Chiefdom||Gbonjeima MCHP
Kaiyamba Chiefdom||Kangahun CHC
Kaiyamba Chiefdom||Komende (Kaiyamba) MCHP
Kaiyamba Chiefdom||Korgbotuma MCHP
Kaiyamba Chiefdom||Levuma (Kaiyamba) MCHP
Kaiyamba Chiefdom||Moyamba Government Hospital
Kaiyamba Chiefdom||Moyamba Static 1 CHP
Kaiyamba Chiefdom||Moyamba Static 2 CHC
Kaiyamba Chiefdom||Salina CHP
Kaiyamba Chiefdom||Yoyema MCHP
Kamajei Chiefdom||Gondama (Kamajei) CHP
Kamajei Chiefdom||Joyah MCHP
Kamajei Chiefdom||Mogbuama MCHP
Kamajei Chiefdom||Senehun (Kamajei) CHC
Kargboro Chiefdom||Bumpetoke (Kargboro) CHP
Kargboro Chiefdom||Mokaisumana CHP
Kargboro Chiefdom||Mokandoh CHP
Kargboro Chiefdom||Mokobo MCHP
Kargboro Chiefdom||Mokonbetty MCHP
Kargboro Chiefdom||Mopailleh MCHP
Kargboro Chiefdom||Ngeihun (Kargboro) MCHP
Kargboro Chiefdom||Plaintain Island MCHP
Kargboro Chiefdom||Shenge CHC
Kargboro Chiefdom||Yorgbofore CHC
Kargboro Chiefdom||Yorgbofore MCHP
Kargboro Chiefdom||Youndu CHP
Kongbora Chiefdom||Bauya (Kongbora) CHC
Kongbora Chiefdom||Lawana (Kongbora) MCHP
Kongbora Chiefdom||Levuma Nyomeh CHP
Kongbora Chiefdom||Magbenka CHP
Kongbora Chiefdom||Taninihun Mboka MCHP
Kori Chiefdom||Bai Largo MCHP
Kori Chiefdom||Fogbo (Kori) CHP
Kori Chiefdom||Gbuihun MCHP
Kori Chiefdom||Judy Smith CHP
Kori Chiefdom||Juma MCHP
Kori Chiefdom||Konda CHP
Kori Chiefdom||Manjeihun MCHP
Kori Chiefdom||Mosongo MCHP
Kori Chiefdom||Njala (Kori) CHC
Kori Chiefdom||Njala University Hospital
Kori Chiefdom||Taiama (Kori) CHC
Kori Chiefdom||United Methodist Church Taiama CHP
Kori Chiefdom||Waiima (Kori) MCHP
Kowa Chiefdom||Bendu (Kowa) MCHP
Kowa Chiefdom||Mofombo MCHP
Kowa Chiefdom||Njama (Kowa) CHC
Kowa Chiefdom||Tabe MCHP
Lower Banta Chiefdom||Gbangbatoke CHC
Lower Banta Chiefdom||Kanga (Lower Banta) MCHP
Lower Banta Chiefdom||Mokanji CHC
Lower Banta Chiefdom||Mokotawa CHP
Lower Banta Chiefdom||Moriba Town (Lower Banta) CHC
Lower Banta Chiefdom||Moriba Town (Lower Banta) CHP
Lower Banta Chiefdom||Mosenesie Junction CHP
Lower Banta Chiefdom||Njagbahun (Lower Banta) MCHP
Lower Banta Chiefdom||St Mary's Clinic
Ribbi Chiefdom||Bradford CHC
Ribbi Chiefdom||Ferry CHP
Ribbi Chiefdom||Mabang (Ribbi) MCHP
Ribbi Chiefdom||Mogbongisseh MCHP
Ribbi Chiefdom||Mokorbu MCHP
Ribbi Chiefdom||Motoni CHC
Ribbi Chiefdom||Motoni MCHP
Ribbi Chiefdom||Motonkoh MCHP
Ribbi Chiefdom||Rokolor MCHP
Ribbi Chiefdom||Suen CHP
Timdale Chiefdom||Bomotoke CHC
Timdale Chiefdom||Mokaiyamba MCHP
Timdale Chiefdom||Mokpanabom MCHP
Timdale Chiefdom||Mosagbeh MCHP
Timdale Chiefdom||Mosanda CHP
Upper Banta Chiefdom||Children of the Nation Ngolala CHP
Upper Banta Chiefdom||Gondama (Upper Banta) MCHP
Upper Banta Chiefdom||Modonkor CHP
Upper Banta Chiefdom||Mogomgbe MCHP
Upper Banta Chiefdom||Mokelleh CHC
Port Loko City||Arab (Port Loko) Clinic
Port Loko City||Ernest Bai Koroma University (EBK-PL) Clinic
Port Loko City||Port Loko Government Hospital
Port Loko City||Port Loko Under Fives CHP
Bake-Loko Chiefdom||Arab (Bake-Loko) Clinic
Bake-Loko Chiefdom||Ernest Bai Koroma University (EBK-PL) Clinic
Bake-Loko Chiefdom||Gbonkoh Kereneh MCHP
Bake-Loko Chiefdom||Kamaranka Under Fives CHP
Bake-Loko Chiefdom||Malal CHP
Bake-Loko Chiefdom||Sierra Leone Church Maforki CHP
Bureh Chiefdom||Bureh MCHP
Bureh Chiefdom||Kalangba (Bureh) MCHP
Bureh Chiefdom||Mange CHC
Bureh Chiefdom||Masseseh MCHP
Kaffu Bullom Chiefdom||Al-Amin Clinic
Kaffu Bullom Chiefdom||Alimamy Amara Clinic
Kaffu Bullom Chiefdom||Arab (Lungi) Clinic
Kaffu Bullom Chiefdom||Bai Bureh Memorial Hospital
Kaffu Bullom Chiefdom||Conakry Dee CHC
Kaffu Bullom Chiefdom||Direct Aid Orphanage (Port Loko) Clinic
Kaffu Bullom Chiefdom||Evans CHC
Kaffu Bullom Chiefdom||Gbaneh Bana CHP
Kaffu Bullom Chiefdom||Gbaneh Lol MCHP
Kaffu Bullom Chiefdom||Grace Community Clinic
Kaffu Bullom Chiefdom||Kasongha CHP
Kaffu Bullom Chiefdom||Long Life Centre Clinic
Kaffu Bullom Chiefdom||Lungi Airport Centre Clinic
Kaffu Bullom Chiefdom||Lungi Government Hospital
Kaffu Bullom Chiefdom||Lungi Under Fives CHP
Kaffu Bullom Chiefdom||Mahera CHC
Kaffu Bullom Chiefdom||Mamankie MCHP
Kaffu Bullom Chiefdom||Mkamsondo MCHP
Kaffu Bullom Chiefdom||Modia CHC
Kaffu Bullom Chiefdom||Modia General Clinic
Kaffu Bullom Chiefdom||St John of God CHP
Kaffu Bullom Chiefdom||Tagrin CHC
Kaffu Bullom Chiefdom||Yongoro CHC
Kamasondo Chiefdom||Benkia MCHP
Kamasondo Chiefdom||Bundulai MCHP
Kamasondo Chiefdom||Katongha MCHP
Kamasondo Chiefdom||Konta Wallah CHC
Kamasondo Chiefdom||Malap CHP
Kamasondo Chiefdom||Mana 2 CHP
Kamasondo Chiefdom||Mapillah MCHP
Kamasondo Chiefdom||Pepel CHC
Kasseh Chiefdom||Barmoi CHP
Kasseh Chiefdom||Kagbantama CHP
Kasseh Chiefdom||Kawengha MCHP
Kasseh Chiefdom||Rogballan (Kasseh) MCHP
Kasseh Chiefdom||Romeni MCHP
Koya (Port Loko) Chiefdom||Kissy Koya MCHP
Koya (Port Loko) Chiefdom||Komrabai Ngolla CHP
Koya (Port Loko) Chiefdom||Kurankoh CHP
Koya (Port Loko) Chiefdom||M'baimba Adama MCHP
Koya (Port Loko) Chiefdom||Mabora MCHP
Koya (Port Loko) Chiefdom||Magbeni MCHP
Koya (Port Loko) Chiefdom||Makalie MCHP
Koya (Port Loko) Chiefdom||Makarankay CHP
Koya (Port Loko) Chiefdom||Makiteh (Koya) CHP
Koya (Port Loko) Chiefdom||Malenki MCHP
Koya (Port Loko) Chiefdom||Masiaka (Koya) CHC
Koya (Port Loko) Chiefdom||Masumana CHP
Koya (Port Loko) Chiefdom||Mawoma MCHP
Koya (Port Loko) Chiefdom||Mile 38 CHC
Koya (Port Loko) Chiefdom||Rofoindu CHP
Koya (Port Loko) Chiefdom||Rokon MCHP
Koya (Port Loko) Chiefdom||Sumbuya (Koya) CHP
Koya (Port Loko) Chiefdom||Warima (Koya) MCHP
Lokomasama Chiefdom||Babara CHC
Lokomasama Chiefdom||Bailor CHP
Lokomasama Chiefdom||Gbainty Wallah CHP
Lokomasama Chiefdom||Kalangba (Lokomasama) MCHP
Lokomasama Chiefdom||Kargbulor CHP
Lokomasama Chiefdom||Love Bridge Hospital
Lokomasama Chiefdom||Masulamani CHP
Lokomasama Chiefdom||Mathen MCHP
Lokomasama Chiefdom||Menika CHP
Lokomasama Chiefdom||Musaia (Lokomasama) CHP
Lokomasama Chiefdom||Petifu Junction CHC
Maconteh Chiefdom||Mabain MCHP
Maconteh Chiefdom||Minthomore CHP
Maforki Chiefdom||Mabonie CHP
Maforki Chiefdom||Mafoimara CHP
Maforki Chiefdom||Maforay (Maforki) MCHP
Maforki Chiefdom||Magbengbenra MCHP
Maforki Chiefdom||Makaba MCHP
Maforki Chiefdom||Mapawn MCHP
Maforki Chiefdom||Maronko MCHP
Maforki Chiefdom||New Maforki CHP
Maforki Chiefdom||Petifu (Maforki) MCHP
Maforki Chiefdom||Rogbere Junction CHC
Makama Chiefdom||Kambia Makama CHP
Makama Chiefdom||Malekuray CHC
Marampa Chiefdom||Arab (Lunsar) Clinic
Marampa Chiefdom||Baptist Eye Hospital
Marampa Chiefdom||Lunsar CHC
Marampa Chiefdom||Magbele MCHP
Marampa Chiefdom||Magbill CHP
Marampa Chiefdom||Makabo MCHP
Marampa Chiefdom||Mamusa MCHP
Marampa Chiefdom||Mange Acre CHC
Marampa Chiefdom||Pincer's Lunsar Clinic
Marampa Chiefdom||Poor Man's Clinic
Marampa Chiefdom||Rolembray MCHP
Marampa Chiefdom||St John of God Hospital
Marampa Chiefdom||St John of God Under Fives Clinic
Masimera Chiefdom||Katick CHP
Masimera Chiefdom||Konta Line CHC
Masimera Chiefdom||Mamaligie MCHP
Masimera Chiefdom||Masimera CHC
Masimera Chiefdom||Mathineh CHP
Masimera Chiefdom||Mayola Lal Ratun MCHP
Masimera Chiefdom||Mayombo MCHP
Masimera Chiefdom||Nonkoba CHP
Masimera Chiefdom||Rokassa CHC
Masimera Chiefdom||Rokel (Masimera) MCHP
Masimera Chiefdom||Rotheren MCHP
Masimera Chiefdom||Rothuma MCHP
Masimera Chiefdom||Royeiben CHP
Tainkatopa Chiefdom||Asheea MCHP
Tainkatopa Chiefdom||Robaka MCHP
Tainkatopa Chiefdom||Rogbaneh MCHP
Barri Chiefdom||Bandasuma (Barri) CHC
Barri Chiefdom||Jeoma Barri MCHP
Barri Chiefdom||Konia (Barri) MCHP
Barri Chiefdom||Kundorwahun CHP
Barri Chiefdom||Njaluahun (Barri) CHP
Barri Chiefdom||Potoru CHC
Barri Chiefdom||Saahun (Barri) MCHP
Barri Chiefdom||Tambeiyama MCHP
Barri Chiefdom||Taninahun (Barri) MCHP
Barri Chiefdom||Vaama (Barri) CHP
Barri Chiefdom||Waiima (Barri) MCHP
Galliness Chiefdom||Bandama (Galliness) MCHP
Galliness Chiefdom||Blama Massaquoi CHC
Galliness Chiefdom||Fonikoh MCHP
Galliness Chiefdom||Funyehun CHP
Galliness Chiefdom||Kpetema (Galliness) MCHP
Galliness Chiefdom||Kpowubu MCHP
Galliness Chiefdom||Makorma CHP
Kabonde Chiefdom||Pehala CHC
Kpaka Chiefdom||Liya MCHP
Kpaka Chiefdom||Massam CHC
Kpaka Chiefdom||Saahun (Kpaka) MCHP
Kpaka Chiefdom||Semabu (Kpaka) MCHP
Kpaka Chiefdom||Sumbuya Bessima CHP
Kpanga Chiefdom||Basalleh MCHP
Kpanga Chiefdom||Blama Puilla MCHP
Kpanga Chiefdom||Bomu Samba MCHP
Kpanga Chiefdom||Dandabu CHP
Kpanga Chiefdom||Gbondapi CHC
Kpanga Chiefdom||Gibina MCHP
Kpanga Chiefdom||Mandeima MCHP
Kpanga Chiefdom||Pujehun Government Hospital
Kpanga Chiefdom||Pujehun Static CHC
Kpanga Chiefdom||Salima Samba MCHP
Kpanga Chiefdom||Sawula MCHP
Kpanga Chiefdom||Sorbeh Grima MCHP
Kpanga Chiefdom||Taninahun Makemuma MCHP
Kpanga Chiefdom||Tongay MCHP
Kpanga Chiefdom||Vawahun Kayimba MCHP
Kpanga Krim Chiefdom||Bayama MCHP
Kpanga Krim Chiefdom||Borborbu MCHP
Kpanga Krim Chiefdom||Gobaru CHC
Kpanga Krim Chiefdom||Vaama (Kpanga Krim) MCHP
Makpele Chiefdom||Dumagbe MCHP
Makpele Chiefdom||Gbaa (Makpele) CHP
Makpele Chiefdom||Gbahama (Makpele) MCHP
Makpele Chiefdom||Gissiwolo MCHP
Makpele Chiefdom||Gofor CHP
Makpele Chiefdom||Ndombu MCHP
Makpele Chiefdom||Pewa MCHP
Makpele Chiefdom||Zimmi CHC
Malen Chiefdom||Bendu (Malen) MCHP
Malen Chiefdom||Hongai CHP
Malen Chiefdom||Jao (Malen) MCHP
Malen Chiefdom||Ngandorhun MCHP
Malen Chiefdom||Nianyahun MCHP
Malen Chiefdom||Nyandehun (Malen) MCHP
Malen Chiefdom||Sahn (Malen) CHC
Malen Chiefdom||Sengema (Malen) CHP
Malen Chiefdom||Taninahun (Malen) CHP
Mano Sakrim Chiefdom||Bengani MCHP
Mano Sakrim Chiefdom||Gombu MCHP
Mano Sakrim Chiefdom||Kassay MCHP
Mano Sakrim Chiefdom||Mano Gbongema CHC
Mano Sakrim Chiefdom||Mende MSK MCHP
Mano Sakrim Chiefdom||Nyandehun (Mano Sakrim) MCHP
Mano Sakrim Chiefdom||Senbengu MCHP
Peje Chiefdom||Bongay MCHP
Peje Chiefdom||Bumbeh MCHP
Peje Chiefdom||Futa Pejeh CHC
Peje Chiefdom||Helebu Pejeh MCHP
Peje Chiefdom||Pejewa (Futa Peje) MCHP
Perri Chiefdom||Blama Perri MCHP
Perri Chiefdom||Bomi MCHP
Perri Chiefdom||Bumpeh (Perri) CHC
Perri Chiefdom||Falaba CHP
Perri Chiefdom||Kowama (Perri) MCHP
Perri Chiefdom||Ngajubaoma/Missibu MCHP
Perri Chiefdom||Saama Perri MCHP
Soro Gbeima Chiefdom||Fairo CHC
Soro Gbeima Chiefdom||Fanima (Soro) CHP
Soro Gbeima Chiefdom||Futa Golawoma MCHP
Soro Gbeima Chiefdom||Gondama Massaquoi MCHP
Soro Gbeima Chiefdom||Jendema CHC
Soro Gbeima Chiefdom||Koijeh MCHP
Soro Gbeima Chiefdom||Malema 1 MCHP
Soro Gbeima Chiefdom||Malema 2 MCHP
Soro Gbeima Chiefdom||Navai MCHP
Soro Gbeima Chiefdom||Sengama Soro MCHP
Soro Gbeima Chiefdom||Sulima CHP
Soro Gbeima Chiefdom||Tindor MCHP
Soro Gbeima Chiefdom||Wai MCHP
Sowa Chiefdom||Bandajuma Sowa CHC
Sowa Chiefdom||Geoma Jarjoh CHP
Sowa Chiefdom||Lower Komende MCHP
Sowa Chiefdom||Upper Komende MCHP
Sowa Chiefdom||Vaawahun Sowa MCHP
Yakemoh Kpukumu Krim Chiefdom||Bangorma MCHP
Yakemoh Kpukumu Krim Chiefdom||Borma (Yakemu Kpukumu) MCHP
Yakemoh Kpukumu Krim Chiefdom||Karlu CHC
Yakemoh Kpukumu Krim Chiefdom||Kombeima MCHP
Yakemoh Kpukumu Krim Chiefdom||Kombopi MCHP
Yakemoh Kpukumu Krim Chiefdom||Messima MCHP
Yakemoh Kpukumu Krim Chiefdom||Saama Sowunde MCHP
Dansogoia Chiefdom||Bassaia MCHP
Dansogoia Chiefdom||Bumbuna CHC
Dansogoia Chiefdom||Kemedugu MCHP
Dansogoia Chiefdom||New Ferengbeya CHP
Gbokolenken Masankong Chiefdom||Mansumana CHP
Gbokolenken Masankong Chiefdom||Warrima (Gbonkolenken) MCHP
Gbokolenken Mayeppoh Chiefdom||Makonkorie CHP
Gbokolenken Mayeppoh Chiefdom||Mayepoh CHC
Gbokolenken Mayeppoh Chiefdom||Mayepoh CHP
Gbokolenken Mayeppoh Chiefdom||Petifu Mayepoh MCHP
Gbokolenken Polie Chiefdom||Mabankra MCHP
Gbokolenken Polie Chiefdom||Mabarr Polie MCHP
Gbokolenken Polie Chiefdom||Magbolu Ferry MCHP
Gbokolenken Polie Chiefdom||Maraka MCHP
Gbokolenken Polie Chiefdom||Mathamp MCHP
Gbokolenken Yele Chiefdom||Lion Heart Hospital
Gbokolenken Yele Chiefdom||Mafay MCHP
Gbokolenken Yele Chiefdom||Manowo CHC
Gbokolenken Yele Chiefdom||Yeben MCHP
Gbokolenken Yele Chiefdom||Yele CHC
Kafe Chiefdom||Kamarugu MCHP
Kafe Chiefdom||Masumbrie CHC
Kalantuba Chiefdom||Kamasaypana MCHP
Kalantuba Chiefdom||Kathombo MCHP
Kholifa Mabang Chiefdom||Komrabai Station MCHP
Kholifa Mabang Chiefdom||Mabai (Kholifa Mabang) MCHP
Kholifa Mabang Chiefdom||Mabang (Kholifa Mabang) CHC
Kholifa Mabang Chiefdom||Mamanso Kafla MCHP
Kholifa Mabang Chiefdom||Marunia MCHP
Kholifa Mabang Chiefdom||Mathinkalol MCHP
Kholifa Mamuntha Chiefdom||Maborie MCHP
Kholifa Mamuntha Chiefdom||Magbass CHP
Kholifa Mamuntha Chiefdom||Mamuntha MCHP
Kholifa Mamuntha Chiefdom||Masagbill MCHP
Kholifa Mamuntha Chiefdom||Masoko MCHP
Kholifa Mamuntha Chiefdom||Mayossoh MCHP
Kholifa Rowalla Chiefdom||Alim MCHP
Kholifa Rowalla Chiefdom||Family (Magburaka) Clinic
Kholifa Rowalla Chiefdom||Mabai (Kholifa Rowalla) MCHP
Kholifa Rowalla Chiefdom||Mabom CHC
Kholifa Rowalla Chiefdom||Magburaka Government Hospital
Kholifa Rowalla Chiefdom||Magburaka Under Fives Clinic
Kholifa Rowalla Chiefdom||Malone MCHP
Kholifa Rowalla Chiefdom||Masanga Hospital
Kholifa Rowalla Chiefdom||Masanga MCHP
Kunike Barina Chiefdom||Makali CHC
Kunike Barina Chiefdom||Makoni Line MCHP
Kunike Barina Chiefdom||Mapamurie MCHP
Kunike Barina Chiefdom||Massaba MCHP
Kunike Barina Chiefdom||Wonkibor MCHP
Kunike Fulawusu Chiefdom||Fothaneh Bana MCHP
Kunike Fulawusu Chiefdom||Mafulka MCHP
Kunike Fulawusu Chiefdom||Magbanabom MCHP
Kunike Fulawusu Chiefdom||Magbanto Bana MCHP
Kunike Fulawusu Chiefdom||Mamanso Sanka CHP
Kunike Fulawusu Chiefdom||Petifu Mandugu MCHP
Kunike Sanda Chiefdom||Fothaneh Junction MCHP
Kunike Sanda Chiefdom||Kamanthor MCHP
Kunike Sanda Chiefdom||Mabineh MCHP
Kunike Sanda Chiefdom||Maconteh Tama MCHP
Kunike Sanda Chiefdom||Masiaka (Kunike Sanda) MCHP
Kunike Sanda Chiefdom||Masingbi CHC
Kunike Sanda Chiefdom||Matholey MCHP
Kunike Sanda Chiefdom||Petifuline CHP
Malal Chiefdom||Makoba Bana MCHP
Malal Chiefdom||Robina CHP
Malal Chiefdom||Rochen Malal CHP
Sambaya Bendugu Chiefdom||Bendugu CHC
Sambaya Bendugu Chiefdom||Dankawalia CHP
Sambaya Bendugu Chiefdom||Kholifaga MCHP
Sambaya Bendugu Chiefdom||Kunya CHP
Sambaya Bendugu Chiefdom||Ninkikoro MCHP
Simiria Chiefdom||Mabontor CHC
Simiria Chiefdom||Mabontor CHP
Simiria Chiefdom||Makonthanday MCHP
Simiria Chiefdom||Masumbrie CHC
Simiria Chiefdom||Mayassoh MCHP
Tane Chiefdom||Makelleh MCHP
Tane Chiefdom||Makona MCHP
Tane Chiefdom||Makrugbeh CHP
Tane Chiefdom||Mananthelie MCHP
Tane Chiefdom||Mangaybana MCHP
Tane Chiefdom||Masankoro MCHP
Tane Chiefdom||Mathonkara MCHP
Tane Chiefdom||Mathufulie MCHP
Tane Chiefdom||Matotoka CHC
Tane Chiefdom||Rosengbeh MCHP
Yoni Mabanta Chiefdom||Bakeloko CHP
Yoni Mabanta Chiefdom||Bath Bana MCHP
Yoni Mabanta Chiefdom||Magbaesa MCHP
Yoni Mabanta Chiefdom||Magbaft MCHP
Yoni Mabanta Chiefdom||Magbassabana MCHP
Yoni Mabanta Chiefdom||Magbosie MCHP
Yoni Mabanta Chiefdom||Makeni-Rokfullah MCHP
Yoni Mabanta Chiefdom||Makundu MCHP
Yoni Mabanta Chiefdom||Matawa MCHP
Yoni Mabanta Chiefdom||Petifu Fulamasa CHP
Yoni Mabanta Chiefdom||Robarie MCHP
Yoni Mabanta Chiefdom||Ronietta MCHP
Yoni Mabanta Chiefdom||Rorocks CHC
Yoni Mamala Chiefdom||Ahmadiyya Muslim (Yoni Mamala) Hospital
Yoni Mamala Chiefdom||Bonkababay CHP
Yoni Mamala Chiefdom||Community Health Foundation (Mile 91) Hospital
Yoni Mamala Chiefdom||Foindu (Yoni Mamala) MCHP
Yoni Mamala Chiefdom||Hinistas CHC
Yoni Mamala Chiefdom||Kumrabai Yoni CHP
Yoni Mamala Chiefdom||Macrogba CHP
Yoni Mamala Chiefdom||Magboki Road Mile 91 CHP
Yoni Mamala Chiefdom||Magbosie MCHP
Yoni Mamala Chiefdom||Makelleh CHP
Yoni Mamala Chiefdom||Mamaka (Yoni Mamala) MCHP
Yoni Mamala Chiefdom||Mananie MCHP
Yoni Mamala Chiefdom||Masengbeh CHP
Yoni Mamala Chiefdom||Maseperr MCHP
Yoni Mamala Chiefdom||Mathoir CHC
Yoni Mamala Chiefdom||Mayorgbor MCHP
Yoni Mamala Chiefdom||Our Lady of Guadalupe Clinic
Yoni Mamala Chiefdom||Rochen Kamandao CHP
Yoni Mamala Chiefdom||Rokimbi MCHP
Yoni Mamala Chiefdom||United Methodist Church Yonibana CHC
Yoni Mamala Chiefdom||Yonibana MCHP
Yoni Mamala Chiefdom||Yonibana Sai Hospital
Koya Rural Zone||Christ the King Clinic
Koya Rural Zone||Crossing MCHP
Koya Rural Zone||Don Bosco Fambul Clinic
Koya Rural Zone||Fogbo (Koya Rural) MCHP
Koya Rural Zone||Madaka MCHP
Koya Rural Zone||Makobeh MCHP
Koya Rural Zone||Makonkonday MCHP
Koya Rural Zone||Malambay CHP
Koya Rural Zone||Masorie CHP
Koya Rural Zone||MedZain MCHP
Koya Rural Zone||Monsignor Daniel Sullivan Health Clinic
Koya Rural Zone||Newton CHC
Koya Rural Zone||Songo CHC
Mountain Rural Zone||Charlotte CHP
Mountain Rural Zone||Fourah Bay College CHC
Mountain Rural Zone||Gloucester CHP
Mountain Rural Zone||Leicester (Mountain Rural) CHP
Mountain Rural Zone||Regent (Mountain Rural) CHC
Waterloo Rural Zone||ADRA Mobile Clinic
Waterloo Rural Zone||Adra Hospital
Waterloo Rural Zone||African Christian Fellowship (ACF) Clinic
Waterloo Rural Zone||Afro Arab Clinic
Waterloo Rural Zone||Arab (Waterloo) Clinic
Waterloo Rural Zone||Benguema Grassfield MCHP
Waterloo Rural Zone||Benguema Military (MI Room) Clinic
Waterloo Rural Zone||Biola Wright Memorial Clinic
Waterloo Rural Zone||Borah Maternity Clinic
Waterloo Rural Zone||Brown Memorial Clinic
Waterloo Rural Zone||Campbell Town CHP
Waterloo Rural Zone||Cashew Farm MCHP
Waterloo Rural Zone||Christ the King Clinic
Waterloo Rural Zone||Deep Eye Water MCHP
Waterloo Rural Zone||El-Shaddai (Waterloo Rural) Clinic
Waterloo Rural Zone||Evangelical College of Theology Clinic
Waterloo Rural Zone||Freetown Teachers College Clinic
Waterloo Rural Zone||Gift of Life Clinic
Waterloo Rural Zone||Grafton CHC
Waterloo Rural Zone||Hastings CHC
Waterloo Rural Zone||Heart and Hands Care Clinic
Waterloo Rural Zone||Jays Clinic
Waterloo Rural Zone||John Thorpe MCHP
Waterloo Rural Zone||Jui Police (MI Room) Clinic
Waterloo Rural Zone||Kissy Town CHP
Waterloo Rural Zone||Lumpa CHP
Waterloo Rural Zone||Mabureh CHP
Waterloo Rural Zone||MacDonald MCHP
Waterloo Rural Zone||Maila Clinic
Waterloo Rural Zone||Mapac Grafton Clinic
Waterloo Rural Zone||Margaret and Johnny MCHP
Waterloo Rural Zone||Mariama Hassan Hospital
Waterloo Rural Zone||Matainkay and Masantigie MCHP
Waterloo Rural Zone||MedZain MCHP
Waterloo Rural Zone||Monsignor Daniel Sullivan Health Clinic
Waterloo Rural Zone||New London MCHP
Waterloo Rural Zone||Rogbangba MCHP
Waterloo Rural Zone||Rokel (Waterloo Rural) CHP
Waterloo Rural Zone||Rokel Arab (Waterloo) Clinic
Waterloo Rural Zone||SWAKAB (Waterloo) Clinic
Waterloo Rural Zone||Salifu Kondeh Clinic
Waterloo Rural Zone||Sierra Leone-China Teaching Hospital
Waterloo Rural Zone||TECT Jui CHP
Waterloo Rural Zone||Waterloo CHC
Waterloo Rural Zone||Waterloo People's Clinic
Waterloo Rural Zone||Waterloo Rural Community Hospital
Waterloo Rural Zone||White Stone MCHP
Waterloo Rural Zone||Women in National Development AAPDEP Clinic
Waterloo Rural Zone||Yams Farm CHP
York Rural Zone||Adonkia CHP
York Rural Zone||Banana Island MCHP
York Rural Zone||Bethlehem Clinic
York Rural Zone||Emergency (Goderich) Hospital
York Rural Zone||Friends of God Clinic
York Rural Zone||Goderich CHC
York Rural Zone||Goderich Military (MI Room) Clinic
York Rural Zone||Hamilton MCHP
York Rural Zone||Kent CHP
York Rural Zone||Lakka Government Hospital
York Rural Zone||Lakka/Ogoo Farm CHC
York Rural Zone||Lion for Lion Clinic
York Rural Zone||Mambo CHP
York Rural Zone||Metchen MCHP
York Rural Zone||Milton Margai College (MMCET) Clinic
York Rural Zone||Mutual Faith Clinic
York Rural Zone||Sussex MCHP
York Rural Zone||Tissana (York Rural) MCHP
York Rural Zone||Tokeh MCHP
York Rural Zone||Tombo (York Rural) CHC
York Rural Zone||York CHC
Central 1 Zone||Abernita Hospital
Central 1 Zone||Blessed Mokaba Central CHP
Central 1 Zone||Bojojo Clinic
Central 1 Zone||Don Bosco Fambul Clinic
Central 1 Zone||Dr A Edwin Clinic
Central 1 Zone||Dr Abdulai Jalloh Clinic
Central 1 Zone||Dr Donald Harding Clinic
Central 1 Zone||Dr Dunstan Thomas Clinic
Central 1 Zone||Dr Finda Ngongor Clinic
Central 1 Zone||Dr Hassan Hariri Clinic
Central 1 Zone||Farm Care Clinic
Central 1 Zone||Macauley Street Government Hospital
Central 1 Zone||Marina House Birth Centre Clinic
Central 1 Zone||Parliament CHC
Central 1 Zone||Susan's Bay CHC
Central 1 Zone||Takish Clinic
Central 1 Zone||Women Health Centre Clinic
Central 2 Zone||Central 2 Medical Clinic
Central 2 Zone||Connaught Chest Clinic
Central 2 Zone||Connaught Hospital
Central 2 Zone||Dr ADO Wright Clinic
Central 2 Zone||Dr Asale Ganda Clinic
Central 2 Zone||Dr Daniel Bash Taqi Clinic
Central 2 Zone||Dr Effie Gooding Clinic
Central 2 Zone||Dr Frazer Whitfield Clinic
Central 2 Zone||Dr Isatou Hyde-Forster Clinic
Central 2 Zone||Dr J Russel Clinic
Central 2 Zone||Dr Kelvin Nicolls Clinic
Central 2 Zone||Dr Len-Gordon Harris Clinic
Central 2 Zone||Dr Patrick Coker Clinic
Central 2 Zone||Dr Shuman Medical Clinic and Laboratory
Central 2 Zone||Dr Taquis Clinic
Central 2 Zone||Dr VR Willoughby Clinic
Central 2 Zone||Dr Victor Willoughby Memorial Hospital
Central 2 Zone||Khadijah Clinic
Central 2 Zone||Kroo Bay CHC
Central 2 Zone||Liverpool Street (Jimmy Pratt) Clinic
Central 2 Zone||Mano River Countries Clinic
Central 2 Zone||NASSIT Mobile Clinic
Central 2 Zone||Pikin Welbodi Centre Clinic
Central 2 Zone||Prime Care Clinic
Central 2 Zone||Red Cross (Pultney Street) Clinic
Central 2 Zone||Shuman (Kroo Bay) Hospital
Central 2 Zone||Sing Song Hospital
Central 2 Zone||St Mary's Immaculate Hospital
Central 2 Zone||West End Clinic
East 1 Zone||Arab (Ferry Junction) Clinic
East 1 Zone||China Friendship Clinic
East 1 Zone||Fourah Bay Community MCHP
East 1 Zone||Guoji (Cline Town) Clinic
East 1 Zone||Happy Kid and Adolescence (East 1 Zone) Clinic
East 1 Zone||Jenner Wright Clinic
East 1 Zone||Kargbo Dockyard CHP
East 1 Zone||Mabella CHC
East 1 Zone||Mayorba Hospital
East 1 Zone||Ola During Children's Hospital
East 1 Zone||Ola During Under Fives CHP
East 1 Zone||Princess Christian Maternity Hospital
East 1 Zone||Principal Medical Office (Cline Town) CHP
East 1 Zone||Ross Road CHC
East 1 Zone||Sierra Leone Port Authority Clinic
East 1 Zone||Thullahs Community Health Clinic
East 2 Zone||Arab (Shad) Clinic
East 2 Zone||Better Health Clinic
East 2 Zone||Coconut Farm MCHP
East 2 Zone||Dr Songo Williams Clinic
East 2 Zone||Ginger Hall CHC
East 2 Zone||Julipha Ashobie Corner MCHP
East 2 Zone||Mabella CHC
East 2 Zone||New Harvest Clinic
East 2 Zone||Quarry MCHP
East 3 Zone||AWAKE CHP
East 3 Zone||Ad-Bangs Quarry MCHP
East 3 Zone||Ahmadiyya Muslim (Calaba Town) Hospital
East 3 Zone||Al-Khatab CHC
East 3 Zone||Allen Town CHC
East 3 Zone||Approved School CHC
East 3 Zone||Arab (Calaba Town) Clinic
East 3 Zone||Arab (Shell) Clinic
East 3 Zone||Blessed Mokaba East Clinic
East 3 Zone||Calaba Town CHC
East 3 Zone||Edemsil Hospital
East 3 Zone||Egyptian (Calaba Town) Clinic
East 3 Zone||Egyptian (Shell) Clinic
East 3 Zone||Esther Faith Healing Clinic
East 3 Zone||Evangelical Lutheran Clinic
East 3 Zone||Faith Community Clinic
East 3 Zone||Family Home Movement CHP
East 3 Zone||Gbaneh Hospital
East 3 Zone||Haja Neneh CHC
East 3 Zone||Hamdalaye Mission Clinic
East 3 Zone||Holy Mary Clinic
East 3 Zone||Iscon CHP
East 3 Zone||Kamba of Charity Clinic
East 3 Zone||Kissy CHC
East 3 Zone||Kissy Dockyard Missionary Clinic
East 3 Zone||Kola Tree MCHP
East 3 Zone||Konikay Clinic
East 3 Zone||Koya Town CHC
East 3 Zone||Kuntorloh CHP
East 3 Zone||Life Care (Kissy) Hospital
East 3 Zone||Looking Town MCHP
East 3 Zone||Lowell and Ruth Gess UMC Eye Hospital
East 3 Zone||Madina (East 3) CHC
East 3 Zone||Marie Stopes (Kissy) Clinic
East 3 Zone||Mayemi MCHP
East 3 Zone||Methodist Church Sierra Leone Clinic
East 3 Zone||Moyiba CHC
East 3 Zone||Orugu MCHP
East 3 Zone||Philip Street Clinic
East 3 Zone||Rokupa Government Hospital
East 3 Zone||Rokupa Under Fives CHP
East 3 Zone||SLIMS Clinic
East 3 Zone||Shuman (Kissy) Hospital
East 3 Zone||Sierra Leone Psychiatric Hospital
East 3 Zone||St Joseph's CHC
East 3 Zone||St Luke's Wellington Clinic
East 3 Zone||Tasley Global Clinic
East 3 Zone||Tassoh MCHP
East 3 Zone||Thunder Hill MCHP
East 3 Zone||UPAL MCHP
East 3 Zone||United Methodist Church PLHA Kissy Clinic
East 3 Zone||United Methodist Church Urban Centre Hospital
East 3 Zone||Up-Wata CHP
East 3 Zone||Wellington CHC
East 3 Zone||Wesleyan Health Clinic
West 1 Zone||Affordable Health Clinic
West 1 Zone||Childrens Day Clinic
West 1 Zone||Cupid Health Centre Clinic
West 1 Zone||Day Krim Clinic
West 1 Zone||Dr Claudius Cole Clinic
West 1 Zone||God Grace Clinic
West 1 Zone||Grey Bush CHC
West 1 Zone||Kingtom Police Hospital
West 1 Zone||Kingtom Police Under Fives CHP
West 1 Zone||Marie Stopes (Waterloo Street) Clinic
West 1 Zone||Methodist Community Health Clinic
West 1 Zone||Rejanic Clinic
West 1 Zone||St Anthony's CHC
West 2 Zone||AMI Expeditionary Healthcare Clinic
West 2 Zone||Al-Farouk Clinic
West 2 Zone||Arab (Dwarzak) Clinic
West 2 Zone||Blue Shield Hospital
West 2 Zone||Dr Daniel Bash Taqi Clinic
West 2 Zone||EPI Headquarter (New England) CHP
West 2 Zone||EcoMed Medical Centre Clinic
West 2 Zone||George Brook CHC
West 2 Zone||Grey Bush CHC
West 2 Zone||Hope and New Life Clinic
West 2 Zone||Kingharman Road Hospital
West 2 Zone||Kingharman Road Under Fives CHP
West 2 Zone||Methodist Community Health Clinic
West 2 Zone||Mubarak Clinic
West 2 Zone||NACTIB New Life Hospital
West 2 Zone||New England CHP
West 2 Zone||PPASL Clinic
West 2 Zone||Pademba Correctional Hospital
West 2 Zone||Redeemer Health Clinic
West 2 Zone||Rina Clinic
West 2 Zone||St John Clinic and Nursing Home
West 2 Zone||Treasure Health Hospital
West 3 Zone||AIDS Health Foundation (AHF) Clinic
West 3 Zone||Aberdeen Women Centre Hospital
West 3 Zone||Al-Sheefa Arab Clinic
West 3 Zone||Arab (Malama) Clinic
West 3 Zone||Cheaper Land Clinic
West 3 Zone||Choithrams Memorial Hospital
West 3 Zone||Christ Healing Center And Community College Clinic
West 3 Zone||Christ Healing Centre and Community College Clinic
West 3 Zone||Davidson Nicol Medical Centre Hospital
West 3 Zone||Dr DJO Robin-Coker Clinic
West 3 Zone||Family CHP
West 3 Zone||Good Shepherd Hospital
West 3 Zone||Healing Clinic
West 3 Zone||Healthy Step Paediatric Clinic
West 3 Zone||Hill Station CHP
West 3 Zone||Iranian Red Crescent Clinic
West 3 Zone||Juba Military (MI Room) CHP
West 3 Zone||Life Care (Lumley) Hospital
West 3 Zone||Lumley Government Hospital
West 3 Zone||Lumley Under Fives CHP
West 3 Zone||Malama MCHP
West 3 Zone||Marie Stopes (Aberdeen Rd) Clinic
West 3 Zone||Marie Stopes (Ahmed Drive) Clinic
West 3 Zone||Marie Stopes (Ahmed Drive) EPI Clinic
West 3 Zone||Mariposa Hospital
West 3 Zone||Mercy Ships (Aberdeen Fistula Centre) Clinic
West 3 Zone||Murray Town (MI Room) CHP
West 3 Zone||Murray Town CHC
West 3 Zone||No 9 Community Clinic
West 3 Zone||PAYCY's Clinic
West 3 Zone||Pentagon CHP
West 3 Zone||Samaritan Hospital
West 3 Zone||Satu's Clinic
West 3 Zone||Scan Drive MCHP
West 3 Zone||Sea Coach Aberdeen CHC
West 3 Zone||Signal Hill MCHP
West 3 Zone||St Mark Evangelical Lutheran Health Centre Clinic
West 3 Zone||Stella Maris Clinic
West 3 Zone||Sunshine MCHP
West 3 Zone||Thompson Bay MCHP
West 3 Zone||UN Joint Medical Services Clinic
West 3 Zone||Well Woman Clinic
West 3 Zone||Wellness (West 3) Clinic
West 3 Zone||Wilberforce 34 Military Hospital
West 3 Zone||Wilberforce CHC`;
