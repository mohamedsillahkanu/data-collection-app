// Data will be parsed from the string in config.js
let regionDistrictMap = {};
let districtChiefdomMap = {};
let chiefdomFacilityMap = {};

// State variables
const state = {
    pendingSubmissions: [],
    isOnline: navigator.onLine,
    isLoggedIn: false,
    currentSection: 1,
    totalSections: 10, // Changed from 9 to 10 to include form type section
    formType: null // 'under_five' or 'general'
};

// Initialize
function init() {
    // Load pending submissions
    const saved = localStorage.getItem('pendingSubmissions');
    if (saved) {
        try {
            state.pendingSubmissions = JSON.parse(saved);
        } catch (e) {
            state.pendingSubmissions = [];
        }
    }

    // Check login state
    state.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    // Parse cascading data
    parseCascadingData();
    
    // Populate month dropdown (only current month)
    populateMonthDropdown();
    
    // Setup form type listeners
    setupFormTypeListeners();
    
    if (state.isLoggedIn) {
        showMainContent();
    }

    // Setup event listeners
    setupEventListeners();
}

function setupFormTypeListeners() {
    const underFiveRadio = document.getElementById('underFiveRadio');
    const generalRadio = document.getElementById('generalRadio');
    
    if (underFiveRadio) {
        underFiveRadio.addEventListener('change', function() {
            if (this.checked) {
                state.formType = 'under_five';
                generateVariableFields();
            }
        });
    }
    
    if (generalRadio) {
        generalRadio.addEventListener('change', function() {
            if (this.checked) {
                state.formType = 'general';
                generateVariableFields();
            }
        });
    }
}

function populateMonthDropdown() {
    const monthSelect = document.getElementById('monthSelect');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-11
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Only add current month
    const option = document.createElement('option');
    option.value = months[currentMonth];
    option.textContent = months[currentMonth];
    option.selected = true;
    monthSelect.appendChild(option);
    
    // Make it readonly by disabling
    monthSelect.disabled = true;
    monthSelect.style.opacity = '1';
    monthSelect.style.cursor = 'not-allowed';
}

function generateVariableFields() {
    const container = document.getElementById('dynamicSections');
    
    // If no form type selected yet, clear container and return
    if (!state.formType) {
        container.innerHTML = '';
        return;
    }
    
    let html = '';
    let sectionNum = 2;
    
    // Get the sections for the selected form type
    const formSections = VARIABLE_SECTIONS[state.formType === 'under_five' ? 'UNDER_FIVE' : 'GENERAL'];
    
    if (!formSections) {
        container.innerHTML = '<p style="color: #8b949e; text-align: center; padding: 20px;">No sections available for this form type yet.</p>';
        state.totalSections = 1;
        return;
    }
    
    const sectionKeys = Object.keys(formSections);
    
    sectionKeys.forEach((sectionTitle, index) => {
        const section = formSections[sectionTitle];
        const isLastSection = index === sectionKeys.length - 1;
        
        html += `
            <div class="form-section" data-section="${sectionNum}">
                <div class="section-header">
                    <h2 class="section-title">${sectionTitle}</h2>
                    <p class="section-description">${section.description}</p>
                </div>
        `;
        
        // Add fields in rows of 2
        const fields = Object.entries(section.fields);
        for (let i = 0; i < fields.length; i += 2) {
            html += '<div class="form-row">';
            
            for (let j = i; j < Math.min(i + 2, fields.length); j++) {
                const [fieldName, fieldConfig] = fields[j];
                const label = fieldConfig.label || fieldConfig;
                const type = fieldConfig.type || 'text';
                
                html += '<div class="form-group">';
                html += `<label class="form-label">${label} <span class="required">*</span></label>`;
                
                if (type === 'yesno') {
                    html += `
                        <select class="form-select" name="${fieldName}" required>
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    `;
                } else if (type === 'select' && fieldConfig.options) {
                    html += `<select class="form-select" name="${fieldName}" required>`;
                    html += '<option value="">Select...</option>';
                    fieldConfig.options.forEach(option => {
                        html += `<option value="${option}">${option}</option>`;
                    });
                    html += '</select>';
                } else if (type === 'date') {
                    html += `<input type="date" class="form-input" name="${fieldName}" required>`;
                } else if (type === 'number') {
                    html += `<input type="number" class="form-input" name="${fieldName}" min="0" step="0.1" required>`;
                } else {
                    html += `<input type="text" class="form-input" name="${fieldName}" ${type === 'text' ? '' : 'required'}>`;
                }
                
                html += '</div>';
            }
            
            html += '</div>';
        }
        
        // Navigation buttons
        html += `
            <div class="navigation-buttons">
                <button type="button" class="btn-nav btn-back" onclick="previousSection()">← Back</button>
                ${isLastSection 
                    ? '<button type="submit" class="btn-nav btn-primary" id="submitBtn">Submit Data ✓</button>'
                    : '<button type="button" class="btn-nav btn-next" onclick="nextSection()">Next Section →</button>'
                }
            </div>
        </div>`;
        
        sectionNum++;
    });
    
    container.innerHTML = html;
    state.totalSections = sectionNum - 1;
    updateProgress();
}

function nextSection() {
    // Validate current section
    const currentSectionEl = document.querySelector(`.form-section[data-section="${state.currentSection}"]`);
    const inputs = currentSectionEl.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = '#f85149';
            setTimeout(() => input.style.borderColor = '', 3000);
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Special check: If moving from section 1 to section 0 (form type selection)
    if (state.currentSection === 1) {
        // Move to form type selection (section 0)
        currentSectionEl.classList.remove('active');
        const formTypeSection = document.querySelector('.form-section[data-section="0"]');
        if (formTypeSection) {
            formTypeSection.classList.add('active');
            state.currentSection = 0;
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
    }
    
    // Special check for form type on section 0
    if (state.currentSection === 0 && !state.formType) {
        showNotification('Please select a form type (Under Five or General)', 'error');
        return;
    }
    
    // If leaving section 0 (form type), move to section 2 (first dynamic section)
    if (state.currentSection === 0) {
        currentSectionEl.classList.remove('active');
        state.currentSection = 2;
        const nextSection = document.querySelector(`.form-section[data-section="${state.currentSection}"]`);
        if (nextSection) {
            nextSection.classList.add('active');
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }
    
    // Move to next section normally
    if (state.currentSection < state.totalSections) {
        currentSectionEl.classList.remove('active');
        state.currentSection++;
        const nextSection = document.querySelector(`.form-section[data-section="${state.currentSection}"]`);
        if (nextSection) {
            nextSection.classList.add('active');
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function previousSection() {
    // If on section 0 (form type), go back to section 1 (location)
    if (state.currentSection === 0) {
        document.querySelector('.form-section[data-section="0"]').classList.remove('active');
        state.currentSection = 1;
        document.querySelector('.form-section[data-section="1"]').classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    // If on section 2 (first dynamic section), go back to section 0 (form type)
    if (state.currentSection === 2) {
        document.querySelector('.form-section[data-section="2"]').classList.remove('active');
        state.currentSection = 0;
        document.querySelector('.form-section[data-section="0"]').classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    // Normal previous section
    if (state.currentSection > 1) {
        document.querySelector(`.form-section[data-section="${state.currentSection}"]`).classList.remove('active');
        state.currentSection--;
        document.querySelector(`.form-section[data-section="${state.currentSection}"]`).classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    let displaySection = state.currentSection;
    let displayTotal = state.totalSections;
    
    // If on form type section (0), show as "Selecting Form Type"
    if (state.currentSection === 0) {
        document.getElementById('progressText').textContent = 'Selecting Form Type';
        const progress = (1.5 / state.totalSections) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        return;
    }
    
    // Adjust display for section numbering (skip section 0 in count)
    if (state.currentSection > 0) {
        displaySection = state.currentSection - 1;
        displayTotal = state.totalSections - 1;
    }
    
    const progress = (state.currentSection / state.totalSections) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Section ${displaySection} of ${displayTotal}`;
}

function parseCascadingData() {
    // Parse the pipe-delimited data
    const lines = CASCADING_DATA.trim().split('\n');
    
    lines.forEach(line => {
        const parts = line.split('||');
        if (parts.length === 2) {
            const [parent, child] = parts.map(s => s.trim());
            
            // Check if this looks like Region||District
            if (parent.includes('Region') || parent === 'Western Area') {
                if (!regionDistrictMap[parent]) {
                    regionDistrictMap[parent] = [];
                }
                if (!regionDistrictMap[parent].includes(child)) {
                    regionDistrictMap[parent].push(child);
                }
            }
            // Check if this looks like District||Chiefdom
            else if (child.includes('Chiefdom') || child.includes('City') || child.includes('Town') || child.includes('Zone')) {
                if (!districtChiefdomMap[parent]) {
                    districtChiefdomMap[parent] = [];
                }
                if (!districtChiefdomMap[parent].includes(child)) {
                    districtChiefdomMap[parent].push(child);
                }
            }
            // Otherwise it's Chiefdom||Facility
            else {
                if (!chiefdomFacilityMap[parent]) {
                    chiefdomFacilityMap[parent] = [];
                }
                if (!chiefdomFacilityMap[parent].includes(child)) {
                    chiefdomFacilityMap[parent].push(child);
                }
            }
        }
    });
    
    console.log('Cascading data parsed successfully');
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // View Data button
    document.getElementById('viewDataBtn').addEventListener('click', handleViewData);

    // Main form
    document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);

    // Online/offline events
    window.addEventListener('online', handleOnlineEvent);
    window.addEventListener('offline', handleOfflineEvent);
}

function setupCascadingListeners() {
    const regionSelect = document.getElementById('regionSelect');
    const districtSelect = document.getElementById('districtSelect');
    const chiefdomSelect = document.getElementById('chiefdomSelect');
    
    if (regionSelect) {
        regionSelect.addEventListener('change', handleRegionChange);
    }
    if (districtSelect) {
        districtSelect.addEventListener('change', handleDistrictChange);
    }
    if (chiefdomSelect) {
        chiefdomSelect.addEventListener('change', handleChiefdomChange);
    }
}

function handleViewData() {
    window.open(GOOGLE_SHEET_URL, '_blank');
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    if (username === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
        sessionStorage.setItem('isLoggedIn', 'true');
        state.isLoggedIn = true;
        errorDiv.classList.remove('show');
        showMainContent();
    } else {
        errorDiv.classList.add('show');
    }
}

function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    state.isLoggedIn = false;
    document.getElementById('mainContent').classList.remove('show');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function showMainContent() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainContent').classList.add('show');
    updateOnlineStatus();
    updatePendingCount();
    
    setupCascadingListeners();
    setupFormTypeListeners();
    
    if (state.isOnline && state.pendingSubmissions.length > 0) {
        syncPendingSubmissions();
    }
}

function handleRegionChange(e) {
    const region = e.target.value;
    const districtSelect = document.getElementById('districtSelect');
    const chiefdomSelect = document.getElementById('chiefdomSelect');
    const facilitySelect = document.getElementById('healthFacilitySelect');
    
    districtSelect.innerHTML = '<option value="">Select district...</option>';
    chiefdomSelect.innerHTML = '<option value="">Select district first...</option>';
    chiefdomSelect.disabled = true;
    facilitySelect.innerHTML = '<option value="">Select chiefdom first...</option>';
    facilitySelect.disabled = true;
    
    if (region && regionDistrictMap[region]) {
        districtSelect.disabled = false;
        
        regionDistrictMap[region].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    } else {
        districtSelect.disabled = true;
        districtSelect.innerHTML = '<option value="">Select region first...</option>';
    }
}

function handleDistrictChange(e) {
    const district = e.target.value;
    const chiefdomSelect = document.getElementById('chiefdomSelect');
    const facilitySelect = document.getElementById('healthFacilitySelect');
    
    chiefdomSelect.innerHTML = '<option value="">Select chiefdom...</option>';
    facilitySelect.innerHTML = '<option value="">Select chiefdom first...</option>';
    facilitySelect.disabled = true;
    
    if (district && districtChiefdomMap[district]) {
        chiefdomSelect.disabled = false;
        
        districtChiefdomMap[district].forEach(chiefdom => {
            const option = document.createElement('option');
            option.value = chiefdom;
            option.textContent = chiefdom;
            chiefdomSelect.appendChild(option);
        });
    } else {
        chiefdomSelect.disabled = true;
        chiefdomSelect.innerHTML = '<option value="">Select district first...</option>';
    }
}

function handleChiefdomChange(e) {
    const chiefdom = e.target.value;
    const facilitySelect = document.getElementById('healthFacilitySelect');
    
    facilitySelect.innerHTML = '<option value="">Select health facility...</option>';
    
    if (chiefdom && chiefdomFacilityMap[chiefdom]) {
        facilitySelect.disabled = false;
        
        chiefdomFacilityMap[chiefdom].forEach(facility => {
            const option = document.createElement('option');
            option.value = facility;
            option.textContent = facility;
            facilitySelect.appendChild(option);
        });
    } else {
        facilitySelect.disabled = true;
        facilitySelect.innerHTML = '<option value="">Select chiefdom first...</option>';
    }
}

function handleOnlineEvent() {
    state.isOnline = true;
    updateOnlineStatus();
    showNotification('Back online - Syncing data...', 'info');
    syncPendingSubmissions();
}

function handleOfflineEvent() {
    state.isOnline = false;
    updateOnlineStatus();
    showNotification('You are offline - Data will be saved locally', 'info');
}

function updateOnlineStatus() {
    const indicator = document.getElementById('statusIndicator');
    const text = document.getElementById('statusText');
    
    if (state.isOnline) {
        indicator.className = 'status-indicator online';
        text.textContent = 'Online';
    } else {
        indicator.className = 'status-indicator offline';
        text.textContent = 'Offline';
    }
}

function updatePendingCount() {
    document.getElementById('pendingCount').textContent = state.pendingSubmissions.length;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target);
    
    const data = {
        timestamp: new Date().toISOString(),
        formType: state.formType,
        year: formData.get('year'),
        month: formData.get('month'),
        region: formData.get('region'),
        district: formData.get('district'),
        chiefdom: formData.get('chiefdom'),
        healthFacility: formData.get('healthFacility')
    };
    
    // Add all variable fields dynamically
    for (const fieldName of Object.keys(VARIABLES)) {
        data[fieldName] = formData.get(fieldName);
    }

    if (state.isOnline) {
        await submitToServer(data);
    } else {
        saveOffline(data);
    }
}

async function submitToServer(data) {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        showNotification('Data submitted successfully!', 'success');
        clearForm();
        
    } catch (error) {
        console.error('Submit error:', error);
        showNotification('Failed to submit - Saved offline', 'error');
        saveOffline(data);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Data ✓';
    }
}

function saveOffline(data) {
    state.pendingSubmissions.push(data);
    localStorage.setItem('pendingSubmissions', JSON.stringify(state.pendingSubmissions));
    updatePendingCount();
    showNotification('Data saved offline - Will sync when online', 'info');
    clearForm();
}

async function syncPendingSubmissions() {
    if (state.pendingSubmissions.length === 0) return;

    showNotification('Syncing pending submissions...', 'info');
    const successfulSyncs = [];
    
    for (let i = 0; i < state.pendingSubmissions.length; i++) {
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state.pendingSubmissions[i])
            });
            successfulSyncs.push(i);
        } catch (error) {
            console.error('Sync error:', error);
        }
    }

    if (successfulSyncs.length > 0) {
        state.pendingSubmissions = state.pendingSubmissions.filter((_, index) => 
            !successfulSyncs.includes(index)
        );
        localStorage.setItem('pendingSubmissions', JSON.stringify(state.pendingSubmissions));
        updatePendingCount();
        showNotification(`Successfully synced ${successfulSyncs.length} submission(s)`, 'success');
    }
}

function clearForm() {
    document.getElementById('dataForm').reset();
    
    const districtSelect = document.getElementById('districtSelect');
    const chiefdomSelect = document.getElementById('chiefdomSelect');
    const facilitySelect = document.getElementById('healthFacilitySelect');
    
    districtSelect.innerHTML = '<option value="">Select region first...</option>';
    districtSelect.disabled = true;
    chiefdomSelect.innerHTML = '<option value="">Select district first...</option>';
    chiefdomSelect.disabled = true;
    facilitySelect.innerHTML = '<option value="">Select chiefdom first...</option>';
    facilitySelect.disabled = true;
    
    // Reset form type and regenerate
    state.formType = null;
    state.currentSection = 1;
    generateVariableFields();
    
    // Hide all sections and show only section 1
    document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
    const section1 = document.querySelector('.form-section[data-section="1"]');
    if (section1) {
        section1.classList.add('active');
    }
    
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    notification.className = `notification ${type} show`;
    text.textContent = message;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Start the app
init();
