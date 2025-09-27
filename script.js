// Navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Remover clase active de todos los botones y secciones
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Agregar clase active al botón y sección correspondiente
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Inicializar tabla de presiones
    updatePressureTable();
    
    // Configurar búsqueda de problemas
    setupProblemSearch();
});

// Datos de presiones por refrigerante
const pressureData = {
    'R22': [
        { temp: -10, low: 11, high: 68 },
        { temp: -5, low: 16, high: 75 },
        { temp: 0, low: 21, high: 83 },
        { temp: 5, low: 28, high: 92 },
        { temp: 10, low: 35, high: 101 },
        { temp: 15, low: 43, high: 111 },
        { temp: 20, low: 52, high: 122 },
        { temp: 25, low: 62, high: 134 },
        { temp: 30, low: 73, high: 147 },
        { temp: 35, low: 85, high: 161 },
        { temp: 40, low: 98, high: 176 }
    ],
    'R410A': [
        { temp: -10, low: 32, high: 118 },
        { temp: -5, low: 40, high: 130 },
        { temp: 0, low: 49, high: 143 },
        { temp: 5, low: 59, high: 157 },
        { temp: 10, low: 70, high: 172 },
        { temp: 15, low: 82, high: 188 },
        { temp: 20, low: 95, high: 205 },
        { temp: 25, low: 109, high: 224 },
        { temp: 30, low: 124, high: 244 },
        { temp: 35, low: 141, high: 265 },
        { temp: 40, low: 158, high: 288 }
    ],
    'R134A': [
        { temp: -10, low: 7, high: 51 },
        { temp: -5, low: 11, high: 57 },
        { temp: 0, low: 15, high: 64 },
        { temp: 5, low: 20, high: 71 },
        { temp: 10, low: 26, high: 79 },
        { temp: 15, low: 32, high: 88 },
        { temp: 20, low: 39, high: 97 },
        { temp: 25, low: 47, high: 107 },
        { temp: 30, low: 56, high: 118 },
        { temp: 35, low: 66, high: 130 },
        { temp: 40, low: 77, high: 142 }
    ],
    'R404A': [
        { temp: -10, low: 22, high: 86 },
        { temp: -5, low: 28, high: 95 },
        { temp: 0, low: 35, high: 105 },
        { temp: 5, low: 43, high: 116 },
        { temp: 10, low: 52, high: 128 },
        { temp: 15, low: 62, high: 141 },
        { temp: 20, low: 73, high: 155 },
        { temp: 25, low: 85, high: 170 },
        { temp: 30, low: 98, high: 186 },
        { temp: 35, low: 112, high: 203 },
        { temp: 40, low: 127, high: 221 }
    ]
};

// Actualizar tabla de presiones
function updatePressureTable() {
    const refrigerantType = document.getElementById('refrigerant-type').value;
    const tableContainer = document.getElementById('pressure-table');
    
    const data = pressureData[refrigerantType];
    
    let tableHTML = `
        <h3>Presiones para ${refrigerantType}</h3>
        <table>
            <thead>
                <tr>
                    <th>Temperatura (°C)</th>
                    <th>Presión Baja (PSI)</th>
                    <th>Presión Alta (PSI)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row.temp}</td>
                <td>${row.low}</td>
                <td>${row.high}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
}

// Event listener para cambio de refrigerante
document.addEventListener('DOMContentLoaded', function() {
    const refrigerantSelect = document.getElementById('refrigerant-type');
    if (refrigerantSelect) {
        refrigerantSelect.addEventListener('change', updatePressureTable);
    }
});

// Calculadora de amperaje
function calculateAmperage() {
    const tonnage = parseFloat(document.getElementById('tonnage').value);
    const voltage = parseInt(document.getElementById('voltage').value);
    
    if (!tonnage || tonnage <= 0) {
        document.getElementById('amperage-result').innerHTML = 'Por favor ingrese un tonelaje válido';
        return;
    }
    
    // Fórmula aproximada: Watts = Tonnage * 3500, Amperage = Watts / Voltage
    const watts = tonnage * 3500;
    const amperage = watts / voltage;
    const minAmp = amperage * 0.8;
    const maxAmp = amperage * 1.2;
    
    document.getElementById('amperage-result').innerHTML = `
        <strong>Consumo estimado:</strong><br>
        Rango: ${minAmp.toFixed(1)} - ${maxAmp.toFixed(1)} Amperios<br>
        Promedio: ${amperage.toFixed(1)} Amperios<br>
        Potencia: ${watts.toFixed(0)} Watts
    `;
}

// Calculadora de carga térmica
function calculateThermalLoad() {
    const area = parseFloat(document.getElementById('area').value);
    const height = parseFloat(document.getElementById('height').value);
    const people = parseInt(document.getElementById('people').value);
    const orientation = parseFloat(document.getElementById('orientation').value);
    
    if (!area || !height || !people) {
        document.getElementById('thermal-result').innerHTML = 'Complete todos los campos';
        return;
    }
    
    // Cálculo básico de BTU
    const volume = area * height;
    const baseBTU = volume * 200; // 200 BTU por m³
    const peopleBTU = people * 600; // 600 BTU por persona
    const orientationBTU = baseBTU * (orientation - 1);
    
    const totalBTU = baseBTU + peopleBTU + orientationBTU;
    const tonnage = totalBTU / 12000;
    
    document.getElementById('thermal-result').innerHTML = `
        <strong>Carga térmica calculada:</strong><br>
        ${totalBTU.toFixed(0)} BTU/h<br>
        ${tonnage.toFixed(2)} Toneladas<br>
        <small>Área: ${area}m² | Volumen: ${volume.toFixed(1)}m³</small>
    `;
}

// Calculadora de calibre de cable
function calculateWireGauge() {
    const current = parseFloat(document.getElementById('current').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const voltage = parseInt(document.getElementById('wire-voltage').value);
    
    if (!current || !distance) {
        document.getElementById('wire-result').innerHTML = 'Complete todos los campos';
        return;
    }
    
    // Tabla de calibres AWG
    const wireGauges = [
        { awg: 14, ampacity: 15, area: 2.08 },
        { awg: 12, ampacity: 20, area: 3.31 },
        { awg: 10, ampacity: 30, area: 5.26 },
        { awg: 8, ampacity: 40, area: 8.37 },
        { awg: 6, ampacity: 55, area: 13.3 },
        { awg: 4, ampacity: 70, area: 21.2 },
        { awg: 2, ampacity: 95, area: 33.6 },
        { awg: 1, ampacity: 110, area: 42.4 },
        { awg: '1/0', ampacity: 125, area: 53.5 },
        { awg: '2/0', ampacity: 145, area: 67.4 },
        { awg: '3/0', ampacity: 165, area: 85.0 },
        { awg: '4/0', ampacity: 195, area: 107.2 }
    ];
    
    // Encontrar calibre por capacidad de corriente
    let selectedGauge = wireGauges.find(gauge => gauge.ampacity >= current * 1.25);
    
    // Verificar caída de voltaje (máximo 3%)
    const maxVoltageDrop = voltage * 0.03;
    const resistance = 0.017 * distance * 2 / selectedGauge.area; // Ohm
    const voltageDrop = current * resistance;
    
    if (voltageDrop > maxVoltageDrop) {
        // Buscar calibre mayor para reducir caída de voltaje
        for (let gauge of wireGauges) {
            const newResistance = 0.017 * distance * 2 / gauge.area;
            const newVoltageDrop = current * newResistance;
            if (newVoltageDrop <= maxVoltageDrop && gauge.ampacity >= current * 1.25) {
                selectedGauge = gauge;
                break;
            }
        }
    }
    
    if (!selectedGauge) {
        document.getElementById('wire-result').innerHTML = 'Requiere cable de mayor calibre';
        return;
    }
    
    const finalResistance = 0.017 * distance * 2 / selectedGauge.area;
    const finalVoltageDrop = current * finalResistance;
    
    document.getElementById('wire-result').innerHTML = `
        <strong>Calibre recomendado:</strong><br>
        AWG ${selectedGauge.awg}<br>
        Capacidad: ${selectedGauge.ampacity}A<br>
        Caída de voltaje: ${finalVoltageDrop.toFixed(2)}V (${(finalVoltageDrop/voltage*100).toFixed(1)}%)
    `;
}

// Calculadora de consumo eléctrico
function calculateElectricalCost() {
    const power = parseFloat(document.getElementById('power').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const rate = parseFloat(document.getElementById('rate').value);
    
    if (!power || !hours || !rate) {
        document.getElementById('cost-result').innerHTML = 'Complete todos los campos';
        return;
    }
    
    const dailyKWh = (power * hours) / 1000;
    const dailyCost = dailyKWh * rate;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    
    document.getElementById('cost-result').innerHTML = `
        <strong>Consumo y costo:</strong><br>
        Diario: ${dailyKWh.toFixed(2)} kWh - $${dailyCost.toFixed(2)}<br>
        Mensual: ${(dailyKWh * 30).toFixed(2)} kWh - $${monthlyCost.toFixed(2)}<br>
        Anual: ${(dailyKWh * 365).toFixed(2)} kWh - $${yearlyCost.toFixed(2)}
    `;
}

// Búsqueda de problemas
function setupProblemSearch() {
    const searchInput = document.getElementById('problem-search');
    const problemCards = document.querySelectorAll('.problem-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            problemCards.forEach(card => {
                const keywords = card.getAttribute('data-keywords').toLowerCase();
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.textContent.toLowerCase();
                
                if (keywords.includes(searchTerm) || 
                    title.includes(searchTerm) || 
                    content.includes(searchTerm) ||
                    searchTerm === '') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}