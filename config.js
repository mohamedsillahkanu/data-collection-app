// ============================================         
// CONFIGURATION - Change these values
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqhplQAEn3Xp_TKqzTddtvTAicoEu_4ltq5C4iR7LNIElN18exltV1-t12RjiQcvLx/exec';
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_3jdmPYJMJ7DzKpJqR33t5RwdsRRJ9PbUUUjd9k9zfI/edit?gid=0#gid=0';
const LOGIN_USERNAME = 'admin';
const LOGIN_PASSWORD = 'admin';

// ============================================
// VARIABLE SECTIONS - Synchronized with HF01 Summary
// ============================================

const VARIABLE_SECTIONS = {
    'Location & Time': {
        description: 'Basic facility and reporting information',
        fields: {}
    },
    
    // ========================================
    // UNDER FIVE REGISTER (0-59 months)
    // ========================================
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
                type_of_visit: { label: 'Type of Visit', type: 'select', options: ['New', 'Follow-up'] },
                referral: { label: 'Referral', type: 'yesno' }
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
                continued_breastfeeding: { label: 'Continued Breastfeeding (6-23 months)', type: 'yesno' }
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
        'Child Health - Diarrhoea': {
            description: 'Diarrhoea diagnosis and treatment',
            fields: {
                diarrhoea_ors_zinc: { label: 'Diarrhoea Treated with ORS and Zinc', type: 'yesno' },
                diarrhoea_ors_only: { label: 'Diarrhoea Treated with ORS Only', type: 'yesno' }
            }
        },
        'Child Health - ARI & Pneumonia': {
            description: 'Respiratory infections diagnosis and treatment',
            fields: {
                ari_with_antibiotic: { label: 'ARI Treated with Antibiotic', type: 'yesno' },
                ari_without_antibiotic: { label: 'ARI Treated without Antibiotic', type: 'yesno' },
                pneumonia_with_antibiotic: { label: 'Pneumonia Treated with Antibiotic', type: 'yesno' },
                pneumonia_without_antibiotic: { label: 'Pneumonia Treated without Antibiotic', type: 'yesno' }
            }
        },
        'Mental Health': {
            description: 'Mental health and neurological conditions',
            fields: {
                mental_disorder: { label: 'Mental Disorder (all types)', type: 'yesno' },
                epilepsy: { label: 'Epilepsy', type: 'yesno' }
            }
        },
        'Neonatal Conditions': {
            description: 'Conditions affecting newborns (0-2 months)',
            fields: {
                asphyxia: { label: 'Asphyxia', type: 'yesno' },
                hypothermia: { label: 'Hypothermia', type: 'yesno' },
                respiratory_distress: { label: 'Respiratory Distress Syndrome', type: 'yesno' },
                sepsis: { label: 'Possible Serious Bacteria Infection/Sepsis', type: 'yesno' },
                jaundice: { label: 'Jaundice', type: 'yesno' },
                congenital_abnormality: { label: 'Congenital Abnormality', type: 'yesno' },
                prematurity: { label: 'Prematurity/Low Birth Weight', type: 'yesno' }
            }
        },
        'NTD & Other Infections': {
            description: 'Neglected tropical diseases and other infections',
            fields: {
                worm_infestation: { label: 'Worm Infestation', type: 'yesno' },
                snake_bites: { label: 'Snake Bites', type: 'yesno' },
                eye_infection: { label: 'Eye Infection', type: 'yesno' },
                hepatitis: { label: 'Hepatitis (all types)', type: 'yesno' },
                skin_infection: { label: 'Skin Infection', type: 'yesno' },
                tuberculosis: { label: 'Tuberculosis (TB)', type: 'yesno' },
                aids: { label: 'AIDS', type: 'yesno' }
            }
        },
        'Trauma & Injuries': {
            description: 'Wounds, trauma and injuries',
            fields: {
                wounds_rta: { label: 'Wounds/Trauma - RTA', type: 'yesno' },
                wounds_non_rta: { label: 'Wounds/Trauma - Non-RTA', type: 'yesno' },
                burns: { label: 'Burns', type: 'yesno' }
            }
        },
        'Other Conditions': {
            description: 'Other medical conditions',
            fields: {
                moderate_malnutrition: { label: 'Moderate Malnutrition', type: 'yesno' },
                severe_malnutrition: { label: 'Severe Malnutrition', type: 'yesno' },
                anaemia: { label: 'Anaemia', type: 'yesno' },
                adverse_drug_reaction: { label: 'Adverse Drug Reaction', type: 'yesno' }
            }
        },
        'Special Categories': {
            description: 'Special patient categories',
            fields: {
                disability: { label: 'Disability', type: 'yesno' },
                evd_survivor: { label: 'EVD Survivor', type: 'yesno' }
            }
        },
        'GBV': {
            description: 'Gender-based violence',
            fields: {
                gbv: { label: 'Gender Based Violence', type: 'yesno' },
                sexual_assault: { label: 'Sexual Assault', type: 'yesno' }
            }
        },
        'Death': {
            description: 'Mortality information',
            fields: {
                death: { label: 'Death Occurred', type: 'yesno' },
                death_cause: { label: 'Cause of Death', type: 'select', options: [
                    'Diarrhoea', 'Pneumonia', 'Malaria', 'Malnutrition', 'HIV', 'Trauma',
                    'Birth trauma', 'Congenital defect', 'Convulsions', 'Growth disorders',
                    'Infection', 'Intrapartum', 'Low birthweight', 'Respiratory/cardiovascular',
                    'Other neonatal', 'Other', 'Unspecified'
                ]}
            }
        },
        'Remarks': {
            description: 'Additional notes',
            fields: {
                remarks: { label: 'Remarks', type: 'text' }
            }
        }
    },
    
    // ========================================
    // GENERAL REGISTER (5+ years)
    // All fields use _gen suffix to avoid conflicts
    // ========================================
    'GENERAL': {
        'General Information': {
            description: 'Patient basic information for 5+ years',
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
                category_patient: { label: 'Category of Patient', type: 'select', options: ['General', 'Pregnant', 'Lactating', 'EVD Survivor', 'Disability'] },
                referral_gen: { label: 'Referral', type: 'yesno' }
            }
        },
        'Malaria': {
            description: 'Malaria testing and treatment for 5+ years',
            fields: {
                fever_cases_gen: { label: 'Fever Case (Suspected Malaria)', type: 'yesno' },
                fever_tested_rdt_gen: { label: 'Fever case tested for Malaria (RDT)', type: 'select', options: ['Positive', 'Negative', 'Not Done'] },
                fever_tested_microscopy_gen: { label: 'Fever case tested for Malaria (Microscopy)', type: 'select', options: ['Positive', 'Negative', 'Not Done'] },
                malaria_act_facility_gen: { label: 'Malaria treated at Facility with ACT', type: 'select', options: ['<24 hours', '>24 hours', 'Not Applicable'] },
                malaria_without_act_gen: { label: 'Malaria treated at Facility without ACT', type: 'select', options: ['<24 hours', '>24 hours', 'Not Applicable'] },
                severe_malaria_gen: { label: 'Severe Malaria', type: 'yesno' }
            }
        },
        'STI': {
            description: 'Sexually Transmitted Infections',
            fields: {
                sti_genital_discharge_gen: { label: 'STI - Genital Discharge', type: 'yesno' },
                sti_genital_ulcer_gen: { label: 'STI - Genital Ulcer', type: 'yesno' },
                sti_pid_gen: { label: 'STI - Pelvic Inflammatory Disease (PID) / Other', type: 'yesno' }
            }
        },
        'Mental Health': {
            description: 'Mental health and neurological conditions',
            fields: {
                mental_disorder_gen: { label: 'Mental Disorder (all types)', type: 'yesno' },
                epilepsy_gen: { label: 'Epilepsy', type: 'yesno' }
            }
        },
        'NTD': {
            description: 'Neglected Tropical Diseases',
            fields: {
                schistosomiasis: { label: 'Schistosomiasis', type: 'yesno' },
                trachoma: { label: 'Trachoma', type: 'yesno' },
                worm_infestation_gen: { label: 'Worm Infestation', type: 'yesno' },
                onchocerciasis: { label: 'Onchocerciasis', type: 'yesno' },
                animal_bites: { label: 'Animal Bites (Snake, Dog, Cat)', type: 'yesno' }
            }
        },
        'Child Health 5-9y': {
            description: 'Child health indicators for 5-9 year olds',
            fields: {
                diarrhoea_watery_gen: { label: 'Diarrhoea treated at facility', type: 'select', options: ['With ORS and Zinc', 'With ORS only', 'Not Applicable'] },
                ari_treated_gen: { label: 'ARI treated in Facility', type: 'select', options: ['With Antibiotic', 'Without Antibiotic', 'Not Applicable'] },
                pneumonia_treated_gen: { label: 'Pneumonia treated in Facility', type: 'select', options: ['With Antibiotic', 'Without Antibiotic', 'Not Applicable'] }
            }
        },
        'Trauma & Injuries': {
            description: 'Wounds, trauma and injuries',
            fields: {
                wounds_trauma_gen: { label: 'Wounds/Trauma', type: 'select', options: ['RTA', 'Non-RTA', 'Not Applicable'] },
                burns_gen: { label: 'Burns', type: 'yesno' }
            }
        },
        'Other Conditions': {
            description: 'Other medical conditions',
            fields: {
                eye_infection_gen: { label: 'Eye Infection', type: 'yesno' },
                hepatitis_gen: { label: 'Hepatitis (all types)', type: 'yesno' },
                hypertension_gen: { label: 'Hypertension', type: 'yesno' },
                diabetes_gen: { label: 'Diabetes', type: 'yesno' },
                adverse_drug_reaction_gen: { label: 'Adverse Drug Reaction', type: 'yesno' },
                moderate_malnutrition_gen: { label: 'Moderate Malnutrition', type: 'yesno' },
                severe_malnutrition_gen: { label: 'Severe Malnutrition', type: 'yesno' },
                anaemia_gen: { label: 'Anaemia', type: 'yesno' }
            }
        },
        'GBV': {
            description: 'Gender-based violence',
            fields: {
                gbv_gen: { label: 'Gender Based Violence', type: 'yesno' },
                sexual_assault_gen: { label: 'Sexual Assault', type: 'yesno' }
            }
        },
        'Death': {
            description: 'Mortality information',
            fields: {
                death_gen: { label: 'Death Occurred', type: 'yesno' },
                death_cause_gen: { label: 'Cause of Death', type: 'select', options: [
                    'Diarrhoea', 'Pneumonia', 'Malaria', 'Malnutrition', 'HIV', 'Trauma', 'Other', 'Unspecified'
                ]}
            }
        },
        'Remarks': {
            description: 'Additional notes',
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

// ============================================
// CASCADING DATA FORMAT (NO UID):
// ============================================
// Region||District
// District||Chiefdom
// Chiefdom||Health Facility
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
Bo District||Wonde Chiefdom
Bo City||Bo Government Hospital
Bo City||Kakua Static CHC`;

// ADD MORE CASCADING DATA AS NEEDED - truncated for brevity

// ============================================
// CASCADING DATA PARSER (NO UID)
// ============================================

function parseCascadingData() {
    const lines = CASCADING_DATA.trim().split('\n');
    const data = {
        regions: [],
        regionToDistricts: {},
        districtToChiefdoms: {},
        chiefdomToFacilities: {}
    };
    
    const regionsSet = new Set();
    
    lines.forEach(line => {
        const parts = line.split('||').map(p => p.trim());
        
        if (parts.length === 2) {
            const [parent, child] = parts;
            
            // Region -> District
            if (parent.endsWith('Region') || parent.endsWith('Area')) {
                regionsSet.add(parent);
                if (!data.regionToDistricts[parent]) {
                    data.regionToDistricts[parent] = [];
                }
                if (!data.regionToDistricts[parent].includes(child)) {
                    data.regionToDistricts[parent].push(child);
                }
            } 
            // District -> Chiefdom
            else if (parent.endsWith('District')) {
                if (!data.districtToChiefdoms[parent]) {
                    data.districtToChiefdoms[parent] = [];
                }
                if (!data.districtToChiefdoms[parent].includes(child)) {
                    data.districtToChiefdoms[parent].push(child);
                }
            }
            // Chiefdom -> Facility (no UID)
            else {
                if (!data.chiefdomToFacilities[parent]) {
                    data.chiefdomToFacilities[parent] = [];
                }
                if (!data.chiefdomToFacilities[parent].includes(child)) {
                    data.chiefdomToFacilities[parent].push(child);
                }
            }
        }
    });
    
    data.regions = Array.from(regionsSet).sort();
    return data;
}

// Parse data on load
const CASCADING_PARSED = parseCascadingData();

// ============================================
// HELPER FUNCTIONS
// ============================================

function getRegions() {
    return CASCADING_PARSED.regions;
}

function getDistrictsByRegion(region) {
    return CASCADING_PARSED.regionToDistricts[region] || [];
}

function getChiefdomsByDistrict(district) {
    return CASCADING_PARSED.districtToChiefdoms[district] || [];
}

function getFacilitiesByChiefdom(chiefdom) {
    return CASCADING_PARSED.chiefdomToFacilities[chiefdom] || [];
}

console.log('Cascading data parsed successfully');
console.log('Regions:', getRegions().length);
