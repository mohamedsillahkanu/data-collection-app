// ============================================
// COMPLETE DATA COLLECTION & SUMMARY CONFIGURATION
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqhplQAEn3Xp_TKqzTddtvTAicoEu_4ltq5C4iR7LNIElN18exltV1-t12RjiQcvLx/exec';
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_3jdmPYJMJ7DzKpJqR33t5RwdsRRJ9PbUUUjd9k9zfI/edit?gid=0#gid=0';
const LOGIN_USERNAME = 'admin';
const LOGIN_PASSWORD = 'admin';

// ============================================
// SHEET NAMES
// ============================================
const SHEET_NAMES = {
    UNDER_FIVE: 'UNDER_FIVE_REGISTER',
    GENERAL: 'GENERAL_REGISTER',
    SUMMARY: 'HF01_SUMMARY',
    CASCADING: 'CASCADING_DATA'
};

// ============================================
// DATA COLLECTION FORMS
// ============================================
const VARIABLE_SECTIONS = {
    'Location & Time': {
        description: 'Basic facility and reporting information',
        fields: {
            region: { label: 'Region', type: 'cascading', level: 1 },
            district: { label: 'District', type: 'cascading', level: 2 },
            chiefdom: { label: 'Chiefdom', type: 'cascading', level: 3 },
            facility: { label: 'Health Facility', type: 'cascading', level: 4 },
            report_month: { label: 'Report Month', type: 'select', options: ['January','February','March','April','May','June','July','August','September','October','November','December'] },
            report_year: { label: 'Report Year', type: 'number' }
        }
    },
    'UNDER_FIVE': {
        'General Information': {
            description: 'Patient basic information',
            fields: {
                reg_no: { label: 'Registration Number', type: 'text', summary_field: null },
                date_visit: { label: 'Date of Visit', type: 'date', summary_field: null },
                date_onset: { label: 'Date of Onset', type: 'date', summary_field: null },
                child_name: { label: 'Name of Child', type: 'text', summary_field: null },
                age_group: { label: 'Age Group', type: 'select', options: ['<1 Month', '1-5 Months', '6-11 Months', '12-23 Months', '24-59 Months'], summary_mapping: 'age_classification' },
                sex: { label: 'Sex', type: 'select', options: ['Male', 'Female'], summary_mapping: 'sex_disaggregation' },
                address: { label: 'Address', type: 'text', summary_field: null },
                disability: { label: 'Disability', type: 'yesno', summary_field: 'disabled_patient_total' },
                evd_survivor: { label: 'EVD Survivor', type: 'yesno', summary_field: 'evd_survivor_total' }
            }
        },
        'Nutrition Screening': {
            description: 'Nutritional assessment and interventions',
            fields: {
                height_cm: { label: 'Height (cm)', type: 'number', summary_field: null },
                weight_kg: { label: 'Weight (kg)', type: 'number', summary_field: null },
                muac_cm: { label: 'MUAC (cm)', type: 'number', summary_field: null },
                bilateral_oedema: { label: 'Bilateral Oedema', type: 'select', options: ['0', '+', '++', '+++'], summary_field: null },
                vitamin_a_6_11m: { label: 'Vitamin A (6-11 months)', type: 'yesno', summary_field: null },
                vitamin_a_12_59m: { label: 'Vitamin A (12-59 months)', type: 'yesno', summary_field: null },
                deworming_12_23m: { label: 'Deworming (12-23 months)', type: 'yesno', summary_field: null },
                deworming_24_59m: { label: 'Deworming (24-59 months)', type: 'yesno', summary_field: null },
                early_breastfeeding: { label: 'Early Initiation of Breastfeeding', type: 'yesno', summary_field: null },
                exclusive_breastfeeding: { label: 'Exclusive Breastfeeding (0-5 months)', type: 'yesno', summary_field: null },
                continued_breastfeeding: { label: 'Continued Breastfeeding (6-23 months)', type: 'yesno', summary_field: null },
                type_of_visit: { label: 'Type of Visit', type: 'select', options: ['New', 'Follow-up'], summary_mapping: 'visit_type' }
            }
        },
        'Malaria': {
            description: 'Malaria testing and treatment',
            fields: {
                fever_suspected_malaria: { label: 'Fever Case (Suspected Malaria)', type: 'yesno', summary_field: 'fever_suspected' },
                rdt_positive: { label: 'RDT Test - Positive', type: 'yesno', summary_field: 'rdt_positive' },
                rdt_negative: { label: 'RDT Test - Negative', type: 'yesno', summary_field: 'rdt_negative' },
                microscopy_positive: { label: 'Microscopy - Positive', type: 'yesno', summary_field: 'microscopy_positive' },
                microscopy_negative: { label: 'Microscopy - Negative', type: 'yesno', summary_field: 'microscopy_negative' },
                act_less_24h: { label: 'Malaria Treated with ACT <24 hours', type: 'yesno', summary_field: 'act_less24h' },
                act_more_24h: { label: 'Malaria Treated with ACT >24 hours', type: 'yesno', summary_field: 'act_more24h' },
                treated_without_act_less_24h: { label: 'Treated without ACT <24 hours', type: 'yesno', summary_field: 'no_act_less24h' },
                treated_without_act_more_24h: { label: 'Treated without ACT >24 hours', type: 'yesno', summary_field: 'no_act_more24h' }
            }
        },
        'Eye Conditions': {
            description: 'Eye infections and conditions',
            fields: {
                eye_infection: { label: 'Eye Infection', type: 'yesno', summary_field: 'eye_infection' },
                other_eye_condition: { label: 'Eye Condition (all types, except infection)', type: 'yesno', summary_field: null }
            }
        },
        'Infectious Diseases': {
            description: 'Various infectious conditions and diseases',
            fields: {
                moderate_malnutrition: { label: 'Moderate Malnutrition', type: 'yesno', summary_field: null },
                severe_malnutrition: { label: 'Severe Malnutrition', type: 'yesno', summary_field: null },
                snake_bites: { label: 'Snake Bites', type: 'yesno', summary_field: 'snake_bite' },
                aids: { label: 'AIDS', type: 'yesno', summary_field: null },
                ari_with_antibiotic: { label: 'ARI Treated with Antibiotic', type: 'yesno', summary_field: 'child_ari' },
                ari_without_antibiotic: { label: 'ARI Treated without Antibiotic', type: 'yesno', summary_field: 'child_ari' },
                pneumonia_with_antibiotic: { label: 'Pneumonia Treated with Antibiotic', type: 'yesno', summary_field: 'child_pneumonia_antibiotic' },
                pneumonia_without_antibiotic: { label: 'Pneumonia Treated without Antibiotic', type: 'yesno', summary_field: 'child_pneumonia_no_antibiotic' },
                chicken_pox: { label: 'Chicken Pox', type: 'yesno', summary_field: null },
                diarrhoea_ors_zinc: { label: 'Diarrhoea Treated with ORS and Zinc', type: 'yesno', summary_field: 'child_diarrhoea_ors_zinc' },
                diarrhoea_ors_only: { label: 'Diarrhoea Treated with ORS Only', type: 'yesno', summary_field: 'child_diarrhoea_ors_only' },
                hepatitis: { label: 'Hepatitis (all types)', type: 'yesno', summary_field: 'hepatitis_all' },
                leprosy: { label: 'Leprosy', type: 'yesno', summary_field: null },
                mumps: { label: 'Mumps', type: 'yesno', summary_field: null },
                sepsis: { label: 'Sepsis', type: 'yesno', summary_field: null },
                skin_infection: { label: 'Skin Infection', type: 'yesno', summary_field: null },
                sti_pid: { label: 'STI - Pelvic Inflammatory Disease (PID)', type: 'yesno', summary_field: null },
                sti_genital_discharge: { label: 'STI - Genital Discharge', type: 'yesno', summary_field: null },
                sti_genital_ulcer: { label: 'STI - Genital Ulcer', type: 'yesno', summary_field: null },
                tetanus: { label: 'Tetanus', type: 'yesno', summary_field: null },
                tuberculosis: { label: 'Tuberculosis (TB)', type: 'yesno', summary_field: null },
                uti: { label: 'UTI (Urinary Tract Infection)', type: 'yesno', summary_field: null },
                worm_infestation: { label: 'Worm Infestation', type: 'yesno', summary_field: 'worm_infestation' },
                yaws: { label: 'Yaws', type: 'yesno', summary_field: null }
            }
        },
        'Internal Medicine & NCD': {
            description: 'Non-communicable diseases and mental health',
            fields: {
                adverse_drug_reaction: { label: 'Adverse Drug Reaction', type: 'yesno', summary_field: 'adverse_drug_reaction' },
                anaemia: { label: 'Anaemia', type: 'yesno', summary_field: null },
                sickle_cell: { label: 'Sickle Cell Disease', type: 'yesno', summary_field: null },
                cancer: { label: 'Cancer (all types)', type: 'yesno', summary_field: null },
                cardiovascular: { label: 'Cardiovascular Diseases', type: 'yesno', summary_field: null },
                chronic_respiratory: { label: 'Chronic Respiratory Diseases', type: 'yesno', summary_field: null },
                diabetes: { label: 'Diabetes (Type 1 or Type 2)', type: 'yesno', summary_field: null },
                epilepsy: { label: 'Epilepsy', type: 'yesno', summary_field: null },
                hypertension: { label: 'Hypertension', type: 'yesno', summary_field: null },
                kidney_disorders: { label: 'Kidney Disorders', type: 'yesno', summary_field: null },
                mental_disorder: { label: 'Mental Disorder (all types)', type: 'yesno', summary_field: 'mental_health_new_0_59m' }
            }
        },
        'Neonatal Conditions': {
            description: 'Conditions affecting newborns',
            fields: {
                asphyxia: { label: 'Asphyxia', type: 'yesno', summary_mapping: 'neonatal_by_age' },
                congenital_abnormality: { label: 'Congenital Abnormality', type: 'yesno', summary_field: null },
                prematurity: { label: 'Prematurity', type: 'yesno', summary_field: null },
                hypothermia: { label: 'Hypothermia', type: 'yesno', summary_mapping: 'neonatal_by_age' },
                respiratory_distress: { label: 'Respiratory Distress Syndrome', type: 'yesno', summary_mapping: 'neonatal_by_age' }
            }
        },
        'Surgical Conditions': {
            description: 'Surgical and trauma conditions',
            fields: {
                acute_abdomen: { label: 'Acute Abdomen', type: 'yesno', summary_field: null },
                appendicitis: { label: 'Appendicitis', type: 'yesno', summary_field: null },
                ent_disorder: { label: 'ENT Disorder', type: 'yesno', summary_field: null },
                hernia: { label: 'Hernia', type: 'yesno', summary_field: null },
                hydrocele: { label: 'Hydrocele', type: 'yesno', summary_field: null },
                lymphodema: { label: 'Lymphodema', type: 'yesno', summary_field: null },
                oral_dental: { label: 'Oral and Dental Conditions', type: 'yesno', summary_field: null },
                pud: { label: 'PUD (Peptic Ulcer Disease)', type: 'yesno', summary_field: null },
                wounds_rta: { label: 'Wounds/Trauma - RTA', type: 'yesno', summary_field: 'trauma_rta' },
                wounds_non_rta: { label: 'Wounds/Trauma - Non-RTA', type: 'yesno', summary_field: 'trauma_other' },
                burns: { label: 'Burns', type: 'yesno', summary_field: null }
            }
        },
        'Tracer and Life-Saving Medicines': {
            description: 'Availability of essential medicines',
            fields: {
                albendazole_400mg_tab: { label: 'Albendazole 400mg, Tab', type: 'yesno', summary_field: null },
                amoxycillin_125mg_susp: { label: 'Amoxycillin 125mg/5ml, Suspension', type: 'yesno', summary_field: null },
                amoxicillin_250mg_tab: { label: 'Amoxicillin 250mg, Dispersible Tab', type: 'yesno', summary_field: null },
                ampicillin_500mg_inj: { label: 'Ampicillin 500mg, Powder for Injection', type: 'yesno', summary_field: null },
                act_al6_or_asaq_3tab_infant: { label: 'ACT (AL-6 or ASAQ-3, 2–11 months)', type: 'yesno', summary_field: null },
                act_al12_or_asaq_3tab_child: { label: 'ACT (AL-12 or ASAQ-3, 1–5 years)', type: 'yesno', summary_field: null },
                remarks: { label: 'Remarks', type: 'text', summary_field: null }
            }
        }
    },
    'GENERAL': {
        'General Information': {
            description: 'Patient basic information for above five years',
            fields: {
                reg_no_gen: { label: 'Registration Number', type: 'text', summary_field: null },
                date_seen: { label: 'Date Seen', type: 'date', summary_field: null },
                date_onset_gen: { label: 'Date of Onset', type: 'date', summary_field: null },
                patient_name: { label: 'Patient Name', type: 'text', summary_field: null },
                age_years: { label: 'Age in Years', type: 'number', summary_mapping: 'age_classification_general' },
                sex_gen: { label: 'Sex', type: 'select', options: ['Male', 'Female'], summary_mapping: 'sex_disaggregation' },
                address_gen: { label: 'Address', type: 'text', summary_field: null },
                marital_status: { label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'], summary_field: null },
                occupation: { label: 'Occupation', type: 'text', summary_field: null },
                type_of_visit_gen: { label: 'Type of Visit', type: 'select', options: ['New', 'Follow-up'], summary_mapping: 'visit_type' },
                category_patient: { label: 'Category of Patient', type: 'select', options: ['General', 'Pregnant', 'Lactating', 'EVD Survivor', 'Disability'], summary_mapping: 'patient_category' }
            }
        },
        'Malaria': {
            description: 'Malaria testing and treatment for above five',
            fields: {
                fever_cases_gen: { label: 'Fever Cases (Suspected Malaria)', type: 'yesno', summary_field: 'fever_suspected' },
                fever_tested_rdt_gen: { label: 'Fever tested RDT', type: 'select', options: ['Positive', 'Negative', 'Not Done'], summary_mapping: 'rdt_result' },
                fever_tested_microscopy_gen: { label: 'Fever tested Microscopy', type: 'select', options: ['Positive', 'Negative', 'Not Done'], summary_mapping: 'microscopy_result' },
                malaria_act_facility_gen: { label: 'Malaria treated with ACT', type: 'select', options: ['<24 hours', '>24 hours', 'Not Applicable'], summary_mapping: 'act_timing' },
                malaria_without_act_gen: { label: 'Malaria treated without ACT', type: 'select', options: ['<24 hours', '>24 hours', 'Not Applicable'], summary_mapping: 'no_act_timing' },
                severe_malaria_gen: { label: 'Severe Malaria', type: 'yesno', summary_field: null }
            }
        },
        'Eye Conditions': {
            description: 'Eye infections and conditions',
            fields: {
                eye_infection_gen: { label: 'Eye Infection', type: 'yesno', summary_field: 'eye_infection' },
                other_eye_condition_gen: { label: 'Eye condition (except infection)', type: 'yesno', summary_field: null }
            }
        },
        'Infectious Diseases': {
            description: 'Various infectious conditions',
            fields: {
                moderate_malnutrition_gen: { label: 'Moderate Malnutrition', type: 'yesno', summary_field: null },
                severe_malnutrition_gen: { label: 'Severe Malnutrition', type: 'yesno', summary_field: null },
                afp: { label: 'AFP (Acute Flaccid Paralysis)', type: 'yesno', summary_field: null },
                acute_viral_haemorragic_fever: { label: 'Acute Viral Haemorragic Fever', type: 'yesno', summary_field: null },
                aids_gen: { label: 'AIDS', type: 'yesno', summary_field: null },
                ari_treated_gen: { label: 'ARI treated', type: 'select', options: ['With Antibiotic', 'Without Antibiotic', 'Not Applicable'], summary_field: null },
                pneumonia_treated_gen: { label: 'Pneumonia treated', type: 'select', options: ['With Antibiotic', 'Without Antibiotic', 'Not Applicable'], summary_field: null },
                chicken_pox_gen: { label: 'Chicken Pox', type: 'yesno', summary_field: null },
                cholera: { label: 'Cholera', type: 'yesno', summary_field: null },
                diarrhoea_watery_gen: { label: 'Diarrhoea, watery', type: 'select', options: ['With ORS and Zinc', 'With ORS only', 'Not Applicable'], summary_field: null },
                dysentery: { label: 'Dysentery (Bloody diarrhoea)', type: 'yesno', summary_field: null },
                hepatitis_gen: { label: 'Hepatitis (all types)', type: 'yesno', summary_field: 'hepatitis_all' },
                leprosy_gen: { label: 'Leprosy', type: 'yesno', summary_field: null },
                measles: { label: 'Measles', type: 'yesno', summary_field: null },
                rubella: { label: 'Rubella', type: 'yesno', summary_field: null },
                meningitis_encephalitis: { label: 'Meningitis / Encephalitis', type: 'yesno', summary_field: null },
                mumps_gen: { label: 'Mumps', type: 'yesno', summary_field: null },
                buruli_ulcer: { label: 'Buruli Ulcer', type: 'yesno', summary_field: null },
                yellow_fever: { label: 'Yellow Fever', type: 'yesno', summary_field: null },
                typhoid_fever: { label: 'Typhoid Fever', type: 'yesno', summary_field: null },
                animal_bites: { label: 'Animal Bites', type: 'yesno', summary_field: 'snake_bite' },
                sepsis_gen: { label: 'Sepsis', type: 'yesno', summary_field: null },
                skin_infection_gen: { label: 'Skin Infection', type: 'yesno', summary_field: null },
                sti_pid_gen: { label: 'STI - PID', type: 'yesno', summary_mapping: 'sti_by_age' },
                sti_genital_discharge_gen: { label: 'STI - Genital Discharge', type: 'yesno', summary_mapping: 'sti_by_age' },
                sti_genital_ulcer_gen: { label: 'STI - Genital Ulcer', type: 'yesno', summary_mapping: 'sti_by_age' },
                tetanus_gen: { label: 'Tetanus', type: 'yesno', summary_field: null },
                tuberculosis_gen: { label: 'Tuberculosis (TB)', type: 'yesno', summary_field: null },
                uti_gen: { label: 'UTI', type: 'yesno', summary_field: null },
                worm_infestation_gen: { label: 'Worm Infestation', type: 'yesno', summary_field: 'worm_infestation' },
                yaws_gen: { label: 'Yaws', type: 'yesno', summary_field: null },
                onchocerciasis: { label: 'Onchocerciasis', type: 'yesno', summary_field: 'onchocerciasis' },
                schistosomiasis: { label: 'Schistosomiasis', type: 'yesno', summary_field: 'schistosomiasis' },
                trachoma: { label: 'Trachoma', type: 'yesno', summary_field: 'trachoma' },
                other_infectious: { label: 'Other infectious conditions', type: 'yesno', summary_field: null }
            }
        },
        'Internal Medicine & NCD': {
            description: 'Non-communicable diseases',
            fields: {
                adverse_drug_reaction_gen: { label: 'Adverse Drug Reaction', type: 'yesno', summary_field: 'adverse_drug_reaction' },
                anaemia_gen: { label: 'Anaemia', type: 'yesno', summary_field: null },
                sickle_cell_gen: { label: 'Sickle Cell Disease', type: 'yesno', summary_field: null },
                cancer_gen: { label: 'Cancer (all types)', type: 'yesno', summary_field: null },
                cardiovascular_gen: { label: 'Cardiovascular diseases', type: 'yesno', summary_field: null },
                chronic_respiratory_gen: { label: 'Chronic Respiratory Diseases', type: 'yesno', summary_field: null },
                diabetes_gen: { label: 'Diabetes', type: 'yesno', summary_mapping: 'diabetes_screening' },
                epilepsy_gen: { label: 'Epilepsy', type: 'yesno', summary_field: 'epilepsy_followup' },
                hypertension_gen: { label: 'Hypertension', type: 'yesno', summary_mapping: 'hypertension_screening' },
                kidney_disorders_gen: { label: 'Kidney disorders', type: 'yesno', summary_field: null },
                mental_disorder_gen: { label: 'Mental disorder', type: 'yesno', summary_field: 'mental_health_new_5plus' },
                other_ncd: { label: 'Other NCD conditions', type: 'yesno', summary_field: null }
            }
        },
        'Neonatal Conditions': {
            description: 'Conditions affecting newborns',
            fields: {
                asphyxia_gen: { label: 'Asphyxia', type: 'yesno', summary_mapping: 'neonatal_by_age' },
                congenital_abnormality_gen: { label: 'Congenital Abnormality', type: 'yesno', summary_field: null },
                prematurity_gen: { label: 'Prematurity', type: 'yesno', summary_field: null },
                hypothermia_gen: { label: 'Hypothermia', type: 'yesno', summary_mapping: 'neonatal_by_age' },
                respiratory_distress_gen: { label: 'Respiratory Distress Syndrome', type: 'yesno', summary_mapping: 'neonatal_by_age' }
            }
        },
        'Surgical Conditions': {
            description: 'Surgical and trauma conditions',
            fields: {
                acute_abdomen_gen: { label: 'Acute Abdomen', type: 'yesno', summary_field: null },
                appendicitis_gen: { label: 'Appendicitis', type: 'yesno', summary_field: null },
                ent_disorder_gen: { label: 'ENT disorder', type: 'yesno', summary_field: null },
                hernia_gen: { label: 'Hernia', type: 'yesno', summary_field: null },
                hydrocele_gen: { label: 'Hydrocele', type: 'yesno', summary_field: null },
                lymphodema_gen: { label: 'Lymphodema', type: 'yesno', summary_field: null },
                oral_dental_gen: { label: 'Oral and dental conditions', type: 'yesno', summary_field: null },
                pud_gen: { label: 'PUD', type: 'yesno', summary_field: null },
                wounds_trauma_gen: { label: 'Wounds/Trauma', type: 'select', options: ['RTA', 'Non-RTA', 'Not Applicable'], summary_mapping: 'trauma_type' },
                burns_gen: { label: 'Burns', type: 'yesno', summary_field: null },
                other_surgical: { label: 'Other Surgical conditions', type: 'yesno', summary_field: null }
            }
        },
        'Tracer Medicines': {
            description: 'Availability of medicines',
            fields: {
                act_al24_asaq6_adult: { label: 'ACT (AL-24 or ASAQ-6, adult)', type: 'yesno', summary_field: null },
                remarks_gen: { label: 'Remarks', type: 'text', summary_field: null }
            }
        }
    }
};

// ============================================
// AGE GROUP MAPPING RULES
// ============================================
const AGE_GROUP_MAPPING = {
    // Under-Five age groups to summary age groups
    under_five: {
        '<1 Month': '0_59m',
        '1-5 Months': '0_59m',
        '6-11 Months': '0_59m',
        '12-23 Months': '0_59m',
        '24-59 Months': '0_59m'
    },
    // General age (years) to summary age groups
    general: function(age) {
        if (age >= 5 && age <= 9) return '5_9y';
        if (age >= 10 && age <= 14) return '10_14y';
        if (age >= 15 && age <= 19) return '15_19y';
        if (age >= 20 && age <= 24) return '20_24y';
        if (age >= 25) return '25plus';
        if (age < 5) return '0_59m'; // Catch for under 5 in general register
        return null;
    },
    // Neonatal age groups
    neonatal: function(age_group) {
        if (age_group === '<1 Month') {
            // Need to determine 0-7 days vs 8-28 days - would need date of birth
            return '0_28d'; // Default
        }
        if (age_group === '1-5 Months') {
            return '29d_2m';
        }
        return null;
    },
    // Child health specific
    child_health: {
        '1-5 Months': '1_59m',
        '6-11 Months': '1_59m',
        '12-23 Months': '1_59m',
        '24-59 Months': '1_59m'
    }
};

// ============================================
// COMPLETE FIELD MAPPING TO SUMMARY
// ============================================
const FIELD_TO_SUMMARY_MAPPING = {
    // MALARIA - Fever Cases
    'fever_suspected_malaria': {
        summary_base: 'fever_suspected',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: []
    },
    'fever_cases_gen': {
        summary_base: 'fever_suspected',
        age_groups: ['5_9y', '10_14y', '15plus'],
        sex_disaggregate: true,
        conditions: []
    },
    
    // MALARIA - RDT Results
    'rdt_positive': {
        summary_base: 'rdt_positive',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'rdt_positive', value: 'Yes' }]
    },
    'rdt_negative': {
        summary_base: 'rdt_negative',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'rdt_negative', value: 'Yes' }]
    },
    'fever_tested_rdt_gen': {
        summary_mapping: {
            'Positive': { base: 'rdt_positive', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true },
            'Negative': { base: 'rdt_negative', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true }
        }
    },
    
    // MALARIA - Microscopy Results
    'microscopy_positive': {
        summary_base: 'microscopy_positive',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'microscopy_positive', value: 'Yes' }]
    },
    'microscopy_negative': {
        summary_base: 'microscopy_negative',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'microscopy_negative', value: 'Yes' }]
    },
    'fever_tested_microscopy_gen': {
        summary_mapping: {
            'Positive': { base: 'microscopy_positive', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true },
            'Negative': { base: 'microscopy_negative', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true }
        }
    },
    
    // MALARIA - ACT Treatment
    'act_less_24h': {
        summary_base: 'act_less24h',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'act_less_24h', value: 'Yes' }]
    },
    'act_more_24h': {
        summary_base: 'act_more24h',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'act_more_24h', value: 'Yes' }]
    },
    'malaria_act_facility_gen': {
        summary_mapping: {
            '<24 hours': { base: 'act_less24h', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true },
            '>24 hours': { base: 'act_more24h', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true }
        }
    },
    
    // MALARIA - Without ACT
    'treated_without_act_less_24h': {
        summary_base: 'no_act_less24h',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'treated_without_act_less_24h', value: 'Yes' }]
    },
    'treated_without_act_more_24h': {
        summary_base: 'no_act_more24h',
        age_groups: ['0_59m'],
        sex_disaggregate: true,
        conditions: [{ field: 'treated_without_act_more_24h', value: 'Yes' }]
    },
    'malaria_without_act_gen': {
        summary_mapping: {
            '<24 hours': { base: 'no_act_less24h', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true },
            '>24 hours': { base: 'no_act_more24h', age_groups: ['5_9y', '10_14y', '15plus'], sex_disaggregate: true }
        }
    },
    
    // CHILD HEALTH - Diarrhoea
    'diarrhoea_ors_zinc': {
        summary_base: 'child_diarrhoea_ors_zinc',
        age_groups: ['child'],
        sex_disaggregate: true,
        conditions: [{ field: 'diarrhoea_ors_zinc', value: 'Yes' }]
    },
    'diarrhoea_ors_only': {
        summary_base: 'child_diarrhoea_ors_only',
        age_groups: ['child'],
        sex_disaggregate: true,
        conditions: [{ field: 'diarrhoea_ors_only', value: 'Yes' }]
    },
    
    // CHILD HEALTH - ARI and Pneumonia
    'ari_with_antibiotic': {
        summary_base: 'child_ari',
        age_groups: ['child'],
        sex_disaggregate: true,
        conditions: [{ field: 'ari_with_antibiotic', value: 'Yes' }]
    },
    'ari_without_antibiotic': {
        summary_base: 'child_ari',
        age_groups: ['child'],
        sex_disaggregate: true,
        conditions: [{ field: 'ari_without_antibiotic', value: 'Yes' }]
    },
    'pneumonia_with_antibiotic': {
        summary_base: 'child_pneumonia',
        age_groups: ['child'],
        sex_disaggregate: true,
        conditions: [{ field: 'pneumonia_with_antibiotic', value: 'Yes' }],
        additional_summary: {
            base: 'child_pneumonia_antibiotic',
            age_groups: ['child'],
            sex_disaggregate: true
        }
    },
    'pneumonia_without_antibiotic': {
        summary_base: 'child_pneumonia',
        age_groups: ['child'],
        sex_disaggregate: true,
        conditions: [{ field: 'pneumonia_without_antibiotic', value: 'Yes' }],
        additional_summary: {
            base: 'child_pneumonia_no_antibiotic',
            age_groups: ['child'],
            sex_disaggregate: true
        }
    },
    
    // STI - By Age Group
    'sti_genital_discharge_gen': {
        summary_base: 'sti_genital_discharge',
        age_groups: ['10_14y', '15_19y', '20_24y', '25plus'],
        sex_disaggregate: true,
        conditions: [{ field: 'sti_genital_discharge_gen', value: 'Yes' }]
    },
    'sti_genital_ulcer_gen': {
        summary_base: 'sti_genital_ulcer',
        age_groups: ['10_14y', '15_19y', '20_24y', '25plus'],
        sex_disaggregate: true,
        conditions: [{ field: 'sti_genital_ulcer_gen', value: 'Yes' }]
    },
    'sti_pid_gen': {
        summary_base: 'sti_other',
        age_groups: ['10_14y', '15_19y', '20_24y', '25plus'],
        sex_disaggregate: true,
        conditions: [{ field: 'sti_pid_gen', value: 'Yes' }]
    },
    
    // MENTAL HEALTH
    'mental_disorder': {
        summary_base: 'mental_health_new_0_59m',
        age_groups: ['0_59m'],
        sex_disaggregate: false,
        conditions: [{ field: 'mental_disorder', value: 'Yes' }]
    },
    'mental_disorder_gen': {
        summary_base: 'mental_health_new_5plus',
        age_groups: ['5plus'],
        sex_disaggregate: false,
        conditions: [{ field: 'mental_disorder_gen', value: 'Yes' }]
    },
    'epilepsy_gen': {
        summary_base: 'epilepsy_followup',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'epilepsy_gen', value: 'Yes' }]
    },
    
    // NTD
    'worm_infestation': {
        summary_base: 'worm_infestation',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'worm_infestation', value: 'Yes' }]
    },
    'worm_infestation_gen': {
        summary_base: 'worm_infestation',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'worm_infestation_gen', value: 'Yes' }]
    },
    'schistosomiasis': {
        summary_base: 'schistosomiasis',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'schistosomiasis', value: 'Yes' }]
    },
    'trachoma': {
        summary_base: 'trachoma',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'trachoma', value: 'Yes' }]
    },
    'onchocerciasis': {
        summary_base: 'onchocerciasis',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'onchocerciasis', value: 'Yes' }]
    },
    'snake_bites': {
        summary_base: 'snake_bite',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'snake_bites', value: 'Yes' }]
    },
    'animal_bites': {
        summary_base: 'snake_bite',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'animal_bites', value: 'Yes' }]
    },
    
    // EMERGENCY CARE
    'wounds_rta': {
        summary_base: 'trauma_rta',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'wounds_rta', value: 'Yes' }]
    },
    'wounds_non_rta': {
        summary_base: 'trauma_other',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'wounds_non_rta', value: 'Yes' }]
    },
    'wounds_trauma_gen': {
        summary_mapping: {
            'RTA': { base: 'trauma_rta', age_groups: ['all'], sex_disaggregate: false },
            'Non-RTA': { base: 'trauma_other', age_groups: ['all'], sex_disaggregate: false }
        }
    },
    'eye_infection': {
        summary_base: 'eye_infection',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'eye_infection', value: 'Yes' }]
    },
    'eye_infection_gen': {
        summary_base: 'eye_infection',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'eye_infection_gen', value: 'Yes' }]
    },
    
    // OTHER CONDITIONS
    'hepatitis': {
        summary_base: 'hepatitis_all',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'hepatitis', value: 'Yes' }]
    },
    'hepatitis_gen': {
        summary_base: 'hepatitis_all',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'hepatitis_gen', value: 'Yes' }]
    },
    'hypertension_gen': {
        summary_base: 'hypertension_screening',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'hypertension_gen', value: 'Yes' }]
    },
    'diabetes_gen': {
        summary_base: 'diabetes_screening',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'diabetes_gen', value: 'Yes' }]
    },
    'adverse_drug_reaction': {
        summary_base: 'adverse_drug_reaction',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'adverse_drug_reaction', value: 'Yes' }]
    },
    'adverse_drug_reaction_gen': {
        summary_base: 'adverse_drug_reaction',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'adverse_drug_reaction_gen', value: 'Yes' }]
    },
    
    // SPECIAL CATEGORIES
    'disability': {
        summary_base: 'disabled_patient_total',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'disability', value: 'Yes' }]
    },
    'evd_survivor': {
        summary_base: 'evd_survivor_total',
        age_groups: ['all'],
        sex_disaggregate: false,
        conditions: [{ field: 'evd_survivor', value: 'Yes' }]
    },
    'category_patient': {
        summary_mapping: {
            'EVD Survivor': { base: 'evd_survivor_total', age_groups: ['all'], sex_disaggregate: false },
            'Disability': { base: 'disabled_patient_total', age_groups: ['all'], sex_disaggregate: false },
            'Pregnant': { base: 'fhc_anc_curative', age_groups: ['all'], sex_disaggregate: false },
            'Lactating': { base: 'fhc_lactating_curative', age_groups: ['all'], sex_disaggregate: false }
        }
    },
    
    // CURATIVE CARE
    'type_of_visit': {
        summary_mapping: {
            'New': { base: 'child_curative', age_group_specific: true, sex_disaggregate: true },
            'Follow-up': { base: 'child_curative', age_group_specific: true, sex_disaggregate: true }
        }
    },
    'type_of_visit_gen': {
        summary_mapping: {
            'New': { base: 'opd_new_followup', age_groups: ['0_59m', '5plus'], sex_disaggregate: false },
            'Follow-up': { base: 'opd_new_followup', age_groups: ['0_59m', '5plus'], sex_disaggregate: false }
        }
    }
};

// ============================================
// HF01 SUMMARY STRUCTURE
// ============================================
const HF01_SUMMARY_STRUCTURE = {
    'Facility Information': [
        'facility_name',
        'facility_type',
        'chiefdom',
        'district',
        'region',
        'year',
        'month',
        'reporting_period_start',
        'reporting_period_end'
    ],
    'Malaria - Fever Cases': [
        'fever_suspected_0_59m_m', 'fever_suspected_0_59m_f',
        'fever_suspected_5_9y_m', 'fever_suspected_5_9y_f',
        'fever_suspected_10_14y_m', 'fever_suspected_10_14y_f',
        'fever_suspected_15plus_m', 'fever_suspected_15plus_f'
    ],
    'Malaria - RDT Positive': [
        'rdt_positive_0_59m_m', 'rdt_positive_0_59m_f',
        'rdt_positive_5_9y_m', 'rdt_positive_5_9y_f',
        'rdt_positive_10_14y_m', 'rdt_positive_10_14y_f',
        'rdt_positive_15plus_m', 'rdt_positive_15plus_f'
    ],
    'Malaria - RDT Negative': [
        'rdt_negative_0_59m_m', 'rdt_negative_0_59m_f',
        'rdt_negative_5_9y_m', 'rdt_negative_5_9y_f',
        'rdt_negative_10_14y_m', 'rdt_negative_10_14y_f',
        'rdt_negative_15plus_m', 'rdt_negative_15plus_f'
    ],
    'Malaria - Microscopy Positive': [
        'microscopy_positive_0_59m_m', 'microscopy_positive_0_59m_f',
        'microscopy_positive_5_9y_m', 'microscopy_positive_5_9y_f',
        'microscopy_positive_10_14y_m', 'microscopy_positive_10_14y_f',
        'microscopy_positive_15plus_m', 'microscopy_positive_15plus_f'
    ],
    'Malaria - Microscopy Negative': [
        'microscopy_negative_0_59m_m', 'microscopy_negative_0_59m_f',
        'microscopy_negative_5_9y_m', 'microscopy_negative_5_9y_f',
        'microscopy_negative_10_14y_m', 'microscopy_negative_10_14y_f',
        'microscopy_negative_15plus_m', 'microscopy_negative_15plus_f'
    ],
    'Malaria - ACT <24 hours': [
        'act_less24h_0_59m_m', 'act_less24h_0_59m_f',
        'act_less24h_5_9y_m', 'act_less24h_5_9y_f',
        'act_less24h_10_14y_m', 'act_less24h_10_14y_f',
        'act_less24h_15plus_m', 'act_less24h_15plus_f'
    ],
    'Malaria - ACT >24 hours': [
        'act_more24h_0_59m_m', 'act_more24h_0_59m_f',
        'act_more24h_5_9y_m', 'act_more24h_5_9y_f',
        'act_more24h_10_14y_m', 'act_more24h_10_14y_f',
        'act_more24h_15plus_m', 'act_more24h_15plus_f'
    ],
    'Malaria - No ACT <24 hours': [
        'no_act_less24h_0_59m_m', 'no_act_less24h_0_59m_f',
        'no_act_less24h_5_9y_m', 'no_act_less24h_5_9y_f',
        'no_act_less24h_10_14y_m', 'no_act_less24h_10_14y_f',
        'no_act_less24h_15plus_m', 'no_act_less24h_15plus_f'
    ],
    'Malaria - No ACT >24 hours': [
        'no_act_more24h_0_59m_m', 'no_act_more24h_0_59m_f',
        'no_act_more24h_5_9y_m', 'no_act_more24h_5_9y_f',
        'no_act_more24h_10_14y_m', 'no_act_more24h_10_14y_f',
        'no_act_more24h_15plus_m', 'no_act_more24h_15plus_f'
    ],
    'Child Health': [
        'child_curative_1_59m_m', 'child_curative_1_59m_f',
        'child_curative_5_9y_m', 'child_curative_5_9y_f',
        'child_diarrhoea_m', 'child_diarrhoea_f',
        'child_diarrhoea_ors_zinc_m', 'child_diarrhoea_ors_zinc_f',
        'child_diarrhoea_ors_only_m', 'child_diarrhoea_ors_only_f',
        'child_ari_m', 'child_ari_f',
        'child_pneumonia_m', 'child_pneumonia_f',
        'child_pneumonia_antibiotic_m', 'child_pneumonia_antibiotic_f',
        'child_pneumonia_no_antibiotic_m', 'child_pneumonia_no_antibiotic_f'
    ],
    'Child Mortality': [
        'child_death_diarrhoea_1_59m', 'child_death_diarrhoea_5_9y', 'child_death_diarrhoea_10_14y',
        'child_death_pneumonia_1_59m', 'child_death_pneumonia_5_9y', 'child_death_pneumonia_10_14y',
        'child_death_malaria_1_59m', 'child_death_malaria_5_9y', 'child_death_malaria_10_14y',
        'child_death_malnutrition_1_59m', 'child_death_malnutrition_5_9y', 'child_death_malnutrition_10_14y',
        'child_death_hiv_1_59m', 'child_death_hiv_5_9y', 'child_death_hiv_10_14y',
        'child_death_trauma_1_59m', 'child_death_trauma_5_9y', 'child_death_trauma_10_14y',
        'child_death_other_1_59m', 'child_death_other_5_9y', 'child_death_other_10_14y',
        'child_death_unspecified_1_59m', 'child_death_unspecified_5_9y', 'child_death_unspecified_10_14y'
    ],
    'STI - Genital Discharge': [
        'sti_genital_discharge_10_14y_m', 'sti_genital_discharge_10_14y_f',
        'sti_genital_discharge_15_19y_m', 'sti_genital_discharge_15_19y_f',
        'sti_genital_discharge_20_24y_m', 'sti_genital_discharge_20_24y_f',
        'sti_genital_discharge_25plus_m', 'sti_genital_discharge_25plus_f'
    ],
    'STI - Genital Ulcer': [
        'sti_genital_ulcer_10_14y_m', 'sti_genital_ulcer_10_14y_f',
        'sti_genital_ulcer_15_19y_m', 'sti_genital_ulcer_15_19y_f',
        'sti_genital_ulcer_20_24y_m', 'sti_genital_ulcer_20_24y_f',
        'sti_genital_ulcer_25plus_m', 'sti_genital_ulcer_25plus_f'
    ],
    'STI - Other': [
        'sti_other_10_14y_m', 'sti_other_10_14y_f',
        'sti_other_15_19y_m', 'sti_other_15_19y_f',
        'sti_other_20_24y_m', 'sti_other_20_24y_f',
        'sti_other_25plus_m', 'sti_other_25plus_f'
    ],
    'Mental Health': [
        'mental_health_new_0_59m',
        'mental_health_new_5plus',
        'mental_health_followup_0_59m',
        'mental_health_followup_5plus',
        'epilepsy_followup'
    ],
    'NTD': [
        'schistosomiasis',
        'trachoma',
        'worm_infestation',
        'onchocerciasis',
        'snake_bite'
    ],
    'Adolescent/Adult Mortality': [
        'death_malaria_15plus_m', 'death_malaria_15plus_f',
        'death_other_15plus_m', 'death_other_15plus_f'
    ],
    'Emergency Care': [
        'trauma_rta',
        'trauma_other',
        'eye_infection'
    ],
    'Death Registration': [
        'death_registered_under5',
        'death_registered_5plus'
    ],
    'Neonatal Cases': [
        'asphyxia_0_28d', 'asphyxia_29d_2m',
        'hypothermia_0_28d', 'hypothermia_29d_2m',
        'respiratory_distress_0_28d', 'respiratory_distress_29d_2m',
        'serious_bacteria_0_28d', 'serious_bacteria_29d_2m',
        'jaundice_0_28d', 'jaundice_29d_2m',
        'diarrhoea_neo_0_28d', 'diarrhoea_neo_29d_2m'
    ],
    'Neonatal Deaths': [
        'nnd_birth_trauma_0_7d', 'nnd_birth_trauma_8_28d',
        'nnd_congenital_0_7d', 'nnd_congenital_8_28d',
        'nnd_convulsions_0_7d', 'nnd_convulsions_8_28d',
        'nnd_growth_0_7d', 'nnd_growth_8_28d',
        'nnd_infection_0_7d', 'nnd_infection_8_28d',
        'nnd_intrapartum_0_7d', 'nnd_intrapartum_8_28d',
        'nnd_low_birthweight_0_7d', 'nnd_low_birthweight_8_28d',
        'nnd_respiratory_cardio_0_7d', 'nnd_respiratory_cardio_8_28d',
        'nnd_other_0_7d', 'nnd_other_8_28d',
        'nnd_unspecified_0_7d', 'nnd_unspecified_8_28d'
    ],
    'All Other Morbidities': [
        'all_other_morb_1_59m',
        'hepatitis_all',
        'hypertension_screening',
        'hypertension_followup',
        'diabetes_screening',
        'diabetes_followup',
        'adverse_drug_reaction'
    ],
    'Daily Clinic Attendance': [
        'headcount_all_0_59m',
        'headcount_all_5plus',
        'opd_new_followup_0_59m',
        'opd_new_followup_5plus',
        'patient_referred'
    ],
    'Free Health Care': [
        'fhc_child_0_59m',
        'fhc_anc_curative',
        'fhc_lactating_curative'
    ],
    'GBV': [
        'gbv_0_9y',
        'gbv_10_14y',
        'gbv_15_19y',
        'gbv_20_24y',
        'gbv_25plus',
        'sexual_assault'
    ],
    'Special Categories': [
        'evd_survivor_total',
        'disabled_patient_total'
    ],
    'Referrals': [
        'referral_disease_0_59m',
        'referral_disease_5_14y',
        'referral_disease_15plus',
        'total_referrals'
    ]
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

console.log('Complete config loaded:', Object.keys(VARIABLES).length, 'fields with full mapping');

// ============================================
// CASCADING DATA (Hierarchical Location Data)
// ============================================
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
Bo District||Wonde Chiefdom`;

console.log('Cascading data loaded');
