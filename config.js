// ============================================         
// CONFIGURATION - Change these values
// ============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqhplQAEn3Xp_TKqzTddtvTAicoEu_4ltq5C4iR7LNIElN18exltV1-t12RjiQcvLx/exec';
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_3jdmPYJMJ7DzKpJqR33t5RwdsRRJ9PbUUUjd9k9zfI/edit?gid=0#gid=0';
const LOGIN_USERNAME = 'admin';
const LOGIN_PASSWORD = 'admin';

// Variable names organized by sections
const VARIABLE_SECTIONS = {
    // ... your variable sections here
};

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
Southern Region||Bo District
Southern Region||Bonthe District
Western Area||Western Area Urban District
Western Area||Western Area Rural District
Bo District||Bo City
Bo District||Badjia Chiefdom
Bo District||Bagbwe Chiefdom
Bo City||Bo Government Hospital
Bo City||Bo School Bay CHP
Badjia Chiefdom||Ngelehun (Badjia) CHC
Badjia Chiefdom||Njagbahun (Badjia) MCHP
Bagbwe Chiefdom||Barlie MCHP
Bagbwe Chiefdom||Ngalu CHC`;

// ADD MORE CASCADING DATA ABOVE AS NEEDED

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
