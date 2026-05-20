// ============================================
// overview.js - AutoBins AI LIVE Dashboard
// FINAL REAL-TIME VERSION
// ============================================

let tripsChart, statusChart;

let currentPage = 1;

let itemsPerPage = 5;

let allActivities = [];

let sortColumn = -1;

let sortDirection = 'asc';

let autoRefreshInterval;

// ============================================
// Raspberry API
// ============================================
const API_URL =
        "http://10.184.223.181:5000/status";

// ============================================
// Initialize Overview Page
// ============================================
function initOverviewPage() {

    console.log(
        '🚀 AutoBins AI Dashboard Started'
    );

    initializeCharts();

    initializeFeatures();

    loadDashboardData();

    startAutoRefresh();
}

// ============================================
// Initialize Features
// ============================================
function initializeFeatures() {

    // =========================
    // Theme
    // =========================
    const savedTheme =
        localStorage.getItem('theme');

    if (savedTheme === 'dark') {

        document.body.classList.add(
            'dark-mode'
        );

        const themeIcon =
            document.getElementById(
                'themeIcon'
            );

        if (themeIcon) {

            themeIcon.className =
                'fas fa-sun';
        }
    }

    // =========================
    // View Mode
    // =========================
    const savedView =
        localStorage.getItem('viewMode');

    if (savedView === 'cards') {

        document.body.classList.add(
            'card-view'
        );

        const viewIcon =
            document.getElementById(
                'viewIcon'
            );

        if (viewIcon) {

            viewIcon.className =
                'fas fa-table';
        }
    }

    // =========================
    // Search
    // =========================
    const searchInput =
        document.getElementById(
            'searchInput'
        );

    if (searchInput) {

        searchInput.addEventListener(
            'input',
            handleSearch
        );
    }

    // =========================
    // Notifications Close
    // =========================
    document.addEventListener(
        'click',
        function(event) {

            const dropdown =
                document.getElementById(
                    'notificationsDropdown'
                );

            const btn =
                document.getElementById(
                    'notificationBtn'
                );

            if (
                dropdown &&
                !dropdown.contains(event.target) &&
                !btn.contains(event.target)
            ) {

                dropdown.classList.remove(
                    'show'
                );
            }
        }
    );
}

// ============================================
// Initialize Charts
// ============================================
function initializeCharts() {

    if (typeof Chart === 'undefined') {

        console.error(
            'Chart.js not loaded'
        );

        return;
    }

    // =========================
    // Trips Chart
    // =========================
    const tripsCtx =
        document.getElementById(
            'tripsChart'
        );

    if (tripsCtx) {

        tripsChart = new Chart(
            tripsCtx,
            {
                type: 'line',

                data: {

                    labels: [
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                        'Sun'
                    ],

                    datasets: [

                        {

                            label:
                                'AI Collections',

                            data: [
                                5,
                                8,
                                6,
                                10,
                                9,
                                12,
                                11
                            ],

                            borderColor:
                                '#4873ff',

                            backgroundColor:
                                'rgba(72,115,255,0.1)',

                            tension: 0.4,

                            fill: true
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }
                    }
                }
            }
        );
    }

    // =========================
    // Status Chart
    // =========================
    const statusCtx =
        document.getElementById(
            'statusChart'
        );

    if (statusCtx) {

        statusChart = new Chart(
            statusCtx,
            {
                type: 'doughnut',

                data: {

                    labels: [
                        'Active',
                        'Waiting',
                        'Alert'
                    ],

                    datasets: [

                        {

                            data: [1, 1, 1],

                            backgroundColor: [
                                '#4873ff',
                                '#66bb6a',
                                '#ff5252'
                            ],

                            borderWidth: 0
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false
                }
            }
        );
    }
}

// ============================================
// Load REAL Dashboard Data
// ============================================
async function loadDashboardData() {

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        console.log(
            "LIVE DATA:",
            data
        );

        // ====================================
        // Fill Level
        // ====================================
        const avgFillLevel =
            document.getElementById(
                'avgFillLevel'
            );

        if (avgFillLevel) {

            avgFillLevel.innerHTML =
                `${data.bin_level}<span style="font-size:18px;color:#6b7280;">%</span>`;
        }

        // ====================================
        // Active Bins
        // ====================================
        const activeBins =
            document.getElementById(
                'activeBins'
            );

        if (activeBins) {

            activeBins.innerHTML =
                data.movement_enabled
                    ? "1"
                    : "0";
        }

        // ====================================
        // Trips Today
        // ====================================
        const tripsToday =
            document.getElementById(
                'tripsToday'
            );

        if (tripsToday) {

            tripsToday.innerHTML =
                data.vehicle_status ===
                "FORWARD"
                    ? "1"
                    : "0";
        }

        // ====================================
        // Critical Alerts
        // ====================================
        const criticalAlerts =
            document.getElementById(
                'criticalAlerts'
            );

        if (criticalAlerts) {

            let alerts = 0;

            if (
                data.alert !== "NONE"
            ) {

                alerts++;
            }

            if (
                data.person_detected
            ) {

                alerts++;
            }

            if (
                data.front_obstacle
            ) {

                alerts++;
            }

            criticalAlerts.innerHTML =
                alerts;
        }

        // ====================================
        // Update Activities
        // ====================================
        allActivities = [

            {

                binId: 'BIN-001',

                location:
                    'Mansoura University',

                fillLevel:
                    data.bin_level,

                status:
                    data.vehicle_status
                        .includes("STOP")
                        ? 'critical'
                        : 'active',

                statusText:
                    data.vehicle_status,

                battery: 100,

                timestamp:
                    new Date()
            }
        ];

        updateActivityDisplay();

    } catch (error) {

        console.error(
            'API ERROR:',
            error
        );

        showToast(
            'Connection Error',
            'Failed to connect Raspberry Pi',
            'error'
        );
    }
}

// ============================================
// Search
// ============================================
function handleSearch(event) {

    const searchTerm =
        event.target.value.toLowerCase();

    allActivities =
        allActivities.filter(activity =>

            activity.binId
                .toLowerCase()
                .includes(searchTerm)

            ||

            activity.location
                .toLowerCase()
                .includes(searchTerm)
        );

    updateActivityDisplay();
}

// ============================================
// Activity Display
// ============================================
function updateActivityDisplay() {

    const startIndex =
        (currentPage - 1)
        * itemsPerPage;

    const endIndex =
        startIndex + itemsPerPage;

    const pageData =
        allActivities.slice(
            startIndex,
            endIndex
        );

    updateActivityTable(pageData);

    updateMobileCards(pageData);

    updatePagination();
}

// ============================================
// Update Table
// ============================================
function updateActivityTable(
    activities
) {

    const tableBody =
        document.getElementById(
            'activityTable'
        );

    if (!tableBody) return;

    tableBody.innerHTML =
        activities.map(activity => `

        <tr>

            <td class="vehicle-id">
                ${activity.binId}
            </td>

            <td>
                ${activity.location}
            </td>

            <td>
                <span class="fill-indicator fill-${getFillClass(activity.fillLevel)}">
                    ${activity.fillLevel}%
                </span>
            </td>

            <td>
                <span class="status-badge ${activity.status}">
                    ${activity.statusText}
                </span>
            </td>

            <td>
                <span class="battery-indicator battery-good">
                    ${activity.battery}%
                </span>
            </td>

            <td>
                ${formatTimeAgo(activity.timestamp)}
            </td>

        </tr>

    `).join('');
}

// ============================================
// Mobile Cards
// ============================================
function updateMobileCards(
    activities
) {

    const cardsView =
        document.getElementById(
            'cardsView'
        );

    if (!cardsView) return;

    cardsView.innerHTML =
        activities.map(activity => `

        <div class="bin-card">

            <div class="bin-card-header">

                <span class="bin-card-id">
                    ${activity.binId}
                </span>

                <span class="status-badge ${activity.status}">
                    ${activity.statusText}
                </span>

            </div>

            <div class="bin-card-body">

                <div class="bin-card-row">

                    <span class="bin-card-label">
                        Fill
                    </span>

                    <span class="bin-card-value">
                        ${activity.fillLevel}%
                    </span>

                </div>

                <div class="bin-card-row">

                    <span class="bin-card-label">
                        Battery
                    </span>

                    <span class="bin-card-value">
                        ${activity.battery}%
                    </span>

                </div>

            </div>

        </div>

    `).join('');
}

// ============================================
// Pagination
// ============================================
function updatePagination() {

    const totalPages =
        Math.ceil(
            allActivities.length
            / itemsPerPage
        );

    const currentPageEl =
        document.getElementById(
            'currentPage'
        );

    const totalPagesEl =
        document.getElementById(
            'totalPages'
        );

    if (currentPageEl)
        currentPageEl.textContent =
            currentPage;

    if (totalPagesEl)
        totalPagesEl.textContent =
            totalPages;
}

function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        updateActivityDisplay();
    }
}

function nextPage() {

    const totalPages =
        Math.ceil(
            allActivities.length
            / itemsPerPage
        );

    if (currentPage < totalPages) {

        currentPage++;

        updateActivityDisplay();
    }
}

// ============================================
// Helpers
// ============================================
function getFillClass(fillLevel) {

    if (fillLevel >= 80)
        return 'high';

    if (fillLevel >= 50)
        return 'medium';

    if (fillLevel >= 20)
        return 'low';

    return 'critical';
}

function formatTimeAgo(timestamp) {

    const now = new Date();

    const diff =
        Math.floor(
            (now - timestamp)
            / 1000
        );

    if (diff < 60)
        return 'Just now';

    if (diff < 3600)
        return `${Math.floor(diff / 60)} mins ago`;

    return `${Math.floor(diff / 3600)} hours ago`;
}

// ============================================
// Notifications
// ============================================
function toggleNotifications() {

    const dropdown =
        document.getElementById(
            'notificationsDropdown'
        );

    if (dropdown) {

        dropdown.classList.toggle(
            'show'
        );
    }
}

function clearNotifications() {

    const notificationsList =
        document.querySelector(
            '.notifications-list'
        );

    if (notificationsList) {

        notificationsList.innerHTML =
            `
            <p style="text-align:center;padding:30px;color:#6b7280;">
                No notifications
            </p>
        `;
    }
}

// ============================================
// Theme Toggle
// ============================================
function toggleTheme() {

    document.body.classList.toggle(
        'dark-mode'
    );

    const themeIcon =
        document.getElementById(
            'themeIcon'
        );

    if (
        document.body.classList.contains(
            'dark-mode'
        )
    ) {

        themeIcon.className =
            'fas fa-sun';

        localStorage.setItem(
            'theme',
            'dark'
        );

    } else {

        themeIcon.className =
            'fas fa-moon';

        localStorage.setItem(
            'theme',
            'light'
        );
    }
}

// ============================================
// View Toggle
// ============================================
function toggleView() {

    document.body.classList.toggle(
        'card-view'
    );

    const viewIcon =
        document.getElementById(
            'viewIcon'
        );

    if (
        document.body.classList.contains(
            'card-view'
        )
    ) {

        viewIcon.className =
            'fas fa-table';

    } else {

        viewIcon.className =
            'fas fa-th-large';
    }
}

// ============================================
// Toast Notifications
// ============================================
function showToast(
    title,
    message,
    type = 'info'
) {

    const container =
        document.getElementById(
            'toastContainer'
        );

    if (!container) return;

    const toast =
        document.createElement('div');

    toast.className =
        `toast ${type}`;

    toast.innerHTML = `

        <div class="toast-content">

            <p class="toast-title">
                ${title}
            </p>

            <p class="toast-message">
                ${message}
            </p>

        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 4000);
}

// ============================================
// Auto Refresh
// ============================================
function startAutoRefresh() {

    autoRefreshInterval =
        setInterval(() => {

            loadDashboardData();

        }, 1000);
}

// ============================================
// Cleanup
// ============================================
window.addEventListener(
    'beforeunload',
    () => {

        if (autoRefreshInterval) {

            clearInterval(
                autoRefreshInterval
            );
        }
    }
);

// ============================================
// Start
// ============================================
document.addEventListener(
    'DOMContentLoaded',
    function() {

        initOverviewPage();
    }
);